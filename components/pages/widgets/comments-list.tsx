import { Comment } from '@/connections/interfaces'
import React from 'react'
import CommentContainer from './comment-widget'

export default function CommentList({ comments, refreshList }: { comments: Comment[], refreshList: () => void }) {
    return (
        <section className="comments margin-top-40">
            <div className="utf-inner-blog-section-title">
                <h4><i className="icon-line-awesome-commenting-o"></i> Comments </h4>
            </div>
            <ul>
                {comments.map((e, i) => {
                    return <CommentContainer key={i} e={e} refreshList={refreshList} />
                })}
            </ul>
        </section>
    )
}
