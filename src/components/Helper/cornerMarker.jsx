export default function CornerMark({ className = "" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className} aria-hidden="true">
      <path d="M1 6V1H6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 1H21V6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M21 16V21H16" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 21H1V16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
