'use client'
import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import MarkerClusterer from '@google/markerclustererplus';
import Image from 'next/image'

const TrushCunIcon = '/images/trushCunIcon.svg';
const adminLikeIcon = '/images/adminLikeIcon.svg';

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
    const [items, setItems] = useState([
        {
            lat: markerPin.lat,
            lng: markerPin.lng,
        }
    ]);
    const [markers, setMarkers] = useState<any | null>([]);
    const [clusterer, setClusterer] = useState<any | null>(null);
    const [Iconid, setIconid] = useState<any | null>(adminLikeIcon);

    const toggleMarkerIcon = () => {
        if (Iconid === adminLikeIcon) {
            setIconid(TrushCunIcon);
        } else {
            setIconid(adminLikeIcon);
        }
    };


    useEffect(() => {
        if (map && maps && markers.length) {
            if (clusterer) clusterer.clearMarkers();
            const newClusterer = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
            setClusterer(newClusterer);
        }
    }, [map, maps, markers]);

    const handleApiLoaded = ({ map, maps }: any) => {
        items.forEach((item) => {
            new maps.Marker({
                position: item,
                map,
            });
        });
        new MarkerClusterer({ markers, map });
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
                icon: Iconid,
                markersize: 10,
            });
            setMarkers(prevMarkers => [...prevMarkers, newMarker]);
            map.panTo(latLng);
        }
    };

    console.log(items);

    return (
        <div className='mx-auto justify-center items-center'>
            <div style={{
                width: "80vw",
                height: "70vh"
            }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleMapsApiKey }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    onGoogleApiLoaded={handleApiLoaded}
                    onClick={setLatLng}
                />
            </div>
            <button
                onClick={toggleMarkerIcon}
                style={{
                    width: "10vw",
                    height: "5vh"
                }}
                className='block mx-auto mt-1'
            >
                <Image src="/images/MarkerChange.svg" alt='' className='w-full mx-auto shadow-sm hover:shadow-none hover:translate-y-1 transition-all duration-300' width={100} height={100} style={{
                    width: "10vw",
                    height: "5vh"
                }}></Image>
            </button>
        </div>
    )
}

export default page