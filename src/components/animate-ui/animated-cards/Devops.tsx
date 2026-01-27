"use client"

import Image from "next/image"

const dockerIcon = "/icons/docker.jpeg"
const githubIcon = "/icons/github.png"
const vercelIcon = "/icons/vercel.png"
const netlifyIcon = "/icons/netlify.png"

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
