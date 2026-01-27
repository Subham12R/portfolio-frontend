import Image from "next/image"
import profileIcon from "../../../public/images/profile/pfp.jpg"
import Link from "next/link"

const Navigation = () => {
  return (
    <div className="sticky top-0 flex justify-center z-50 items-center w-full ">
        <nav className="bg-black/90  backdrop-blur-3xl shadow-md w-full max-w-4xl flex justify-between items-center ">
            <div className="py-2 inline-flex items-end">
                <Link href="#home">
                <Image src={profileIcon} alt="Logo" width={40} height={40} className="m-2 rounded-xl outline-2 outline-blue-200/20 outline-offset-2 "/>
                </Link>
                {/* <span className="text-white font-medium text-2xl mb-2 tracking-tighter ">Subham12r</span> */}
            </div>
            <ul className="flex justify-center items-center p-2 space-x-4">
                <li><a href="#home" className="text-white hover:text-amber-300 relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-amber-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left
                tracking-tigher font-semibold leading-0">
                    Home</a>
                </li>
                <li><a href="#about" className="tracking-tigher font-semibold leading-0 text-white hover:text-amber-300 relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-amber-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left">Work</a></li>
                <li>
                  <a
                    href="#projects"
                    className="tracking-tigher font-semibold leading-0 text-white hover:text-amber-300 relative after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-amber-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
                  >
                    Projects
                  </a>
                </li>
            </ul>
        </nav>

    </div>
  )
}

export default Navigation