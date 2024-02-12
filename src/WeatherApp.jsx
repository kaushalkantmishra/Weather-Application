import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Ranchi",
    feelsLike: 23.02,
    humidity: 19,
    temp: 24.06,
    tempMax: 24.06,
    tempMin: 24.06,
    weather: "clear sky",
    windSpeed: 3.09,
  });

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  useEffect(() => {
    const getWeatherInfoByLocation = async (latitude, longitude) => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const API_KEY = import.meta.env.VITE_API_KEY;

        let response = await fetch(
          `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        let jsonResponse = await response.json();

        let result = {
          city: jsonResponse.name,
          temp: jsonResponse.main.temp,
          tempMin: jsonResponse.main.temp_min,
          tempMax: jsonResponse.main.temp_max,
          humidity: jsonResponse.main.humidity,
          feelsLike: jsonResponse.main.feels_like,
          weather: jsonResponse.weather[0].description,
          windSpeed: jsonResponse.wind.speed,
        };
        console.log(result);
        updateInfo(result);
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    };

    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherInfoByLocation(latitude, longitude);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchUserLocation();
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Weather App</h1>
      <div className="search-item">
        <SearchBox updateInfo={updateInfo} />
        <InfoBox info={weatherInfo} />
      </div>
    </div>
  );
}
