import { TrophyIcon } from "lucide-react";

export default function Achievements() {
    return (
        <div className="h-full w-full flex flex-col">
            <div data-about-item className="w-full px-2 backdrop-blur-3xl rounded-md inline-flex items-center gap-2 mb-4">
                <TrophyIcon size={20} className="mb-1" />
                <h1 className="tracking-tighter text-lg font-bold">Achievements</h1>
            </div>

            <div className="flex flex-1 flex-col gap-2">
                <div data-about-item className="rounded-full bg-bg-elevated flex justify-start flex-col items-start px-2 py-2">
                    <div className="flex justify-between items-center w-full">
                        <h3 className="tracking-tighter">SIH Internals Hackathon Finalist</h3>
                        <p className="text-sm text-text-muted">Top 10 out of 150 Teams - 2025</p>
                    </div>

                    <div className="pl-2 border-l flex flex-col gap-1 w-full">
                        <span className="tracking-tighter text-sm">
                            Built and presented a full-stack project on the topic of "Smart Tourism with the help of AI and geofencing promoting tourist safety".
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}
