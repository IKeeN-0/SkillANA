export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="swagger-reset">
      {children}
    </div>
  );
}