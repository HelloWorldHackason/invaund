'use client'
import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import MarkerClusterer from '@google/markerclustererplus';
import Image from 'next/image'
import { useRecoilState, useRecoilValue } from 'recoil';
import { adminMarkersState, iconIdState, descriptionsState, markerClickedState, customerMarkersState } from '../States/State';

//画像のURLを定義
const TrushCunIcon = '/images/trushCunIcon.svg';
const adminLikeIcon = '/images/adminLikeIcon.svg';
const adminDescription = 'これは管理者のお勧めの場所です。';
const TrushDescription = 'これはゴミ箱の位置です';

const center = {
    lat: 35.01036882045099,
    lng: 135.68153868624793,
};

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const zoom = 18;

const page = () => {
    const [map, setMap] = useState<any | null>(null);
    const [maps, setMaps] = useState<any | null>(null);
    const [clusterer, setClusterer] = useState<any | null>(null);
    const [adminMarkers, setAdminMarkers] = useRecoilState<any | null>(adminMarkersState);
    const [Iconid, setIconid] = useRecoilState<any | null>(iconIdState);
    const [descriptions, setDescriptions] = useRecoilState<string>(descriptionsState);
    const [markerClicked, setMarkerClicked] = useRecoilState<boolean>(markerClickedState);
    const customerMarkers = useRecoilValue(customerMarkersState);

    const toggleMarkerIcon = () => {
        if (Iconid === adminLikeIcon) {
            setIconid(TrushCunIcon);
            setDescriptions(TrushDescription);
        } else {
            setIconid(adminLikeIcon);
            setDescriptions(adminDescription);
        }
    };
    useEffect(() => {
        if (map && maps) {
            if (clusterer) clusterer.clearMarkers();

            const allMarkers: any[] = [];

            adminMarkers.map((markerData: any) => {
                const marker = new maps.Marker({
                    position: markerData.position,
                    icon: markerData.icon,
                    markersize: markerData.size,
                    markerdescription: markerData.descriptions,
                });

                marker.addListener("click", (e: any) => {
                    setMarkerClicked(true);
                    const infowindow = new maps.InfoWindow({
                        content: markerData.markerdescription,
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
                // marker.setMap(map);
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
                icon: Iconid,
                markersize: 10,
                markerdescription: descriptions,
            });

            newMarker.addListener("click", (e: any) => {
                setMarkerClicked(true);
                const infowindow = new maps.InfoWindow({
                    content: descriptions,
                });
                infowindow.open(map, newMarker);
            });

            const markerData = {
                position: newMarker.position,
                icon: newMarker.icon,
                size: newMarker.markersize,
                markerdescription: descriptions,
            };

            setAdminMarkers((prevMarkers: any) => [...prevMarkers, markerData]);
            map.panTo(latLng);
        }
    };

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
