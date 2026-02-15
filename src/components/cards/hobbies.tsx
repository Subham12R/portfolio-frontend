import { ToyBrickIcon } from "lucide-react";

export default function Hobbies() {
    return (
        <div className="h-full w-full flex flex-col">
            <div data-about-item className=" w-full px-2 backdrop-blur-3xl rounded-md inline-flex items-center gap-2 mb-4">
                <ToyBrickIcon size={20} className=" mb-1" />
                <h1 className="tracking-tighter text-lg font-bold">Hobbies</h1>
            </div>
            <div className="flex flex-1 flex-col gap-2">
            <div data-about-item className="rounded-full bg-bg-elevated flex-1 flex justify-start flex-col items-start px-2 py-2">
                <div className="flex justify-between items-center w-full">
                    <h3 className="tracking-tighter">Gaming</h3>
                    <p className="text-sm text-text-muted">Competitive + Casual</p>

                </div>
             
                <div className="pl-2 border-l flex flex-col gap-1 w-full">
                    <span className="tracking-tighter text-sm">
                        Strategy, FPS, and story-rich titles for focus and fun.
                    </span>
                </div>
            </div>

            <div data-about-item className="rounded-full bg-bg-elevated flex-1 flex justify-start flex-col items-start px-2 py-2">
                <div className="flex justify-between items-center w-full">
                    <h3 className="tracking-tighter">Photography</h3>
                    <p className="text-sm text-text-muted">Street + Nature</p>

                </div>
             
                <div className="pl-2 border-l flex flex-col gap-1 w-full">
                    <span className="tracking-tighter text-sm">
                        Capturing moments, light, and composition from daily life.
                    </span>
                </div>
            </div>

            <div data-about-item className="rounded-full bg-bg-elevated flex-1 flex justify-start flex-col items-start px-2 py-2">
                <div className="flex justify-between items-center w-full">
                    <h3 className="tracking-tighter">Designing & Drawing</h3>
                    <p className="text-sm text-text-muted">UI + Sketching</p>

                </div>
             
                <div className="pl-2 border-l flex flex-col gap-1 w-full">
                    <span className="tracking-tighter text-sm">
                        Exploring visual ideas through interface design and hand sketches.
                    </span>
                </div>
            </div>

            <div data-about-item className="rounded-full bg-bg-elevated flex-1 flex justify-start flex-col items-start px-2 py-2">
                <div className="flex justify-between items-center w-full">
                    <h3 className="tracking-tighter">Gym</h3>
                    <p className="text-sm text-text-muted">Strength + Discipline</p>
                </div>

                <div className="pl-2 border-l flex flex-col gap-1 w-full">
                    <span className="tracking-tighter text-sm">
                        Consistent training for fitness, routine, and mental clarity.
                    </span>
                </div>
            </div>
            </div>

        </div>
    )
}
