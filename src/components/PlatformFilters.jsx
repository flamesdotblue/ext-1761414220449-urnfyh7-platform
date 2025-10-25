import { Filter } from 'lucide-react';
import { PLATFORMS } from '../hooks/useHackathons';

export default function PlatformFilters({ selected, setSelected, statusFilter, setStatusFilter, modeFilter, setModeFilter }) {
  const toggle = (p) => {
    const next = new Set(selected);
    if (next.has(p)) next.delete(p);
    else next.add(p);
    setSelected(next);
    try { localStorage.setItem('platforms', JSON.stringify([...next])); } catch {}
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Filter size={16} className="text-neutral-400" />
        <h2 className="font-medium">Filters</h2>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Platforms</p>
        <div className="grid grid-cols-2 gap-2">
          {PLATFORMS.map((p) => (
            <label key={p} className={`flex items-center gap-2 px-2 py-2 rounded-lg border cursor-pointer select-none text-sm ${selected.has(p) ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-950 border-neutral-900'}`}>
              <input
                type="checkbox"
                checked={selected.has(p)}
                onChange={() => toggle(p)}
                className="accent-fuchsia-500"
              />
              <span className="capitalize">{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Status</p>
        <div className="grid grid-cols-2 gap-2">
          {['active', 'upcoming', 'ended', 'all'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-sm border ${statusFilter === s ? 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-300' : 'bg-neutral-950 border-neutral-900 text-neutral-300'}`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Mode</p>
        <div className="grid grid-cols-3 gap-2">
          {['all', 'online', 'onsite', 'hybrid'].map((m) => (
            <button
              key={m}
              onClick={() => setModeFilter(m)}
              className={`px-3 py-2 rounded-lg text-sm border ${modeFilter === m ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-neutral-950 border-neutral-900 text-neutral-300'}`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
