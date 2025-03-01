import { UserRegistration } from '@/connections/user'
import { showError, showSuccess } from '@/functions/toast'
import Link from 'next/link'
import Router from 'next/router'
import React, { useRef, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'

export default function RegisterForm() {
    const inputRef = useRef<HTMLInputElement>(null)
    const [city, setCity] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [agree, setAgree] = useState(true)
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [password2, setPassword2] = useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const registerUser = async () => {
        if (loading) return
        const user = new UserRegistration()
        if (firstName.length < 1) {
            const error = "name is required"
            setNameError(error)
            return showError(error)
        }
        if (lastName.length < 1) {
            const error = "lastname is required"
            setLastNameError(error)
            return showError(error)
        }
        if (email.length < 6) {
            const error = "invalid email"
            setEmailError(error)
            return showError(error)
        }
        if (password.length < 5) {
            const error = "Password too weak"
            setPasswordError(error)
            return showError(error)
        }
        if (password !== password2) {
            const error = "passwords do not match"
            setPasswordError(error)
            return showError(error)
        }
        setLoading(true)
        const response = await user.register({ email, phone, lastName, firstName, password, idNumber, city, address })
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
                                    {nameError.length > 0 && <span className='text-red-400'>{nameError}</span>}
                                    <input type="text" className="input-text" placeholder="First Name" value={firstName}
                                        onChange={(e) => {
                                            if (nameError.length > 0) setNameError("")
                                            setFirstName(e.target.value)
                                        }

                                        } />
                                </div>
                                <div className="form-row form-row-wide">
                                    {lastNameError.length > 0 && <span className='text-red-400'>{lastNameError}</span>}
                                    <input type="text" className="input-text" placeholder="Last Name"
                                        value={lastName} onChange={(e) => {
                                            if (lastNameError.length > 0) setLastNameError("")
                                            setLastName(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input type="text" className="input-text" placeholder="phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="form-row form-row-wide">
                                    {emailError.length > 0 && <span className='text-red-400'>{emailError}</span>}
                                    <input type="text" className="input-text" placeholder="Email Address"
                                        value={email} onChange={(e) => {
                                            if (emailError.length > 0) setEmailError("")
                                            setEmail(e.target.value)
                                        }} />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input type="text" className="input-text" placeholder="Your Residential Address"
                                        value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input type="text" className="input-text" placeholder="Your City"
                                        value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className="form-row form-row-wide">
                                    <input type="text" className="input-text" placeholder="Your national id number"
                                        value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
                                </div>
                                <div className="form-row form-row-wide">
                                    {passwordError.length > 0 && <span className='text-red-400'>{passwordError}</span>}
                                    <input className="input-text" type="password" placeholder="Password" value={password}
                                        onChange={(e) => {
                                            if (passwordError.length > 0) setPasswordError("")
                                            setPassword(e.target.value)
                                        }} />
                                </div>
                                <div className="form-row form-row-wide">

                                    <input className="input-text" type="password" placeholder="Repeat Password" ref={inputRef}
                                        required
                                        value={password2}
                                        onChange={(e) => {
                                            setPassword2(e.target.value)
                                            if (e.target.value != password) {
                                                setPasswordError("Passwords do not match")
                                            } else if (password.length > 0) {
                                                setPasswordError("")
                                            }
                                        }}
                                    />
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
