import React, { useState } from 'react'
import weatherApi from '../weatherApi'
import './app.css'

const App = () => {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${weatherApi.base}weather?q=${query}&units=metric&APPID=${weatherApi.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result)
          setQuery('')
        })
    }
  }

  const dateBuilder = (d) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const day = days[d.getDay()]
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main !== 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onKeyDown={search}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </div>
        {
          typeof weather.main !== 'undefined' && (
          <div className="container">
            <div className="location-box">
              <div className="location">
                {`${weather.name}, ${weather.sys && weather.sys.country}`}
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {`${Math.round(weather.main.temp)}°C`}
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
          )
}
      </main>
    </div>
  )
}

export default App
