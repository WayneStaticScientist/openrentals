import Router from 'next/router';
import dynamic from 'next/dynamic';
import { CgSpinner } from 'react-icons/cg';
import { ToastContainer } from 'react-toastify';
import { User } from '@/connections/interfaces';
import FooterView from '@/components/home/footer';
import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-loader-spinner';
import { UserRegistration, useUserState } from '@/connections/user';
import { showError, showSuccess } from '@/functions/toast';
import CustomAccordian from '@/components/pages/widgets/custom-accordian';
import { UpdateCashState, UpdateEcocashState, UpdateMukuruState } from '@/connections/get-property';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });

export default function PaymentSetup() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [ecocashState, setEcocashState] = useState("client")
    const [ecocashStateLoading, setEcocashStateLoading] = useState(false)
    const [ecocashName, setEcocashName] = useState("")
    const [ecocashPhone, setEcocashPhone] = useState("")
    const [ecocashDescription, setEcocashDescription] = useState("")
    //  CASH
    const [cashStateLoading, setCashStateLoading] = useState(false)
    const [cashDescription, setCashDescription] = useState("")
    // MUKURU
    const [mPhone, setMPhone] = useState("")
    const [mAddress, setMAdddress] = useState("")
    const [mFullName, setMFullName] = useState("")
    const [mIdNumber, setMIdNumber] = useState("")
    const [mDescription, setMDescription] = useState("")
    const [mukuruStateLoading, setMukuruStateLoading] = useState(false)

    //user
    const user = useUserState()
    const login = async () => {
        const userReg = new UserRegistration()
        const resp = await userReg.fetchUser({ retry: true })
        if (typeof resp == 'string') {
            Router.push("/login")
            return
        }
        const userResp = resp as User;
        setLoggedIn(true)
        setEcocashPhone(userResp.ecocashPayment ? userResp.ecocashPayment.phone : "")
        setEcocashName(userResp.ecocashPayment ? userResp.ecocashPayment.fullName : "")
        setCashDescription(userResp.cashPayment ? userResp.cashPayment.description : "")
        setEcocashState(userResp.ecocashPayment ? userResp.ecocashPayment.type : "client")
        setEcocashDescription(userResp.ecocashPayment ? userResp.ecocashPayment.description : "")

        setMPhone(userResp.mukuruPayment ? userResp.mukuruPayment.phone : "")
        setMAdddress(userResp.mukuruPayment ? userResp.mukuruPayment.address : "")
        setMFullName(userResp.mukuruPayment ? userResp.mukuruPayment.fullName : "")
        setMIdNumber(userResp.mukuruPayment ? userResp.mukuruPayment.idNumber : "")
        setMDescription(userResp.mukuruPayment ? userResp.mukuruPayment.description : "")


    }
    const registerEcocash = async () => {
        setEcocashStateLoading(true)
        const response = await UpdateEcocashState({ type: ecocashState, phone: ecocashPhone, fullName: ecocashName, description: ecocashDescription })
        setEcocashStateLoading(false)
        if (typeof response === 'string') return showError(response)
        showSuccess(response.message)
    }
    const registerCash = async () => {
        setCashStateLoading(true)
        const response = await UpdateCashState({ description: cashDescription })
        setCashStateLoading(false)
        if (typeof response === 'string') return showError(response)
        showSuccess(response.message)
    }
    const registerMukuru = async () => {
        setMukuruStateLoading(true)
        const response = await UpdateMukuruState({
            address: mAddress,
            fullName: mFullName,
            idNumber: mIdNumber,
            phone: mPhone,
            description: mDescription
        })
        setMukuruStateLoading(false)
        if (typeof response === 'string') return showError(response)
        showSuccess(response.message)
    }
    useEffect(() => { login() }, [])
    if (!loggedIn) return <div className='w-screen h-screen flex justify-center items-center'><ProgressBar /></div>
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
                    <span>Payment Setup</span>


                    <CustomAccordian
                        active={user.cashPayment ? user.cashPayment.active : false}
                        body={<div className='flex flex-col'>
                            <div>
                                <textarea placeholder='Enter information on what user must do inorder to carry out payment using CASH' value={cashDescription}
                                    onChange={(e) => setCashDescription(e.target.value)} />
                            </div>
                            <div>
                                <button className='bg-primaryColor text-white text-center w-full px-12 h-fit mb-12 py-3 '
                                    onClick={() => !cashStateLoading && registerCash()}>
                                    {cashStateLoading ? <CgSpinner className='w-full text-center' /> : <>save changes</>}</button>
                            </div>
                        </div>}
                        logo={'/images/logos/cash.jpg'}
                    />



                    <CustomAccordian active={user.ecocashPayment ? user.ecocashPayment.active : false} body={<div className='flex flex-col' >
                        This is were you setup ecocash and issuer the payment methods
                        <div>
                            <select onChange={(e) => setEcocashState(e.target.value)} value={ecocashState} >
                                <option value={'client'}>Ecocash Client</option>
                                <option value={'agent'}>Ecocash Agent</option>
                            </select>
                        </div>
                        <div>
                            <input placeholder={ecocashState === 'client' ? 'Ecocash Number' : "Ecocash Agent Number"} value={ecocashPhone}
                                onChange={(e) => setEcocashPhone(e.target.value)} />
                        </div>
                        <div>
                            <input placeholder={"FullName displayed on Ecocash"} value={ecocashName}
                                onChange={(e) => setEcocashName(e.target.value)} />
                        </div>
                        <div>
                            <textarea placeholder='Enter information on what user must do inorder to carry out payment'
                                value={ecocashDescription}
                                onChange={(e) => setEcocashDescription(e.target.value)} />
                        </div>
                        <div>
                            <button className='bg-primaryColor text-white text-center w-full px-12 h-fit mb-12 py-3 '
                                onClick={() => !ecocashStateLoading && registerEcocash()}>
                                {ecocashStateLoading ? <CgSpinner className='w-full text-center' /> : <>save changes</>}
                            </button>
                        </div>
                    </div>} logo={'/images/logos/ecocash.jpg'} />


                    <CustomAccordian active={user.mukuruPayment ? user.mukuruPayment.active : false} body={<div className='flex flex-col'>
                        This is were you setup ecocash and issuer the payment methods

                        <div>
                            <input placeholder={"id Number"} value={mIdNumber} onChange={(e) => setMIdNumber(e.target.value)} />
                        </div>
                        <div>
                            <input placeholder={"Address"} value={mAddress} onChange={(e) => setMAdddress(e.target.value)} />
                        </div>
                        <div>
                            <input placeholder={"Phone Number"} value={mPhone} onChange={(e) => setMPhone(e.target.value)} />
                        </div>
                        <div>
                            <input placeholder={"Your FullName"} value={mFullName} onChange={(e) => setMFullName(e.target.value)} />
                        </div>
                        <div>
                            <textarea placeholder='Enter information on what user must do inorder to carry out payment'
                                value={mDescription} onChange={(e) => setMDescription(e.target.value)} />
                        </div>
                        <div>
                            <button className='bg-primaryColor text-white text-center w-full px-12 h-fit mb-12 py-3 '
                                onClick={() => !mukuruStateLoading && registerMukuru()}>
                                {mukuruStateLoading ? <CgSpinner className='w-full text-center' /> : <>save changes</>}
                            </button>
                        </div>
                    </div>} logo={'/images/logos/mukuru.jpg'} />
                </div>
            </div >
            <FooterView />
        </div >)
}
