import FooterView from '@/components/home/footer';
import dynamic from 'next/dynamic';
import React from 'react'
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
const SearchContainer = dynamic(() => import('@/components/pages/widgets/search-container'), { ssr: false });
const ContentListing = dynamic(() => import('@/components/pages/widgets/content-listing'), { ssr: false });
export default function ListingsPage() {
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
                <SearchContainer />
                <ContentListing />
                <FooterView />
            </div>
        </>
    )
}
