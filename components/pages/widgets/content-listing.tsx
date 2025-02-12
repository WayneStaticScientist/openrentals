import React from 'react'

export default function ContentListing() {
    return (
        <div className="container">
            <div className="row sticky-wrapper">
                <div className="col-md-8">
                    {/* <!-- Sorting --> */}
                    <div className="utf-sort-box-aera">
                        <div className="sort-by">
                            <label>Sort By:</label>
                            <div className="sort-by-select">
                                <select data-placeholder="Default Properties" className="utf-chosen-select-single-item" >
                                    <option>Default Properties</option>
                                    <option>Low to High Price</option>
                                    <option>High to Low Price</option>
                                    <option>Newest Properties</option>
                                    <option>Oldest Properties</option>
                                </select>
                            </div>
                        </div>
                        <div className="utf-layout-switcher">
                            <a href="#" className="list"><i className="sl sl-icon-list"></i></a>
                            <a href="#" className="grid"><i className="sl sl-icon-grid"></i></a>
                        </div>
                    </div>

                    {/* <!-- Listings --> */}
                    <div className="utf-listings-container-area list-layout">
                        <div className="utf-listing-item"> <a href="single-property-page-1.html" className="utf-smt-listing-img-container">
                            <div className="utf-listing-badges-item"><span className="featured">Featured</span> <span className="for-sale">For Sale</span></div>
                            <div className="utf-listing-img-content-item">
                                <img className="utf-user-picture" src="images/user_1.jpg" alt="user_1" />
                                <span className="like-icon with-tip" data-tip-content="Bookmark"></span>
                                <span className="compare-button with-tip" data-tip-content="Add to Compare"></span>
                                <span className="video-button with-tip" data-tip-content="Video"></span>
                            </div>
                            <div className="utf-listing-carousel-item">
                                <div><img src="images/listing-01.jpg" alt="" /></div>
                                <div><img src="images/listing-01.jpg" alt="" /></div>
                                <div><img src="images/listing-01.jpg" alt="" /></div>
                            </div>
                        </a>
                            <div className="utf-listing-content">
                                <div className="utf-listing-title">
                                    <span className="utf-listing-price">$22,000/mo</span>
                                    <h4><a href="single-property-page-1.html">Renovated Luxury Apartment</a></h4>
                                    <span className="utf-listing-address"><i className="icon-material-outline-location-on"></i> 2021 San Pedro, Los Angeles 90015</span>
                                </div>
                                <ul className="utf-listing-features">
                                    <li><i className="fa fa-bed"></i> Beds<span>3</span></li>
                                    <li><i className="icon-feather-codepen"></i> Baths<span>2</span></li>
                                    <li><i className="fa fa-car"></i> Garages<span>2</span></li>
                                    <li><i className="icon-line-awesome-arrows"></i> Sq Ft<span>1530</span></li>
                                </ul>
                                <div className="utf-listing-user-info"><a href="agents-profile.html"><i className="icon-line-awesome-user"></i> John Williams</a> <span>1 Days Ago</span></div>
                            </div>
                        </div>
                        {/* <!-- Listing Item / End --> */}

                        {/* <!-- Listing Item --> */}
                        <div className="utf-listing-item"> <a href="single-property-page-1.html" className="utf-smt-listing-img-container">
                            <div className="utf-listing-badges-item"> <span className="for-rent">For Rent</span> </div>
                            <div className="utf-listing-img-content-item">
                                <img className="utf-user-picture" src="images/user_1.jpg" alt="user_1" />
                                <span className="like-icon with-tip" data-tip-content="Bookmark"></span>
                                <span className="compare-button with-tip" data-tip-content="Add to Compare"></span>
                                <span className="video-button with-tip" data-tip-content="Video"></span>
                            </div>
                            <img src="images/listing-02.jpg" alt="" /> </a>
                            <div className="utf-listing-content">
                                <div className="utf-listing-title">
                                    <span className="utf-listing-price">$20,000/mo</span>
                                    <h4><a href="single-property-page-1.html">Renovated Luxury Apartment</a></h4>
                                    <span className="utf-listing-address"><i className="icon-material-outline-location-on"></i> 2021 San Pedro, Los Angeles 90015</span>
                                </div>
                                <ul className="utf-listing-features">
                                    <li><i className="fa fa-bed"></i> Beds<span>3</span></li>
                                    <li><i className="icon-feather-codepen"></i> Baths<span>2</span></li>
                                    <li><i className="fa fa-car"></i> Garages<span>2</span></li>
                                    <li><i className="icon-line-awesome-arrows"></i> Sq Ft<span>1530</span></li>
                                </ul>
                                <div className="utf-listing-user-info"><a href="agents-profile.html"><i className="icon-line-awesome-user"></i> John Williams</a> <span>1 Days Ago</span></div>
                            </div>
                        </div>
                        {/* <!-- Listing Item / End --> */}

                        {/* <!-- Listing Item --> */}
                        <div className="utf-listing-item"> <a href="single-property-page-1.html" className="utf-smt-listing-img-container">
                            <div className="utf-listing-badges-item"> <span className="featured">Featured</span> <span className="for-rent">For Rent</span> </div>
                            <div className="utf-listing-img-content-item">
                                <img className="utf-user-picture" src="images/user_1.jpg" alt="user_1" />
                                <span className="like-icon with-tip" data-tip-content="Bookmark"></span>
                                <span className="compare-button with-tip" data-tip-content="Add to Compare"></span>
                                <span className="video-button with-tip" data-tip-content="Video"></span>
                            </div>
                            <img src="images/listing-03.jpg" alt="" /> </a>
                            <div className="utf-listing-content">
                                <div className="utf-listing-title">
                                    <span className="utf-listing-price">$18,000/mo</span>
                                    <h4><a href="single-property-page-1.html">Renovated Luxury Apartment</a></h4>
                                    <span className="utf-listing-address"><i className="icon-material-outline-location-on"></i> 2021 San Pedro, Los Angeles 90015</span>
                                </div>
                                <ul className="utf-listing-features">
                                    <li><i className="fa fa-bed"></i> Beds<span>3</span></li>
                                    <li><i className="icon-feather-codepen"></i> Baths<span>2</span></li>
                                    <li><i className="fa fa-car"></i> Garages<span>2</span></li>
                                    <li><i className="icon-line-awesome-arrows"></i> Sq Ft<span>1530</span></li>
                                </ul>
                                <div className="utf-listing-user-info"><a href="agents-profile.html"><i className="icon-line-awesome-user"></i> John Williams</a> <span>1 Days Ago</span></div>
                            </div>
                        </div>
                        {/* <!-- Listing Item / End --> */}

                        {/* <!-- Listing Item --> */}
                        <div className="utf-listing-item"> <a href="single-property-page-1.html" className="utf-smt-listing-img-container">
                            <div className="utf-listing-badges-item"> <span className="for-sale">For Sale</span> </div>
                            <div className="utf-listing-img-content-item">
                                <img className="utf-user-picture" src="images/user_1.jpg" alt="user_1" />
                                <span className="like-icon with-tip" data-tip-content="Bookmark"></span>
                                <span className="compare-button with-tip" data-tip-content="Add to Compare"></span>
                                <span className="video-button with-tip" data-tip-content="Video"></span>
                            </div>
                            <div className="utf-listing-carousel-item">
                                <div><img src="images/listing-04.jpg" alt="" /></div>
                                <div><img src="images/listing-04.jpg" alt="" /></div>
                            </div>
                        </a>
                            <div className="utf-listing-content">
                                <div className="utf-listing-title">
                                    <span className="utf-listing-price">$16,000/mo</span>
                                    <h4><a href="single-property-page-1.html">Renovated Luxury Apartment</a></h4>
                                    <span className="utf-listing-address"><i className="icon-material-outline-location-on"></i> 2021 San Pedro, Los Angeles 90015</span>
                                </div>
                                <ul className="utf-listing-features">
                                    <li><i className="fa fa-bed"></i> Beds<span>3</span></li>
                                    <li><i className="icon-feather-codepen"></i> Baths<span>2</span></li>
                                    <li><i className="fa fa-car"></i> Garages<span>2</span></li>
                                    <li><i className="icon-line-awesome-arrows"></i> Sq Ft<span>1530</span></li>
                                </ul>
                                <div className="utf-listing-user-info"><a href="agents-profile.html"><i className="icon-line-awesome-user"></i> John Williams</a> <span>1 Days Ago</span></div>
                            </div>
                        </div>
                        {/* <!-- Listing Item / End --> */}

                        {/* <!-- Listing Item --> */}
                        <div className="utf-listing-item"> <a href="single-property-page-1.html" className="utf-smt-listing-img-container">
                            <div className="utf-listing-badges-item"> <span className="for-sale">For Sale</span> </div>
                            <div className="utf-listing-img-content-item">
                                <img className="utf-user-picture" src="images/user_1.jpg" alt="user_1" />
                                <span className="like-icon with-tip" data-tip-content="Bookmark"></span>
                                <span className="compare-button with-tip" data-tip-content="Add to Compare"></span>
                                <span className="video-button with-tip" data-tip-content="Video"></span>
                            </div>
                            <img src="images/listing-05.jpg" alt="" /> </a>
                            <div className="utf-listing-content">
                                <div className="utf-listing-title">
                                    <span className="utf-listing-price">$18,000/mo</span>
                                    <h4><a href="single-property-page-1.html">Renovated Luxury Apartment</a></h4>
                                    <span className="utf-listing-address"><i className="icon-material-outline-location-on"></i> 2021 San Pedro, Los Angeles 90015</span>
                                </div>
                                <ul className="utf-listing-features">
                                    <li><i className="fa fa-bed"></i> Beds<span>3</span></li>
                                    <li><i className="icon-feather-codepen"></i> Baths<span>2</span></li>
                                    <li><i className="fa fa-car"></i> Garages<span>2</span></li>
                                    <li><i className="icon-line-awesome-arrows"></i> Sq Ft<span>1530</span></li>
                                </ul>
                                <div className="utf-listing-user-info"><a href="agents-profile.html"><i className="icon-line-awesome-user"></i> John Williams</a> <span>1 Days Ago</span></div>
                            </div>
                        </div>
                        {/* <!-- Listing Item / End --> */}

                        {/* <!-- Listing Item --> */}
                        <div className="utf-listing-item"> <a href="single-property-page-1.html" className="utf-smt-listing-img-container">
                            <div className="utf-listing-badges-item"> <span className="for-rent">For Rent</span> </div>
                            <div className="utf-listing-img-content-item">
                                <img className="utf-user-picture" src="images/user_1.jpg" alt="user_1" />
                                <span className="like-icon with-tip" data-tip-content="Bookmark"></span>
                                <span className="compare-button with-tip" data-tip-content="Add to Compare"></span>
                                <span className="video-button with-tip" data-tip-content="Video"></span>
                            </div>
                            <img src="images/listing-06.jpg" alt="" /> </a>
                            <div className="utf-listing-content">
                                <div className="utf-listing-title">
                                    <span className="utf-listing-price">$15,000/mo</span>
                                    <h4><a href="single-property-page-1.html">Old Town Manchester</a></h4>
                                    <span className="utf-listing-address"><i className="icon-material-outline-location-on"></i> 2021 San Pedro, Los Angeles 90015</span>
                                </div>
                                <ul className="utf-listing-features">
                                    <li><i className="fa fa-bed"></i> Beds<span>3</span></li>
                                    <li><i className="icon-feather-codepen"></i> Baths<span>2</span></li>
                                    <li><i className="fa fa-car"></i> Garages<span>2</span></li>
                                    <li><i className="icon-line-awesome-arrows"></i> Sq Ft<span>1530</span></li>
                                </ul>
                                <div className="utf-listing-user-info"><a href="agents-profile.html"><i className="icon-line-awesome-user"></i> John Williams</a> <span>1 Days Ago</span></div>
                            </div>
                        </div>

                        {/* <!-- Listing Item --> */}
                        <div className="utf-listing-item"> <a href="single-property-page-1.html" className="utf-smt-listing-img-container">
                            <div className="utf-listing-badges-item"> <span className="for-sale">For Sale</span> </div>
                            <div className="utf-listing-img-content-item">
                                <img className="utf-user-picture" src="images/user_1.jpg" alt="user_1" />
                                <span className="like-icon with-tip" data-tip-content="Bookmark"></span>
                                <span className="compare-button with-tip" data-tip-content="Add to Compare"></span>
                                <span className="video-button with-tip" data-tip-content="Video"></span>
                            </div>
                            <img src="images/listing-05.jpg" alt="" /> </a>
                            <div className="utf-listing-content">
                                <div className="utf-listing-title">
                                    <span className="utf-listing-price">$18,000/mo</span>
                                    <h4><a href="single-property-page-1.html">Renovated Luxury Apartment</a></h4>
                                    <span className="utf-listing-address"><i className="icon-material-outline-location-on"></i> 2021 San Pedro, Los Angeles 90015</span>
                                </div>
                                <ul className="utf-listing-features">
                                    <li><i className="fa fa-bed"></i> Beds<span>3</span></li>
                                    <li><i className="icon-feather-codepen"></i> Baths<span>2</span></li>
                                    <li><i className="fa fa-car"></i> Garages<span>2</span></li>
                                    <li><i className="icon-line-awesome-arrows"></i> Sq Ft<span>1530</span></li>
                                </ul>
                                <div className="utf-listing-user-info"><a href="agents-profile.html"><i className="icon-line-awesome-user"></i> John Williams</a> <span>1 Days Ago</span></div>
                            </div>
                        </div>
                        {/* <!-- Listing Item / End --> */}

                        {/* <!-- Listing Item --> */}
                        <div className="utf-listing-item"> <a href="single-property-page-1.html" className="utf-smt-listing-img-container">
                            <div className="utf-listing-badges-item"> <span className="for-rent">For Rent</span> </div>
                            <div className="utf-listing-img-content-item">
                                <img className="utf-user-picture" src="images/user_1.jpg" alt="user_1" />
                                <span className="like-icon with-tip" data-tip-content="Bookmark"></span>
                                <span className="compare-button with-tip" data-tip-content="Add to Compare"></span>
                                <span className="video-button with-tip" data-tip-content="Video"></span>
                            </div>
                            <img src="images/listing-06.jpg" alt="" /> </a>
                            <div className="utf-listing-content">
                                <div className="utf-listing-title">
                                    <span className="utf-listing-price">$15,000/mo</span>
                                    <h4><a href="single-property-page-1.html">Old Town Manchester</a></h4>
                                    <span className="utf-listing-address"><i className="icon-material-outline-location-on"></i> 2021 San Pedro, Los Angeles 90015</span>
                                </div>
                                <ul className="utf-listing-features">
                                    <li><i className="fa fa-bed"></i> Beds<span>3</span></li>
                                    <li><i className="icon-feather-codepen"></i> Baths<span>2</span></li>
                                    <li><i className="fa fa-car"></i> Garages<span>2</span></li>
                                    <li><i className="icon-line-awesome-arrows"></i> Sq Ft<span>1530</span></li>
                                </ul>
                                <div className="utf-listing-user-info"><a href="agents-profile.html"><i className="icon-line-awesome-user"></i> John Williams</a> <span>1 Days Ago</span></div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Listings Container / End --> */}

                    {/* <!-- Pagination --> */}
                    <div className="utf-pagination-container margin-top-20">
                        <nav className="pagination">
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-left"></i></a></li>
                                <li><a href="#" className="current-page">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li className="blank">...</li>
                                <li><a href="#">10</a></li>
                                <li><a href="#"><i className="fa fa-angle-right"></i></a></li>
                            </ul>
                        </nav>
                    </div>
                    {/* <!-- Pagination / End --> */}
                </div>

                {/* <!-- Sidebar --> */}
                <div className="col-md-4">
                    <div className="sidebar">
                        {/* <!-- Widget --> */}
                        <div className="widget utf-sidebar-widget-item">
                            <div className="utf-detail-banner-add-section">
                                <a href="#"><img src="images/banner-add-2.jpg" alt="banner-add-2" /></a>
                            </div>
                        </div>
                        {/* <!-- Widget / End--> */}

                        {/* <!-- Widget --> */}
                        <div className="widget utf-sidebar-widget-item">
                            <div className="utf-boxed-list-headline-item">
                                <h3>Find New Home</h3>
                            </div>
                            <div className="row with-forms">
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <select data-placeholder="Any Status" className="utf-chosen-select-single-item">
                                        <option>Any Status</option>
                                        <option>For Sale</option>
                                        <option>For Rent</option>
                                    </select>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6">
                                    <select data-placeholder="Any Type" className="utf-chosen-select-single-item">
                                        <option>Any Type</option>
                                        <option>Apartments</option>
                                        <option>Houses</option>
                                        <option>Commercial</option>
                                        <option>Garages</option>
                                        <option>Lots</option>
                                    </select>
                                </div>
                            </div>
                            {/* <!-- Row / End --> */}

                            {/* <!-- Row --> */}
                            <div className="row with-forms">
                                <div className="col-md-6">
                                    <select data-placeholder="Beds" className="utf-chosen-select-single-item">
                                        <option label="blank"></option>
                                        <option>Beds (Any)</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <select data-placeholder="Baths" className="utf-chosen-select-single-item">
                                        <option label="blank"></option>
                                        <option>Baths (Any)</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </div>
                            {/* <!-- Row / End --> */}

                            {/* <!-- Row --> */}
                            <div className="row with-forms">
                                <div className="col-md-12">
                                    <select data-placeholder="All States" className="chosen-select">
                                        <option>All States</option>
                                        <option>Alabama</option>
                                        <option>Alaska</option>
                                        <option>Arizona</option>
                                        <option>Arkansas</option>
                                        <option>California</option>
                                        <option>Colorado</option>
                                        <option>Connecticut</option>
                                        <option>Delaware</option>
                                        <option>Florida</option>
                                        <option>Georgia</option>
                                    </select>
                                </div>
                            </div>
                            {/* <!-- Row / End --> */}

                            {/* <!-- Row --> */}
                            <div className="row with-forms">
                                <div className="col-md-12">
                                    <select data-placeholder="All Cities" className="chosen-select">
                                        <option>All Cities</option>
                                        <option>New York</option>
                                        <option>Los Angeles</option>
                                        <option>Chicago</option>
                                        <option>Brooklyn</option>
                                        <option>Queens</option>
                                        <option>Houston</option>
                                        <option>Manhattan</option>
                                    </select>
                                </div>
                            </div>
                            {/* <!-- Row / End --> */}

                            {/* <!-- Area Range --> */}
                            <div className="utf-range-slider-item margin-top-10 margin-bottom-25">
                                <label>Area Range</label>
                                <div id="utf-area-range-item" data-min="0" data-max="1500" data-unit="sq ft"></div>
                                <div className="clearfix"></div>
                            </div>

                            {/* <!-- Price Range --> */}
                            <div className="utf-range-slider-item margin-bottom-10">
                                <label>Price Range</label>
                                <div id="utf-price-range-item" data-min="0" data-max="400000" data-unit="$"></div>
                                <div className="clearfix"></div>
                            </div>

                            {/* <!-- More Search Options --> */}
                            <a href="#" className="utf-utf-more-search-options-area-button margin-bottom-10 margin-top-20" data-open-title="More Search Option" data-close-title="Less Search Option"></a>
                            <div className="utf-more-search-options-area relative">
                                <div className="checkboxes one-in-row margin-bottom-10">
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
                                {/* <!-- Checkboxes / End --> */}
                            </div>
                            {/* <!-- More Search Options / End --> */}
                            <button className="button fullwidth margin-top-10">Search</button>
                        </div>
                        {/* <!-- Widget / End --> */}

                        {/* <!-- Widget --> */}
                        <div className="widget utf-sidebar-widget-item">
                            <div className="utf-boxed-list-headline-item">
                                <h3>Recently Viewed</h3>
                            </div>
                            <ul className="widget-tabs">
                                {/* <!-- Post #1 --> */}
                                <li>
                                    <div className="widget-content">
                                        <div className="widget-thumb"> <a href="blog-full-width-single-post.html"><img src="images/blog-widget-03.jpg" alt="" /></a> </div>
                                        <div className="widget-text">
                                            <h5><a href="blog-full-width-single-post.html">How to Woo a Recruiter and Land Your Dream.</a></h5>
                                            <span>$22,000/mo</span>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </li>

                                {/* <!-- Post #2 --> */}
                                <li>
                                    <div className="widget-content">
                                        <div className="widget-thumb"> <a href="blog-full-width-single-post.html"><img src="images/blog-widget-02.jpg" alt="" /></a> </div>
                                        <div className="widget-text">
                                            <h5><a href="blog-full-width-single-post.html">Hey Its Time To Get Up And Get Hired.</a></h5>
                                            <span>$22,000/mo</span>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </li>

                                {/* <!-- Post #3 --> */}
                                <li>
                                    <div className="widget-content">
                                        <div className="widget-thumb"> <a href="blog-full-width-single-post.html"><img src="images/blog-widget-01.jpg" alt="" /></a> </div>
                                        <div className="widget-text">
                                            <h5><a href="blog-full-width-single-post.html">The Best Canadian Merchant Account Providers.</a></h5>
                                            <span>$22,000/mo</span>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- Widget / End--> */}

                        {/* <!-- Widget --> */}
                        <div className="widget utf-sidebar-widget-item">
                            <div className="utf-boxed-list-headline-item">
                                <h3>Property Categorie</h3>
                                <div className="utf-sidebar-categorie">
                                    <ul>
                                        <li><a href="#">Apartment</a><span>10 Property</span></li>
                                        <li><a href="#">Condo</a><span>14 Property</span></li>
                                        <li><a href="#">Family House</a><span>18 Property</span></li>
                                        <li><a href="#">Modern Villa</a><span>12 Property</span></li>
                                        <li><a href="#">Town House</a><span>10 Property</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Widget / End--> */}

                        {/* <!-- Widget --> */}
                        <div className="widget utf-sidebar-widget-item">
                            <div className="utf-boxed-list-headline-item">
                                <h3>Property Tags Cloud</h3>
                                <div className="task-tags">
                                    <a href="#"><span>Apartment</span></a>
                                    <a href="#"><span>Family House</span></a>
                                    <a href="#"><span>Modern Villa</span></a>
                                    <a href="#"><span>Town House</span></a>
                                    <a href="#"><span>Condo</span></a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Widget / End--> */}

                        {/* <!-- Widget --> */}
                        <div className="widget utf-sidebar-widget-item">
                            <div className="utf-boxed-list-headline-item">
                                <h3>Social Sharing</h3>
                            </div>
                            <ul className="utf-social-icons rounded">
                                <li><a className="facebook" href="#"><i className="icon-facebook"></i></a></li>
                                <li><a className="twitter" href="#"><i className="icon-twitter"></i></a></li>
                                <li><a className="linkedin" href="#"><i className="icon-linkedin"></i></a></li>
                                <li><a className="instagram" href="#"><i className="icon-instagram"></i></a></li>
                                <li><a className="gplus" href="#"><i className="icon-gplus"></i></a></li>
                            </ul>
                            <div className="clearfix"></div>
                        </div>
                        {/* <!-- Widget / End--> */}
                        <div className="clearfix"></div>
                    </div>
                </div>
                {/* <!-- Sidebar / End --> */}
            </div>
        </div>
    )
}
