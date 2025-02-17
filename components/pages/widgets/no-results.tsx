import Image from 'next/image'
import React from 'react'

export default function NoResults({ message }: { message: string }) {
    return (
        <div className='flex flex-col items-center'>
            <Image alt={'logo'} className='w-72' src='/images/no.gif' width={1280} height={720} />
            <span>{message}</span>
        </div>
    )
}
