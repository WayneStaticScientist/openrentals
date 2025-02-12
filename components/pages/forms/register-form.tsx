import { UserRegistration } from '@/connections/user'
import { showError, showSuccess } from '@/functions/toast'
import Link from 'next/link'
import Router from 'next/router'
import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'

export default function RegisterForm() {

    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [agree, setAgree] = useState(true)
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [password2, setPassword2] = useState("")
    const registerUser = async () => {
        if (loading) return
        const user = new UserRegistration()
        if (email.length < 6) return showError("invalid email")
        if (firstName.length < 1) return showError("name is required")
        if (lastName.length < 1) return showError("lastname is required")
        if (password !== password2) return showError("passwords do not match")
        setLoading(true)
        const response = await user.register({ email, phone, lastName, firstName, password })
        if (typeof response === 'string') {
            setLoading(false);
            return showError(response)
        }
        showSuccess("registration has been success")
        setLoading(false)
        return Router.back()
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <div className="my-account">
                        <div className="tabs-container">
                            <div className="utf-welcome-text-item">
                                <h3>Create Your New Account!</h3>
                                <span>Already have account? <Link href="/login">Log In!</Link></span>
                            </div>
                            <div className="login">
                                <div className="form-row form-row-wide">
                                    <input type="text" className="input-text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input type="text" className="input-text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input type="text" className="input-text" placeholder="phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input type="text" className="input-text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input className="input-text" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input className="input-text" type="password" placeholder="Repeat Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                                </div>
                                <div className="form-row checkbox margin-top-10 margin-bottom-10">
                                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                                    <label htmlFor="two-step0"><span className="checkbox-icon"></span> By Registering You Confirm That You Accept <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a></label>
                                </div>
                                <button onClick={registerUser} className="button full-width border margin-top-10">
                                    {loading ? <><CgSpinner className=' animate-spin text-center w-full' /></> :
                                        <>Create An Account</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
