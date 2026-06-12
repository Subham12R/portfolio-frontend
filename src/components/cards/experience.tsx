import { BookIcon } from "lucide-react";

export default function Experience() {
    return (
        <div className="h-full w-full flex flex-col">
            <div data-about-item className=" w-full px-2 backdrop-blur-3xl rounded-md inline-flex items-center gap-2 mb-4">
                <BookIcon size={20} className=" mb-1" />
                <h1 className="tracking-tighter text-lg font-bold">Education</h1>
            </div>
            <div className="flex flex-1 flex-col gap-2">
            <div data-about-item className="rounded-xl bg-bg-elevated flex-1 flex justify-start flex-col items-start px-2 py-2" >
                <div className="flex justify-between items-center w-full">
                       <h3 className="tracking-tighter">Adamas University</h3>
                       
                        <p className="text-sm text-text-muted">2024 - 2028</p>

                </div>
             
                <div className="pl-2 border-l  flex flex-col gap-1 w-full">
                    <span>B.Tech in Computer Science Engineering</span>
                    <span className="tracking-tighter text-sm ">
                        SGPA: 9.15
                    </span>
                </div>
            </div>

            <div data-about-item className="rounded-xl bg-bg-elevated flex-1 flex justify-start flex-col items-start px-2 py-2" >
                <div className="flex justify-between items-center w-full">
                       <h3 className="tracking-tighter">Holy Angels' School - ISC</h3>
                        <p className="text-sm text-text-muted">2020 - 2024</p>

                </div>
             
                <div className="pl-2 border-l flex flex-col gap-1 w-full">
                    <span>Higher Secondary Education [Science]</span>
                    <span className="tracking-tighter text-sm ">
                        Percentage: 82.4%
                    </span>
                </div>
            </div>

            <div data-about-item className="rounded-xl bg-bg-elevated flex-1 flex justify-start flex-col items-start px-2 py-2" >
                <div className="flex justify-between items-center w-full">
                       <h3 className="tracking-tighter">Holy Angels' School - ICSE</h3>
                        <p className="text-sm text-text-muted">2008 - 2020</p>

                </div>
             
                <div className="pl-2 border-l flex flex-col gap-1 w-full">
                    <span>Secondary Education</span>
                    <span className="tracking-tighter text-sm ">
                        Percentage: 91.6%
                    </span>
                </div>
                
            </div>
            </div>
            
        </div>
    )
}
