import { postPropertyCommentAsReply } from '@/connections/get-property'
import { Comment } from '@/connections/interfaces'
import { getLastDay } from '@/functions/time-format'
import { showError } from '@/functions/toast'
import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import OpenImageLoader from './classic-image-loader,'

export default function CommentContainer({ e, refreshList }: { e: Comment, refreshList: () => void }) {
    const [showReply, setShowReply] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [reply, setReply] = React.useState("")
    const sendReply = async (id: string) => {
        if (loading) return
        setLoading(true)
        const respone = await postPropertyCommentAsReply(reply, id)
        setLoading(false)
        if (typeof respone === 'string') return showError(respone)
        setReply("")
        refreshList()
    }
    return (
        <div className='flex flex-col select-none'>
            <div className='flex gap-x-3 '>
                <div className="">
                    <OpenImageLoader path={e.user.profile} errorPath={'images/default/nouser.jpg'}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: "100%"
                        }} />
                </div>
                <div>
                    <div className="flex flex-col bg-gray-100 p-3 rounded-b-3xl rounded-r-3xl">
                        <div className='flex justify-between gap-x-12'>
                            <div className="flex flex-col">{e.user.firstName} {e.user.lastName}
                                <span className="text-lg">
                                    {getLastDay(e.date)} ago </span>
                            </div>
                            <a className="reply cursor-pointer" onClick={() => setShowReply(!showReply)}>
                                <i className="fa fa-reply"></i> Reply
                            </a>
                        </div>
                        {showReply &&
                            <div className=" flex items-center   p-3 m-0">
                                <input className='m-0 p-4' value={reply} onChange={(e) => setReply(e.target.value)} />
                                <div className='cursor-pointer flex items-center justify-center bg-primary p-4 pl-12 pr-12 text-white'
                                    onClick={() => sendReply(e._id)}>
                                    {loading ? <CgSpinner className=' animate-spin' /> : <>send</>}
                                </div>
                            </div>
                        }
                        <p>{e.comment}</p>

                    </div>
                    <div className='border-l-4 pl-12'>

                        {e.subComments.map((e, i) => {
                            return <li key={i}>

                                <div className='flex gap-x-3 '>
                                    <div className="">
                                        <OpenImageLoader path={e.user.profile} errorPath={'images/default/nouser.jpg'}
                                            style={{
                                                width: 45,
                                                height: 45,
                                                borderRadius: "100%"
                                            }} />
                                    </div>
                                    <div>
                                        <div className="flex flex-col bg-gray-100 p-3 rounded-b-3xl rounded-r-3xl">
                                            <div className='flex justify-between gap-x-12'>
                                                <div className="flex flex-col">{e.user.firstName} {e.user.lastName}
                                                    <span className="text-lg">
                                                        {getLastDay(e.date)} ago </span>
                                                </div>

                                            </div>
                                            <p>{e.comment}</p>
                                        </div>
                                    </div>
                                </div>

                            </li>
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}
