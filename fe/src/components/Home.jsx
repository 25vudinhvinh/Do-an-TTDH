import React from 'react'

const Home = () => {
    const token = localStorage.getItem('token')

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Welcome to Hanoi Location App
                </h1>
                {token ? (
                    <div>
                        <p className="text-lg">Bạn đã đăng nhập!</p>
                        <button
                            className="btn btn-outline-danger mt-3"
                            onClick={() => {
                                localStorage.removeItem('token')
                                window.location.href = '/login'
                            }}
                        >
                            Đăng xuất
                        </button>
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
