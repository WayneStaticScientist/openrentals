import { UserRegistration, useUserState } from '@/connections/user';
import { getDeviceId, getVariables, userLoggedIn } from '@/functions/device';
import { showError, showSuccess } from '@/functions/toast';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { CgSpinner } from 'react-icons/cg';
import { ToastContainer } from 'react-toastify'
const fileTypes = ["JPG", "PNG"];

export default function ChangeProfile() {
    const user = useUserState()
    const [loading, setLoading] = useState(false)
    const [filePhoto, setFilePhoto] = useState<File | null>(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [uploadedPhoto, setUploadedPhoto] = useState("images/default/nouser.jpg")
    const changeProfile = async () => {
        if (loading) return
        const formData = new FormData()
        formData.append("files", filePhoto ?? '')
        try {
            const user = new UserRegistration()
            const resp = await user.fetchUser()
            if (typeof resp === 'string') {
                setLoading(false)
                return showError(resp)
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}v1/user/changeprofile`, { // Replace with your upload endpoint
                headers: {
                    "Authorization": "Bearer " + getVariables().accessTokens,
                    "x-device-id": getDeviceId(),
                },
                method: 'POST',
                body: formData,
            });
            setLoading(false)
            if (response.ok) {
                showSuccess("Profile changed successfully")
                Router.replace("/myprofile")
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
    useEffect(() => {
        if (userLoggedIn()) {
            setUploadedPhoto(user.profile)
            setLoggedIn(true)
        } else {
            Router.push("/login")
        }
    }, [user.profile])

    const handleChange = (file: File) => {
        if (file) {
            if (file.size > 1024 * 1024) {
                return showError("File size shouldnot be greater 1Mb")
            }
            setFilePhoto(file)
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    setImageError(false)
                    setUploadedPhoto(e.target.result as string); // Set the data URL for the image preview
                }
            };
            reader.readAsDataURL(file);
        }

    };
    if (!loggedIn) return <></>
    return (
        <div className='flex justify-center items-center w-screen h-screen select-none'>
            <ToastContainer />
            <div className='flex flex-col w-full shadow-md p-12' style={{
                maxWidth: "600px"
            }}>

                <>
                    <div className="margin-bottom-20">
                        <div className="utf-edit-profile-photo-area cursor-pointer">
                            <img src={imageError ? "images/default/nouser.jpg" :
                                uploadedPhoto}
                                alt="" onError={() => {
                                    setImageError(true)
                                }} />

                        </div>
                    </div>
                    <div className="content with-padding">
                        <div className="col-md-12 submit-section">
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes}
                            />
                        </div>
                    </div>
                    <button className='p-3 bg-primary text-white w-full' onClick={changeProfile}>
                        {loading ? <CgSpinner className=' w-full text-center animate-spin' /> : <> change profile</>}
                    </button>
                </>
            </div>
        </div>
    )
}
