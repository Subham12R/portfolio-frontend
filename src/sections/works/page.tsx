import Image from 'next/image'
import ryzeLogo from '../../../public/images/profile/ryze.jpeg'
import React from 'react'
import { ExperienceCard } from '@/components/layout/experience'

const Work = () => {
  return (
    <div className='w-full flex justify-center items-center'>
        <div className='max-w-4xl w-full flex flex-col bg-black h-full'>
            {/* SECTION HEADER */}
            <div className='flex  justify-start items-start  pt-16 pb-5 border-b border-white/40 space-y-2 mb-8 '>
                <span className='text-start text-white/80 text-xl font-mono leading-tight '>
                    01
                </span>
                <h1 className='text-4xl font-semibold text-white text-start '>Experience.</h1>
            </div>

            <div className='flex flex-col  justify-center items-start  pb-16 space-y-8 '>
                {/* WORK ITEM */}
                <ExperienceCard />
            </div>
        </div>

    </div>
  )
}

export default Work