import Link from 'next/link'
import React from 'react'

export default function LoginForm() {
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
                                    <input type="text" className="input-text" name="email" id="email" placeholder="Email Address" value="" />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input className="input-text" type="password" name="password" placeholder="Password" id="password" />
                                </div>
                                <div className="form-row">
                                    <div className="checkbox margin-top-10 margin-bottom-10">
                                        <input type="checkbox" id="two-step" />
                                        <label htmlFor="two-step"><span className="checkbox-icon"></span> Remember Me</label>
                                    </div>
                                    <a className="lost_password" href="forgot_password.html">Forgot Password?</a>
                                </div>
                                <input type="submit" className="button full-width border margin-top-10" name="login" value="Login" />
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
