import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function SearchContainer({ cities, types }: { cities: string[], types: string[] }) {
    const router = useRouter()
    const [keywords, setKeyWords] = useState("")
    const [city, setCity] = useState("")
    const [type, setType] = useState("")
    return (
        <div className="utf-main-search-container-area inner-map-search-block inner-search-item">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="utf-main-search-form-item">
                            {/* <!-- Type --> */}
                            <div className="utf-search-type-block-area margin-top-35">
                                <div className="search-type">
                                    <label className="active">
                                        <input className="first-tab" name="tab" checked={true} type="radio" />Buy</label>
                                    <label>
                                        <input name="tab" type="radio" />Rent</label>
                                    <label>
                                        <input name="tab" type="radio" />Sale</label>
                                    <div className="utf-search-type-arrow"></div>
                                </div>
                            </div>

                            {/* <!-- Box --> */}
                            <div className="utf-main-search-box-area">
                                {/* <!-- Row With Forms --> */}
                                <div className="row with-forms">
                                    {/* <!-- Status --> */}
                                    <div className="col-md-2 col-sm-4">
                                        <select data-placeholder="Select City" title="Select City"
                                            value={city} onChange={(e) => setCity(e.target.value)}
                                            className="utf-chosen-select-single-item">
                                            <option value={""}>all cities</option>
                                            {cities.map((e, i) => {
                                                return <option key={i} value={e}>{e}</option>
                                            })}
                                        </select>
                                    </div>

                                    {/* <!-- Property Type --> */}
                                    <div className="col-md-2 col-sm-4">
                                        <select data-placeholder="Property Type"
                                            value={type} onChange={(e) => setType(e.target.value)}
                                            className="utf-chosen-select-single-item">
                                            <option value={""}>any types</option>
                                            {types.map((e, i) => {
                                                return <option key={i} value={e}>{e}</option>
                                            })}
                                        </select>
                                    </div>

                                    {/* <!-- Status --> */}
                                    <div className="col-md-2 col-sm-4">
                                        <select data-placeholder="Any Status" className="utf-chosen-select-single-item">
                                            <option>Any Status</option>
                                            <option>For Sale</option>
                                            <option>For Rent</option>
                                        </select>
                                    </div>

                                    {/* <!-- Main Search Input --> */}

                                    <div className="col-md-6">
                                        <div className="utf-main-search-input-item">
                                            <input type="text" placeholder="Enter Keywords..." value={keywords}
                                                onChange={(e) => setKeyWords(e.target.value)} />
                                            <button className="button"
                                                onClick={() => {
                                                    return router.push({
                                                        pathname: '/listings',
                                                        search: `?search=true&keywords=${keywords}&city=${city}&propertyType=${type}`, // Or use params.toString() if you built a URLSearchParams
                                                    });
                                                }}><i className="fa fa-search"></i> Search</button>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Row With Forms / End --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
