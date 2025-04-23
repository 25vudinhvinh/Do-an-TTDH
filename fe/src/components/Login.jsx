import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')
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
            setTimeout(() => navigate('/home'), 2000) // Chuyển hướng về trang chính
        } catch (err) {
            setError(err.response?.data?.error || 'Đăng nhập thất bại')
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4 text-2xl font-bold">
                                Đăng nhập
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="username"
                                        className="form-label"
                                    >
                                        Tên đăng nhập
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 hover:bg-blue-600"
                                >
                                    Đăng nhập
                                </button>
                            </form>
                            {message && (
                                <div
                                    className="alert alert-success mt-3"
                                    role="alert"
                                >
                                    {message}
                                </div>
                            )}
                            {error && (
                                <div
                                    className="alert alert-danger mt-3"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            <p className="text-center mt-3">
                                Bạn chưa có tài khoản?{' '}
                                <a
                                    href="/register"
                                    className="text-blue-500 hover:underline"
                                >
                                    Đăng ký
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
