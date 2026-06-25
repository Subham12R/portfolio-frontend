"use client"

import Image from "next/image"

import dockerIcon from "@/assets/icons/docker.jpeg"
import githubIcon from "@/assets/icons/github.png"
import vercelIcon from "@/assets/icons/vercel.png"
import netlifyIcon from "@/assets/icons/netlify.png"

export function DevOpsCard() {
  return (
    <div className="flex h-full w-full flex-col justify-center  ">


      <div className="flex flex-wrap items-center gap-4">
        <Image src={dockerIcon} alt="Docker" width={40} height={40} className="rounded-lg"  />
        <Image src={githubIcon} alt="GitHub" width={40} height={40}  className="rounded-lg" />
        <Image src={vercelIcon} alt="Vercel" width={40} height={40}  className="rounded-lg" />
        <Image src={netlifyIcon} alt="Netlify" width={40} height={40} className="rounded-lg"  />
      </div>
    </div>
  )
}
