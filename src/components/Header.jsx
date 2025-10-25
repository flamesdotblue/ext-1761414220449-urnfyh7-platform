import { Rocket, RefreshCw, Search, SortAsc, SortDesc } from 'lucide-react';

export default function Header({ live, setLive, query, setQuery, onRefresh, sortBy, setSortBy }) {
  return (
    <header className="pt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600">
            <Rocket size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Live Hackathon Radar</h1>
            <p className="text-neutral-400 text-sm">Aggregated in near real-time from Devpost, MLH, Unstop, and more</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLive((v) => !v)}
            className={`px-3 py-2 rounded-lg text-sm border transition ${
              live ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-neutral-900 border-neutral-800 text-neutral-300'
            }`}
            aria-pressed={live}
          >
            {live ? 'Live: On' : 'Live: Off'}
          </button>
          <button
            onClick={onRefresh}
            className="px-3 py-2 rounded-lg text-sm bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 flex items-center gap-2"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, tag, or location"
            className="w-full pl-10 pr-3 py-3 rounded-lg bg-neutral-900 border border-neutral-800 focus:border-neutral-600 outline-none text-sm"
          />
        </div>
        <button
          onClick={() => setSortBy((s) => (s === 'start' ? 'added' : 'start'))}
          className="px-3 py-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-sm flex items-center gap-2"
        >
          {sortBy === 'start' ? <SortAsc size={16} /> : <SortDesc size={16} />} Sort: {sortBy === 'start' ? 'Start date' : 'Recently added'}
        </button>
      </div>
    </header>
  );
}
