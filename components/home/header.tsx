import Link from 'next/link'
import React from 'react'

export default function HeaderView({ page, sub }: { page: string, sub?: string | null }) {
    return (
        <header id="header-container" className="fullwidth">
            <div id="header">
                <div className="container">
                    {/* <!-- Left Side Content --> */}
                    <div className="left-side">
                        <div id="logo"> <Link href="/">
                            <img src="images/logo.png" alt="" /></Link> </div>
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
                                <li><Link href="/myprofile" className={`${page === 'user' ? 'current' : ''}`}>User Panel</Link>
                                    <ul>
                                        <li><Link href="/myprofile" className={`${sub === 'myprofile' ? 'active' : ''}`}>User Profile</Link></li>
                                        <li><Link href="/bookmarks">Bookmark Listing</Link></li>
                                        <li><Link href="/upload">Add New Property</Link></li>
                                        <li><Link href="/password">Change Password</Link></li>
                                    </ul>
                                </li>
                                <li><Link href="/agents" className={`${page === 'agents' ? 'current' : ''}`}>Agents</Link>
                                </li>

                                <li><Link href="/contact" className={`${page === 'contact' ? 'current' : ''}`}>Contact</Link></li>
                            </ul>
                        </nav>
                        <div className="clearfix"></div>
                    </div>
                    {/* <!-- Left Side Content / End --> */}

                    {/* <!-- Right Side Content / End --> */}
                    <div className="right-side">
                        <div className="header-widget">
                            <Link href="/login" className="popup-with-zoom-anim log-in-button sign-in">
                                <i className="icon-line-awesome-user"></i> <span>Sign In</span></Link>
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
