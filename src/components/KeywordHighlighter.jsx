function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function KeywordHighlighter({ text = "", missingSkills = [] }) {
  if (!text) {
    return (
      <div className="glass-panel p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slateBlue/85">
          Missing Keywords Highlighted
        </h3>
        <p className="mt-3 text-sm text-slateBlue/70">No job description text to highlight.</p>
      </div>
    );
  }

  const sortedSkills = [...missingSkills].sort((a, b) => b.length - a.length);
  if (!sortedSkills.length) {
    return (
      <div className="glass-panel p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slateBlue/85">
          Missing Keywords Highlighted
        </h3>
        <p className="mt-3 whitespace-pre-wrap text-sm text-ink">{text}</p>
      </div>
    );
  }

  const pattern = new RegExp(`(${sortedSkills.map((skill) => escapeRegex(skill)).join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <div className="glass-panel p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slateBlue/85">
        Missing Keywords Highlighted
      </h3>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink">
        {parts.map((part, index) => {
          const isMissing = missingSkills.some((skill) => skill.toLowerCase() === part.toLowerCase());

          if (isMissing) {
            return (
              <mark key={`${part}-${index}`} className="rounded bg-coral/35 px-1 py-0.5 font-semibold text-ink">
                {part}
              </mark>
            );
          }

          return <span key={`${part}-${index}`}>{part}</span>;
        })}
      </p>
    </div>
  );
}
