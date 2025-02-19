import FooterView from '@/components/home/footer';
import { deleteItem, getComments, getProductById, hideItem, postPropertyComment } from '@/connections/get-property';
import { Comment, PropertyPackage } from '@/connections/interfaces';
import { showError, showSuccess } from '@/functions/toast';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { CgSmile, CgSpinner } from 'react-icons/cg';
import { ProgressBar } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { formatAmount } from '@/functions/formats';
import { FaEye, FaPhone } from 'react-icons/fa';
import { MdDelete, MdEmail, MdOutlineHideSource } from 'react-icons/md';
import OpenChainsDialog from '@/components/pages/widgets/open-chains-dialog';
import BannerPage from '@/components/pages/banner-page';
import { useSearchParams } from 'next/navigation';
import CommentList from '@/components/pages/widgets/comments-list';
const HeaderView = dynamic(() => import('@/components/home/header'), { ssr: false });
export default function CatalogItem() {
    const searchParams = useSearchParams();
    const imgRef = useRef<ImageGallery>(null)
    const [message, setMessage] = useState("")
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(true)
    const [showMore, setShowMore] = useState(false)
    const [hideDialog, setHideDialog] = useState(false)
    const [commenting, setCommenting] = useState(false)
    const [loadingHide, setLoadingHide] = useState(false)
    const [comments, setComments] = useState<Comment[]>([])
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [commentsLoading, setCommentsLoading] = useState(true)
    const [packet, setPropertyPacket] = useState<PropertyPackage | null>(null)
    const fetchAllComments = async () => {
        setCommentsLoading(true)
        const response = await getComments(searchParams.get("q") ?? '')
        setCommentsLoading(false)
        if (typeof response === 'string') return
        console.log("The response is ", response)
        return setComments(response)
    }
    const postComment = async () => {
        if (commenting) return
        setCommenting(true)
        const response = await postPropertyComment(comment, packet?.property._id ?? "")
        setCommenting(false)
        if (typeof response === 'string') return showError(response)
        setComment("")
        return showSuccess("posted")
    }
    const hideItemCall = async () => {
        setLoadingHide(true)
        const result = await hideItem(packet?.property._id ?? '', !packet?.property.hidden)
        setLoadingHide(false)
        if (typeof result === 'string') {
            return showError(result)
        }
        Router.reload()
        return showSuccess("The item is successfully made " + packet?.property.hidden ? 'public' : 'private')
    }
    const deleteItemCall = async () => {
        setLoadingHide(true)
        const result = await deleteItem(packet?.property._id ?? '')
        setLoadingHide(false)
        if (typeof result === 'string') {
            return showError(result)
        }
        Router.replace("/uploads")
        return showSuccess("The item is successfully deleted successfully ")
    }
    const fetch_item = async (id: string) => {
        if (id.length === 0) return
        setLoading(true)
        const data = await getProductById(id)
        setLoading(false)
        if (typeof data === 'string') {
            setMessage(data)
            return showError(data)
        }
        setPropertyPacket(data)
        fetchAllComments()
    }
    useEffect(() => {
        fetch_item(searchParams.get("q") ?? '')
    }, [searchParams])
    return (
        <>
            <OpenChainsDialog className={''}
                onCloseDialog={() => {
                    setHideDialog(false)
                }}
                onAcceptDialog={() => {
                    setHideDialog(false)
                    hideItemCall()
                }}
                title={packet?.property.hidden ? 'Show Item?' : 'Hide item?'}
                content={<>Are you sure to {packet?.property.hidden ? 'show' : 'hide'} Property</>} shown={hideDialog} />
            <OpenChainsDialog className={''}
                onCloseDialog={() => {
                    setDeleteDialog(false)
                }}
                onAcceptDialog={() => {
                    setDeleteDialog(false)
                    deleteItemCall()
                }}
                title={'Delete ' + packet?.property.propertyTitle}
                content={<>Are you sure to delete this Property .This is permanent and irreversible</>} shown={deleteDialog} />
            {
                loading ? <div className='w-screen h-screen flex justify-center items-center'>
                    <ProgressBar />
                </div>
                    :
                    <>
                        {packet ?
                            <div id="wrapper">
                                {packet.property.hidden &&

                                    <div className='fixed bottom-0 left-0 right-0 p-5 z-50 bg-red-600 text-white flex justify-center items-center'>
                                        This item is not visible to the public
                                    </div>
                                }
                                <ToastContainer />
                                <HeaderView page='product' sub={'product'} />
                                <BannerPage title={packet.property.propertyTitle} path={[
                                    {
                                        root: "/",
                                        title: "home"
                                    },
                                    {
                                        root: packet.owned ? '/uploads' : '/listings',
                                        title: "items"
                                    },
                                    {
                                        root: '',
                                        title: packet.property.propertyTitle.trim().split(" ")[0].toLowerCase()
                                    }
                                ]} />
                                <div className="container">
                                    <div className="row margin-bottom-50 " style={{
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundImage: packet.property.images.length > 0 ?
                                            `url("${process.env.NEXT_PUBLIC_SERVERT}${packet.property.images[1]}")` : ''
                                    }}>
                                        <div className='bg-[#00000099] backdrop-blur-xl'>
                                            <ImageGallery

                                                ref={imgRef}
                                                renderItem={(e) => {
                                                    return <div className='flex justify-center' style={{
                                                        height: "400px"
                                                    }}>
                                                        <img src={e.original} alt='img' />
                                                    </div>
                                                }}
                                                items={
                                                    packet.property.images.map((e) => {
                                                        return {
                                                            original: `${process.env.NEXT_PUBLIC_SERVERT}${e}`,
                                                            thumbnail: `${process.env.NEXT_PUBLIC_SERVERT}${e}`,
                                                        }
                                                    })
                                                } />;
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row">

                                        {/* <!-- Property Description --> */}
                                        <div className="col-lg-8 col-md-7">
                                            {/* <!-- Titlebar --> */}
                                            <div id="titlebar-dtl-item" className="property-titlebar margin-bottom-0">
                                                <div className="property-title">
                                                    <div className='flex flex-wrap gap-x-5'>
                                                        <div className="property-pricing">${formatAmount(packet.property.price, 3)}</div>
                                                        <div className=" flex flex-row gap-x-3 items-center "><FaEye />{formatAmount(packet.property.views, 0)} views</div>
                                                    </div>
                                                    <h2>{packet.property.propertyTitle} <span className="property-badge-sale">For {packet.property.propertyState} </span></h2>
                                                    <span className="utf-listing-address"><i className="icon-material-outline-location-on"></i>
                                                        {packet.property.address} {packet.property.city}
                                                    </span>
                                                    <ul className="property-main-features">
                                                        <li>Baths<span>{packet.property.bathrooms}</span></li>
                                                        <li>Beds<span>{packet.property.bedrooms}</span></li>
                                                        <li>Area<span>{packet.property.area}</span></li>
                                                    </ul>
                                                </div>
                                                {packet.owned &&
                                                    <div className='flex gap-x-8 items-center flex-wrap p-3 mt-8'>
                                                        <button className='gap-2 flex items-center p-3 rounded-xl bg-red-600 text-white'
                                                            onClick={() => setDeleteDialog(true)}>
                                                            <MdDelete /> delete</button>
                                                        {
                                                            packet.property.hidden ?
                                                                <button className='gap-2 flex items-center p-3 rounded-xl bg-green-500 text-white'
                                                                    onClick={() => setHideDialog(true)}>
                                                                    {
                                                                        loadingHide ?
                                                                            <CgSpinner className='animate-spin' /> :
                                                                            <><MdOutlineHideSource />Show</>
                                                                    }</button>
                                                                :
                                                                <button className='gap-2 flex items-center p-3 rounded-xl bg-orange-600 text-white'
                                                                    onClick={() => setHideDialog(true)}>
                                                                    {
                                                                        loadingHide ?
                                                                            <CgSpinner className='animate-spin' /> :
                                                                            <><MdOutlineHideSource />hide</>
                                                                    }</button>
                                                        }
                                                    </div>
                                                }
                                            </div>

                                            <div className="property-description">
                                                {/* <!-- Description --> */}
                                                <div className="utf-desc-headline-item">
                                                    <h3><i className="icon-material-outline-description"></i> Property Description</h3>
                                                </div>
                                                <div className={showMore ? '' : "show-more"}>
                                                    {packet.property.description}
                                                    <button onClick={() => {
                                                        setShowMore(!showMore)
                                                    }} className="show-more-button">Show More <i className="sl sl-icon-plus"></i></button>
                                                </div>

                                                {/* <!-- Details --> */}
                                                <div className="utf-desc-headline-item">
                                                    <h3><i className="sl sl-icon-briefcase"></i> Property Details</h3>
                                                </div>
                                                <ul className="property-features margin-top-0">
                                                    <li>Property ID: <span>{packet.property._id}</span></li>
                                                    <li>Price: <span>${packet.property.price}</span></li>
                                                    <li>Property Size: <span>{packet.property.area}</span></li>
                                                    <li>Year Built: <span>15 Jan, 2010</span></li>
                                                    <li>Bedrooms: <span>{packet.property.bedrooms}</span></li>
                                                    <li>Bathrooms: <span>{packet.property.bathrooms}</span></li>
                                                    <li>Property Type: <span>{packet.property.propertyType}</span></li>
                                                    <li>Property Status: <span>{packet.property.propertyState}</span></li>
                                                </ul>

                                                {/* <!-- Details --> */}
                                                <div className="utf-desc-headline-item">
                                                    <h3><i className="icon-material-outline-business"></i> Additional Details</h3>
                                                </div>
                                                <ul className="property-features margin-top-0">
                                                    <li>Deposit: <span>28%</span></li>
                                                    <li>Pool Size: <span>300 Sq Ft</span></li>
                                                    <li>Additional Rooms: <span>Guest Bath</span></li>
                                                    <li>Last Remodel Year: <span>2010</span></li>
                                                    <li>Amenities: <span>Clubhouse</span></li>
                                                    <li>Equipment: <span>Grill - Gas</span></li>
                                                </ul>

                                                {/* <!-- Features --> */}
                                                <div className="utf-desc-headline-item">
                                                    <h3><i className="sl sl-icon-briefcase"></i> Property Features</h3>
                                                </div>
                                                <ul className="property-features checkboxes margin-top-0">
                                                    {packet.property.wifi === '1' && <li>WiFi</li>}
                                                    {packet.property.security === '1' && <li>Security</li>}
                                                    {packet.property.tiles === '1' && <li>Tiles</li>}
                                                    {packet.property.durawall === '1' && <li>DuraWall</li>}
                                                    {packet.property.electricity === '1' && <li>Electricity</li>}
                                                    {packet.property.ceiling === '1' && <li>Ceiling</li>}
                                                    {packet.property.stoves === '1' && <li>Stoves</li>}
                                                    {packet.property.studyRoom === '1' && <li>Study Rooms</li>}
                                                </ul>


                                                {/* <!-- Location --> */}
                                                <div className="utf-desc-headline-item">
                                                    <h3><i className="icon-material-outline-location-on"></i> Property Location</h3>
                                                </div>
                                                <div id="propertyMap-container">
                                                    <div id="propertyMap" data-latitude="48.8566" data-longitude="2.3522" data-map-icon="im im-icon-Hamburger"></div>
                                                    <a href="#" id="streetView">Street View</a>
                                                </div>
                                                <div className="clearfix"></div>
                                                <div className="margin-top-35"></div>
                                            </div>
                                        </div>
                                        {/* <!-- Property Description / End --> */}

                                        {/* <!-- Sidebar --> */}
                                        <div className="col-lg-4 col-md-5">
                                            <div className="sidebar">
                                                <div className="widget utf-sidebar-widget-item">
                                                    <div className="utf-detail-banner-add-section">
                                                        <a href="#">
                                                            <img src="images/banner-add-2.jpg" alt="banner-add-2" /></a>
                                                    </div>
                                                </div>

                                                {/* <!-- Widget --> */}
                                                <div className="widget utf-sidebar-widget-item">
                                                    <div className="utf-boxed-list-headline-item">
                                                        <h3>Property Details</h3>
                                                    </div>
                                                    <button className="widget-button with-tip" data-tip-content="Share Property"><i className="sl sl-icon-share"></i></button>
                                                    <button className="widget-button with-tip" data-tip-content="Bookmark Property"><i className="fa fa-heart"></i></button>
                                                    <button className="widget-button with-tip compare-widget-button" data-tip-content="Add to Compare"></button>
                                                    <button className="widget-button with-tip" data-tip-content="Property Location"><i className="sl sl-icon-map"></i></button>
                                                    <button className="widget-button with-tip" data-tip-content="Print Property"><i className="sl sl-icon-printer"></i></button>
                                                    <div className="clearfix"></div>
                                                </div>
                                                {/* <!-- Widget / End --> */}

                                                {/* <!-- Widget --> */}
                                                <div className="widget utf-sidebar-widget-item">
                                                    <div className="agent-widget">
                                                        <div className="utf-boxed-list-headline-item">
                                                            <h3 className='flex items-center gap-x-3'>Agents Details{packet.owned ? <div className='bg-green-500 text-white p-3 rounded-full text-sm w-fit'>you</div> : <></>}</h3>
                                                        </div>
                                                        <div className="agent-title">
                                                            <div className="agent-photo">
                                                                <img src={
                                                                    packet.property.owner.profile.length > 0 ?
                                                                        `${process.env.NEXT_PUBLIC_SERVERT}${packet.property.owner.profile}` :
                                                                        "images/default/nouser.jpg"
                                                                } alt="" />
                                                            </div>
                                                            <div className="flex flex-col gap-y-4">
                                                                <h4><a href="#">{packet.property.firstName}</a></h4>
                                                                <span className='flex gap-x-2 items-center'><a href={`tel:${packet.property.phone}`} className='flex items-center gap-x-2'>
                                                                    <FaPhone />{packet.property.phone}</a>
                                                                </span>
                                                                <span className='flex gap-x-2 items-center'>
                                                                    <a href={`mailto:${packet.property.email}`} className='flex items-center gap-x-2'>
                                                                        <MdEmail />{packet.property.email}
                                                                    </a>
                                                                </span>
                                                                <span className='flex gap-x-2 items-center'>
                                                                    {packet.owned ? <>
                                                                        <button className='p-3 bg-primary text-white rounded-full'
                                                                            onClick={() => {
                                                                                Router.push("/uploads")
                                                                            }}>View My Listings</button>
                                                                    </> :
                                                                        <>
                                                                            <button className='p-3 bg-primary text-white rounded-full'
                                                                                onClick={() => {
                                                                                    Router.push("/listings?uploader=" + packet.property.uploader)
                                                                                }}>View Agent Listings</button>
                                                                        </>
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </div>
                                                        {packet.owned ? <></> : <>
                                                            <textarea value={comment} onChange={(e) => setComment(e.target.value)}>
                                                            </textarea>
                                                            <button className="button fullwidth margin-top-5" onClick={() => {
                                                                if (!packet.registered) return showError("please login to comment")
                                                                postComment()
                                                            }}>Post Comment</button>
                                                        </>}
                                                    </div>
                                                </div>
                                                {/* <!-- Widget / End --> */}

                                                {/* <!-- Widget --> */}
                                                <div className="widget utf-sidebar-widget-item">
                                                    <div className="utf-boxed-list-headline-item">
                                                        <h3>Find New Home</h3>
                                                    </div>
                                                    <div className="row with-htmlForms">
                                                        <div className="col-md-6 col-sm-6 col-xs-6">
                                                            <select data-placeholder="Any Status" className="utf-chosen-select-single-item">
                                                                <option>Any Status</option>
                                                                <option>htmlFor Sale</option>
                                                                <option>htmlFor Rent</option>
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
                                                    <div className="row with-htmlForms">
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
                                                    <div className="row with-htmlForms">
                                                        <div className="col-md-12">
                                                            <select data-placeholder="All States" className="chosen-select">
                                                                <option>All States</option>
                                                                <option>Alabama</option>
                                                                <option>Alaska</option>
                                                                <option>Arizona</option>
                                                                <option>Arkansas</option>
                                                                <option>CalihtmlFornia</option>
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
                                                    <div className="row with-htmlForms">
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
                                            </div>
                                        </div>
                                        {/* <!-- Sidebar / End --> */}
                                    </div>
                                    {commentsLoading ? <div></div>
                                        : <CommentList comments={comments} />}
                                </div>
                                <FooterView />

                            </div > :
                            <div className='flex w-screen h-screen justify-center items-center flex-col'>
                                <span><CgSmile size={25} color='orange' /></span>
                                {message}
                            </div>}</>
            }
        </>
    )
}
