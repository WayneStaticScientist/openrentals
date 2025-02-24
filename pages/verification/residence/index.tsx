import Router from 'next/router'
const fileTypes = ["JPG", "PNG"];
import { CgSpinner } from 'react-icons/cg'
import { MdVerified } from 'react-icons/md'
import { ToastContainer } from 'react-toastify'
import { ProgressBar } from 'react-loader-spinner'
import React, { useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { showError, showSuccess } from '@/functions/toast'
import { useUserState, UserRegistration } from '@/connections/user'
import OpenImageLoader from '@/components/pages/widgets/classic-image-loader,'
import { clearSavedLogss, getDeviceId, getUser, getVariables } from '@/functions/device'
export default function ProofOfResVerification() {
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [filePhoto, setFilePhoto] = useState<File | null>(null)
    const [uploadPhoto, setUploadedPhoto] = useState<string>("")
    const [residentDocumentSent, setResidentDocumentSent] = useState(false)
    const uploadResidencePhoto = async () => {
        if (sending) return
        const formData = new FormData()
        formData.append("files", filePhoto ?? '')
        try {
            setSending(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}v1/user/residence/verify`, {
                headers: {
                    "Authorization": "Bearer " + getVariables().refreshTokens,
                    "x-device-id": getDeviceId(),
                },
                method: 'POST',
                body: formData,
            });
            setSending(false)
            if (response.ok) {
                showSuccess("Photo of residence uploaded successfully")
                setResidentDocumentSent(true)
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
    const { email, proofOfResidence, firstName, lastName } = useUserState()
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
        <div className='w-full h-screen m-0 flex  justify-center' style={{ margin: 0, padding: 0 }}>
            <ToastContainer />
            {
                loading ? <ProgressBar />
                    :
                    <>
                        <div className='shadow-lg max-w-4xl w-full p-12 overflow-y-auto'>
                            <div className='w-full flex items-center justify-center text-green-600 mb-12'><MdVerified size={55} /></div>
                            <div className='text-2xl font-extrabold mb-7'>Proof of Residence Verification</div>
                            {
                                residentDocumentSent || proofOfResidence == 1 ?
                                    <>
                                        <div className='notification warning'>
                                            You Proof of Residence was uploaded for review please stay tuned as we will verify your photo .This may take up to 24hours and as fast as three seconds .You will receive a notification
                                            To your email and to this Site . Make sure your email is verified and working
                                        </div>
                                    </>
                                    :
                                    proofOfResidence == 2 ?
                                        <>
                                            <div className='notification success'>
                                                Your proof of residence Was verified Welcome aboard {firstName} {lastName} . We are happy to have you here
                                            </div>
                                        </>
                                        : (<>
                                            <div>
                                                We need to verify where you live .Send any a picture proof of residence you have make it clear the resident address on the residentDocument
                                                should match exactly the details on your profile.It can be Electrical bills document , Affdavit of residence , or any other document that shows your resident address.
                                                This may take from 3 seconds up to 24 hours.
                                                You may call our support team if you need instant verification.
                                                Click The box below or drag and drop the photo of ID or Passport to upload
                                            </div>
                                            <div className="content with-padding">
                                                <div className="col-md-12 submit-section">
                                                    <FileUploader handleChange={handleChange} name="file" types={fileTypes}
                                                        text="Drag and drop your file here or click to upload"
                                                    />
                                                    {uploadPhoto.length > 0 ?
                                                        <img src={uploadPhoto} /> :
                                                        <OpenImageLoader path={''} errorPath={'../images/default/nouser.jpg'} />}
                                                </div>
                                            </div>
                                            <button className='w-full button mt-8' onClick={uploadResidencePhoto}>
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
