import { ListingInfo } from '@/connections/interfaces'
import Router from 'next/router'
import React, { useState } from 'react'

export default function BannerView({ listings }: { listings: ListingInfo }) {
    const [city, setCity] = useState("")
    const [type, setType] = useState("")
    const [keywords, setKeyWords] = useState("")
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
                                    <div className="announce">From as low as $1 per day with limited time offer discounts.</div>
                                    <div className="row with-forms">
                                        <div className="col-md-2">
                                            <select data-placeholder="Select City"
                                                value={city} onChange={(e) => setCity(e.target.value)} title="Select City" className="utf-chosen-select-single-item">
                                                <option value={""}>Any City</option>
                                                {listings.cities.map((e, i) => {
                                                    return <option value={e} key={i}>{e}</option>
                                                })}
                                            </select>
                                        </div>

                                        <div className="col-md-2">
                                            <select data-placeholder="Property Type" className="utf-chosen-select-single-item"
                                                value={type} onChange={(e) => setType(e.target.value)}>
                                                <option value={""}>Any Type</option>
                                                {listings.type.map((e, i) => {
                                                    return <option value={e} key={i}>{e}</option>
                                                })}
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
                                                <input type="text" placeholder="Enter Keywords..." value={keywords}
                                                    onChange={(e) => setKeyWords(e.target.value)} />
                                                <button className="button"
                                                    onClick={() => {
                                                        Router.push(
                                                            {
                                                                pathname: '/listings',
                                                                search: `?search=true&keywords=${keywords}&city=${city}&propertyType=${type}`, // Or use params.toString() if you built a URLSearchParams
                                                            }
                                                        )
                                                    }}><i className="fa fa-search"></i> Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h4 className="utf-cat-home-item-list">What are you looking for?</h4>
                                        <ul className="utf-home-iconbox">
                                            <li className="list-inline-item"
                                                onClick={() => { Router.push("/listings?propertyType=commercial") }}
                                            ><div className="icon"><span className="icon-line-awesome-building"></span><p>Commercial</p></div></li>
                                            <li className="list-inline-item" onClick={() => { Router.push("/listings?propertyType=boarding-houses") }}>
                                                <div className="icon"><span className="icon-feather-home"></span><p>Boarding House</p></div>
                                            </li>
                                            <li className="list-inline-item" onClick={() => { Router.push("/listings?propertyType=residential") }}>
                                                <div className="icon"><span className="icon-material-outline-location-city"
                                                ></span><p>Residential</p>
                                                </div></li>
                                            <li className="list-inline-item" onClick={() => { Router.push("/listings?propertyType=apartments") }}><div className="icon"><span className="icon-material-outline-business"></span><p>Apartment</p></div></li>
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
