import React from 'react';

export function About({ user }) {
    return (
        <div className="about-sec flex justify-center  column">
            {/* <div>Age:{user.age}</div> */}
            {/* <div>City:{user.city}</div> */}
            {/* <div>Email:{user.email}</div> */}
            {/* <div>Gender:{user.gender}</div> */}

            <div>Looking for {user.userPrefs.gender}</div>
            <div> between {user.userPrefs.minAge} to {user.userPrefs.maxAge}</div>
            <div> from {user.userPrefs.city}</div>

        </div>
    )
}

