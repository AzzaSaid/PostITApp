import React, { useState, useEffect } from "react";
import axios from "axios";

function Location() {
    const [ip, setIp] = useState(null); //State to hold the IP address
  const [country, setCountry] = useState(null); //State to hold geolocation
  const [region, setRegion] = useState(null); // State to hold geolocation

  const getGeoLocationData = async () => {
    try { 
      const response = await axios.get(`${process.env.REACT_APP_LOCAION_API_KEY}`);
      setIp(response.data.ip);
      setCountry(response.data.location.country); // Set country
      setRegion(response.data.location.region); // Set region
     
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
    }
  };

 useEffect(()=>{
    getGeoLocationData()
 },[])

  return (
    <div>
    <h6>{ip}</h6>
    <h6>{country}</h6>
    <h6>{region}</h6>
  </div>

  )
}

export default Location