import dynamic from 'next/dynamic';
import FooterView from '@/components/home/footer';
import { userLoggedIn } from '@/functions/device';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-loader-spinner';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
const LoginForm = dynamic(() => import('@/components/pages/forms/login-form'), { ssr: false });
export default function LoginPage() {
    const [loading, setLoading] = useState(true)
    const verifyUser = async () => {
        if (userLoggedIn()) {
            Router.back()
        } else {
            setLoading(false)
        }
    }
    useEffect(() => {
        verifyUser()
    }, [])
    return (
        <>
            <ToastContainer />
            <div id="wrapper">
                {loading ?
                    <div className='w-full h-screen flex justify-center items-center'>
                        <ProgressBar />
                    </div>
                    : <>
                        <HeaderView page='login' />
                        <BannerPage title={'Login Page'} path={[
                            {
                                root: "/",
                                title: "home"
                            },
                            {
                                root: "",
                                title: "login"
                            }
                        ]} />
                        <div className='mb-32'>
                            <LoginForm />
                        </div>
                        <FooterView />
                    </>}
            </div>
        </>
    )
}