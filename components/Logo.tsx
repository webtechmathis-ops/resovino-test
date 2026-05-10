import Image from "next/image";

export function Logo({ width = 140, height = 40 }: { width?: number; height?: number }) {
  return (
    <Image
      src="/resovino-logo.png"
      width={width}
      height={height}
      alt="ResoVino"
      priority
    />
  );
}
