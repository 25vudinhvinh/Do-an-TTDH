import { createContext, useState } from 'react'

const GlobalContext = createContext()

const ContextProvider = ({ children }) => {
    const [inputValue, setInputValue] = useState('')
    const [locationSearch, setLocationSearch] = useState([])
    return (
        <GlobalContext.Provider
            value={{
                inputValue,
                setInputValue,
                locationSearch,
                setLocationSearch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, ContextProvider }
