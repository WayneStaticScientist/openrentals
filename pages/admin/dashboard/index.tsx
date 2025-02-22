import UserIconTag from '@/components/pages/user-icon-tag';
import { UserRegistration, useUserState } from '@/connections/user';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiFillDashboard } from 'react-icons/ai';
import { FaAddressCard } from 'react-icons/fa';
import { ProgressBar } from 'react-loader-spinner';

export default function DashBoard() {
    const user = useUserState();
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const login = async () => {
        const userReg = new UserRegistration()
        const resp = await userReg.fetchUser({ retry: true })
        setLoading(false)
        if (typeof resp == 'string') {
            Router.push("/login")
            return
        }
        useUserState.setState(resp)
    }
    useEffect(() => {
        login()
    }, [])
    return (
        <>
            {
                loading ?
                    <div className='w-screen h-screen flex items-center justify-center'>
                        <ProgressBar />
                    </div>
                    :
                    <div className='flex' style={{
                        width: "100%",
                        height: "100vh"
                    }}>

                        <div className='w-full h-ful bg-gray-900 flex flex-col overflow-y-auto p-8 gap-y-6'
                            style={{ maxWidth: "300px" }}>
                            <div className='w-full flex items-center p-12'>
                                <UserIconTag textStyle='text-white' />
                            </div>
                            <span className='text-gray-300' style=
                                {{
                                    fontSize: 12
                                }}>DashBoard
                            </span>
                            <div className={`flex items-center gap-x-3 p-6 ${page === 0 && 'bg-[#ff00002c]'}  cursor-pointer  text-white`}><AiFillDashboard />Dashboard</div>
                            < span className='text-gray-300' style=
                                {{
                                    fontSize: 12
                                }}>MenuWSS
                            </span>
                            <div className={`flex items-center ml-6 gap-x-3 p-6 ${page === 1 && 'bg-[#ff00002c]'} cursor-pointer text-white`}><FaAddressCard />Pending Ids</div>
                            <div className={`flex items-center ml-6 gap-x-3 p-6 ${page === 2 && 'bg-[#ff00002c]'}  cursor-pointer  text-white`}><AiFillDashboard />Pending Residents</div>
                        </div>
                    </div>
            }
        </>
    )
}
