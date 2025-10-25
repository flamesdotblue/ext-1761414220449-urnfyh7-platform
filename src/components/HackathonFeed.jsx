import { ExternalLink, Calendar, Clock, MapPin, Globe } from 'lucide-react';

function PlatformBadge({ platform }) {
  const colors = {
    devpost: 'from-sky-600 to-blue-600',
    mlh: 'from-yellow-500 to-orange-500',
    unstop: 'from-fuchsia-600 to-purple-600',
    hackerearth: 'from-indigo-600 to-blue-700',
    hackathoncom: 'from-emerald-600 to-teal-600',
    kaggle: 'from-cyan-600 to-sky-600',
    codechef: 'from-rose-600 to-pink-600',
    github: 'from-neutral-600 to-neutral-700',
    prism: 'from-violet-600 to-indigo-600',
    angelhack: 'from-red-600 to-rose-600',
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-br ${colors[platform] || 'from-neutral-700 to-neutral-800'}`}>
      {platform}
    </span>
  );
}

function Card({ item }) {
  const start = new Date(item.startDate);
  const end = new Date(item.endDate || item.startDate);
  const dateRange = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  const isOnline = (item.mode || 'online').toLowerCase() === 'online';

  return (
    <a href={item.url} target="_blank" rel="noreferrer" className="block group">
      <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <PlatformBadge platform={item.platform} />
              {item.prize ? (
                <span className="text-xs text-amber-300/90 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">Prize: {item.prize}</span>
              ) : null}
            </div>
            <h3 className="font-semibold text-lg group-hover:text-white/90 truncate">{item.title}</h3>
            {item.description ? (
              <p className="text-sm text-neutral-400 line-clamp-2 mt-1">{item.description}</p>
            ) : null}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-300 mt-3">
              <span className="inline-flex items-center gap-1"><Calendar size={14} /> {dateRange}</span>
              <span className="inline-flex items-center gap-1"><Clock size={14} /> {item.deadline ? new Date(item.deadline).toLocaleString() : 'Rolling'}</span>
              <span className="inline-flex items-center gap-1"><MapPin size={14} /> {item.location || (isOnline ? 'Online' : 'TBA')}</span>
              <span className="inline-flex items-center gap-1"><Globe size={14} /> {(item.mode || 'Online').toUpperCase()}</span>
            </div>
            {item.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.slice(0, 6).map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-300">{t}</span>
                ))}
              </div>
            ) : null}
          </div>
          <ExternalLink className="text-neutral-500 group-hover:text-neutral-300 shrink-0" size={18} />
        </div>
      </div>
    </a>
  );
}

export default function HackathonFeed({ items, loading }) {
  if (loading && items.length === 0) {
    return (
      <div className="grid gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-neutral-900 border border-neutral-800 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div className="p-10 text-center bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400">No hackathons match your filters.</div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((it) => (
        <Card key={it.id} item={it} />
      ))}
    </div>
  );
}
