import FooterView from '@/components/home/footer'
import OpenImageLoader from '@/components/pages/widgets/classic-image-loader,';
import NoResults from '@/components/pages/widgets/no-results';
import ProfileReview from '@/components/pages/widgets/profile-review';
import { GetMyListings } from '@/connections/get-property';
import { PaymentHold } from '@/connections/interfaces';
import { showError } from '@/functions/toast';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import { BsWatch } from 'react-icons/bs';
import { ProgressBar } from 'react-loader-spinner';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
export default function Bookmarks() {
    const [fetching, setFetching] = useState(true)
    const [listing, setListings] = useState<PaymentHold[]>([])
    const fetchList = async () => {
        setFetching(true)
        const resp = await GetMyListings()
        setFetching(false)
        if (typeof resp === 'string') {
            return showError(resp)
        }
        setListings(resp)
    }
    useEffect(() => {
        fetchList()
    }, [])
    return (
        <>
            {
                fetching ?
                    <div className='w-screen h-screen flex justify-center items-center'>
                        <ProgressBar />
                    </div>
                    :
                    <div id="wrapper">
                        <HeaderView page='listing' sub={'bookmarks'} />
                        <BannerPage title={'All Houses'} path={[
                            {
                                root: "/",
                                title: "home"
                            },
                            {
                                root: "",
                                title: "houses"
                            }
                        ]} />
                        <div className="container">
                            <div className="row">
                                <ProfileReview page='bookmarks' />
                                <div className="col-md-9">
                                    <table className="manage-table bookmarks-table responsive-table">
                                        <tbody>
                                            <tr >
                                                <th >Bookmark Property Listing</th>
                                                <th></th>
                                            </tr>
                                            {listing.length > 0 ? <>{listing.map((e, i) => {
                                                return <tr key={i} onClick={() => {
                                                    Router.push("/catalogs?q=" + e.id)
                                                }}>
                                                    <td className="utf-title-container">
                                                        <OpenImageLoader path={e.image} errorPath={'/images/house.png'} />
                                                        <div className="title">
                                                            <h4><a href="#">{e.title}</a></h4>
                                                            <span>{e.status === 0 ?
                                                                <span className='text-orange-400 flex gap-x-3 items-center'><BsWatch />Waiting Approval</span> :
                                                                <span className='text-green-500'>Approved</span>}</span>
                                                            <span className="table-property-price">${e.price}</span>
                                                        </div>
                                                    </td>
                                                    <td className="action"><a href="#" className="delete tooltip left" title="Delete">
                                                        <i className="icon-feather-trash-2"></i></a></td>
                                                </tr>
                                            })}</> : <>
                                                <div className='w-full p-3 h-full items-center flex flex-col'>
                                                    <NoResults message='You have not items you added to cart' />
                                                </div>
                                            </>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <FooterView />
                    </div>
            }
        </>
    )
}
