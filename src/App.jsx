import { useState } from "react";
import TrackTable from "./TrackTable.jsx";

const GENRES = ["Pop", "Rock", "Indie", "Jazz"];
const emptyForm = {
  title: "",
  genre: "",
  artist: "",
  bpm: "",
  label: "",
  role: "",
};

function validate(form) {
  const errors = {};
  if (!form.title.trim()) {
    errors.title = "Track title is required.";
  } else if (form.title.trim().length < 3) {
    errors.title = "Track title must be at least 3 characters.";
  }

  if (!form.genre) {
    errors.genre = "Choose a genre.";
  }

  if (!form.artist.trim()) {
    errors.artist = "Artist name is required.";
  }

  const bpm = Number(form.bpm);
  if (form.bpm === "") {
    errors.bpm = "BPM is required.";
  } else if (!Number.isFinite(bpm) || bpm < 1 || bpm > 100) {
    errors.bpm = "BPM must be a number from 1 to 100.";
  }

  if (!form.label.trim()) {
    errors.label = "Record label is required.";
  }

  if (!form.role) {
    errors.role = "Select Creator or Listener.";
  }

  return errors;
}

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [tracks, setTracks] = useState([]);
  const [view, setView] = useState("form");
  const [selectedId, setSelectedId] = useState(null);

  function update(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    setErrors(validate(next));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const track = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      genre: form.genre,
      artist: form.artist.trim(),
      bpm: Number(form.bpm),
      label: form.label.trim(),
      role: form.role,
    };

    setTracks((current) => [...current, track]);
    setSelectedId(track.id);
    setForm(emptyForm);
    setErrors({});
    setView("table");
  }

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <header className="mb-8 rounded-3xl border border-sage/15 bg-white/80 p-6 shadow-sm backdrop-blur">
        <p className="text-3xl" aria-hidden>
          💿
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-sage">VinylNest</h1>
        <p className="mt-1 text-sm text-ink/70">
          Set A · Spotify Track Playlist Manager
        </p>
        {tracks.length > 0 ? (
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className={`rounded-xl px-3 py-1 text-sm ${
                view === "form" ? "bg-sage text-white" : "bg-mint text-sage"
              }`}
              onClick={() => setView("form")}
            >
              Add track
            </button>
            <button
              type="button"
              className={`rounded-xl px-3 py-1 text-sm ${
                view === "table" ? "bg-sage text-white" : "bg-mint text-sage"
              }`}
              onClick={() => setView("table")}
            >
              Registry
            </button>
          </div>
        ) : null}
      </header>

      {view === "form" ? (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto max-w-xl space-y-4 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-md"
        >
          <h2 className="font-display text-xl">Add a track 🎵</h2>

          <Field label="Track title" error={errors.title}>
            <input
              className={inputClass(errors.title)}
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Midnight Cassette"
            />
          </Field>

          <Field label="Genre" error={errors.genre}>
            <select
              className={inputClass(errors.genre)}
              value={form.genre}
              onChange={(e) => update("genre", e.target.value)}
            >
              <option value="">Select genre</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Artist name" error={errors.artist}>
            <input
              className={inputClass(errors.artist)}
              value={form.artist}
              onChange={(e) => update("artist", e.target.value)}
              placeholder="Nova Lane"
            />
          </Field>

          <Field label="BPM (1–100)" error={errors.bpm}>
            <input
              type="number"
              min="1"
              max="100"
              className={inputClass(errors.bpm)}
              value={form.bpm}
              onChange={(e) => update("bpm", e.target.value)}
              placeholder="92"
            />
          </Field>

          <Field label="Record label" error={errors.label}>
            <input
              className={inputClass(errors.label)}
              value={form.label}
              onChange={(e) => update("label", e.target.value)}
              placeholder="Cedar Press Records"
            />
          </Field>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold">User role</legend>
            <div className="flex gap-4">
              {["Creator", "Listener"].map((role) => (
                <label key={role} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={form.role === role}
                    onChange={(e) => update("role", e.target.value)}
                  />
                  {role === "Creator" ? "🎙️ Creator" : "🎧 Listener"}
                </label>
              ))}
            </div>
            {errors.role ? (
              <p className="mt-1 text-sm text-coral">{errors.role}</p>
            ) : null}
          </fieldset>

          <button
            type="submit"
            className="w-full rounded-2xl bg-sage py-3 font-semibold text-white hover:bg-sage/90"
          >
            Save track
          </button>
        </form>
      ) : (
        <TrackTable tracks={tracks} selectedId={selectedId} onSelect={setSelectedId} />
      )}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {error ? <span className="text-sm text-coral">{error}</span> : null}
    </label>
  );
}

function inputClass(error) {
  return `w-full rounded-xl border px-3 py-2 outline-none ${
    error ? "border-coral bg-coral/5" : "border-sage/20 bg-cream/60"
  }`;
}
