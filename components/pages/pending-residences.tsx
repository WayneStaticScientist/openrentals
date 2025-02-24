import { User } from '@/connections/interfaces'
import { getVariables, getDeviceId } from '@/functions/device'
import { showError, showSuccess } from '@/functions/toast'
import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-loader-spinner'
import OpenImageLoader from './widgets/classic-image-loader,'
import { CgSpinner } from 'react-icons/cg'
import { AdminVerifyResidence } from '@/connections/get-property'

export default function PendingResidences() {
    const [loading, setLoading] = React.useState(true)
    const [users, setUsers] = React.useState<User[]>([])
    const [rejected, setRejected] = React.useState(false)
    const [showDialog, setShowDialog] = React.useState(false)
    const [rejectionReason, setRejectionReason] = useState("")
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
    const [updating, setUpdating] = useState(false)
    const [verifiedRes, setVerifiedRes] = useState<string[]>([])
    useEffect(() => {
        loadIds()
    }, [])
    const setUpdateRes = async () => {
        if (updating) return
        if (verifiedRes.find(e => e == selectedUser!.email)) return showError("User already verified")
        if (rejected && rejectionReason.length < 5) return showError("Please enter rejection reason")
        setUpdating(true)
        const response = await AdminVerifyResidence(selectedUser!.email, rejectionReason, !rejected)
        setUpdating(false)
        if (typeof response === 'string') return showError(response)
        setVerifiedRes([...verifiedRes, selectedUser!.email])
        setRejected(false)
        setShowDialog(false)
        return showSuccess("user verification status updated")
    }
    const loadIds = async () => {
        setLoading(true)
        try {
            const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` + 'v1/user/residence/get',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + getVariables().refreshTokens,
                        "X-device-id": getDeviceId(),
                    },
                }
            )
            setLoading(false)
            if (api.ok) {
                const data = await api.json()
                return setUsers(data)
            }
            if (api.status === 401) {
                return showError('Unauthorized')
            }
            if (api.status === 500) {
                return showError('Server Error')
            }
            if (api.status === 404) {
                return showError('Not Found')
            }
            if (api.status === 400) {
                const { message } = await api.json()
                return showError(message)
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return showError('There was network error')
        }
        setLoading(false)

    }
    return (
        <>
            {
                showDialog &&
                <div className='z-50 fixed left-0 right-0 top-0 bg-[#00000024] flex flex-col items-center justify-center p-6 w-screen h-screen'
                    style={{ zIndex: 1000, position: 'fixed' }}>
                    {selectedUser &&
                        <div className='  bg-white p-6 flex flex-col gap-y-6' style={{ maxWidth: '800px', width: '90%' }}>
                            {
                                rejected ?
                                    <div>
                                        <textarea placeholder='enter reason for rejection ' value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                        ></textarea>
                                    </div> :
                                    <OpenImageLoader path={selectedUser.documentsResidence} errorPath={'../images/default/nouser.jpg'} />
                            }

                            <div className='w-full flex justify-end gap-x-4'>
                                <button className={updating ? 'bg-gray-500 px-12 py-3 text-white ' : 'bg-red-600 px-12 py-3 text-white hover:bg-red-500'}
                                    onClick={() => !updating && setShowDialog(false)}>Close</button>
                                <button className={updating ? 'bg-gray-500 px-12 py-3 text-white ' : 'bg-orange-600 px-12 py-3 text-white hover:bg-orange-500'}
                                    onClick={() => !updating && setRejected(!rejected)}>{rejected ? <>UnReject</> : <>Reject</>}</button>
                                {rejected ?
                                    <button className='bg-sky-800 px-12 py-3 text-white hover:bg-sky-600'
                                        onClick={() => !updating && setUpdateRes()}>
                                        {updating ? <CgSpinner className='w-full text-center animate-spin' /> : <>Send Reject Message</>}
                                    </button> :
                                    <button className='bg-green-600 px-12 py-3 text-white hover:bg-green-500'
                                        onClick={() => !updating && setUpdateRes()}>
                                        {updating ? <CgSpinner className='w-full text-center animate-spin' /> : <>Accept</>}
                                    </button>
                                }
                            </div>
                        </div>
                    }

                </div>
            }
            <div className='w-full h-full overflow-y-auto p-6'>
                {loading ? <div className='w-full h-full flex items-center justify-center'>
                    <ProgressBar />
                </div>
                    :
                    <div>
                        <div className='grid grid-cols-5 gap-4 p-6'>
                            <div>First Name</div>
                            <div>Last Name</div>
                            <div>Address</div>
                            <div>City</div>
                            <div></div>

                        </div>
                        <div className='w-full h-full overflow-y-auto flex flex-col gap-y-10'>
                            {users.map((user, index) => (
                                <div key={index} className={verifiedRes.find(e => e == user.email) ?
                                    'grid grid-cols-5 gap-4 items-center ring-2 ring-red-600 bg-orange-200 p-6'
                                    : `grid grid-cols-5 gap-4 items-center bg-slate-100 p-6`}>
                                    <div>{user.firstName}</div>
                                    <div>{user.lastName}</div>
                                    <div>{user.address}</div>
                                    <div>{user.city}</div>
                                    <div className='w-full flex justify-center'>
                                        <button className='button primary'
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setShowDialog(true)
                                            }}>view document </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>}

            </div>
        </>)
}

