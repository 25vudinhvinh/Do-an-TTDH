import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Map from '../components/Map'
import Navigation from '../components/Navigation'

import Popup from '../components/popup/Popup'
import ButtonGroup from '../components/ButtonGroup'

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
            <div className="w-[65px]">
                <Navigation />
            </div>

            <div className="flex-1 bg-white z-1">
                <Map />
            </div>

            <div className="fixed left-[65px] top-0 w-[27%] z-2">
                <Popup />
            </div>
            <div className="fixed left-[40%] w-[45%] top-6 z-20 overflow-x-hidden">
                <ButtonGroup />
            </div>
            <div className="fixed right-[20px] top-3 z-99">
                <Avatar avatarUrl={avatar_url} username={username} />
            </div>
        </div>
    )
}

export default Home
