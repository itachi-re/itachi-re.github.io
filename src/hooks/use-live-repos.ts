import { useEffect, useMemo, useState } from 'react';
import { GITHUB_USER } from '@/data/site';
import type { Project } from '@/data/projects';

interface LiveInfo {
  stars: number;
  updated: string;
}

const CACHE_KEY = 'itachi-live-repos-v1';
const TTL_MS = 6 * 60 * 60 * 1000; // unauthenticated GitHub API is 60 req/h per IP — cache hard

function readCache(): Record<string, LiveInfo> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; data: Record<string, LiveInfo> };
    return Date.now() - parsed.at < TTL_MS ? parsed.data : null;
  } catch {
    return null;
  }
}

/**
 * Overlays live star counts and last-push dates from the GitHub API on top of the
 * bundled snapshot. Any failure (rate limit, offline, blocked) silently keeps the snapshot.
 */
export function useLiveRepos(base: Project[]) {
  const [live, setLive] = useState<Record<string, LiveInfo> | null>(() => readCache());

  useEffect(() => {
    if (live) return; // fresh cache hit
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((repos: Array<{ name: string; stargazers_count: number; pushed_at: string }>) => {
        const data: Record<string, LiveInfo> = {};
        repos.forEach((r) => {
          data[r.name] = { stars: r.stargazers_count, updated: r.pushed_at };
        });
        setLive(data);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        /* keep the snapshot */
      });

    return () => controller.abort();
  }, [live]);

  const projects = useMemo(
    () =>
      base.map((p) => {
        const info = live?.[p.name];
        return info ? { ...p, stars: info.stars, updated: info.updated } : p;
      }),
    [base, live]
  );

  return { projects, isLive: live !== null };
}
