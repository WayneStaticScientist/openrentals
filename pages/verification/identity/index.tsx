import Router from 'next/router'
import { CgSpinner } from 'react-icons/cg'
import { MdVerified } from 'react-icons/md'
import { ToastContainer } from 'react-toastify'
import { ProgressBar } from 'react-loader-spinner'
import React, { useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { showError, showSuccess } from '@/functions/toast'
import { clearSavedLogss, getDeviceId, getUser, getVariables } from '@/functions/device'
import { useUserState, UserRegistration } from '@/connections/user'
import OpenImageLoader from '@/components/pages/widgets/classic-image-loader,'
const fileTypes = ["JPG", "PNG"];

export default function IdVerification() {
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [filePhoto, setFilePhoto] = useState<File | null>(null)
    const [uploadPhoto, setUploadedPhoto] = useState<string>("")
    const [idDocumentSent, setIdDocumentSent] = useState(false)
    const uploadIdPhoto = async () => {
        if (sending) return
        const formData = new FormData()
        formData.append("files", filePhoto ?? '')
        try {
            setSending(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}v1/user/id/verify`, {
                headers: {
                    "Authorization": "Bearer " + getVariables().refreshTokens,
                    "x-device-id": getDeviceId(),
                },
                method: 'POST',
                body: formData,
            });
            setSending(false)
            if (response.ok) {
                showSuccess("Photo Id uploaded successfully")
                setIdDocumentSent(true)
            }
            if (response.status === 400 || response.status === 401 || response.status >= 500) {
                const { message } = await response.json()
                return showError(message)
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            //
        }
        setSending(false)
    }
    const handleChange = (file: File) => {
        if (file) {
            if (file.size > 1024 * 1024) {
                return showError("File size shouldnot be greater 1Mb")
            }
            setFilePhoto(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    setUploadedPhoto(e.target.result as string); // Set the data URL for the image preview
                }
            };
            reader.readAsDataURL(file);
        }

    };
    const { email, idNumberVerified, firstName, lastName } = useUserState()
    const userLogIn = async () => {
        const userReg = new UserRegistration()
        const resp = await userReg.fetchUser({ retry: true })
        if (typeof resp === 'string') {
            clearSavedLogss()
            Router.push("/login")
            return
        }
        const user = getUser()
        if (user) useUserState.setState(user)
        setLoading(false)
    }
    useEffect(() => {
        userLogIn()
    }, [email])
    return (
        <div className='w-full h-screen m-0 flex items-center justify-center' style={{ margin: 0, padding: 0 }}>
            <ToastContainer />
            {
                loading ? <ProgressBar />
                    :
                    <>
                        <div className='shadow-lg max-w-4xl w-full p-12'>
                            <div className='w-full flex items-center justify-center text-green-600 mb-12'><MdVerified size={55} /></div>
                            <div className='text-2xl font-extrabold mb-7'>Identity Verification</div>
                            {
                                idDocumentSent || idNumberVerified == 1 ?
                                    <>
                                        <div className='notification warning'>
                                            You Id was uploaded for review please stay tuned as we will verify your photo .This may take up to 24hours and as fast as three seconds .You will receive a notification
                                            To your email and to this Site . Make sure your email is verified and working
                                        </div>
                                    </>
                                    :
                                    idNumberVerified == 2 ?
                                        <>
                                            <div className='notification success'>
                                                Your proof of identity Was verified Welcome aboard {firstName} {lastName}
                                            </div>
                                        </>
                                        : (<>
                                            <div>
                                                We need to verify who you are .You send your National ID or Passport then we will verify you  by inspecting the photos ourselves.
                                                This may take from 3 seconds up to 24 hours.
                                                You may call our support team if you need instant verification.
                                                Click The box below or drag and drop the photo of ID or Passport to upload
                                            </div>
                                            <div className="content with-padding">
                                                <div className="col-md-12 submit-section">
                                                    <FileUploader handleChange={handleChange} name="file" types={fileTypes}
                                                    />
                                                    {uploadPhoto.length > 0 ?
                                                        <img src={uploadPhoto} /> :
                                                        <OpenImageLoader path={''} errorPath={'../images/default/nouser.jpg'} />}
                                                </div>
                                            </div>
                                            <button className='w-full button mt-8' onClick={uploadIdPhoto}>
                                                {
                                                    sending ? <CgSpinner className=' animate-spin w-full text-center' /> :
                                                        <>send id for verification</>
                                                }
                                            </button>
                                        </>)
                            }
                        </div>
                    </>
            }
        </div >)
}
