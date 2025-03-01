import Router from 'next/router';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { UserRegistration, useUserState } from '@/connections/user';
import ProfileReview from '@/components/pages/widgets/profile-review';
import { ProgressBar } from 'react-loader-spinner';
import { UpdateUser } from '@/connections/get-property';
import { showError, showSuccess } from '@/functions/toast';
import { CgSpinner } from 'react-icons/cg';
import { ToastContainer } from 'react-toastify';
import { User } from '@/connections/interfaces';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });

export default function MyProfile() {
    const user = useUserState();
    const [city, setCity] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [message, setMessage] = useState("")
    const [lastName, setLastName] = useState("")
    const [idNumber, setNationalId] = useState("")
    const [firstName, setFirstName] = useState("")
    const [userTitle, setUserTitle] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    const [updatingUser, setUpdatingUser] = useState(false)
    const updateUser = async () => {
        if (lastName.length < 3) return showError("enter valid lastname")
        if (firstName.length < 3) return showError("enter valid firstname")
        if (email.length < 4) return showError("enter valid email")
        setUpdatingUser(true)
        const user = await UpdateUser({ city, email, phone, address, message, firstName, lastName, userTitle, idNumber })
        setUpdatingUser(false)
        if (typeof user === 'string') return showError(user)
        showSuccess("User updated successfully")
    }
    const login = async () => {
        const userReg = new UserRegistration()
        const resp = await userReg.fetchUser({ retry: true })
        if (typeof resp == 'string') {
            Router.push("/login")
            return
        }
        const userResp = resp as User;
        setLoggedIn(true)
        setCity(userResp.city)
        setEmail(userResp.email)
        setPhone(userResp.phone)
        setAddress(userResp.address)
        setMessage(userResp.message)
        setLastName(userResp.lastName)
        setUserTitle(userResp.userTitle)
        setNationalId(userResp.idNumber)
        setFirstName(userResp.firstName);
    }
    useEffect(() => {
        login()
    }, [])
    if (!loggedIn) {
        return <div className='flex justify-center items-center w-screen h-screen'>
            <ProgressBar />
        </div>
    }
    return (
        <>
            <ToastContainer />
            <div id="wrapper">
                <HeaderView page='user' sub={'myprofile'} />
                <BannerPage title={'Profile'} path={[
                    {
                        root: "/",
                        title: "home"
                    },
                    {
                        root: "",
                        title: "profile"
                    }
                ]} />
                <div className="container">
                    <div className="row">
                        <ProfileReview page='myprofile' />
                        <div className="col-md-9">
                            {!user.emailVerified ? <div className="notification error closeable margin-bottom-30 flex items-center justify-between">
                                <p> Your email is not verified</p>
                                <button className='button btn-error ' onClick={() => {
                                    Router.push("/verification/email")
                                }}>verify now</button>
                            </div>
                                : <div className="notification success  margin-bottom-30">
                                    <p>Your email is verified</p>
                                </div>
                            }
                            {user.idNumberVerified === 0 || !user.idNumberVerified ? <div className="notification error closeable margin-bottom-30 flex items-center justify-between">
                                <p>Your identity is not verified</p>
                                <button className='button btn-error ' onClick={() => {
                                    Router.push("/verification/identity")
                                }}>verify now</button>
                            </div>
                                :
                                <>
                                    {
                                        user.idNumberVerified === 1 ?
                                            <div className="notification warning margin-bottom-30">
                                                <span>Identity Verification</span> <p>
                                                    You have submitted your documents for review . There are under review .
                                                    You will be notified when verified or declined
                                                </p>
                                            </div> :
                                            <div className="notification success  margin-bottom-30">
                                                <p>Your Id is verified</p>
                                            </div>}
                                </>
                            }
                            {user.proofOfResidence === 0 || !user.proofOfResidence ? <div className="notification error closeable margin-bottom-30 flex items-center justify-between">
                                <p>Your Proof of Residence is not verified</p>
                                <button className='button btn-error ' onClick={() => {
                                    Router.push("/verification/residence")
                                }}>verify now</button>
                            </div>
                                :
                                <>
                                    {
                                        user.proofOfResidence === 1 ?
                                            <div className="notification warning margin-bottom-30">
                                                <span>Residence Verification</span> <p>
                                                    You have submitted your documents for review . There are under review .
                                                    You will be notified when verified or declined
                                                </p>
                                            </div> :
                                            <div className="notification success  margin-bottom-30">
                                                <p>Your Proof Of Residence is verified</p>
                                            </div>}
                                </>
                            }
                            <div className="utf-user-profile-item">
                                <div className="utf-submit-page-inner-box">
                                    <h3>My Account</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-6">
                                            <label>Your Name</label>
                                            <input value={firstName} type="text" onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Your LastName</label>
                                            <input value={lastName} type="text" onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Your Title</label>
                                            <input value={userTitle} type="text" onChange={(e) => setUserTitle(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Phone Number</label>
                                            <input value={phone} type="text" onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                        <div className="col-md-6 select-none">
                                            <label>Email Address</label>
                                            <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Nation Id</label>
                                            <input value={idNumber} type="text" onChange={(e) => setNationalId(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Home Address</label>
                                            <input value={address} type="text" onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>City</label>
                                            <input value={city} type="text" onChange={(e) => setCity(e.target.value)} />
                                        </div>
                                        <div className="col-md-12 margin-bottom-0">
                                            <label>Message</label>
                                            <textarea name="about" id="about" cols={20}
                                                rows={5} onChange={(e) => setMessage(e.target.value)} value={message}>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="utf-submit-page-inner-box">
                                    <h3>Social Accounts</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-6">
                                            <label><i className="icon-brand-facebook"></i> Facebook</label>
                                            <input value="https://www.facebook.com" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <label><i className="icon-brand-twitter"></i> Twitter</label>
                                            <input value="https://www.twitter.com" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <label><i className="icon-brand-linkedin"></i> Linkedin</label>
                                            <input value="https://www.linkedin.com" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <label><i className="icon-brand-google"></i> Google</label>
                                            <input value="https://www.google.com" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <label><i className="icon-brand-pinterest"></i> Pinterest</label>
                                            <input value="https://www.pinterest.com" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <label><i className="icon-feather-instagram"></i> Instagram</label>
                                            <input value="https://www.instagram.com" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button className="utf-centered-button button margin-top-0 margin-bottom-20"
                                            onClick={() => !updatingUser && updateUser()}>
                                            {updatingUser ?
                                                <CgSpinner className='w-full text-center animate-spin' /> :
                                                <>Save Changes</>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
