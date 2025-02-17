import FooterView from '@/components/home/footer';
import ProfileReview from '@/components/pages/widgets/profile-review';
import { useUserState } from '@/connections/user';
import { getDeviceId, getVariables, userLoggedIn } from '@/functions/device';
import { showError, showSuccess } from '@/functions/toast';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files';
import { CgSpinner } from 'react-icons/cg';
import { ToastContainer } from 'react-toastify';
const HeaderView = dynamic(() => import("@/components/home/header"), { ssr: false });
const BannerPage = dynamic(() => import('@/components/pages/banner-page'), { ssr: false });
const fileTypes = ["JPG", "PNG", "GIF"];
export default function UploadPage() {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const getUserLocation = () => {
        // if geolocation is supported by the users browser
        if (navigator.geolocation) {
            // get the current users location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // save the geolocation coordinates in two variables
                    const { latitude, longitude } = position.coords;
                    setLongitude(longitude)
                    setLatitude(latitude)
                },
                // if there was an error getting the users location
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        }
        // if geolocation is not supported by the users browser
        else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
    const user = useUserState();
    const selectedFiles = useRef<File[]>([])
    const [area, setArea] = useState('')
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [price, setPrice] = useState('')
    const [rooms, setRooms] = useState('')
    const [wifi, setWifi] = useState(false)
    const [tiles, setTiles] = useState(false)
    const [solar, setSolar] = useState(false)
    const [address, setAddress] = useState("")
    const [stoves, setStoves] = useState(false)
    const [loading, setLoading] = useState(false)
    const [bedrooms, setBedrooms] = useState('1')
    const [ceiling, setCeiling] = useState(false)
    const [bathrooms, setBathrooms] = useState('1')
    const [firstName, setFirstName] = useState("")
    const [security, setSecurity] = useState(false)
    const [durawall, setDurawall] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [swimming, setSwimming] = useState(false)
    const [studyRoom, setStudyRoom] = useState(false)
    const [description, setDescription] = useState('')
    const [propertyType, setPropertyType] = useState('')
    const [electricity, setElectricity] = useState(false)
    const [propertyTitle, setPropertyTitle] = useState("")
    const [propertyState, setPropertyState] = useState('')
    const [fileList, setFileList] = useState<ReactNode>(null)
    const uploadFiles = async () => {

        if (loading) return
        const formData = new FormData()
        formData.append("area", area)
        formData.append("city", city)
        formData.append("state", state)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("price", price)
        formData.append("rooms", rooms)
        formData.append("address", address)
        formData.append("bedrooms", bedrooms)
        formData.append("bathrooms", bathrooms)
        formData.append("firstName", firstName)
        formData.append("wifi", !wifi ? '0' : '1')
        formData.append("solar", !solar ? '0' : '1')
        formData.append("description", description)
        formData.append("tiles", !tiles ? '0' : '1')
        formData.append("propertyType", propertyType)
        formData.append("stoves", !stoves ? '0' : '1')
        formData.append("propertyTitle", propertyTitle)
        formData.append("propertyState", propertyState)
        formData.append("ceiling", !ceiling ? '0' : '1')
        formData.append("security", !security ? '0' : '1')
        formData.append("durawall", !durawall ? '0' : '1')
        formData.append("swimming", !swimming ? '0' : '1')
        formData.append("studyRoom", !studyRoom ? '0' : '1')
        formData.append("electricity", !electricity ? '0' : '1')
        console.log(formData)
        for (const f of selectedFiles.current) {
            formData.append("files", f)
        }
        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}v1/property/upload`, { // Replace with your upload endpoint
                headers: {
                    "Authorization": "Bearer " + getVariables().refreshTokens,
                    "X-device-id": getDeviceId(),
                },
                method: 'POST',
                body: formData,
            });
            setLoading(false)
            if (response.ok) {
                showSuccess("The property has been successfully")
                Router.replace("/uploads")
            }
            if (response.status === 400 || response.status === 401 || response.status >= 500) {
                const { message } = await response.json()
                return showError(message)
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            //
        }
        setLoading(false)
    }
    const handleChange = (file: File[]) => {

        selectedFiles.current.push(...file)
        setFileList(selectedFiles.current.map((e, i) => {
            return <div key={i} className='flex p-3'>{e.name}</div>
        }))
    };

    useEffect(() => {
        if (userLoggedIn()) {
            setLoggedIn(true)
            setFirstName(user.firstName);
            setPhone(user.phone)
            setEmail(user.email)
            getUserLocation()
        } else {
            Router.push("/login")
        }

    }, [])
    if (!loggedIn) <></>
    return (
        <>
            <ToastContainer />
            <div id="wrapper">
                <HeaderView page='user' sub={'upload'} />
                <BannerPage title={'Upload House'} path={[
                    {
                        root: "/",
                        title: "home"
                    },
                    {
                        root: "",
                        title: "upload"
                    }
                ]} />
                <div className="container mb-12">
                    <div className="row">
                        <ProfileReview page='upload' />
                        {/* <!-- Submit Page --> */}
                        <div className="col-md-9">
                            <div className="submit-page">
                                {/* <!-- Section --> */}
                                <div className="utf-submit-page-inner-box">
                                    <h3>Property Basic Information</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-12">
                                            <h5>Property Title</h5>
                                            <input className="search-field" placeholder="Property Title" type="text"
                                                value={propertyTitle}
                                                onChange={(e) => setPropertyTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Status</h5>
                                            <select id="mySelect" value={propertyState}
                                                onChange={(e) => setPropertyState(e.target.value)}>
                                                <option value="">Select an option</option> {/* Default/placeholder option */}
                                                <option value="sale">For Sale</option>
                                                <option value="rent">For Rent</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Type</h5>
                                            <select id="mySelect" value={propertyType}
                                                onChange={(e) => setPropertyType(e.target.value)}>
                                                <option value="">Select an option</option> {/* Default/placeholder option */}
                                                <option value="apartment">Apartment</option>
                                                <option value="bhouse">Boarding House</option>
                                                <option value="house">House</option>
                                                <option value="commercial">Commercial</option>
                                                <option value="garage">Garage</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Price</h5>
                                            <input className="search-field" placeholder="price in usd" type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Area</h5>
                                            <input className="search-field" placeholder="area in square metres" type="number"
                                                value={area}
                                                onChange={(e) => setArea(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Number of Rooms</h5>
                                            <select id="mySelect" value={rooms}
                                                onChange={(e) => setRooms(e.target.value)}>
                                                <option value="1">number of rooms</option> {/* Default/placeholder option */}
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="9+">9+</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Section / End --> */}

                                {/* <!-- Section --> */}
                                <div className="utf-submit-page-inner-box">
                                    <h3>Property Gallery</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-12 submit-section">
                                            <FileUploader multiple handleChange={handleChange} name="file" types={fileTypes}
                                            />
                                            {fileList}
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Section / End --> */}

                                {/* <!-- Section --> */}
                                <div className="utf-submit-page-inner-box">
                                    <h3>Property Location</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-6">
                                            <h5>Address</h5>
                                            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>City Name</h5>
                                            <input type="text" placeholder="City Name" value={city} onChange={(e) => setCity(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>State</h5>
                                            <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Zip-Code</h5>
                                            <input type="text" placeholder="000000" />
                                        </div>

                                        <div className="col-md-6">
                                            <h5>Longitude</h5>
                                            <input type="text" placeholder="Longitude" value={longitude}
                                                onChange={(e) => setLongitude(parseInt(e.target.value))} />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Latitude</h5>
                                            <input type="text" placeholder="Latitude" value={latitude}
                                                onChange={(e) => setLatitude(parseInt(e.target.value))} />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Section / End --> */}

                                <div className="utf-submit-page-inner-box">
                                    <h3>Property Information</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-12">
                                            <h5>Information</h5>
                                            <textarea placeholder="property description" value={description}
                                                onChange={(e) => setDescription(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <h5>BedRooms</h5>
                                            <select id="mySelect" value={bedrooms}
                                                onChange={(e) => setBedrooms(e.target.value)}>
                                                <option value="1">1</option> {/* Default/placeholder option */}
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">3+</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>BathRooms</h5>
                                            <select id="mySelect" value={bathrooms}
                                                onChange={(e) => setBathrooms(e.target.value)}>
                                                <option value="1">1</option> {/* Default/placeholder option */}
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">3+</option>
                                            </select>
                                        </div>
                                        <div className="col-md-12">
                                            <h5>Other Features</h5>
                                            <div className='flex gap-x-6 flex-wrap'>
                                                <div className="checkbox margin-top-10 margin-bottom-10">
                                                    <input type="checkbox" id="1" checked={wifi} onChange={(e) => setWifi(e.target.checked)} />
                                                    <label htmlFor="1"><span className="checkbox-icon"></span> Wifi</label>
                                                </div>
                                                <div className="checkbox margin-top-10 margin-bottom-10">
                                                    <input type="checkbox" id="2" checked={durawall} onChange={(e) => setDurawall(e.target.checked)} />
                                                    <label htmlFor="2"><span className="checkbox-icon"></span>Durawalls</label>
                                                </div>
                                                <div className="checkbox margin-top-10 margin-bottom-10">
                                                    <input type="checkbox" id="13" checked={security} onChange={(e) => setSecurity(e.target.checked)} />
                                                    <label htmlFor="13"><span className="checkbox-icon"></span>Security</label>
                                                </div>
                                                <div className="checkbox margin-top-10 margin-bottom-10">
                                                    <input type="checkbox" id="14" checked={tiles} onChange={(e) => setTiles(e.target.checked)} />
                                                    <label htmlFor="14"><span className="checkbox-icon"></span>Tiles</label>
                                                </div>
                                                <div className="checkbox margin-top-10 margin-bottom-10">
                                                    <input type="checkbox" id="3" checked={swimming} onChange={(e) => setSwimming(e.target.checked)} />
                                                    <label htmlFor="3"><span className="checkbox-icon"></span>Swimming Pool</label>
                                                </div>
                                                <div className="checkbox margin-top-10 margin-bottom-10">
                                                    <input type="checkbox" id="4" checked={studyRoom} onChange={(e) => setStudyRoom(e.target.checked)} />
                                                    <label htmlFor="4"><span className="checkbox-icon"></span>Study Rooms</label>
                                                </div>
                                                <div className="checkbox margin-top-10 margin-bottom-10">
                                                    <input type="checkbox" id="5" checked={solar} onChange={(e) => setSolar(e.target.checked)} />
                                                    <label htmlFor="5"><span className="checkbox-icon"></span>Solars</label>
                                                </div>
                                                <div className="checkbox margin-top-10 margin-bottom-10">
                                                    <input type="checkbox" id="6" checked={ceiling} onChange={(e) => setCeiling(e.target.checked)} />
                                                    <label htmlFor="6"><span className="checkbox-icon"></span>Ceiling</label>
                                                </div>
                                                <div className="checkbox margin-top-10 margin-bottom-10">
                                                    <input type="checkbox" id="7" checked={electricity} onChange={(e) => setElectricity(e.target.checked)} />
                                                    <label htmlFor="7"><span className="checkbox-icon"></span>Electricity</label>
                                                </div>
                                                <div className="checkbox margin-top-10 margin-bottom-10">
                                                    <input type="checkbox" id="8" checked={stoves} onChange={(e) => setStoves(e.target.checked)} />
                                                    <label htmlFor="8"><span className="checkbox-icon"></span>Stoves</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Section --> */}
                                <div className="utf-submit-page-inner-box">
                                    <h3>Property Contact Details</h3>
                                    <div className="content with-padding">
                                        <div className="col-md-4">
                                            <h5>Full Name</h5>
                                            <input type="text" placeholder="Name" value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Email Address</h5>
                                            <input type="text" placeholder="Email Address" value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <h5>Phone Number</h5>
                                            <input type="text" placeholder="Phone Number" value={phone} onChange={(e) =>
                                                setPhone(e.target.value)
                                            } />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button className="utf-centered-button button"
                                            onClick={uploadFiles}>{
                                                loading ? <><CgSpinner className=' animate-spin w-full text-center' /></> : <>Submit Property</>
                                            }</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterView />
            </div >
        </>
    )
}
