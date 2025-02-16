import DownloadMobileApp from "@/components/home/download-mobile";
import FooterView from "@/components/home/footer";
import { getProducts } from "@/connections/get-property";
import { PropertyWrapper } from "@/connections/interfaces";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerView = dynamic(() => import("@/components/home/banner"), { ssr: false });
const FeaturedComponents = dynamic(() => import("@/components/home/featured"), { ssr: false });
export default function Home() {
  const [propertyWrapper, setPropertyWrapper] = useState<PropertyWrapper | null>(null)
  const [loading, setLoading] = useState(true)
  const fetchProducts = async () => {
    setLoading(true)
    const data = await getProducts({
      uploader: "",
      city: "",
      propertyType: "",
      propertystate: "",
      keywords: "",
      page: 1
    })
    setLoading(false)
    if (typeof data === 'string') {
      return
    }
    console.log(data)
    setPropertyWrapper(data)
  }
  useEffect(() => {

    fetchProducts()
  }, [])
  return (
    <>
      <div id="wrapper">
        <HeaderView page="home" />
        <BannerView listings={(propertyWrapper && propertyWrapper.listingInfo) ? propertyWrapper.listingInfo : {
          cities: [],
          type: []
        }} />
        <FeaturedComponents properties={propertyWrapper ? propertyWrapper.properties : []} />
        <DownloadMobileApp />
        <FooterView />
      </div>
    </>
  );
}
