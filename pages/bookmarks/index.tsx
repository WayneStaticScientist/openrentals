import FooterView from '@/components/home/footer'
import ProfileReview from '@/components/pages/widgets/profile-review';
import dynamic from 'next/dynamic';
import React from 'react'
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
export default function Bookmarks() {
    return (
        <>
            <div id="wrapper">
                <HeaderView page='listing' />
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
                        <ProfileReview />
                        <div className="col-md-9">
                            <table className="manage-table bookmarks-table responsive-table">
                                <tbody>
                                    <tr>
                                        <th>Bookmark Property Listing</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td className="utf-title-container"><img src="images/listing-05.jpg" alt="" />
                                            <div className="title">
                                                <h4><a href="#">Renovated Luxury Apartment</a></h4>
                                                <span>2021 San Pedro, Los Angeles 90015</span> <span className="table-property-price">$22,000/mo</span>
                                            </div>
                                        </td>
                                        <td className="action"><a href="#" className="delete tooltip left" title="Delete"><i className="icon-feather-trash-2"></i></a></td>
                                    </tr>
                                    {/* <!-- Item #2 --> */}
                                    <tr>
                                        <td className="utf-title-container"><img src="images/listing-06.jpg" alt="" />
                                            <div className="title">
                                                <h4><a href="#">Renovated Luxury Apartment</a></h4>
                                                <span>2021 San Pedro, Los Angeles 90015</span> <span className="table-property-price">$20,000/mo</span>
                                            </div>
                                        </td>
                                        <td className="action"><a href="#" className="delete tooltip left" title="Delete"><i className="icon-feather-trash-2"></i></a></td>
                                    </tr>
                                    {/* <!-- Item #3 --> */}
                                    <tr>
                                        <td className="utf-title-container"><img src="images/listing-02.jpg" alt="" />
                                            <div className="title">
                                                <h4><a href="#">Renovated Luxury Apartment</a></h4>
                                                <span>2021 San Pedro, Los Angeles 90015</span> <span className="table-property-price">$15,000/mo</span>
                                            </div>
                                        </td>
                                        <td className="action"><a href="#" className="delete tooltip left" title="Delete"><i className="icon-feather-trash-2"></i></a></td>
                                    </tr>
                                    {/* <!-- Item #4 --> */}
                                    <tr>
                                        <td className="utf-title-container"><img src="images/listing-04.jpg" alt="" />
                                            <div className="title">
                                                <h4><a href="#">Renovated Luxury Apartment</a></h4>
                                                <span>2021 San Pedro, Los Angeles 90015</span> <span className="table-property-price">$18,000/mo</span>
                                            </div>
                                        </td>
                                        <td className="action"><a href="#" className="delete tooltip left" title="Delete"><i className="icon-feather-trash-2"></i></a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <FooterView />
            </div>
        </>
    )
}
