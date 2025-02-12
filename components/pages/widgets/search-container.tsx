import React from 'react'

export default function SearchContainer() {
    return (
        <div className="utf-main-search-container-area inner-map-search-block inner-search-item">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form className="utf-main-search-form-item">
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

                                    {/* <!-- Property Type --> */}
                                    <div className="col-md-2 col-sm-4">
                                        <select data-placeholder="Property Type" className="utf-chosen-select-single-item">
                                            <option>Property Type</option>
                                            <option>Residential</option>
                                            <option>Apartments</option>
                                            <option>Houses</option>
                                            <option>Commercial</option>
                                            <option>Land</option>
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
                                            <input type="text" placeholder="Enter Keywords..." value="" />
                                            <button className="button"><i className="fa fa-search"></i> Search</button>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Row With Forms / End --> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
