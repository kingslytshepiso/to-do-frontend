export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="form-container sm:min-w-min md:max-w-1/4 min-h-5">
        {children}
      </main>
    </div>
  );
}
