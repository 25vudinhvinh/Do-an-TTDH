import { useContext } from 'react'
import importainIcon from '~/assets/importain.svg'
import { GlobalContext } from '../../context/GlobalContext'
import Location from './Location'

function SearchResult() {
    const { locationSearch } = useContext(GlobalContext)

    return (
        <div className="w-full h-full bg-white z-10 px-2 select-none">
            <div className="flex gap-1 items-center pt-[65px]  pb-2">
                <p className="text-lg mb-0 font-medium opacity-85">Kết quả</p>
                <img className="w-[20px]" src={importainIcon} alt="" />
            </div>
            {locationSearch.map((item, index) => {
                return <Location item={item} key={index} />
            })}
        </div>
    )
}

export default SearchResult
