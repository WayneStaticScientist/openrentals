import { useUserState } from '@/connections/user'
import React from 'react'
import OpenImageLoader from './widgets/classic-image-loader,'
import Router from 'next/router'

export default function UserIconTag() {
    const { notificationSize, firstName, profile } = useUserState()
    return (
        <>
            <div className="flex items-center cursor-pointer">

                <div className=" relative flex items-center  gap-x-3" onClick={() => {
                    Router.push("/myprofile")
                }}>
                    <OpenImageLoader path={profile} className=' flex items-center rounded-full'
                        errorPath={'images/default/nouser.jpg'} style={{
                            width: 45,
                            height: 45
                        }} />
                    {
                        notificationSize > 0 &&
                        <span className='z-50 absolute bg-green-500 text-white flex-shrink-0 flex-grow-0 p-1 text-lg rounded-full ' style={{
                            left: 0,
                            top: 0
                        }}>{notificationSize}</span>
                    }
                    <div className="user-name-title">Hi, {firstName}!
                    </div>
                </div>

            </div>
        </>
    )
}
