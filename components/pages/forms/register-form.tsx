import Link from 'next/link'
import React from 'react'

export default function RegisterForm() {
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
                            <form method="post" className="login">
                                <div className="form-row form-row-wide margin-bottom-15">
                                    <select className="utf-chosen-select-single-item utf-with-border" title="Single User">
                                        <option>Single User</option>
                                        <option>Agent</option>
                                        <option>Multi User</option>
                                    </select>
                                </div>
                                <div className="form-row form-row-wide">
                                    <input type="text" className="input-text" name="username" id="username" placeholder="User Name" value="" />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input type="text" className="input-text" name="email" id="email" placeholder="Email Address" value="" />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input className="input-text" type="password" name="password" placeholder="Password" id="password" />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input className="input-text" type="password" name="password" placeholder="Repeat Password" id="repeat_password" />
                                </div>
                                <div className="form-row checkbox margin-top-10 margin-bottom-10">
                                    <input type="checkbox" id="two-step0" />
                                    <label htmlFor="two-step0"><span className="checkbox-icon"></span> By Registering You Confirm That You Accept <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a></label>
                                </div>
                                <input type="submit" className="button full-width border margin-top-10" name="Create An Account" value="Create An Account" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
