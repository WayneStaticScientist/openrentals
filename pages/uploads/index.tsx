import FooterView from '@/components/home/footer';
import NoResults from '@/components/pages/widgets/no-results';
import ProfileReview from '@/components/pages/widgets/profile-review';
import { PropertyList } from '@/connections/interfaces';
import { useUserState } from '@/connections/user';
import { getDeviceId, getVariables, userLoggedIn } from '@/functions/device';
import { formatAmount } from '@/functions/formats';
import { showError } from '@/functions/toast';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import { FaDollarSign } from 'react-icons/fa';
import { ProgressBar } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
export default function UploadsPage() {
    const user = useUserState();
    const [fetching, setFetching] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [property, setProperty] = useState<PropertyList | null>(null)
    const fetchData = async (page: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}v1/get?page=${page}&email=${user.email}`,
                { // Replace with your upload endpoint
                    headers: {
                        "Authorization": "Bearer " + getVariables().refreshTokens,
                        "X-device-id": getDeviceId(),
                    },
                    method: 'GET',
                });
            if (response.ok) {
                setFetching(false)
                const data = await response.json()
                console.log(data)
                return setProperty(data)
            }
            if (response.status === 400 || response.status === 401) {
                const { message } = await response.json()
                return showError(message)
            }
            if (response.status === 404) {
                return showError("page not found")
            }
            if (response.status >= 500) {
                return showError("There was internal server error")
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {

        }

        return showError("There was Newtork Error")

    }
    useEffect(() => {
        if (userLoggedIn()) {
            setLoggedIn(true)
            fetchData(1)
        } else {
            Router.push("/login")
        }
    }, [])
    if (!loggedIn) return <></>
    return (
        <div id="wrapper">
            <ToastContainer />
            <HeaderView page='user' sub={'myprofile'} />
            <BannerPage title={'My Uploads'} path={[
                {
                    root: "/",
                    title: "home"
                },
                {
                    root: "",
                    title: "uploads"
                }
            ]} />
            <div className="container">
                <div className="row">
                    <ProfileReview page={'uploads'} />
                    <div className="col-md-9">
                        <div className="manage-table responsive-table">
                            {fetching ?
                                <div>
                                    <div className='w-full h-full justify-center items-center flex flex-col'>
                                        <ProgressBar />
                                        <h2>loading your uploads</h2>
                                    </div>
                                </div> :
                                <div>
                                    <div>
                                        <th>Property</th>
                                        <th>Date</th>
                                        <th style={{
                                            textAlign: "right"
                                        }}>Action</th>
                                    </div>
                                    {
                                        property && <>
                                            {
                                                property.properties.length > 0 ? <>
                                                    {property.properties.map((e, i) => {
                                                        return <div key={i}
                                                            className='cursor-pointer flex shadow-lg p-6 justify-between items-center'
                                                            onClick={() => {
                                                                Router.push("/catalogs?q=" + e._id)
                                                            }}>
                                                            <div className="utf-title-container flex gap-x-6">
                                                                <img src={
                                                                    e.images.length > 0 ? `${process.env.NEXT_PUBLIC_SERVERT}${e.images[0]}` : "images/listing-02.jpg"
                                                                } alt=""
                                                                    className='w-44 h-44' />
                                                                <div className="title flex flex-col">
                                                                    <h3>{e.propertyTitle}</h3>
                                                                    <span className='text-sm'>{e.address} {e.city}</span>
                                                                    <span className="text-green-500 text-center rounded-xl flex  items-center">
                                                                        <FaDollarSign />{formatAmount(e.price)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="">12 Jan, 2021</div>
                                                            <div className="action flex gap-x-6">
                                                                {property.owned ?
                                                                    <>
                                                                        <a href="#" className="view tooltip left" title="View"><i className="icon-feather-eye"></i></a>
                                                                        <a href="#" className="edit tooltip left" title="Edit"><i className="icon-feather-edit"></i></a>
                                                                        <a href="#" className="delete tooltip left" title="Delete"><i className="icon-feather-divash-2"></i></a>

                                                                    </>
                                                                    : <></>}
                                                            </div>
                                                        </div>
                                                    })}
                                                </>
                                                    :
                                                    <>
                                                        <div className='w-full p-3 h-full items-center flex flex-col'>
                                                            <NoResults message='you have not uploads yet' />
                                                        </div>
                                                    </>
                                            }
                                        </>
                                    }
                                </div>}
                        </div>
                        <a href="add-new-property.html" className="utf-centered-button margin-top-30 button">Submit New Property</a>
                    </div>
                </div>
            </div>
            <FooterView />
        </div >
    )
}
