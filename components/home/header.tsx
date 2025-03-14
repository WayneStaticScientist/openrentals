import Link from 'next/link'
import { useUserState } from '@/connections/user'
import { userLoggedIn } from '@/functions/device'
import React, { useEffect, useState } from 'react'
import UserIconTag from '../pages/user-icon-tag'

export default function HeaderView({ page, sub }: { page: string, sub?: string | null }) {
    const user = useUserState()
    const [loggedIn, setLoggedIn] = useState(false)
    const [staticClass, setStaticClass] = useState(false)
    const handleScroll = () => {
        if (window.scrollY > 400) {
            if (!staticClass)
                setStaticClass(true)
        } else {
            setStaticClass(false)
        }
    }
    useEffect(() => {
        if (user.email.length < 1) {
            if (userLoggedIn()) {
                setLoggedIn(true)
                window.addEventListener('scroll', handleScroll); // Attach event listener
            }
        } else {
            setLoggedIn(true)
        }
    }, [user.email.length])
    return (
        <header id="header-container" className="fullwidth"
            style={{
                position: staticClass ? "fixed" : undefined,
                backgroundColor: staticClass ? "white" : undefined,
                top: staticClass ? 0 : undefined,
                left: staticClass ? 0 : undefined,
                right: staticClass ? 0 : undefined,
                zIndex: staticClass ? 200 : undefined,
                transition: 'transform 1s',
                transform: staticClass ? 'translateY(0)' : 'translateY(0)'
            }}>
            <div id="header">
                <div className="container flex justify-between">
                    {/* <!-- Left Side Content --> */}
                    <div className="l">
                        <div id="logo"> <Link href="/">
                            <img src="../images/logo.png" alt="" /></Link> </div>
                        <div className="mmenu-trigger">
                            <button className="hamburger hamburger--collapse" type="button"> <span className="hamburger-box"> <span className="hamburger-inner"></span> </span> </button>
                        </div>
                        {/* <!-- Main Navigation --> */}
                        <nav id="navigation" className="style-1">
                            <ul id="responsive">
                                <li><Link className={`${page === 'home' ? 'current' : ''}`} href="/">Home</Link>
                                </li>
                                <li><Link href="/listings" className={`${page === 'listing' ? 'current' : ''}`}>Listings</Link>
                                </li>
                                {loggedIn ? <li><Link href="/myprofile" className={`${page === 'user' ? 'current' : ''}`}>User Panel</Link>
                                    <ul>
                                        <li><Link href="/myprofile" className={`${sub === 'myprofile' ? 'active' : ''}`}>User Profile</Link></li>
                                        <li><Link href="/bookmarks" className={`${sub === 'bookmarks' ? 'active' : ''}`}>Bookmark Listing</Link></li>
                                        <li><Link href="/upload" className={`${sub === 'upload' ? 'active' : ''}`}>Add New Property</Link></li>
                                        <li><Link href="/password" className={`${sub === 'password' ? 'active' : ''}`}>Change Password</Link></li>
                                    </ul>
                                </li> : <></>}
                                <li><Link href="/agents" className={`${page === 'agents' ? 'current' : ''}`}>Agents</Link>
                                </li>

                                <li><Link href="/contact" className={`${page === 'contact' ? 'current' : ''}`}>Contact</Link></li>
                            </ul>
                        </nav>
                        <div className="clearfix"></div>
                    </div>
                    {/* <!-- Left Side Content / End --> */}

                    {/* <!-- Right Side Content / End --> */}
                    <div className="">
                        <div className="flex items-center gap-x-8">
                            {loggedIn ? <UserIconTag /> :
                                <Link href="/login" className="popup-with-zoom-anim log-in-button sign-in">
                                    <i className="icon-line-awesome-user"></i> <span>Sign In</span></Link>}
                            <Link href="/upload" className="button border">
                                <i className="icon-feather-plus-circle"></i> <span>Create Property</span></Link>
                        </div>
                    </div>
                    {/* <!-- Right Side Content / End --> */}
                </div>
            </div>
            {/* <!-- Header / End --> */}
        </header>
    )
}
