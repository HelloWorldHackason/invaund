'use client'
import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import MarkerClusterer from '@google/markerclustererplus';
import Image from 'next/image'
import { useRecoilState } from 'recoil';
import { markersState, iconIdState, descriptionsState, markerClickedState } from '../States/State';

//画像のURLを定義
const TrushCunIcon = '/images/trushCunIcon.svg';
const adminLikeIcon = '/images/adminLikeIcon.svg';
const adminDiscription = 'これは管理者のお勧めの場所です。';
const TrushDiscription = 'これはゴミ箱の位置です';

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
    const [markers, setMarkers] = useRecoilState<any | null>(markersState);
    const [Iconid, setIconid] = useRecoilState<any | null>(iconIdState);
    const [discriptions, setDiscriptions] = useRecoilState<string>(descriptionsState);
    const [markerClicked, setMarkerClicked] = useRecoilState<boolean>(markerClickedState);

    const toggleMarkerIcon = () => {
        if (Iconid === adminLikeIcon) {
            setIconid(TrushCunIcon);
            setDiscriptions(TrushDiscription);
        } else {
            setIconid(adminLikeIcon);
            setDiscriptions(adminDiscription);
        }
    };
    useEffect(() => {
        if (map && maps && markers.length) {
            if (clusterer) clusterer.clearMarkers();
            const allMarkers = markers.map((markerData: any) => {
                const marker = new maps.Marker({
                    position: markerData.position,
                    icon: markerData.icon,
                    markersize: markerData.size,
                });

                marker.addListener("click", (e: any) => {
                    setMarkerClicked(true);
                    const infowindow = new maps.InfoWindow({
                        content: discriptions,
                    });
                    infowindow.open(map, marker);
                });

                return marker;
            });
            const newClusterer = new MarkerClusterer(map, allMarkers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
            setClusterer(newClusterer);
        }
    }, [map, maps, markers]);

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
            });

            newMarker.addListener("click", (e: any) => {
                setMarkerClicked(true);
                const infowindow = new maps.InfoWindow({
                    content: discriptions,
                });
                infowindow.open(map, newMarker);
            });

            const markerData = {
                markerObject: newMarker,
                position: newMarker.position,
                icon: newMarker.icon,
                size: newMarker.markersize,
            };

            setMarkers((prevMarkers: any) => [...prevMarkers, markerData]);
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
