import { useState } from "react";
import axios from "axios";
import style from "../styles/style.module.css";
import Loader from "./Loader";
import Credentials from "../config/config";

function SearchBox() {
  const [city, setCity] = useState("");
  const [Weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [countryFlag, setCountryFlag] = useState("");
  const fetchData = async () => {
    let parsedData;
    try {
      setLoading(true);
      const url = Credentials.base + Credentials.key + `q=${city}`;
      const res = await axios.get(url);
      parsedData = await res.data;
      await setWeather(parsedData);
      setLoading(false);
      console.log(parsedData);
    } catch (error) {
      setLoading(false);
      setWeather([]);
    }
    fetch(`https://restcountries.com/v2/name/${parsedData.location.country}`)
      .then((response) => response.json())
      .then((data) => {
        const flagUrl = data[0].flags.svg;
        setCountryFlag(flagUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (Object.keys(Weather).length === 0) {
    return (
      <div className={style.searchBar}>
        <h1>Weather today</h1>
        <div className={style.searchBox}>
          <input
            type="text"
            value={city}
            placeholder="eg : London"
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <div className={style.icon} onClick={fetchData}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/10302/10302844.png"
              alt=""
              height={30}
            ></img>
          </div>
        </div>
      </div>
    );
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className={style.searchBar}>
        <h1>Weather today</h1>
        <div className={style.searchBox}>
          <input
            type="text"
            value={city}
            placeholder="eg : London"
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <div className={style.icon} onClick={fetchData}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/10302/10302844.png"
              alt=""
              height={30}
            ></img>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.card}>
          <h1>{Weather.location.country}</h1>
          <img
            src={countryFlag}
            alt={Weather.location.country}
            height={50}
          ></img>
          <p>
            Lat{" : "} {Weather.location.lat}
          </p>
          <p>
            Lon{" : "} {Weather.location.lon}
          </p>
          <p>
            Local Time{" : "} {String(Weather.location.localtime).slice(11)}
          </p>
        </div>
        <div className={style.card}>
          <h1>Temperature</h1>
          <h2>{Weather.current.temp_c} °C</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/128/6854/6854054.png"
            alt={Weather.current.condition.text + "- icon"}
            height={50}
          />

          <p>Feels Like: {Weather.current.feelslike_c} °C</p>
        </div>
        <div className={style.card}>
          <h1>Forecast</h1>
          <img src={Weather.current.condition.icon} alt="icon" />
          <p>
            {Weather.current.condition.text
              ? Weather.current.condition.text
              : "Unavailable"}
          </p>
        </div>
        <div className={style.card}>
          <h1>Wind</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/1506/1506761.png"
            alt="wind-icon"
            height={50}
          />
          <h2>Speed: {Weather.current.wind_kph} Km/H</h2>
          <p>
            Deg:{" "}
            {Weather.current.wind_degree
              ? Weather.current.wind_degree + "°"
              : "Unavailable"}
          </p>
          <p>
            Direction:{" "}
            {Weather.current.wind_dir ? Weather.current.wind_dir : "Unvailable"}
          </p>
        </div>
      </div>
    </>
  );
}

export default SearchBox;
