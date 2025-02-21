import { postPropertyCommentAsReply } from '@/connections/get-property'
import { Comment } from '@/connections/interfaces'
import { getLastDay } from '@/functions/time-format'
import { showError } from '@/functions/toast'
import React from 'react'
import { CgSpinner } from 'react-icons/cg'

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
        <li >
            <div className="avatar">
                <img src={e.user.profile.length > 0 ? process.env.NEXT_PUBLIC_SERVERT + e.user.profile : 'images/default/nouser.jpg'} alt="" />
            </div>
            <div className="comment-content">
                <div className="arrow-comment"></div>
                <div className="comment-by">{e.user.firstName} {e.user.lastName}<span className="date">
                    {getLastDay(e.date)} ago </span>
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
            <ul>
                {e.subComments.map((e, i) => {
                    return <li key={i}>
                        <div className="avatar"><img src={e.user.profile.length > 0 ? process.env.NEXT_PUBLIC_SERVERT + e.user.profile : 'images/default/nouser.jpg'} alt="" /></div>
                        <div className="comment-content">
                            <div className="arrow-comment"></div>
                            <div className="comment-by">{e.user.firstName} {e.user.lastName}
                                <span className="date">{getLastDay(e.date)} ago </span> <a href="#" className="reply">
                                    <i className="fa fa-reply"></i> Reply</a> </div>
                            <p>{e.comment}</p>
                        </div>
                    </li>
                })}
            </ul>
        </li>
    )
}
