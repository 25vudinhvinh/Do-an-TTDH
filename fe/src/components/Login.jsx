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
            localStorage.setItem('username', username)
            setTimeout(() => navigate('/home'), 2000)
        } catch (err) {
            setErrors({
                server: err.response?.data?.error || 'Đăng nhập thất bại',
            })
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4 text-2xl font-bold">
                                Đăng Nhập
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
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">
                                            {errors.username}
                                        </div>
                                    )}
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
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 hover:bg-blue-600"
                                >
                                    Đăng Nhập
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
                            {errors.server && (
                                <div
                                    className="alert alert-danger mt-3"
                                    role="alert"
                                >
                                    {errors.server}
                                </div>
                            )}
                            <p className="text-center mt-3">
                                Chưa có tài khoản?{' '}
                                <a
                                    href="/register"
                                    className="text-blue-500 hover:underline"
                                >
                                    Đăng ký tại đây
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
