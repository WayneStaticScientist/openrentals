import Router from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import ImageGallery from "react-image-gallery";
import { FaBed, FaComment, FaEye, FaPhone } from 'react-icons/fa';
import FooterView from '@/components/home/footer';
import { ProgressBar } from 'react-loader-spinner';
import { CgSmile, CgSpinner } from 'react-icons/cg';
import { useSearchParams } from 'next/navigation';
import { formatAmount } from '@/functions/formats';
import BannerPage from '@/components/pages/banner-page';
import React, { useEffect, useRef, useState } from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import { showError, showSuccess } from '@/functions/toast';
import CommentList from '@/components/pages/widgets/comments-list';
import { MdDelete, MdEmail, MdOutlineHideSource } from 'react-icons/md';
import OpenChainsDialog from '@/components/pages/widgets/open-chains-dialog';
import { RouteToPaymentGateway } from '@/components/pages/forms/payment-forms';
import { CatalogueHold, Comment, PropertyPackage } from '@/connections/interfaces';
const HeaderView = dynamic(() => import('@/components/home/header'), { ssr: false });
import { deleteItem, getComments, getProductById, hideItem, postPropertyComment, syncProductWithUser } from '@/connections/get-property';
import BoughtComponent from '@/components/bought';
import { FaBath } from 'react-icons/fa6';
import { BiArea } from 'react-icons/bi';
import { getUser } from '@/functions/device';
export default function CatalogItem() {
    const searchParams = useSearchParams();
    const imgRef = useRef<ImageGallery>(null)
    const [message, setMessage] = useState("")
    const [comment, setComment] = useState("")
    const [bought, setBought] = useState<CatalogueHold | null>(null)
    const [loading, setLoading] = useState(true)
    const [showMore, setShowMore] = useState(false)
    const [resyncing, setResynching] = useState(false)
    const [paymentId, setPaymentId] = useState("cash")
    const [hideDialog, setHideDialog] = useState(false)
    const [commenting, setCommenting] = useState(false)
    const [loadingHide, setLoadingHide] = useState(false)
    const [comments, setComments] = useState<Comment[]>([])
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [commentsLoading, setCommentsLoading] = useState(true)
    const [showPaymentDialog, setShowPaymentDialog] = useState(false)
    const [packet, setPropertyPacket] = useState<PropertyPackage | null>(null)
    const fetchAllComments = async () => {
        setCommentsLoading(true)
        const response = await getComments(searchParams.get("q") ?? '')
        setCommentsLoading(false)
        if (typeof response === 'string') return
        return setComments(response)
    }
    const resyncProduct = async () => {
        setResynching(true)
        const resp = await syncProductWithUser(searchParams.get("q") ?? '')
        setResynching(false)
        if (typeof resp === 'string') return showError(resp)
        showSuccess("Resync success ? Reload the page to see changes")
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
    const check_bought = () => {
        const user = getUser()
        if (!user) return
        if (user.catalogsItems && searchParams.get("q")) {
            setBought(user.catalogsItems.find(e => e.id === (searchParams.get("q") ?? '')) ?? null)
            console.log("found ", user.catalogsItems);
        }
    }
    const fetch_item = async (id: string) => {
        if (id.length === 0 || !searchParams.get("q")) return
        setLoading(true)
        const data = await getProductById(id)
        setLoading(false)
        if (typeof data === 'string') {
            setMessage(data)
            return showError(data)
        }
        setPropertyPacket(data)
        check_bought()
        fetchAllComments()
    }
    useEffect(() => {
        fetch_item(searchParams.get("q") ?? '')
    }, [searchParams])
    return (
        <>
            {showPaymentDialog && <RouteToPaymentGateway id={paymentId} onClose={() => {
                check_bought()
                setShowPaymentDialog(false)
            }} product={packet!} />}
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
                                            <div id="titlebar-dtl-item" className="shadow-sm margin-bottom-0 p-6">
                                                <div className="property-title">
                                                    <div className='flex flex-wrap gap-x-5'>
                                                        <div className="text-5xl text-green-500">${formatAmount(packet.property.price, 2)}
                                                            {packet.property.propertyState === 'rent' && <div className='text-primary inline'>/{packet.property.propertyInstallments}</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <h2>{packet.property.propertyTitle} <span className="property-badge-sale">For {packet.property.propertyState} </span></h2>
                                                    <div className='flex gap-x-5 '>
                                                        <div className=" flex flex-row gap-x-3 items-center "><FaEye />{formatAmount(packet.property.views, 0)} views</div>
                                                        <div className=" flex flex-row gap-x-3 items-center "><FaComment />{formatAmount(0, 0)} comments</div>
                                                    </div>
                                                    <span className="utf-listing-address"><i className="icon-material-outline-location-on"></i>
                                                        {packet.property.address} {packet.property.city}
                                                    </span>
                                                    <hr />
                                                    <div className="gap-x-6 flex flex-wrap">
                                                        <li className='flex gap-x-2 items-center'> <FaBath /> Baths<span>{packet.property.bathrooms}</span></li>
                                                        <li className='flex gap-x-2 items-center'><FaBed /> Beds<span> {packet.property.bedrooms}</span></li>
                                                        <li className='flex gap-x-2 items-center'><BiArea /> Area<span>{packet.property.area}</span></li>
                                                    </div>
                                                </div>
                                                {packet.owned ?
                                                    <div>
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
                                                        <div className=' cursor-pointer w-full  p-6 justify-between flex items-center border-t-2 border-[#00000011]'>
                                                            <span>{packet.property.paymentRequests} Payment requests</span>
                                                            <button className='button'>view all</button>
                                                        </div>
                                                    </div>
                                                    :
                                                    <>
                                                        {
                                                            bought ?
                                                                <div className='mt-8'>
                                                                    <BoughtComponent state={bought} />
                                                                </div> :
                                                                <div className='mt-12 flex flex-wrap gap-x-6'>
                                                                    {packet.property.cash === "1" &&
                                                                        <div className='p-3 bg-white rounded-3xl w-fit h-20 cursor-pointer'
                                                                            onClick={() => {
                                                                                if (!packet.property.owner.cashPayment) return showError("User has not set payment method for this option YET? Contact Him/Her")
                                                                                setPaymentId("cash")
                                                                                setShowPaymentDialog(true)
                                                                            }}>
                                                                            <Image src='/images/logos/cash.jpg' className='  rounded-3xl w-32 h-14' alt='ecocash'
                                                                                width={556}
                                                                                height={212}
                                                                            />
                                                                        </div>
                                                                    }
                                                                    {packet.property.ecocash === "1" &&
                                                                        <div className='p-3 bg-white rounded-3xl w-fit h-20 cursor-pointer'
                                                                            onClick={() => {
                                                                                if (!packet.property.owner.ecocashPayment) return showError("User has not set payment method for this option YET? Contact Him/Her")
                                                                                setPaymentId("ecocash")
                                                                                setShowPaymentDialog(true)
                                                                            }}>
                                                                            <Image src='/images/logos/ecocash.jpg' className='  rounded-3xl w-32 h-14' alt='ecocash'
                                                                                width={556}
                                                                                height={212}
                                                                            />
                                                                        </div>
                                                                    }
                                                                    {packet.property.mukuru === "1" &&
                                                                        <div className='p-3 bg-white rounded-3xl w-fit h-20 cursor-pointer'
                                                                            onClick={() => {
                                                                                if (!packet.property.owner.mukuruPayment) return showError("User has not set payment method for this option YET? Contact Him/Her")
                                                                                setPaymentId("mukuru")
                                                                                setShowPaymentDialog(true)
                                                                            }}>
                                                                            <Image src='/images/logos/mukuru.jpg' className=' rounded-3xl w-32 h-14' alt='ecocash'
                                                                                width={556}
                                                                                height={212}
                                                                            />
                                                                        </div>
                                                                    }
                                                                </div>
                                                        }
                                                    </>

                                                }
                                                {packet.owned && packet.property.resyncError &&
                                                    <div className='notification error  flex flex-col'>
                                                        Your product contains resync errors . The payment details are different to ones which you registered with
                                                        <button className='button'
                                                            onClick={() => !resyncing && resyncProduct()}>{
                                                                resyncing ? <CgSpinner className='w-full text-center' /> : <>Resync Now</>}</button>
                                                    </div>
                                                }
                                            </div>

                                            <div className="property-description">
                                                {/* <!-- Description --> */}
                                                <div className="">
                                                    <h3 className='font-bold'><i className="icon-material-outline-description"></i> Property Description</h3>
                                                </div>
                                                <hr />
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
                                                            }}>{commenting ? <CgSpinner className='w-full text-center animate-spin' /> : <>Post Comment</>}</button>
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
                                        : <CommentList comments={comments} refreshList={fetchAllComments} />}
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
