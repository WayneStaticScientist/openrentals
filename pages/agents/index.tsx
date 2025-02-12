import FooterView from '@/components/home/footer';
import dynamic from 'next/dynamic';
import React from 'react'
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
export default function AgentList() {
    return (
        <>
            <div id="wrapper">
                <HeaderView page='agents' sub={'user'} />
                <BannerPage title={'Agents'} path={[
                    {
                        root: "/",
                        title: "home"
                    },
                    {
                        root: "",
                        title: "agents"
                    }
                ]} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="utf-agents-container-area">
                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html"> <img src="images/agent-01.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}

                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html"> <img src="images/agent-02.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}

                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html"> <img src="images/agent-03.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}

                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html"> <img src="images/agent-04.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}

                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html"> <img src="images/agent-05.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}

                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html"> <img src="images/agent-06.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}

                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html"> <img src="images/agent-07.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}

                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html"> <img src="images/agent-08.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}

                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html"> <img src="images/agent-09.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}

                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html"> <img src="images/agent-10.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}

                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html"> <img src="images/agent-01.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}

                                    {/* <!-- Agent --> */}
                                    <div className="grid-item col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                        <div className="agent">
                                            <div className="utf-agent-avatar"> <a href="agents-profile.html">
                                                <img src="images/agent-02.jpg" alt="" /> <span className="view-profile-btn">View Profile</span> </a> </div>
                                            <div className="utf-agent-content">
                                                <div className="utf-agent-name">
                                                    <h4><a href="agents-profile.html">John Williams</a></h4>
                                                    <span>Agent In Afghanistan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Agent / End --> */}
                                </div>
                                {/* <!-- Agents Container / End --> */}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="clearfix"></div>
                            {/* <!-- Pagination --> */}
                            <div className="utf-pagination-container margin-top-20">
                                <nav className="pagination">
                                    <ul>
                                        <li><a href="#"><i className="fa fa-angle-left"></i></a></li>
                                        <li><a href="#" className="current-page">1</a></li>
                                        <li><a href="#">2</a></li>
                                        <li><a href="#">3</a></li>
                                        <li className="blank">...</li>
                                        <li><a href="#">10</a></li>
                                        <li><a href="#"><i className="fa fa-angle-right"></i></a></li>
                                    </ul>
                                </nav>
                            </div>
                            {/* <!-- Pagination / End --> */}
                        </div>
                    </div>
                </div>
                <FooterView />
            </div>
        </>
    )
}
