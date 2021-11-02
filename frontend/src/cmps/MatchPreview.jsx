import React from 'react';

export function MatchPreview({ loggedInUser, targetUser, match, onOpenMatch }) {

    function isMatchOpen (loggedInUser, match) {
        for (let key in match) {
            if (key === 'user1') {
                if (match[key].id === loggedInUser._id) return match[key].isOpenNotification;
            } else if (key === 'user2') {
                if (match[key].id === loggedInUser._id) return match[key].isOpenNotification;
            }
        }
    }

    return (
        <article className={`match-prev ${isMatchOpen(loggedInUser, match) ? '': 'match-prev-active'}`} onClick={() => onOpenMatch(match._id)}>
            <div className="match-prev-info flex">
                <img className="mini-img" src={targetUser.imageUrl} alt="no-img" />
                <p>{targetUser.name}</p>
            </div>
            {!match.msgs.length ? '' : <p className="match-prev-msg">{match.msgs[match.msgs.length - 1].from}: {match.msgs[match.msgs.length - 1].txt}</p>}
        </article>
    )
}