'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/router' // `next/navigation` ではなく `next/router` を使用
import GoogleMapReact from 'google-map-react';

const center = {
    lat: 35.01036882045099,
    lng: 135.68153868624793,
};



let markerPin = {
    lat: null,
    lng: null,
}

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const zoom = 18;

const page = () => {
    const [map, setMap] = useState<any | null>(null);
    const [maps, setMaps] = useState<any | null>(null);
    const [marker, setMarker] = useState<any | null>(null);
    const [items, setItems] = useState([
        {
            lat: markerPin.lat,
            lng: markerPin.lng,
        }
    ]);

    const handleApiLoaded = ({ map, maps }: any) => {
        items.forEach((item) => {
            new maps.Marker({
                position: item,
                map,
            });
        });
        setMap(map);
        setMaps(maps);
    };

    const setLatLng = ({ lat, lng }: any) => {
        // if (marker) {
        //     marker.setMap(null);
        // }
        const newItems = [...items, { lat, lng }];
        setItems(newItems);
        if (maps && map) {
            const latLng = {
                lat,
                lng,
            };
            const newMarker = new maps.Marker({
                map,
                position: latLng,
            });
            setMarker(newMarker);
            map.panTo(latLng);
        }
    };

    console.log(items);

    return (
        <div className='mx-auto flex justify-center items-center'>
            <div style={{
                width: "80vw",
                height: "75vh"
            }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleMapsApiKey }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    onGoogleApiLoaded={handleApiLoaded}
                    onClick={setLatLng}
                />
            </div>
        </div>
    )
}

export default page
