import Image from 'next/image';
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { IoIosArrowDropdown } from 'react-icons/io';
import { MdOutlineRemoveDone } from 'react-icons/md';
import { TbPlayerRecordFilled } from 'react-icons/tb';

export default function CustomAccordian({ body, logo, active }: { body: ReactNode, logo: string, active?: boolean | null }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [body]);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const containerStyle = {
        height: isOpen ? `${contentHeight}px` : '0px',
        transition: 'height 0.3s ease-in-out',
        overflow: 'hidden',
    };

    return (
        <div className=" w-full my-6">
            <div className="cursor-pointer p-6 flex justify-between items-center select-none" onClick={toggleAccordion}>
                <div className='flex flex-wrap gap-x-8 items-center'>
                    <span className='flex items-center'>
                        <Image src={logo}
                            width={556}
                            style={{
                                width: 80
                            }}
                            height={212}
                            alt={'ecocash'} />
                    </span>
                    <span style={{
                        transition: 'all 0.3s ease-in-out',
                        color: isOpen ? 'var(--primary)' : undefined
                    }}>
                    </span>
                </div>
                <span className='flex gap-x-4'><IoIosArrowDropdown size={25} style={
                    {
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'all 0.3s ease-in-out',
                        color: isOpen ? 'var(--primary)' : undefined
                    }
                } />
                    <span>
                        {active ? <TbPlayerRecordFilled size={25} className=' text-green-400 animate-pulse' />
                            :
                            <MdOutlineRemoveDone size={25} className='' style={{
                                transition: 'all 0.3s ease-in-out',
                                color: isOpen ? 'var(--primary)' : undefined
                            }} />}
                    </span>
                </span>
            </div>
            <div style={containerStyle} className="accordion-content ">
                <div ref={contentRef} className='border-l-2 border-primary p-6 m-6'>{body}</div>
            </div>
        </div>
    );
}