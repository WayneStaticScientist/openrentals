import { resetPassword } from '@/connections/get-property'
import { showError, showSuccess } from '@/functions/toast'
import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { ToastContainer } from 'react-toastify'

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [messageSent, setMessageSent] = useState(false)
    const resetPasswordFunction = async () => {
        if (loading) return
        setLoading(true)
        const data = await resetPassword(email, password)
        setLoading(false)
        if (typeof data === 'string') {
            return showError(data)
        }
        showSuccess("Password reset link has been sent to your email successfully")
        setMessageSent(true)
    }
    return (
        <div className='flex justify-center items-center w-screen h-screen select-none'>
            <ToastContainer />
            <div className='flex flex-col w-full shadow-md p-12' style={{
                maxWidth: "600px"
            }}>
                {
                    messageSent ?
                        <div className='flex flex-col'>
                            <span>  Password reset link was successfully sent to <span className='text-green-800'>{email}</span> .
                                Check your mailbox for the reset link</span>
                            <span>Its the wrong email ? <span className='text-red-500' onClick={() => setMessageSent(false)}> Change Email</span>
                            </span>
                        </div>
                        :
                        <>
                            <h1>Password Reset</h1>
                            <span className='mb-12' style={{
                                fontSize: '13px'
                            }}>We are sorry that You forgot your password but you can follow this simple steps.
                                User your email address your signed in and your new password .The verification link will be emailed to you and
                                once you click on it and it give a successfull message .Your new password is set ??
                            </span>
                            <input className='' placeholder='enter your email' value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input className='' placeholder='enter your new password'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className='p-3 bg-primary text-white w-full' onClick={resetPasswordFunction}>
                                {loading ? <CgSpinner className=' animate-spin flex w-full text-center' /> : <> change password</>}
                            </button>
                        </>
                }
            </div>
        </div>
    )
}
