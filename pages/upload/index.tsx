import FooterView from '@/components/home/footer';
import ProfileReview from '@/components/pages/widgets/profile-review';
import dynamic from 'next/dynamic';
import React, { ReactNode, useEffect, useState } from 'react'
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
export default function UploadPage() {
    const [descrPage, setDescriptionPage] = useState<ReactNode>(null)
    const [locationPage, setLocationPage] = useState<ReactNode>(null)
    useEffect(() => {
        setLocationPage(<div className="utf-submit-page-inner-box">
            <h3>Property Information</h3>
            <div className="content with-padding">
                <div className="col-md-12">
                    <h5>Property Description</h5>
                    <textarea name="summary" cols={20} rows={2} id="summary"></textarea>
                </div>
                <div className="col-md-4">
                    <h5>Building Age</h5>
                    <select className="utf-chosen-select-single-item">
                        <option label="blank"></option>
                        <option>0 - 1 Years</option>
                        <option>0 - 5 Years</option>
                        <option>0 - 10 Years</option>
                        <option>0 - 20 Years</option>
                        <option>0 - 50 Years</option>
                        <option>50 + Years</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <h5>Bed Rooms</h5>
                    <select className="utf-chosen-select-single-item">
                        <option label="blank"></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <h5>Bath Rooms</h5>
                    <select className="utf-chosen-select-single-item">
                        <option label="blank"></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div className="col-md-12">
                    <h5 className="margin-top-15">Other Features <span>(optional)</span></h5>
                    <div className="checkboxes in-row margin-bottom-20">
                        <input id="check-2" type="checkbox" name="check" />
                        <label htmlFor="check-2">Air Conditioning</label>
                        <input id="check-3" type="checkbox" name="check" />
                        <label htmlFor="check-3">Swimming Pool</label>
                        <input id="check-4" type="checkbox" name="check" />
                        <label htmlFor="check-4">Central Heating</label>
                        <input id="check-5" type="checkbox" name="check" />
                        <label htmlFor="check-5">Laundry Room</label>
                        <input id="check-6" type="checkbox" name="check" />
                        <label htmlFor="check-6">Gym</label>
                        <input id="check-7" type="checkbox" name="check" />
                        <label htmlFor="check-7">Alarm</label>
                        <input id="check-8" type="checkbox" name="check" />
                        <label htmlFor="check-8">Window Covering</label>
                    </div>
                </div>
            </div>
        </div>)
        setDescriptionPage(<div className="utf-submit-page-inner-box">
            <h3>Property Basic Information</h3>
            <div className="content with-padding">
                <div className="col-md-12">
                    <h5>Property Title</h5>
                    <input className="search-field" placeholder="Property Title" type="text" value="" />
                </div>

                <div className="col-md-6">
                    <h5>Status</h5>
                    <select className="utf-chosen-select-single-item">
                        <option label="blank"></option>
                        <option>For Sale</option>
                        <option>For Rent</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <h5>Type</h5>
                    <select className="utf-chosen-select-single-item">
                        <option label="blank"></option>
                        <option>Apartment</option>
                        <option>House</option>
                        <option>Commercial</option>
                        <option>Garage</option>
                        <option>Lot</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <h5>Price</h5>
                    <div className="select-input disabled-first-option">
                        <input type="text" placeholder="00000" data-unit="USD" />
                    </div>
                </div>

                <div className="col-md-4">
                    <h5>Area</h5>
                    <div className="select-input disabled-first-option">
                        <input type="text" placeholder="00000" data-unit="Sq Ft" />
                    </div>
                </div>

                <div className="col-md-4">
                    <h5>Rooms</h5>
                    <select className="utf-chosen-select-single-item">
                        <option label="blank"></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>More than 5</option>
                    </select>
                </div>
            </div>
        </div>)
    }, [])
    return (
        <>
            <div id="wrapper">
                <HeaderView page='listing' />
                <BannerPage title={'Upload House'} path={[
                    {
                        root: "/",
                        title: "home"
                    },
                    {
                        root: "",
                        title: "upload"
                    }
                ]} />
                <div className="container">
                    <div className="row">
                        <ProfileReview />
                        {/* <!-- Submit Page --> */}
                        <div className="col-md-9">
                            <div className="submit-page">
                                {/* <!-- Section --> */}
                                {descrPage}
                                {/* <!-- Section / End --> */}

                                {/* <!-- Section --> */}
                                <div className="utf-submit-page-inner-box">
                                    <h3>Property Gallery</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-12 submit-section">
                                            <form action="https://utouchdesign.com/themes/realfun/file-upload" className="dropzone"></form>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Section / End --> */}

                                {/* <!-- Section --> */}
                                <div className="utf-submit-page-inner-box">
                                    <h3>Property Location</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-6">
                                            <h5>Address</h5>
                                            <input type="text" placeholder="Address" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>City Name</h5>
                                            <input type="text" placeholder="City Name" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>State</h5>
                                            <input type="text" placeholder="State" />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Zip-Code</h5>
                                            <input type="text" placeholder="000000" />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Section / End --> */}

                                {/* <!-- Section --> */}
                                {locationPage}
                                {/* <!-- Section / End --> */}

                                {/* <!-- Section --> */}
                                <div className="utf-submit-page-inner-box">
                                    <h3>Property Contact Details</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-4">
                                            <h5>Full Name</h5>
                                            <input type="text" placeholder="Name" />
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Email Address</h5>
                                            <input type="text" placeholder="Email Address" />
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Phone Number</h5>
                                            <input type="text" placeholder="Phone Number" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <a href="add-new-property.html" className="utf-centered-button button">Submit Property</a>
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
