import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
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

  let updateInfo = (newInfo) =>{
    setWeatherInfo(newInfo);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Weather App by Kaushal</h1>
      <div className="search-item">
      <SearchBox updateInfo={updateInfo}/>

      <InfoBox  info={weatherInfo}/>
      </div>
    </div>
  );
}
