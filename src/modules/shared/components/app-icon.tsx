import Image from "next/image";

export default function AppIcon({
  containerStyle = "",
  size = 100,
}: {
  containerStyle?: string;
  size?: number;
}) {
  return (
    <div className={`w-full flex flex-row justify-center ${containerStyle}`}>
      <Image alt="logo" src="/logo.svg" width={size} height={size} />
    </div>
  );
}
