import { useContext } from 'react'
import importainIcon from '~/assets/importain.svg'
import { GlobalContext } from '../../context/GlobalContext'
import Location from './Location'

function SearchResult() {
    const { locationSearch, setSelectedLocation } = useContext(GlobalContext)

    const handleClick = (item) => {
        setSelectedLocation(item)
    }

    return (
        <div className="w-full h-full bg-gray-50 z-10 px-2 select-none overflow-scroll scrollbar-hidden">
            <div className="flex gap-1 items-center pt-[65px] pb-2">
                <p className="text-lg mb-0 font-medium opacity-85">Kết quả</p>
                <img className="w-[20px]" src={importainIcon} alt="" />
            </div>
            {locationSearch.map((item, index) => {
                return (
                    <Location
                        onClick={() => handleClick(item)}
                        item={item}
                        key={index}
                    />
                )
            })}
        </div>
    )
}

export default SearchResult
