export default function TrackProfile({ track }) {
  if (!track) {
    return (
      <aside className="rounded-3xl border border-dashed border-sage/30 bg-white/70 p-6">
        <h2 className="font-display text-xl">Active sleeve 🏷️</h2>
        <p className="mt-2 text-sm text-ink/70">Click a row to open the full track card.</p>
      </aside>
    );
  }

  const isCreator = track.role === "Creator";

  return (
    <aside className="rounded-3xl border border-sage/15 bg-white p-6 shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-display text-xl">Active sleeve 🏷️</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isCreator ? "bg-coral/15 text-coral" : "bg-sage/15 text-sage"
          }`}
        >
          {isCreator ? "🎙️ Creator" : "🎧 Listener"}
        </span>
      </div>
      <p className="mt-4 font-display text-2xl">{track.title}</p>
      <p className="text-sm text-ink/70">{track.artist}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-ink/50">Genre</dt>
          <dd>{track.genre}</dd>
        </div>
        <div>
          <dt className="text-ink/50">BPM</dt>
          <dd>{track.bpm}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-ink/50">Record label</dt>
          <dd>{track.label}</dd>
        </div>
      </dl>
    </aside>
  );
}
