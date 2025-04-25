import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const validateForm = () => {
        const newErrors = {}
        if (!username) newErrors.username = 'Vui lòng nhập tên đăng nhập'
        if (!password) newErrors.password = 'Vui lòng nhập mật khẩu'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setErrors({})
        if (!validateForm()) return

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                {
                    username,
                    password,
                }
            )
            setMessage(response.data.message)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('avatar_url', response.data.avatar_url || '')
            localStorage.setItem('username', response.data.username || username)
            setTimeout(() => navigate('/home'), 2000)
        } catch (err) {
            setErrors({
                server: err.response?.data?.error || 'Đăng nhập thất bại',
            })
        }
    }

    return (
        <div
            style={{
                maxWidth: '400px',
                margin: '50px auto',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '5px',
            }}
        >
            <h2 style={{ textAlign: 'center' }}>Đăng Nhập</h2>
            <div>
                <label htmlFor="username">Tên đăng nhập</label>
                <input
                    type="text"
                    id="username"
                    style={{
                        width: '100%',
                        padding: '8px',
                        margin: '8px 0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                    <div style={{ color: 'red' }}>{errors.username}</div>
                )}
            </div>
            <div>
                <label htmlFor="password">Mật khẩu</label>
                <input
                    type="password"
                    id="password"
                    style={{
                        width: '100%',
                        padding: '8px',
                        margin: '8px 0',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                    <div style={{ color: 'red' }}>{errors.password}</div>
                )}
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Đăng Nhập
            </button>
            {message && (
                <div
                    style={{
                        marginTop: '10px',
                        color: 'green',
                        textAlign: 'center',
                    }}
                >
                    {message}
                </div>
            )}
            {errors.server && (
                <div
                    style={{
                        marginTop: '10px',
                        color: 'red',
                        textAlign: 'center',
                    }}
                >
                    {errors.server}
                </div>
            )}
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Chưa có tài khoản?{' '}
                <a
                    href="/register"
                    style={{ color: '#007bff', textDecoration: 'none' }}
                >
                    Đăng ký tại đây
                </a>
            </p>
        </div>
    )
}

export default Login
