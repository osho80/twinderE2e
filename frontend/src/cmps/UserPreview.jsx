import React from 'react';

export function UserPreview({ user, history }) {

    function onClickUserPrev(userId) {
        history.push(`/profile/${userId}`);
    }

    return (
        <article className="user-preview" onClick={() => onClickUserPrev(user._id)}>
            <img src={user.imagesUrls[0]} alt={user.fullName} />
            <div className="user-min-info">
                <p>{user.fullName}</p>
                <p>{user.age}</p>
                <p> {user.city}</p>
            </div>
        </article>
    )
} 