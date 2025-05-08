import { useContext } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    ZoomControl,
    Tooltip,
} from 'react-leaflet'
import { GlobalContext } from '../context/GlobalContext'
import L from 'leaflet'

function Map() {
    const { locationSearch } = useContext(GlobalContext)

    const iconMar = L.icon({
        iconUrl: 'src/assets/eat.svg',
        iconAnchor: [0, 0],
        iconSize: [25, 25],
    })

    return (
        <div className="w-full h-full">
            <MapContainer
                className="w-full h-full"
                center={[21.0285, 105.8542]}
                zoom={15}
                scrollWheelZoom={true}
                zoomControl={false}
            >
                <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {locationSearch.map((item, key) => (
                    <Marker
                        key={key}
                        position={[item.latitude, item.longitude]}
                        icon={iconMar}
                    >
                        <Tooltip permanent>{item.name}</Tooltip>
                    </Marker>
                ))}
                <ZoomControl position="bottomright" />
            </MapContainer>
        </div>
    )
}

export default Map
