import { RefreshCw } from 'lucide-react';

export default function StatusBar({ loading, total, shown, lastUpdated, errors, onRefresh }) {
  const errorCount = Object.values(errors || {}).filter(Boolean).length;
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3">
      <div className="flex items-center gap-4 text-sm">
        <span className="text-neutral-300">Sources: <strong className="text-white">{total}</strong> total, <strong className="text-white">{shown}</strong> shown</span>
        <span className="text-neutral-500">{lastUpdated ? `Last updated ${new Date(lastUpdated).toLocaleTimeString()}` : 'Waiting for first update...'}</span>
        {errorCount > 0 && (
          <span className="text-xs px-2 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-300">{errorCount} source{errorCount > 1 ? 's' : ''} failed</span>
        )}
      </div>
      <button
        onClick={onRefresh}
        className="px-3 py-2 rounded-lg text-sm bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-200 flex items-center gap-2 disabled:opacity-60"
        disabled={loading}
      >
        <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        {loading ? 'Refreshing...' : 'Refresh now'}
      </button>
    </div>
  );
}
