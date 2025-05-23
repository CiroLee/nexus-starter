export default function Show({ when, fallback, children }: { when: unknown; fallback?: React.ReactNode; children?: React.ReactNode }) {
  return when ? <>{children}</> : fallback;
}
