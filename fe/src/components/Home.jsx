import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const token = localStorage.getItem('token')
    const avatar_url = localStorage.getItem('avatar_url')
    const username = localStorage.getItem('username') || 'User'
    const navigate = useNavigate()

    const getAvatar = () => {
        if (avatar_url && avatar_url !== 'null' && avatar_url !== '') {
            // Thêm gốc URL nếu avatar_url là đường dẫn tương đối
            return avatar_url.startsWith('http')
                ? avatar_url
                : `http://localhost:5000${avatar_url}`
        }
        return `https://via.placeholder.com/40/007bff/ffffff?text=${username.charAt(0).toUpperCase()}`
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('avatar_url')
        localStorage.removeItem('username')
        navigate('/')
    }

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Chào mừng đến với Hanoi Location App
                </h1>
                {token ? (
                    <div>
                        <div className="mb-4">
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
                                        onError={(e) => {
                                            e.target.src = `https://via.placeholder.com/40/007bff/ffffff?text=${username.charAt(0).toUpperCase()}`
                                        }}
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleLogout}>
                                        Đăng Xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <p className="text-lg">Bạn đã đăng nhập!</p>
                    </div>
                ) : (
                    <p className="text-lg">
                        Vui lòng{' '}
                        <a href="/" className="text-blue-500 hover:underline">
                            đăng nhập
                        </a>{' '}
                        hoặc{' '}
                        <a
                            href="/register"
                            className="text-blue-500 hover:underline"
                        >
                            đăng ký
                        </a>
                        .
                    </p>
                )}
            </div>
        </div>
    )
}

export default Home
