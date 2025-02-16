import FooterView from '@/components/home/footer';
import { getProducts } from '@/connections/get-property';
import { PropertyWrapper, SearchFilter } from '@/connections/interfaces';
import { showError } from '@/functions/toast';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsEmojiTear } from 'react-icons/bs';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
const SearchContainer = dynamic(() => import('@/components/pages/widgets/search-container'), { ssr: false });
const ContentListing = dynamic(() => import('@/components/pages/widgets/content-listing'), { ssr: false });
export default function ListingsPage() {
    const searchParams = useSearchParams();
    const [propertyWrapper, setPropertyWrapper] = useState<PropertyWrapper | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [fromSearch, setFromSearch] = useState(false)
    const [searchTitle, setSearchTitle] = useState("")
    const [hasError, setHasError] = useState(false)
    const fetchProducts = async (params: SearchFilter) => {
        console.log(params)
        setLoading(true)
        const data = await getProducts(params)
        setLoading(false)
        if (typeof data === 'string') {
            showError(data)
            setHasError(true)
            setError(data)
            return
        }
        setHasError(false)
        setPropertyWrapper(data)
    }
    useEffect(() => {
        if (searchParams.get("search")) {
            if (searchParams.get("search") == 'true') {
                setFromSearch(true)
            }
            if (searchParams.get("keywords")) {
                setSearchTitle(searchParams.get("keywords") ?? '')
            }
        }
        fetchProducts({
            uploader: searchParams.get("uploader") ?? '',
            city: searchParams.get("city") ?? '',
            propertyType: searchParams.get("propertyType") ?? '',
            propertystate: searchParams.get("propertystate") ?? '',
            keywords: searchParams.get("keywords") ?? '',
            page: 1
        })
    }, [searchParams])
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
                <SearchContainer cities={propertyWrapper ? propertyWrapper.listingInfo.cities : []}
                    types={propertyWrapper ? propertyWrapper.listingInfo.type : []} />
                {
                    hasError ?
                        <div className='w-full flex mb-12 text-5xl text-red-600 h-full items-center justify-center flex-col gap-y-4'>
                            <BsEmojiTear />
                            {error}
                        </div> :
                        <ContentListing loading={loading}
                            list={propertyWrapper ? propertyWrapper.properties : []}
                            fromSearch={fromSearch}
                            searchTitle={searchTitle} />
                }
                <FooterView />
            </div>
        </>
    )
}
