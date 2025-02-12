import dynamic from 'next/dynamic';
import FooterView from '@/components/home/footer';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
const RegisterForm = dynamic(() => import('@/components/pages/forms/register-form'), { ssr: false });
export default function RegisterPage() {
    return (
        <>
            <div id="wrapper">
                <HeaderView page='eegister' />
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
