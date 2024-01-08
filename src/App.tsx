import React, { useState, useEffect } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

interface WeatherData {
  data: {
    wind_cdir: string;
    rh: number;
    pod: string;
    lon: number;
    pres: number;
    timezone: string;
    ob_time: string;
    country_code: string;
    clouds: number;
    vis: number;
    wind_spd: number;
    gust: number;
    wind_cdir_full: string;
    app_temp: number;
    state_code: string;
    ts: number;
    h_angle: number;
    dewpt: number;
    weather: {
      icon: string;
      code: number;
      description: string;
    };
    uv: number;
    aqi: number;
    station: string;
    sources: string[];
    wind_dir: number;
    elev_angle: number;
    datetime: string;
    precip: number;
    ghi: number;
    dni: number;
    dhi: number;
    solar_rad: number;
    city_name: string;
    sunrise: string;
    sunset: string;
    temp: number;
    lat: number;
    slp: number;
  }[];
  minutely: any[]; // Add proper type for minutely data
  count: number;
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Change here: Use position.coords.latitude and position.coords.longitude separately
          setLocation(
            `${position.coords.latitude},${position.coords.longitude}`
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    // Change here: Use the correct API key from your Weatherbit account
    const apiKey = "4b8c828c2c1a4b0993875898415dbbfa";

    // Use IP-based geolocation service to get user's location
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((locationData) => {
        const { latitude, longitude } = locationData;

        // Change here: Use the correct Weatherbit API endpoint with lat and lon parameters
        const apiUrl = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=${latitude}&lon=${longitude}&include=minutely`;

        return fetch(apiUrl);
      })
      .then((response) => response.json())
      .then((data: WeatherData) => setWeatherData(data))
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  const getCurrentWeatherForecast = () => {
    if (!weatherData?.data.length) {
      return <div>Loading...</div>;
    }

    const {
      wind_cdir,
      rh,
      lon,
      pres,
      timezone,
      ob_time,
      country_code,
      clouds,
      vis,
      wind_spd,
      gust,
      wind_cdir_full,
      app_temp,
      state_code,
      ts,
      h_angle,
      dewpt,
      weather,
      uv,
      aqi,
      station,
      sources,
      wind_dir,
      elev_angle,
      datetime,
      precip,
      ghi,
      dni,
      dhi,
      solar_rad,
      city_name,
      sunrise,
      sunset,
      temp,
      lat,
      slp,
    } = weatherData.data[0];

    return (
      <div>
        <header className="flex items-center justify-between bg-gray-200 py-4 px-6">
          <div className="flex items-center">
            {/*<img src="logo.png" alt="Company logo" class="h-8 w-8 mr-2">*/}
            <h1 className="text-4xl font-bold text-blue-700">Jupiter</h1>
          </div>
          <span className="text-lg text-gray-700">
            See what the lord of olympus has for you today
          </span>
        </header>
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="w-full max-w-md">
            <h1 className="text-5xl font-bold mb-2">
              <HiOutlineLocationMarker
                size={48}
                className="inline-block mr-2"
              />
              Current Weather
            </h1>
            <h2 className="text-2xl mb-4">{city_name}</h2>
            <p className="mb-1">{weatherData.data[0]?.weather?.description}</p>
            <p className="mb-1">Temperature: {weatherData.data[0]?.temp}°C</p>
            <p className="mb-1">Humidity: {weatherData.data[0]?.rh}%</p>
            <p className="mb-1">
              Wind Speed: {weatherData.data[0]?.wind_spd} m/s
            </p>
          </div>
        </div>
      </div>
    );
  };

  return <div>{getCurrentWeatherForecast()}</div>;
};

export default App;
