export default function FormControl({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex m-t w-min flex-col justify-center">{children}</div>
  );
}
