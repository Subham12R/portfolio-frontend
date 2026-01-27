"use client"

import Image from "next/image"

const figmaIcon = "/icons/figma.png"
const vscodeIcon = "/icons/vscode.jpeg"
const jestIcon = "/icons/jest.jpeg"

export function OtherToolsCard() {
  return (
    <div className="flex h-full w-full flex-col justify-center rounded-xl ">


      <div className="flex flex-wrap items-center gap-4">
        <Image src={figmaIcon} alt="Figma" width={40} height={40} className="rounded-lg" />
        <Image src={vscodeIcon} alt="VS Code" width={40} height={40} className="rounded-lg"  />
        <Image src={jestIcon} alt="Jest" width={40} height={40} className="rounded-lg"  />
     
      </div>
    </div>
  )
}
