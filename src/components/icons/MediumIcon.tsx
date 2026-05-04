import Image from "next/image";

interface MediumIconProps {
  size?: number;
  className?: string;
}

export function MediumIcon({ size = 24, className = "" }: MediumIconProps) {
  return (
    <Image
      src="/icons/medium.jpeg"
      alt="Medium"
      width={size}
      height={size}
      className={`shrink-0 rounded-sm object-contain ${className}`}
      aria-hidden="true"
    />
  );
}
