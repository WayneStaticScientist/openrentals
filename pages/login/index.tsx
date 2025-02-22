import dynamic from 'next/dynamic';
import FooterView from '@/components/home/footer';
import { userLoggedIn } from '@/functions/device';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
const LoginForm = dynamic(() => import('@/components/pages/forms/login-form'), { ssr: false });
export default function LoginPage() {
    if (userLoggedIn()) {
        Router.back()
    }
    return (
        <>
            <ToastContainer />
            <div id="wrapper">
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
            </div>
        </>
    )
}