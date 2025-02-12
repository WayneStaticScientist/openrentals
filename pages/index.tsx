import DownloadMobileApp from "@/components/home/download-mobile";
import FooterView from "@/components/home/footer";
import dynamic from "next/dynamic";
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerView = dynamic(() => import("@/components/home/banner"), { ssr: false });
const FeaturedComponents = dynamic(() => import("@/components/home/featured"), { ssr: false });
export default function Home() {
  return (
    <>
      <div id="wrapper">
        <HeaderView page="home" />
        <BannerView />
        <FeaturedComponents />
        <DownloadMobileApp />
        <FooterView />
      </div>
    </>
  );
}
