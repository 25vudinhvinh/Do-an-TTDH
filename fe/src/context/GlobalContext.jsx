// contexr/GlobalContext.jsx
import { createContext, useState } from 'react'

const GlobalContext = createContext()

const ContextProvider = ({ children }) => {
    const [inputValue, setInputValue] = useState('')
    const [locationSearch, setLocationSearch] = useState([])
    const [selectedLocation, setSelectedLocation] = useState(null)

    return (
        <GlobalContext.Provider
            value={{
                inputValue,
                setInputValue,
                locationSearch,
                setLocationSearch,
                selectedLocation,
                setSelectedLocation,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, ContextProvider }
