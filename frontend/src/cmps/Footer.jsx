import React from 'react';
import { Link } from 'react-router-dom';

export function Footer () {
    return (
        <section className = "footer flex align-center space-between">
            <Link to = "/about" className = "about-link link">About</Link>
            <div>&copy; Twinder International Ltd. 2020</div>
        </section>
    )
}