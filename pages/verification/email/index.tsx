import { verifyEmail } from '@/connections/get-property'
import { UserRegistration, useUserState } from '@/connections/user'
import { clearSavedLogss, getUser } from '@/functions/device'
import { showError, showSuccess } from '@/functions/toast'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { MdVerified } from 'react-icons/md'
import { ProgressBar } from 'react-loader-spinner'

export default function VerificationEmailPage() {
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const { email } = useUserState()
    const sendLink = async () => {
        if (sending) return
        if (email.length === 0) return showError("There is no email")
        setSending(true)
        const resp = await verifyEmail(email)
        setSending(false)
        if (typeof resp === 'string') return showError(resp)
        showSuccess("Verifcation to Email was sent successfully")
        setEmailSent(true)

    }
    const userLogIn = async () => {
        const userReg = new UserRegistration()
        const resp = await userReg.fetchUser({ retry: true })
        if (typeof resp === 'string') {
            clearSavedLogss()
            Router.push("/login")
            return
        }
        const user = getUser()
        if (user) useUserState.setState(user)
        setLoading(false)
    }
    useEffect(() => {
        userLogIn()
    }, [email])
    return (
        <div className='w-full h-screen m-0 flex items-center justify-center' style={{ margin: 0, padding: 0 }}>
            {
                loading ? <ProgressBar />
                    :
                    <>
                        <div className='shadow-lg max-w-4xl w-full p-12'>
                            <div className='w-full flex items-center justify-center text-green-600 mb-12'><MdVerified size={55} /></div>
                            <div className='text-2xl font-extrabold mb-7'>Email Verification</div>
                            {
                                emailSent ?
                                    <>
                                        <div className='notification success'>
                                            The verification Link has been successfully sent to {email} . Check your email inbox
                                            to verify your email address .
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div>This is the verification page . Whereby we will send verification email to
                                            <span className='font-bold text-orange-800 '> {email}</span> via Email. You will receive a Link to click for
                                            verification , and it will automatically verify You
                                        </div>
                                        <button className='w-full button mt-8' onClick={sendLink}>{sending ? <CgSpinner className=' animate-spin w-full text-center' /> : <>verify email</>}</button>
                                    </>
                            }
                        </div>

                    </>
            }
        </div >
    )
}
