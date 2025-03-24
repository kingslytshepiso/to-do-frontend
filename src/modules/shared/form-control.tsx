export default function FormControl({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex m-t min-w-max flex-col justify-center">{children}</div>
  );
}
