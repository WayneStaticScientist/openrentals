import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import FooterView from '@/components/home/footer';
import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-loader-spinner';
import { showError, } from '@/functions/toast';
import { GetAdminPaymentListings, } from '@/connections/get-property';
import { useSearchParams } from 'next/navigation';
import { PaymentHold } from '@/connections/interfaces';
import OpenImageLoader from '@/components/pages/widgets/classic-image-loader,';
import NoResults from '@/components/pages/widgets/no-results';
import { BsWatch } from 'react-icons/bs';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });

export default function PaymentSetup() {
    const [loading, setLoading] = useState(true)
    const [payments, setPaments] = useState<PaymentHold[]>([])
    const searchParams = useSearchParams();
    const getResources = async (page: number, id: string, uploader: string) => {
        setLoading(true)
        const response = await GetAdminPaymentListings(page, id, uploader)
        setLoading(false)
        if (typeof response === 'string') return showError(response)
        setPaments(response)
    }

    useEffect(() => {
        getResources(1, searchParams.get("q") ?? '', searchParams.get("email") ?? '')
    }, [])
    if (loading) return <div className='w-screen h-screen flex justify-center items-center'><ProgressBar /></div>
    return (
        <div id="wrapper" className='' style={{

        }}>
            <ToastContainer />
            <HeaderView page='' sub={''} />
            <div className='w-full flex flex-col items-center mt-24 mb-24'>
                <div className='flex items-center flex-col w-full  shadow-md bg-white' style={{
                    maxWidth: 800
                }}>
                    <div> <img src="../images/logo.png" alt="" /></div>
                    <div className="w-full mb-12">

                        {payments.length > 0 ? <>{payments.map((e, i) => {
                            return <div key={i} className='flex justify-between shadow-lg m-3' >
                                <div className="flex ">
                                    <OpenImageLoader path={e.image} errorPath={'/images/house.png'}
                                        className='w-48' />
                                    <div className="p-5">
                                        <h4><a href="#">{e.title}</a></h4>
                                        <span>{e.status === 0 ?
                                            <span className='text-orange-400 flex gap-x-3 items-center'><BsWatch />Waiting Approval</span> :
                                            <span className='text-green-500'>Approved</span>}</span>
                                        <span className=" ">Requested by <span className='text-green-600'>{e.fullName}</span></span>
                                    </div>
                                </div>
                                <div className="action flex items-center p-2">
                                    <a href="#"
                                        className="delete tooltip left" title="Delete">
                                        <i className="icon-feather-trash-2">
                                        </i>
                                    </a>
                                </div>
                            </div>
                        })}</> : <>
                            <div className='w-full p-3 h-full items-center flex flex-col'>
                                <NoResults message='No requested payments found' />
                            </div>
                        </>}

                    </div>

                </div>
            </div >
            <FooterView />
        </div >)
}
