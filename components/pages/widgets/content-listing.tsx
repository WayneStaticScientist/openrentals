import { Property } from '@/connections/interfaces'
import { getLastDay } from '@/functions/time-format'
import Router from 'next/router'
import { BiPlus } from 'react-icons/bi'
import { RiSearchFill } from 'react-icons/ri'
import { ProgressBar } from 'react-loader-spinner'

export default function ContentListing({ loading, list, fromSearch, searchTitle }:
    {
        loading: boolean,
        fromSearch: boolean,
        searchTitle: string,
        list: Property[]
    }) {

    return (
        <div className="container">
            {
                loading ?
                    <div className='flex w-full h-full items-center justify-center flex-col mb-10'>
                        <ProgressBar />
                        Fetching Data
                    </div>
                    :
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
                            <div className="utf-listings-container-area list-layout flex-col flex gap-y-12">
                                <div className='my-10 text-5xl'>
                                    {fromSearch &&
                                        <div>Your search results {searchTitle.length > 0 &&
                                            <>for<span className='text-orange-700 font-thin'>  {searchTitle}</span></>
                                        }</div>
                                    }
                                </div>
                                {list.length > 0 ? <>{
                                    list.map((e, i) => {
                                        return <div style={{
                                            height: "300px",

                                        }} key={i} className="flex cursor-pointer  shadow-md" onClick={() => {
                                            Router.push("/catalogs?q=" + e._id)
                                        }}>
                                            <span className=" relative">
                                                <div className="absolute w-full flex justify-end">
                                                    <span className="for-sale bg-green-500 text-white p-1 m-3 text-lg rounded-3xl">
                                                        for {e.propertyState}</span></div>
                                                <div className="utf-listing-img-content-item">
                                                    <span className="like-icon with-tip" data-tip-content="Bookmark"></span>
                                                    <span className="compare-button with-tip" data-tip-content="Add to Compare"></span>
                                                    <span className="video-button with-tip" data-tip-content="Video"></span>
                                                </div>
                                                <div className="utf-listing-carousel-item h-full">
                                                    <div className=''>
                                                        <div className=''
                                                            style={{
                                                                backgroundSize: "cover",
                                                                backgroundRepeat: "no-repeat",
                                                                backgroundPosition: "center",
                                                                width: "300px",
                                                                height: "300px",
                                                                backgroundImage: e.images.length > 0 ? `url(${process.env.NEXT_PUBLIC_SERVERT}${e.images[0]})` : "url(images/listing-02.jpg)"
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                            </span>
                                            <div className="flex flex-col">
                                                <div className="p-6">
                                                    <span className="utf-listing-price bg-green-500 rounded-lg p-3 text-white">${e.price}{e.propertyState === "rent" && <>/{e.propertyInstallments}</>}</span>
                                                    <h4><a href={`/catalogs?q=${e._id}`}>{e.propertyTitle}</a></h4>
                                                    <span className="utf-listing-address"><i className="icon-material-outline-location-on"></i> {e.address} {e.city}</span>
                                                </div>
                                                <ul className="utf-listing-features">
                                                    <li><i className="fa fa-bed"></i> Beds<span>{e.bedrooms}</span></li>
                                                    <li><i className="icon-feather-codepen"></i> Baths<span>{e.bathrooms}</span></li>
                                                    <li><i className="fa fa-car"></i> Rooms<span>{e.rooms}</span></li>
                                                    <li><i className="icon-line-awesome-arrows"></i> Sq m<span>{e.area}</span></li>
                                                </ul>
                                                <div className="utf-listing-user-info"><a href="agents-profile.html"><i className="icon-line-awesome-user">
                                                </i>{e.firstName}</a> <span>{getLastDay(e.date)} Ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                                </> :
                                    <div className='w-full h-full flex flex-col items-center justify-center p-3 gap-y-5 mb-12'>
                                        <RiSearchFill />
                                        <span className='flex items-center'>
                                            No Results where found for this listing click <BiPlus /> upload to add new
                                        </span>
                                        <button onClick={() => {
                                            Router.push("/upload")
                                        }} className='flex bg-primary p-4  items-center'><BiPlus /> upload property</button>
                                    </div>}
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
                    </div >
            }
        </div >
    )
}
