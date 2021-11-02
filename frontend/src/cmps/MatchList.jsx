import React from 'react';
import { MatchPreview } from '../cmps/MatchPreview';

export function MatchList({ matches, loggedInUser, onOpenMatch }) {

    function getMatchUserInfo(match, loggedInUser) {
        for (let key in match) {
            if (key === 'user1') {
                if (match[key].name !== loggedInUser.fullName) return match[key];
            } else if (key === 'user2') {
                if (match[key].name !== loggedInUser.fullName) return match[key];
            }
        }
    }
    return (
        <section className="match-list">
            {matches.map((match, idx) => <MatchPreview key={`match-${idx}`}
                loggedInUser={loggedInUser} targetUser={getMatchUserInfo(match, loggedInUser)} match={match} onOpenMatch={onOpenMatch} />)}
        </section>
    )
}