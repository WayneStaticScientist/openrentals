import FooterView from '@/components/home/footer';
import ProfileReview from '@/components/pages/widgets/profile-review';
import dynamic from 'next/dynamic';
import React from 'react'
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });

export default function ChangePassword() {
    return (
        <>
            <div id="wrapper">
                <HeaderView page='user' sub={'password'} />
                <BannerPage title={'Password Change'} path={[
                    {
                        root: "/",
                        title: "home"
                    },
                    {
                        root: "",
                        title: "password"
                    }
                ]} />
                <div className="container">
                    <div className="row">
                        <ProfileReview />
                        <div className="col-md-9">
                            <div className="utf-user-profile-item">
                                <div className="utf-submit-page-inner-box">
                                    <h3>Change Password</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-4">
                                            <label>Current Password</label>
                                            <input type="password" placeholder="*********" />
                                        </div>
                                        <div className="col-md-4">
                                            <label>New Password</label>
                                            <input type="password" placeholder="*********" />
                                        </div>
                                        <div className="col-md-4">
                                            <label>Confirm New Password</label>
                                            <input type="password" placeholder="*********" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <a href="#" className="utf-centered-button button">Save Changes</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <FooterView />
            </div>
        </>
    )
}
