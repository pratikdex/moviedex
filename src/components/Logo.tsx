function Logo() {
  return (
    <div className="mb-12 flex items-center gap-3">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#f2f1f5" />
        <circle cx="16" cy="16" r="9" fill="none" stroke="#0d0c11" strokeWidth="2.5" />
        <path d="M14 12l7 4-7 4z" fill="#0d0c11" />
      </svg>
      <span className="font-display text-xl font-extrabold tracking-tight">moviedex</span>
    </div>
  );
}

export default Logo;
