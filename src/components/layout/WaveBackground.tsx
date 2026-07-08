"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export function WaveBackground() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className="absolute bottom-0 inset-x-0 flex justify-center pointer-events-none overflow-hidden opacity-50 dark:opacity-20 backdrop-blur-md mx-auto -z-10">
      <div
        className="relative w-full max-w-2xl h-full"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
      >
        <Image
          src="/images/footer.png"
          width={672}
          height={500}
          alt=""
          className="object-cover object-bottom"
        />
      </div>
    </div>
  );
}
