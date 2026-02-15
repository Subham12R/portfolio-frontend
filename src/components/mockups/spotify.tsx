import Image from "next/image";

export default function SpotifyMockup() {
    return (
        <div className="w-full h-24 bg-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] rounded-lg flex items-start justify-start border-2 border-zinc-400 text-white p-4">
            <div className="w-full h-full flex items-start justify-start rounded-lg overflow-hidden ">
                <Image src="/images/spotify_placeholder.jpg" alt="Spotify Mockup" width={64} height={64} className="object-cover rounded-lg" />
            </div> 
        </div>
    )
}