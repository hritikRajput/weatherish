async function getForecast(location){
    
    let url = `http://api.weatherapi.com/v1/forecast.json?key=be85db4c9bfc4cb9b50172920230306&q=${location}`
    let response = await fetch(url)
    let forecastData = await response.json()
    return forecastData
}

export {getForecast}