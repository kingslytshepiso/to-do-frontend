export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <h1>Authentication layout</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
