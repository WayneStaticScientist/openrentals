import FooterView from '@/components/home/footer';
import ProfileReview from '@/components/pages/widgets/profile-review';
import dynamic from 'next/dynamic';
import React from 'react'
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
export default function UploadsPage() {
    return (
        <div id="wrapper">
            <HeaderView page='myprofile' sub={'user'} />
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
                    <ProfileReview />
                    <div className="col-md-9">
                        <table className="manage-table responsive-table">
                            <tbody>
                                <tr>
                                    <th>Property</th>
                                    <th>Date</th>
                                    <th style={{
                                        textAlign: "right"
                                    }}>Action</th>
                                </tr>
                                <tr>
                                    <td className="utf-title-container"><img src="images/listing-02.jpg" alt="" />
                                        <div className="title">
                                            <h4><a href="#">Renovated Luxury Apartment</a></h4>
                                            <span>2021 San Pedro, Los Angeles</span> <span className="table-property-price">$20,000/mo</span>
                                        </div>
                                    </td>
                                    <td className="utf-expire-date">12 Jan, 2021</td>
                                    <td className="action">
                                        <a href="#" className="view tooltip left" title="View"><i className="icon-feather-eye"></i></a>
                                        <a href="#" className="edit tooltip left" title="Edit"><i className="icon-feather-edit"></i></a>
                                        <a href="#" className="delete tooltip left" title="Delete"><i className="icon-feather-trash-2"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="utf-title-container"><img src="images/listing-05.jpg" alt="" />
                                        <div className="title">
                                            <h4><a href="#">Renovated Luxury Apartment</a></h4>
                                            <span>2021 San Pedro, Los Angeles</span> <span className="table-property-price">$20,000/mo</span>
                                        </div>
                                    </td>
                                    <td className="utf-expire-date">12 Jan, 2021</td>
                                    <td className="action">
                                        <a href="#" className="view tooltip left" title="View"><i className="icon-feather-eye"></i></a>
                                        <a href="#" className="edit tooltip left" title="Edit"><i className="icon-feather-edit"></i></a>
                                        <a href="#" className="delete tooltip left" title="Delete"><i className="icon-feather-trash-2"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="utf-title-container"><img src="images/listing-04.jpg" alt="" />
                                        <div className="title">
                                            <h4><a href="#">Renovated Luxury Apartment</a></h4>
                                            <span>2021 San Pedro, Los Angeles</span> <span className="table-property-price">$20,000/mo</span>
                                        </div>
                                    </td>
                                    <td className="utf-expire-date">12 Jan, 2021</td>
                                    <td className="action">
                                        <a href="#" className="view tooltip left" title="View"><i className="icon-feather-eye"></i></a>
                                        <a href="#" className="edit tooltip left" title="Edit"><i className="icon-feather-edit"></i></a>
                                        <a href="#" className="delete tooltip left" title="Delete"><i className="icon-feather-trash-2"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="utf-title-container"><img src="images/listing-06.jpg" alt="" />
                                        <div className="title">
                                            <h4><a href="#">Renovated Luxury Apartment</a></h4>
                                            <span>2021 San Pedro, Los Angeles</span> <span className="table-property-price">$20,000/mo</span>
                                        </div>
                                    </td>
                                    <td className="utf-expire-date">12 Jan, 2021</td>
                                    <td className="action">
                                        <a href="#" className="view tooltip left" title="View"><i className="icon-feather-eye"></i></a>
                                        <a href="#" className="edit tooltip left" title="Edit"><i className="icon-feather-edit"></i></a>
                                        <a href="#" className="delete tooltip left" title="Delete"><i className="icon-feather-trash-2"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <a href="add-new-property.html" className="utf-centered-button margin-top-30 button">Submit New Property</a>
                    </div>
                </div>
            </div>
            <FooterView />
        </div>
    )
}
