import React from 'react'

export default function BannerPageSub({ title, path }: { title: string, path: { root: string, title: string }[] }) {
    return (
        <div className="parallax titlebar"
            style={{
                backgroundImage: "url(../images/listing-02.jpg)",
                backgroundSize: "cover"
            }}
        >
            <div className='bg-[#00000099]'>
                <div id="titlebar">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>{title}</h2>
                                <nav id="breadcrumbs">
                                    <ul>
                                        {
                                            path.map((e, i) => {
                                                if (e.root.length > 0) {
                                                    return <li key={i}><a href={e.root}>{e.title}</a></li>
                                                }
                                                return <li key={i}>{e.title}</li>
                                            })
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
