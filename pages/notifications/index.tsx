import Router from 'next/router';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import FooterView from '@/components/home/footer';
import { ProgressBar } from 'react-loader-spinner';
import { IoIosNotifications } from 'react-icons/io';
import { getLastDay } from '@/functions/time-format';
import NoResults from '@/components/pages/widgets/no-results';
import { UserRegistration, useUserState } from '@/connections/user';
import ProfileReview from '@/components/pages/widgets/profile-review';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
export default function NotificationsPage() {
    const user = useUserState();
    const [loggedIn, setLoggedIn] = useState(false)
    const [fetching, setFetching] = useState(true)
    const fetchData = async () => {
        setFetching(true)
        const user = new UserRegistration()
        const resp = await user.fetchUser()
        setFetching(false)
        if (typeof resp === 'string') {
            return Router.push('/login')
        }
        setLoggedIn(true)
    }
    useEffect(() => {
        fetchData()
    }, [])
    if (!loggedIn) return <></>
    return (
        <div id="wrapper">
            <ToastContainer />
            <HeaderView page='user' sub={'notifications'} />
            <BannerPage title={'Notifications'} path={[
                {
                    root: "/",
                    title: "home"
                },
                {
                    root: "",
                    title: "notifications"
                }
            ]} />
            <div className="container">
                <div className="row">
                    <ProfileReview page={'notifications'} />
                    <div className="col-md-9">
                        <div className="manage-table responsive-table">
                            {fetching ?
                                <div>
                                    <div className='w-full h-full justify-center items-center flex flex-col'>
                                        <ProgressBar />
                                        <h2>loading your uploads</h2>
                                    </div>
                                </div> :
                                <div>
                                    <div>
                                        Notifications
                                    </div>
                                    {
                                        <>
                                            {
                                                user.notifications.length > 0 ? <>
                                                    {user.notifications.map((e, i) => {
                                                        return <div key={i}
                                                            className='cursor-pointer flex shadow-lg p-6 justify-between  items-center gap-x-3'
                                                            onClick={() => {
                                                                Router.push("/catalogs?q=" + e._id)
                                                            }}>
                                                            <div className='flex gap-x-3'>
                                                                <span className='p-3 rounded-full bg-green-500 text-white'><IoIosNotifications /></span>
                                                                {e.message}
                                                            </div>
                                                            {getLastDay(e.date)} ago
                                                        </div>
                                                    })}
                                                </>
                                                    :
                                                    <>
                                                        <div className='w-full p-3 h-full items-center flex flex-col'>
                                                            <NoResults message='you have no notifications yet' />
                                                        </div>
                                                    </>
                                            }
                                        </>
                                    }
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
            <FooterView />
        </div >
    )
}
