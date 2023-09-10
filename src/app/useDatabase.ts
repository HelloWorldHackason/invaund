import React from "react";
import { useRef } from "react";

export const getPins = async () => {
  const res = await fetch("/api/pin");
  const data = await res.json();
  return data.pins;
}

export const setCustomerPin = async (latitude: number, longitude: number) => {
  const res = await fetch("/api/pin", {
    method: "PUT",
    body: JSON.stringify({latitude, longitude}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.json();
}

export const setAdminPin = async (latitude: number, longitude: number, description: string, pictureSrc: string) => {
  const res = await fetch("/api/pin", {
    method: "POST",
    body: JSON.stringify({latitude, longitude, description, pictureSrc}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.json();
}