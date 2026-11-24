export function Pending({ children = "Awaiting content" }: { children?: React.ReactNode }) {
  return (
    <span className="pill-tag">
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}
