import React from 'react'

export default function FooterView() {
    return (
        <>
            <div id="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <a href="index-2.html"><img className="footer-logo" src="images/footer_logo.png" alt="" /></a>
                            <p>Lorem Ipsum is simply dummy text of printing and type setting industry. Lorem Ipsum been industry standard dummy text ever since, when unknown printer took a galley type scrambled.</p>
                        </div>
                        <div className="col-md-2 col-sm-3 col-xs-6">
                            <h4>Useful Links</h4>
                            <ul className="utf-footer-links-item">
                                <li><a href="index-2.html">Home</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Properties</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2 col-sm-3 col-xs-6">
                            <h4>My Account</h4>
                            <ul className="utf-footer-links-item">
                                <li><a href="#">Dashboard</a></li>
                                <li><a href="#">My Profile</a></li>
                                <li><a href="#">Add Property</a></li>
                                <li><a href="#">My Listing</a></li>
                                <li><a href="#">Favorites</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2 col-sm-3 col-xs-6">
                            <h4>Resources</h4>
                            <ul className="utf-footer-links-item">
                                <li><a href="#">My Account</a></li>
                                <li><a href="#">Support</a></li>
                                <li><a href="#">How It Work</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Term & Condition</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2 col-sm-3 col-xs-6">
                            <h4>Pages</h4>
                            <ul className="utf-footer-links-item">
                                <li><a href="#">Our Partners</a></li>
                                <li><a href="#">How It Work</a></li>
                                <li><a href="#">FAQ Page</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Term & Condition</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyrights">Copyright © 2022 All Rights Reserved.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
