import { useUserState } from '@/connections/user'
import React from 'react'
import OpenImageLoader from './widgets/classic-image-loader,'
import Router from 'next/router'

export default function UserIconTag() {
    const { notificationSize, notifications, firstName, profile } = useUserState()
    return (
        <>
            <div className="user-menu">
                <div className="user-name" onClick={() => {
                    Router.push("/myprofile")
                }}><span>
                        <OpenImageLoader path={profile} errorPath={'images/default/nouser.jpg'} />
                    </span><div className="user-name-title">Hi, {firstName}!</div></div>
                <ul>
                    <li><a href="my-profile.html"><i className="sl sl-icon-user"></i> My Profile</a></li>
                    <li><a href="my-bookmarks.html"><i className="sl sl-icon-star"></i> Bookmarks</a></li>
                    <li><a href="my-properties.html"><i className="sl sl-icon-docs"></i> My Property</a></li>
                    <li><a href="add-new-property.html"><i className="sl sl-icon-docs"></i> New Property</a></li>
                    <li><a href="change-password.html"><i className="sl sl-icon-docs"></i> Change Password</a></li>
                    <li><a href="index-3.html"><i className="sl sl-icon-power"></i> Log Out</a></li>
                </ul>
            </div>
        </>
    )
}
