import Header from "@/modules/shared/components/header";

export default function Authorisedlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
