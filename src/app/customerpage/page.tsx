'use client'
import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { iconIdState, markerClickedState, customerMarkersState, adminMarkersState } from '../States/State';
import MarkerClusterer from '@google/markerclustererplus';
import Image from 'next/image'

const center = {
    lat: 35.01036882045099,
    lng: 135.68153868624793,
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const zoom = 18;

const page = () => {
    const [map, setMap] = useState<any | null>(null);
    const [maps, setMaps] = useState<any | null>(null);
    const [marker, setMarker] = useState<any | null>(null);
    const adminMarkers = useRecoilValue(adminMarkersState);
    const [clusterer, setClusterer] = useState<any | null>(null);
    const [Iconid, setIconid] = useRecoilState<any | null>(iconIdState);
    const [markerClicked, setMarkerClicked] = useRecoilState<boolean>(markerClickedState);
    const [customerMarkers, setCustomerMarkers] = useRecoilState<any | null>(customerMarkersState);


    useEffect(() => {
        if (map && maps) {
            if (clusterer) clusterer.clearMarkers();

            const allMarkers: any[] = [];

            adminMarkers.forEach((adminMarkerData: any) => {
                const marker = new maps.Marker({
                    position: adminMarkerData.position,
                    icon: adminMarkerData.icon,
                    markerdiscription: adminMarkerData.descriptions,
                });
                marker.addListener("click", (e: any) => {
                    setMarkerClicked(true);
                    const infowindow = new maps.InfoWindow({
                        content: adminMarkerData.markerdescription,
                    });
                    infowindow.open(map, marker);
                });
                allMarkers.push(marker);
            });

            customerMarkers.forEach((customerMarkerData: any) => {
                const marker = new maps.Marker({
                    position: customerMarkerData.position,
                    icon: customerMarkerData.icon,
                });
                marker.setMap(map);
                allMarkers.push(marker);
            });
            const newClusterer = new MarkerClusterer(map, allMarkers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
            setClusterer(newClusterer);
        }
    }, [map, maps, adminMarkers, customerMarkers]);

    const handleApiLoaded = ({ map, maps }: any) => {
        setMap(map);
        setMaps(maps);
    };

    const setLatLng = ({ lat, lng }: any) => {
        if (markerClicked) {
            setMarkerClicked(false);
            return;
        }

        if (maps && map) {
            const latLng = {
                lat,
                lng,
            };

            const newMarker = new maps.Marker({
                position: latLng,
            });


            const markerData = {
                position: newMarker.position,
            };

            setCustomerMarkers((prevMarkers: any) => [...prevMarkers, markerData]);
            map.panTo(latLng);
        }
    };


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
