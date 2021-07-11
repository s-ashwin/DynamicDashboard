import React from 'react'
import Nav from './Nav'
import img from '../home.svg'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="home">
            <Nav></Nav>
            <div className="container">
                <div className="banner">
                    <div className="text">
                        <h1 className="m-0 text-primary fw-light">Create and manage dashboards on the go</h1>
                        <Link to="/signup" className="btn btn-lg btn-outline-primary mt-4">Get Started</Link>
                    </div>
                    <div className="image">
                        <img alt="banner" src={img}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}
