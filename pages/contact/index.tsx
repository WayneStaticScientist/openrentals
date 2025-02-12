import FooterView from '@/components/home/footer';
import dynamic from 'next/dynamic';
import React from 'react'
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
export default function ContactUs() {
    return (
        <>
            <div id="wrapper">
                <HeaderView page='contact' />
                <BannerPage title={'contact Us'} path={[
                    {
                        root: "/",
                        title: "home"
                    },
                    {
                        root: "",
                        title: "contact"
                    }
                ]} />
                <div className="container">
                    <div className="row">

                        {/* <!-- Contact Details --> */}
                        <div className="col-md-4">
                            <div className="utf-boxed-list-headline-item">
                                <h3><i className="icon-feather-map"></i> Office Address</h3>
                            </div>
                            {/* <!-- Contact Details --> */}
                            <div className="utf-contact-location-info-aera sidebar-textbox margin-bottom-40">
                                <ul className="contact-details">
                                    <li><i className="icon-feather-smartphone"></i> <strong>Phone Number:</strong> <span>(+21) 124 123 4546</span></li>
                                    <li><i className="icon-material-outline-email"></i> <strong>Email Address:</strong> <span><a href="#">info@example.com</a></span></li>
                                    <li><i className="icon-feather-globe"></i> <strong>Website:</strong> <span>www.example.com</span></li>
                                    <li><i className="icon-feather-map-pin"></i> <strong>Address:</strong> <span>3241, Lorem ipsum dolor sit amet, consectetur adipiscing elit Proin fermentum condimentum mauris.</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* <!-- Contact Form --> */}
                        <div className="col-md-8">
                            <section id="contact">
                                <div className="utf-boxed-list-headline-item">
                                    <h3><i className="icon-feather-layers"></i> Contact Form</h3>
                                </div>
                                <div className="utf-contact-form-item">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input name="name" type="text" placeholder="Frist Name" required />
                                            </div>
                                            <div className="col-md-6">
                                                <input name="name" type="text" placeholder="Last Name" required />
                                            </div>
                                            <div className="col-md-6">
                                                <input name="email" type="email" placeholder="Email Address" required />
                                            </div>
                                            <div className="col-md-6">
                                                <input name="name" type="text" placeholder="Subject" required />
                                            </div>
                                            <div className="col-md-12">
                                                <textarea name="comments" cols={40} rows={3} placeholder="Message..." required></textarea>
                                            </div>
                                        </div>
                                        <div className="utf-centered-button margin-bottom-10">
                                            <input type="submit" className="submit button" id="submit" value="Submit Message" />
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                        {/* <!-- Contact Form / End --> */}
                    </div>
                </div>
                <FooterView />
            </div>
        </>
    )
}
