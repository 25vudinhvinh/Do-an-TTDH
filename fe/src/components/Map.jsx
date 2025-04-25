import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Map() {
    return (
        <div className="w-full h-full">
            <MapContainer
                className="w-full h-full"
                center={[21.0285, 105.8542]}
                zoom={15}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[21.0285, 105.8542]}>
                    <Popup>Hà Nội</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
