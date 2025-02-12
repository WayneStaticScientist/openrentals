import React from 'react'

export default function ProfileReview() {
    return (
        <div className="col-md-3">
            <div className="margin-bottom-20">
                <div className="utf-edit-profile-photo-area"> <img src="images/agent-02.jpg" alt="" />
                    <div className="utf-change-photo-btn-item">
                        <div className="utf-user-photo-upload"> <span><i className="fa fa-upload"></i> Upload Photo</span>
                            <input type="file" className="upload tooltip top" title="Upload Photo" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
            <div className="sidebar margin-top-20">
                <div className="user-smt-account-menu-container">
                    <ul className="user-account-nav-menu">
                        <li><a href="my-profile.html" className="current"><i className="sl sl-icon-user"></i> My Profile</a></li>
                        <li><a href="my-bookmarks.html"><i className="sl sl-icon-star"></i> Bookmark Listing</a></li>
                        <li><a href="my-properties.html"><i className="sl sl-icon-docs"></i> My Property</a></li>
                        <li><a href="add-new-property.html"><i className="sl sl-icon-action-redo"></i> New Property</a></li>
                        <li><a href="change-password.html"><i className="sl sl-icon-lock"></i> Change Password</a></li>
                        <li><a href="#"><i className="sl sl-icon-power"></i> Log Out</a></li>
                    </ul>
                </div>
            </div>
            <div className="widget utf-sidebar-widget-item">
                <div className="utf-detail-banner-add-section">
                    <a href="#"><img src="images/banner-add-2.jpg" alt="banner-add-2" /></a>
                </div>
            </div>
        </div>
    )
}
