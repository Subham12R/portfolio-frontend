'use client'
import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import profileImg from '../../../public/images/profile/pfp.jpg' // Ensure path is correct

export const About = () => {
  return (
    <section className='w-full flex justify-center items-center py-24 bg-black text-white'>
        <div className='max-w-4xl w-full px-4 lg:px-0'>
            
            {/* HEADER - Styled to match your reference image */}
            <div className='flex  justify-start items-start  pt-16 pb-5 border-b border-white/40 space-y-2 mb-8 '>
                <span className='text-start text-white/80 text-xl font-mono leading-tight '>
                    04
                </span>
                <h1 className='text-4xl font-semibold text-white text-start '>About Me.</h1>
            </div>
            {/* SPLIT LAYOUT */}
            <div className='grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12'>
                
                {/* LEFT: Image Column (Takes up 2/5ths of the space) */}
                <div className='md:col-span-2 relative group'>
                    <div className='relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-xl border border-white/10 bg-zinc-900'>
                        <Image 
                            src={profileImg} 
                            alt="Subham Karmakar" 
                            fill
                            className="object-cover transition-all duration-700 ease-out"
                            priority
                        />
                        {/* Subtle inner shadow overlay */}
                        <div className='absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl z-10' />
                    </div>
                </div>

                {/* RIGHT: Text & Links Column (Takes up 3/5ths of the space) */}
                <div className='md:col-span-3 flex flex-col justify-start items-start space-y-6'>
                    
                    <div className='text-zinc-200 text-xl leading-relaxed space-y-4 '>
                        <p>
                        I’m Subham Karmakar, a B.Tech student and developer from Kolkata. <br/> <br />
                        I build full-stack applications with modern web technologies, while constantly exploring areas like databases, system design, and developer tooling.
                        <br />
                        <br />
                        I enjoy turning ideas into practical solutions—whether it’s experimenting with visual tools, solving algorithmic problems, or contributing to larger technical projects.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className='pt-6 mt-2'>
                        <div className='flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm tracking-wider uppercase'>
                            <a 
                                href="https://github.com/Subham12R" 
                                target="_blank" 
                                className='group flex items-center space-x-1 text-zinc-500 hover:text-white transition-colors duration-200'
                            >
                                <span>Github</span>
                                <ArrowUpRight size={14} className='group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200'/>
                            </a>
                            
                            <a 
                                href="https://www.linkedin.com/in/subham12r/" 
                                target="_blank" 
                                className='group flex items-center space-x-1 text-zinc-500 hover:text-blue-400 transition-colors duration-200'
                            >
                                <span>LinkedIn</span>
                                <ArrowUpRight size={14} className='group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200'/>
                            </a>
                            
                            <a 
                                href="mailto:rikk4335@gmail.com" 
                                className='group flex items-center space-x-1 text-zinc-500 hover:text-red-400 transition-colors duration-200'
                            >
                                <span>Email</span>
                                <ArrowUpRight size={14} className='group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200'/>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>
  )
}