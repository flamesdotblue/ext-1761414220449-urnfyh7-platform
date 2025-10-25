import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const PLATFORMS = [
  'devpost',
  'mlh',
  'unstop',
  'hackerearth',
  'hackathoncom',
  'kaggle',
  'codechef',
  'prism',
  'angelhack',
  'github',
];

const MOCK = [
  {
    id: 'devpost-1',
    title: 'AI for Social Good Hackathon',
    platform: 'devpost',
    url: 'https://devpost.com/hackathons/ai-for-social-good',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString(),
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1.5).toISOString(),
    location: 'Online',
    mode: 'online',
    prize: '$10,000',
    tags: ['AI', 'ML', 'Open Source'],
    description: 'Build impactful AI solutions to tackle real-world problems.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'mlh-1',
    title: 'Local Hack Day: Build',
    platform: 'mlh',
    url: 'https://mlh.io/seasons',
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1).toISOString(),
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    location: 'Global',
    mode: 'online',
    prize: 'Swag + Prizes',
    tags: ['Web', 'Cloud', 'Beginner Friendly'],
    description: 'A weekend of building with MLH community.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'unstop-1',
    title: 'Campus Hack 2025',
    platform: 'unstop',
    url: 'https://unstop.com/hackathons',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9).toISOString(),
    location: 'Mumbai, IN',
    mode: 'onsite',
    prize: '$5,000',
    tags: ['FinTech', 'Design', 'AI'],
    description: 'Onsite hackathon for students.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'hackerearth-1',
    title: 'Hack Covid Resilience',
    platform: 'hackerearth',
    url: 'https://hackerearth.com/challenges/hackathon',
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    endDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    location: 'Berlin, DE',
    mode: 'hybrid',
    prize: '$2,000',
    tags: ['Health', 'IoT'],
    description: 'Solutions for resilience and public health.',
    createdAt: new Date().toISOString(),
  },
];

// Basic de-duplication by URL or title
const dedupe = (arr) => {
  const map = new Map();
  for (const i of arr) {
    const key = (i.url || i.title).toLowerCase();
    if (!map.has(key)) map.set(key, i);
  }
  return [...map.values()];
};

// Mock fetchers; in a real deployment, these would call your backend aggregator.
async function fetchDevpost(signal) {
  try {
    // Attempt a permissive CORS public JSON as a liveness check (will be ignored content-wise)
    await fetch('https://api.publicapis.org/entries', { signal });
  } catch {}
  // Return mock enriched with platform tag
  return MOCK.filter((m) => m.platform === 'devpost');
}

async function fetchMLH(signal) {
  try { await fetch('https://httpbin.org/json', { signal }); } catch {}
  return MOCK.filter((m) => m.platform === 'mlh');
}

async function fetchUnstop() { return MOCK.filter((m) => m.platform === 'unstop'); }
async function fetchHackerEarth() { return MOCK.filter((m) => m.platform === 'hackerearth'); }
async function fetchHackathonCom() { return [
  {
    id: 'hackathoncom-1',
    title: 'Sustainability Challenge',
    platform: 'hackathoncom',
    url: 'https://www.hackathons.com/sustainability',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    location: 'Online',
    mode: 'online',
    prize: '$7,500',
    tags: ['Sustainability', 'Climate'],
    createdAt: new Date().toISOString(),
  },
]; }
async function fetchKaggle() { return [
  {
    id: 'kaggle-1',
    title: 'Kaggle X Hack: Vision',
    platform: 'kaggle',
    url: 'https://www.kaggle.com/competitions',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString(),
    location: 'Online',
    mode: 'online',
    prize: '$15,000',
    tags: ['Computer Vision', 'ML'],
    createdAt: new Date().toISOString(),
  },
]; }
async function fetchCodeChef() { return [
  {
    id: 'codechef-1',
    title: 'CodeChef Campus Hack',
    platform: 'codechef',
    url: 'https://www.codechef.com/',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 120).toISOString(),
    location: 'Bengaluru, IN',
    mode: 'onsite',
    prize: 'Goodies',
    tags: ['DSA', 'CP'],
    createdAt: new Date().toISOString(),
  },
]; }
async function fetchPrism() { return [
  {
    id: 'prism-1',
    title: 'Prism Web3 Hack',
    platform: 'prism',
    url: 'https://prism.xyz/hack',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString(),
    location: 'Online',
    mode: 'online',
    prize: '$50,000',
    tags: ['Web3', 'Blockchain'],
    createdAt: new Date().toISOString(),
  },
]; }
async function fetchAngelHack() { return [
  {
    id: 'angelhack-1',
    title: 'AngelHack Global',
    platform: 'angelhack',
    url: 'https://angelhack.com',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 32).toISOString(),
    location: 'San Francisco, US',
    mode: 'hybrid',
    prize: 'Accelerator',
    tags: ['Startup', 'Prototype'],
    createdAt: new Date().toISOString(),
  },
]; }
async function fetchGitHubHackathons() { return [
  {
    id: 'github-1',
    title: 'GitHub Student Hackathon',
    platform: 'github',
    url: 'https://education.github.com/experts',
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    location: 'Online',
    mode: 'online',
    prize: 'Swag',
    tags: ['Open Source', 'Students'],
    createdAt: new Date().toISOString(),
  },
]; }

const FETCHERS = {
  devpost: fetchDevpost,
  mlh: fetchMLH,
  unstop: fetchUnstop,
  hackerearth: fetchHackerEarth,
  hackathoncom: fetchHackathonCom,
  kaggle: fetchKaggle,
  codechef: fetchCodeChef,
  prism: fetchPrism,
  angelhack: fetchAngelHack,
  github: fetchGitHubHackathons,
};

export function useHackathons({ live = true, interval = 30000 } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const controllerRef = useRef(null);
  const timerRef = useRef(null);

  const hydratePlatforms = useCallback(() => {
    try {
      const raw = localStorage.getItem('platforms');
      if (raw) return new Set(JSON.parse(raw));
    } catch {}
    return null;
  }, []);

  useEffect(() => {
    // Preload selection from localStorage on first run only
    const saved = hydratePlatforms();
    if (saved) {
      // noop: App owns selection state; this is kept for potential future sync
    }
  }, [hydratePlatforms]);

  const aggregate = useCallback(async () => {
    setLoading(true);
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const results = await Promise.allSettled(
      PLATFORMS.map(async (p) => {
        try {
          const out = await FETCHERS[p](controller.signal);
          return { platform: p, ok: true, data: out };
        } catch (e) {
          return { platform: p, ok: false, error: e?.message || 'fetch failed', data: [] };
        }
      })
    );

    const nextErrors = {};
    const all = [];
    for (const r of results) {
      if (r.status === 'fulfilled') {
        const { platform, ok, data, error } = r.value;
        if (!ok) nextErrors[platform] = error || true;
        all.push(...(data || []).map((d) => ({ ...d, platform })));
      } else {
        // Rejected promise at top-level
        nextErrors['unknown'] = r.reason?.message || 'unknown error';
      }
    }

    const merged = dedupe(all).map((i) => ({
      ...i,
      id: i.id || `${i.platform}-${(i.url || i.title).slice(0, 24)}`,
      updatedAt: new Date().toISOString(),
    }));

    setItems(merged);
    setErrors(nextErrors);
    setLastUpdated(Date.now());
    setLoading(false);
  }, []);

  const refresh = useCallback(() => {
    aggregate();
  }, [aggregate]);

  useEffect(() => {
    aggregate();
    if (!live) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(aggregate, interval);
    return () => {
      clearInterval(timerRef.current);
      controllerRef.current?.abort();
    };
  }, [aggregate, interval, live]);

  const value = useMemo(() => ({ items, loading, lastUpdated, refresh, errors }), [items, loading, lastUpdated, refresh, errors]);
  return value;
}
