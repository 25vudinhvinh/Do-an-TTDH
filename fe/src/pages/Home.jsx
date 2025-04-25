import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Map from '../components/Map'
import Navigation from '../components/Navigation'

const Home = () => {
    const token = localStorage.getItem('token')
    const avatar_url = localStorage.getItem('avatar_url')
    const username = localStorage.getItem('username') || 'User'
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token, navigate])

    return (
        <div className="fixed right-0 left-0 bottom-0 top-0 flex">
            <div className="w-[80px] bg-black">
                <Navigation />
            </div>
            <div className="flex-1 bg-white z-1">
                <Map />
            </div>
            <div className="fixed right-[20px] top-[20px] z-99">
                <Avatar avatarUrl={avatar_url} username={username} />
            </div>
        </div>
    )
}

export default Home
