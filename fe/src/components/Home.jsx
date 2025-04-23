import React from 'react'

const Home = () => {
    const token = localStorage.getItem('token')

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to Hanoi Location App</h1>
            {token ? (
                <p>
                    You are logged in!{' '}
                    <button onClick={() => localStorage.removeItem('token')}>
                        Logout
                    </button>
                </p>
            ) : (
                <p>
                    Please <a href="/login">login</a> or{' '}
                    <a href="/register">register</a>.
                </p>
            )}
        </div>
    )
}

export default Home
