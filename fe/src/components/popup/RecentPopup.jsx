import React, { useEffect, useState, useContext } from 'react'
import closeIcon from '~/assets/close.svg'
import importainIcon from '~/assets/importain.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Location from '../popupSearch/Location'
import { GlobalContext } from '../../context/GlobalContext'

const RecentPopup = () => {
    const navigate = useNavigate()
    const { setSelectedLocation, setLocationSearch } = useContext(GlobalContext)
    const [userLocation, setUserLocation] = useState({
        latitude: null,
        longitude: null,
    })
    const [selectValue, setSelectValue] = useState(2)
    const [locations, setLocations] = useState([])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        })
    }, [])

    const handleSelect = (e) => {
        setSelectValue(e.target.value)
    }

    useEffect(() => {
        if (userLocation.latitude && userLocation.longitude) {
            axios
                .post('http://localhost:5000/api/locations/nearby', {
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    radius: selectValue,
                })
                .then((res) => {
                    // THÊM: console.log để kiểm tra dữ liệu từ API
                    console.log('Locations from API:', res.data)
                    setLocations(res.data)
                    setLocationSearch(res.data)
                })
                .catch((error) =>
                    console.error('Error fetching locations:', error)
                )
        }
    }, [selectValue, userLocation, setLocationSearch])

    return (
        <div className="w-full h-[730px] py-3 shadow-md bg-white overflow-scroll scrollbar-hidden">
            <div className="flex items-center justify-between p-2 border-b-2 border-gray-200">
                <span className="flex gap-2 items-center select-none">
                    <p className="font-semibold text-2xl">Gần đây</p>
                    <select
                        name="km"
                        id="km"
                        className="px-2 py-1 bg-gray-100 rounded outline-0 border-0 text-green-700 font-semibold text-sm cursor-pointer"
                        onChange={handleSelect}
                    >
                        <option value="2">2Km</option>
                        <option value="5">5Km</option>
                        <option value="10">10Km</option>
                        <option value="15">15Km</option>
                    </select>
                    <img
                        className="w-[20px] h-[20px]"
                        src={importainIcon}
                        alt=""
                    />
                </span>
                <img
                    className="cursor-pointer w-8"
                    onClick={() => navigate('/home')}
                    src={closeIcon}
                    alt=""
                />
            </div>
            <div className="mx-2">
                {locations.map((item, index) => (
                    <div key={index}>
                        <Location
                            item={item}
                            distance={item.distance}
                            onClick={() => setSelectedLocation(item)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentPopup
