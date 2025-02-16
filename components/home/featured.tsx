import { Property } from '@/connections/interfaces'
import { formatAmount } from '@/functions/formats'
import Link from 'next/link'
import React from 'react'

export default function FeaturedComponents({ properties }: { properties: Property[] }) {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 margin-top-75">
                        <div className="utf-section-headline-item centered margin-bottom-30 margin-top-0">
                            <h3 className="headline"><span>Most Featured Properties</span> Featured Properties</h3>
                            <div className="utf-headline-display-inner-item">Most Featured Properties</div>
                            <p className="utf-slogan-text">Lorem Ipsum is simply dummy text printing and type setting industry Lorem Ipsum been industry standard dummy text ever since when unknown printer took a galley.</p>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="carousel">
                            {
                                properties.map((e, i) => {
                                    return <div className="utf-carousel-item-area" key={i}>
                                        <div className="utf-listing-item compact">
                                            <Link href={`/catalogs?q=${e._id}`} className="utf-smt-listing-img-container">
                                                <div className="utf-listing-badges-item"> <span className="featured">Featured</span> <span className="for-sale">For Sale</span> </div>
                                                <div className="utf-listing-img-content-item">
                                                    <span className="utf-listing-compact-title-item">{e.propertyTitle} <i>${formatAmount(e.price, 3)}</i></span>
                                                </div>
                                                <img src="images/listing-01.jpg" alt="" />
                                                <ul className="listing-hidden-content">
                                                    <li><i className="fa fa-bed"></i> Beds <span>{e.bedrooms}</span></li>
                                                    <li><i className="icon-feather-codepen"></i> Baths <span>{e.bathrooms}</span></li>
                                                    <li><i className="fa fa-arrows-alt"></i> Sq M <span>{e.area}</span></li>
                                                </ul>
                                            </Link>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    {/* <!-- Carousel / End --> */}
                </div>
            </div>
        </>
    )
}
