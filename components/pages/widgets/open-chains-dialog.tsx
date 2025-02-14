import React, { ReactNode } from 'react'

export default function OpenChainsDialog({ className, content, shown, title,
    onCloseDialog,
    onAcceptDialog
}:
    {
        className: string, content: ReactNode, shown: boolean,
        onCloseDialog?: () => void | null,
        onAcceptDialog?: () => void | null,
        title?: string | null
    }) {
    return (
        <> {!shown ? (<></>) : (
            <div className='z-50 bg-[#00000099] w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'
                style={{
                    position: "fixed",
                    zIndex: 999
                }}>
                <div className={`w-full flex-col gap-y-5 m-3 md:w-3/4 h-fit p-7 rounded-2xl lg:w-1/2 bg-white ${className}`}>
                    <h1 className=' font-extrabold'>{title}</h1>
                    {content}
                    <div className='flex w-full justify-end gap-x-3'>
                        <button className=' bg-primary px-12 py-3 rounded-xl'
                            onClick={onCloseDialog}>close</button>
                        <button className=' bg-primary px-12 py-3 rounded-xl'
                            onClick={onAcceptDialog}>accept</button>
                    </div>
                </div>
            </div>)}</>

    )
}
