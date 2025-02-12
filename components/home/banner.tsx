import React from 'react'

export default function BannerView() {
    return (
        <>
            <div className="parallax"
                style={{
                    backgroundImage: 'url(images/house.jpg)',
                    color: "#36383e",
                    backgroundSize: 'cover',
                    opacity: '1'
                }} data-img-width="2500" data-img-height="1600">
                <div className='bg-[#00000099] w-full h-full'>
                    <div className="container "  >
                        <div className="row">
                            <div className="col-md-12">
                                <div className="search-container">
                                    <h2>Find Your Dream House</h2>
                                    <div className="announce">From as low as $10 per day with limited time offer discounts.</div>
                                    <div className="row with-forms">
                                        <div className="col-md-2">
                                            <select data-placeholder="Select City" title="Select City" className="utf-chosen-select-single-item">
                                                <option>Select City</option>
                                                <option>Afghanistan</option>
                                                <option>Albania</option>
                                                <option>Algeria</option>
                                                <option>Brazil</option>
                                                <option>Burundi</option>
                                                <option>Bulgaria</option>
                                                <option>California</option>
                                                <option>Germany</option>
                                                <option>Grenada</option>
                                                <option>Guatemala</option>
                                                <option>Iceland</option>
                                            </select>
                                        </div>

                                        <div className="col-md-2">
                                            <select data-placeholder="Property Type" className="utf-chosen-select-single-item">
                                                <option>Property Type</option>
                                                <option>Residential</option>
                                                <option>Apartments</option>
                                                <option>Houses</option>
                                                <option>Commercial</option>
                                                <option>Land</option>
                                            </select>
                                        </div>

                                        <div className="col-md-2">
                                            <select data-placeholder="Any Status" className="utf-chosen-select-single-item">
                                                <option>Any Status</option>
                                                <option>For Sale</option>
                                                <option>For Rent</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="utf-main-search-input-item">
                                                <input type="text" placeholder="Enter Keywords..." value="" />
                                                <button className="button"><i className="fa fa-search"></i> Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h4 className="utf-cat-home-item-list">What are you looking for?</h4>
                                        <ul className="utf-home-iconbox">
                                            <li className="list-inline-item"><div className="icon"><span className="icon-line-awesome-building"></span><p>Modern Villa</p></div></li>
                                            <li className="list-inline-item"><div className="icon"><span className="icon-feather-home"></span><p>Family House</p></div></li>
                                            <li className="list-inline-item"><div className="icon"><span className="icon-material-outline-location-city"></span><p>Town House</p></div></li>
                                            <li className="list-inline-item"><div className="icon"><span className="icon-material-outline-business"></span><p>Apartment</p></div></li>
                                        </ul>
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
