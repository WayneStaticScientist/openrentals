import dynamic from 'next/dynamic';
import FooterView from '@/components/home/footer';
import { ToastContainer } from 'react-toastify';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
const RegisterForm = dynamic(() => import('@/components/pages/forms/register-form'), { ssr: false });
export default function RegisterPage() {
    return (
        <>
            <ToastContainer />
            <div id="wrapper">
                <HeaderView page='register' />
                <BannerPage title={'Register Page'} path={[
                    {
                        root: "/",
                        title: "home"
                    },
                    {
                        root: "",
                        title: "register"
                    }
                ]} />
                <div className='mb-32'>
                    <RegisterForm />
                </div>
                <FooterView />
            </div>
        </>
    )
}
