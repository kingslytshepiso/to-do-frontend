import Image from "next/image";

export default function AppIcon({
  containerStyle = "",
}: {
  containerStyle?: string;
}) {
  return (
    <div className={`w-full flex flex-row justify-center ${containerStyle}`}>
      <Image alt="logo" src="/logo.svg" width={200} height={200} />
    </div>
  );
}
