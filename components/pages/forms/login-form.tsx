import Link from 'next/link'
import Router from 'next/router'
import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { UserRegistration } from '@/connections/user'
import { showError, showSuccess } from '@/functions/toast'

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const loginUser = async () => {
        if (loading) return
        const user = new UserRegistration()
        if (email.length < 6) return showError("invalid email")
        setLoading(true)
        const response = await user.login({ email, password })
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
                                <h3>Welcome Back Sign in to Continue</h3>
                                <span>Dont Have an Account? <Link href="/register">Sign Up!</Link></span>
                            </div>
                            <form method="post" className="login">
                                <div className="form-row form-row-wide">
                                    <input type="text" className="input-text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input className="input-text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="form-row">
                                    <div className="checkbox margin-top-10 margin-bottom-10">
                                        <input type="checkbox" id="two-step" />
                                        <label htmlFor="two-step"><span className="checkbox-icon"></span> Remember Me</label>
                                    </div>
                                    <a className="lost_password" href="forgot_password.html">Forgot Password?</a>
                                </div>
                                <button className="button full-width border margin-top-10" onClick={loginUser}>
                                    {loading ? <><CgSpinner className='w-full text-center' /></> : <>login</>}
                                </button>
                                <div className="utf-social-login-separator-item"><span>Or Login in With</span></div>
                                <div className="utf-social-login-buttons-block">
                                    <button className="button social-login via-twitter"><i className="icon-brand-facebook-f"></i> Facebook</button>
                                    <button className="button social-login via-gplus"><i className="icon-brand-google"></i> Google</button>
                                    <button className="button social-login via-facebook"><i className="icon-brand-twitter"></i> Twitter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
