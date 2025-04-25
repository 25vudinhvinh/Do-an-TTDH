import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Avatar = ({ avatarUrl, username }) => {
    const navigate = useNavigate()
    const [imageError, setImageError] = useState(false)

    const getAvatar = () => {
        if (avatarUrl && !imageError) {
            return avatarUrl
        }
        const initial = username ? username.charAt(0).toUpperCase() : 'U'
        return `https://ui-avatars.com/api/?name=${initial}&background=007bff&color=fff&size=40`
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('avatar_url')
        localStorage.removeItem('username')
        navigate('/')
    }

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="link"
                id="dropdown-avatar"
                className="p-0"
            >
                <img
                    src={getAvatar()}
                    alt="Avatar"
                    className="rounded-circle"
                    style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                    }}
                    onError={() => setImageError(true)}
                />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <p className="text-5px">@{username}</p>
                <Dropdown.Item onClick={handleLogout}>Đăng Xuất</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Avatar
