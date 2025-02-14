import Link from 'next/link'
import { useState } from 'react';
import { showSuccess } from '@/functions/toast';
import OpenChainsDialog from './open-chains-dialog';
import { clearSavedLogss } from '@/functions/device';
import Router from 'next/router';
export default function ProfileReview({ page }: { page: string }) {
    const [dialog, setDialog] = useState(false)
    return (
        <>
            <OpenChainsDialog className={''}
                onCloseDialog={() => {
                    setDialog(false)
                }}
                onAcceptDialog={() => {
                    clearSavedLogss()
                    showSuccess("you have been logged out successfully")
                    setDialog(false)
                    Router.reload()
                }}
                title={'Logout?'}
                content={<>Are you sure to logout ? You can just Log back In</>} shown={dialog} />
            <div className="col-md-3">
                <div className="margin-bottom-20">
                    <div className="utf-edit-profile-photo-area">
                        <img src="images/agent-02.jpg" alt="" />
                        <div className="utf-change-photo-btn-item ">
                            <div className="utf-user-photo-upload"> <span><i className="fa fa-upload"></i>
                                Upload Photo</span>
                                <input type="file" className="upload tooltip top" title="Upload Photo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="sidebar margin-top-20">
                    <div className="user-smt-account-menu-container">
                        <ul className="user-account-nav-menu">
                            <li><Link href="/myprofile" className={page == 'myprofile' ? "current" : ""}>
                                <i className="sl sl-icon-user"></i> My Profile</Link></li>
                            <li><Link href="/" className={page == 'bookmarks' ? "current" : ""}><i className="sl sl-icon-star"></i> Bookmark Listing</Link></li>
                            <li><Link href="/uploads" className={page == 'uploads' ? "current" : ""}><i className="sl sl-icon-docs"></i> My Property</Link>
                            </li>
                            <li><Link href="/upload" className={page == 'upload' ? "current" : ""}><i className="sl sl-icon-action-redo"></i> New Property</Link></li>
                            <li><a href="change-password.html"><i className="sl sl-icon-lock"></i> Change Password</a></li>
                            <li><button onClick={() => setDialog(true)}><i className="sl sl-icon-power"></i> Log Out</button></li>
                        </ul>
                    </div>
                </div>
                <div className="widget utf-sidebar-widget-item">
                    <div className="utf-detail-banner-add-section">
                        <a href="#"><img src="images/banner-add-2.jpg" alt="banner-add-2" /></a>
                    </div>
                </div>
            </div>
        </>
    )
}
