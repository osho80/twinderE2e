import React from 'react';
var moment = require('moment'); // require

export function PostList({ user }) {
    return (
        <section className="posts-section">
            {user.posts.map((post, idx) => {
                return <div key={idx} className="user-post flex justify-center column ">
                    <section className="flex">
                        <div>
                            <img className="mini-img" src={user.imagesUrls[0]} alt="no-img" />
                        </div>
                        <div className="flex column">
                            <div className="moment"> {moment(post.createdAt).fromNow()}</div>
                            <div className="post-txt"> {post.txt}</div>
                        </div>
                    </section>
                </div>
            })
            }
        </section>
    )
}