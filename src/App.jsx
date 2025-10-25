import { useState, useMemo } from 'react';
import Header from './components/Header.jsx';
import PlatformFilters from './components/PlatformFilters.jsx';
import HackathonFeed from './components/HackathonFeed.jsx';
import StatusBar from './components/StatusBar.jsx';
import { useHackathons, PLATFORMS } from './hooks/useHackathons.js';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(() => new Set(PLATFORMS));
  const [statusFilter, setStatusFilter] = useState('active'); // active | upcoming | ended | all
  const [modeFilter, setModeFilter] = useState('all'); // all | online | onsite | hybrid
  const [live, setLive] = useState(true);
  const [sortBy, setSortBy] = useState('start'); // start | added

  const { items, loading, lastUpdated, refresh, errors } = useHackathons({
    live,
    interval: 30000,
  });

  const filtered = useMemo(() => {
    const now = new Date();
    return items
      .filter((it) => selectedPlatforms.has(it.platform))
      .filter((it) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          it.title.toLowerCase().includes(q) ||
          (it.tags || []).join(' ').toLowerCase().includes(q) ||
          (it.location || '').toLowerCase().includes(q)
        );
      })
      .filter((it) => {
        if (statusFilter === 'all') return true;
        const start = new Date(it.startDate);
        const end = new Date(it.endDate || it.startDate);
        if (statusFilter === 'upcoming') return start > now;
        if (statusFilter === 'active') return start <= now && end >= now;
        if (statusFilter === 'ended') return end < now;
        return true;
      })
      .filter((it) => {
        if (modeFilter === 'all') return true;
        return (it.mode || 'online').toLowerCase() === modeFilter;
      })
      .sort((a, b) => {
        if (sortBy === 'start') return new Date(a.startDate) - new Date(b.startDate);
        if (sortBy === 'added') return new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0);
        return 0;
      });
  }, [items, selectedPlatforms, query, statusFilter, modeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-6xl mx-auto px-4">
        <Header
          live={live}
          setLive={setLive}
          query={query}
          setQuery={setQuery}
          onRefresh={refresh}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
          <aside className="md:col-span-3 space-y-4">
            <PlatformFilters
              selected={selectedPlatforms}
              setSelected={setSelectedPlatforms}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              modeFilter={modeFilter}
              setModeFilter={setModeFilter}
            />
          </aside>

          <main className="md:col-span-9">
            <StatusBar
              loading={loading}
              total={items.length}
              shown={filtered.length}
              lastUpdated={lastUpdated}
              errors={errors}
              onRefresh={refresh}
            />
            <HackathonFeed items={filtered} loading={loading} />
          </main>
        </div>
      </div>
    </div>
  );
}
