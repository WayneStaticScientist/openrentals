import ProfileReview from '@/components/pages/widgets/profile-review';
import dynamic from 'next/dynamic';
import React from 'react'
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });

export default function MyProfile() {
    return (
        <>
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
                        <ProfileReview />
                        <div className="col-md-9">
                            <div className="utf-user-profile-item">
                                <div className="utf-submit-page-inner-box">
                                    <h3>My Account</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-6">
                                            <label>Your Name</label>
                                            <input value="John Williams" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Your Title</label>
                                            <input value="Agent In Afghanistan" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Phone Number</label>
                                            <input value="(+21) 124 123 4546" type="text" />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Email Address</label>
                                            <input value="info@example.com" type="text" />
                                        </div>
                                        <div className="col-md-12 margin-bottom-0">
                                            <label>Message</label>
                                            <textarea name="about" id="about" cols={20}
                                                rows={5}>
                                                Lorem Ipsum is simply dummy text of printing and type setting industry Lorem Ipsum been industry standard dummy text ever since. Lorem Ipsum is simply dummy text of printing and type setting industry Lorem Ipsum been industry standard dummy text ever since.</textarea>
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
                                        <button className="utf-centered-button button margin-top-0 margin-bottom-20">Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
