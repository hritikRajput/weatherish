async function getForecast(location){
    
    let url = `https://api.weatherapi.com/v1/forecast.json?key=be85db4c9bfc4cb9b50172920230306&q=${location}&days=2`
    let response = await fetch(url)
    let forecastData = await response.json()
    console.log(forecastData)
    return forecastData
}

export {getForecast}