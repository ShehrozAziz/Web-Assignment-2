import React, { useState, useEffect } from "react";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"; // Import the icons you want to use
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Weather = () => {
  const [city, setCity] = useState("London"); // Set default city
  const [inputValue, setInputValue] = useState(""); // Local state for input
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading

  const fetchWeatherData = async () => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: {
        q: city,
        days: "4",
      },
      headers: {
        "x-rapidapi-key": "API_KEY",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    };

    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setCity(inputValue); // Update the city state only on Enter key press
      setInputValue(""); // Clear input after search
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-cover bg-center py-8 pb-32 bg-custom-bg">
      <div className="w-full max-w-md relative">
        <input
          type="text"
          value={inputValue} // Use local input state
          onChange={(e) => setInputValue(e.target.value)} // Update local state on change
          onKeyDown={handleKeyPress} // Trigger search on Enter
          placeholder="Enter a City..."
          className="w-full px-4 py-2 border border-gray-400 rounded-2xl mb-12"
        />
      </div>

      {loading ? (
        // Show loading indicator if loading is true
        <div className="text-center">
          <p className="text-3xl font-bold">Loading...</p>
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin mx-auto">
            <FontAwesomeIcon icon={faSpinner} />
          </div>
        </div>
      ) : (
        weatherData && (
          <div className="relative w-full flex flex-col items-center">
            {/* Main Tile */}
            <div className="bg-white bg-opacity-30 rounded-lg shadow-2xl p-8 w-[70%] text-center relative flex items-center justify-center z-0 md:pb-44 md:pt-28 mb-8 md:mb-0">
              <div className="flex justify-center items-center space-x-4">
                <img
                  src={`https:${weatherData.current.condition.icon}`}
                  alt="Current Weather Icon"
                  className="w-48 h-48"
                />
                <div className="text-left">
                  <p className="font-semibold text-lg">Today</p>
                  <h2 className="text-3xl font-bold mb-4">
                    {weatherData.location.name}
                  </h2>
                  <p className="text-2xl">
                    Temperature: {weatherData.current.temp_c}°C
                  </p>
                  <p className="text-lg">
                    {weatherData.current.condition.text}
                  </p>
                </div>
              </div>
            </div>

            {/* Small Tiles */}
            <div className="flex md:flex-row flex-col items-center justify-center md:-mt-20 space-y-4 md:space-y-0 md:space-x-4">
              {weatherData.forecast.forecastday.map((day, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-30 rounded-3xl border-gray-700 shadow-2xl p-4 text-center w-64 h-60 flex flex-col items-center justify-center transform md:-translate-y-8"
                >
                  <p className="font-medium">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>
                  <img
                    src={`https:${day.day.condition.icon}`} // Use the API icon URL
                    alt={`Forecast Icon for ${new Date(
                      day.date
                    ).toLocaleDateString("en-US", { weekday: "long" })}`}
                    className="w-36 h-36 my-1 animate-move"
                  />
                  <p className="text-xl">{day.day.avgtemp_c}°C</p>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Weather;
