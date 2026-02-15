import { CalendarIcon } from "lucide-react";

export default function Activities() {
    return (
        <div className="h-full w-full flex flex-col">
            <div data-about-item className="w-full px-2 backdrop-blur-3xl rounded-md inline-flex items-center gap-2 mb-4">
                <CalendarIcon size={20} className="mb-1" />
                <h1 className="tracking-tighter text-lg font-bold">Activities</h1>
            </div>

            <div className="flex flex-1 flex-col gap-2">
                <div data-about-item className="rounded-full bg-bg-elevated flex justify-start flex-col items-start px-2 py-2">
                    <div className="flex justify-between items-center w-full">
                        <h3 className="tracking-tighter">0Day - Full Stack Developer</h3>
                        <p className="text-sm text-text-muted">College Tech Community</p>
                    </div>

                    <div className="pl-2 border-l flex flex-col gap-1 w-full">
                        <span className="tracking-tighter text-sm">
                            Helping students with full-stack development projects and concepts and mentoring them in building scalable applications.
                        </span>
                    </div>
                </div>

       
         
            </div>
        </div>
    )
}
