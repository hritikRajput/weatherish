let currentWeatherContainer = document.querySelector(".currentWeatherContainer")
let hourlyWeatherContainer = document.querySelector(".hourlyWeatherContainer")
import thermoImg from './assets/thermo.svg';
import humidityImg from './assets/humidity.svg';
import rainyImg from './assets/rainy.svg';
import windImg from './assets/wind.svg';

function updateWeatherUI(weatherData){
    console.log(weatherData)
    let condition = weatherData.curr.condition;
    let temp = weatherData.curr.temp;
    let mintemp = weatherData.curr.min_temp;
    let maxtemp= weatherData.curr.max_temp;
    let location = weatherData.location["0"] + ", " + weatherData.location["1"];
    let feelsLike = weatherData.curr.feels_like;
    let humidity = weatherData.curr.humidity;
    let visibility = weatherData.curr.visibility;
    let windSpeed = weatherData.curr.wind;
    let time = weatherData.curr.localtime;
    let hour = weatherData.hour;

    // 2 section ---- hourly, currentWeather-- TempInfo ExtraInfo
    let tempInfoContainer = createTempInfo(condition, location, time, temp, mintemp, maxtemp);
    currentWeatherContainer.append(tempInfoContainer)
    let extraInfoContainer = createExtraInfo(feelsLike, humidity, visibility, windSpeed)
    currentWeatherContainer.append(extraInfoContainer)
    let hourlyInfoContainer = createHourlyInfo(hour)
    hourlyWeatherContainer.append(hourlyInfoContainer)
}

function createTempInfo(condition, location, time, temp, mintemp, maxtemp){
    const tempInfoContainer = document.createElement("div");
    tempInfoContainer.className = "tempInfoContainer"
    const currentCondition = document.createElement("p");
    const currentCity = document.createElement("p");
    const currentTime = document.createElement("p");
    const currentTemp = document.createElement("p");
    const minmaxTemp = document.createElement("p");

    currentCondition.textContent=condition;
    currentCity.textContent=location;
    currentTime.textContent=time;
    currentTemp.textContent=`${temp} \xB0C`;
    minmaxTemp.textContent = `${mintemp}/${maxtemp} \xB0C`;

    tempInfoContainer.appendChild(currentCondition)
    tempInfoContainer.appendChild(currentCity)
    tempInfoContainer.appendChild(currentTime)
    tempInfoContainer.appendChild(currentTemp)
    tempInfoContainer.appendChild(minmaxTemp)

    return tempInfoContainer;
}

function createExtraInfo(feelsLike, humidity, visibility, windSpeed){
    const extraInfoContainer = document.createElement("div");
    extraInfoContainer.className = "extraInfoContainer"
    const thermoContainer = createThermoContainer(feelsLike);
    const humidityContainer = createHumidityContainer(humidity);
    const visibilityContainer = createVisibilityContainer(visibility);
    const windContainer = createWindContainer(windSpeed);

    extraInfoContainer.append(thermoContainer)
    extraInfoContainer.append(humidityContainer)
    extraInfoContainer.append(visibilityContainer)
    extraInfoContainer.append(windContainer)

    return extraInfoContainer;
}

function createThermoContainer(feelsLike){
    const thermoContainer = document.createElement("div")
    thermoContainer.classList.add("thermo-container")
    const thermoImage = document.createElement("div")
    thermoImage.classList.add("thermo-image")
    const thermoContent = document.createElement("div")
    thermoContent.classList.add("thermo-content")

    const img = document.createElement("img")
    img.src=thermoImg;

    const p1 = document.createElement("p");
    p1.textContent = "Feels like"
    const p2 = document.createElement("p");
    p2.textContent = `${feelsLike} \xB0C`;

    thermoImage.append(img)
    thermoContent.append(p1)
    thermoContent.append(p2)
    thermoContainer.append(thermoImage)
    thermoContainer.append(thermoContent)
    return thermoContainer
}
function createHumidityContainer(humidity){
    const humidityContainer = document.createElement("div")
    humidityContainer.classList.add("humidity-container")
    const humidityImage = document.createElement("div")
    humidityImage.classList.add("humidity-image")
    const humidityContent = document.createElement("div")
    humidityContent.classList.add("humidity-content")

    const img = document.createElement("img")
    img.src=humidityImg;

    const p1 = document.createElement("p");
    p1.textContent = "Humidity"
    const p2 = document.createElement("p");
    p2.textContent = `${humidity} \u0025`;

    humidityImage.append(img)
    humidityContent.append(p1)
    humidityContent.append(p2)
    humidityContainer.append(humidityImage)
    humidityContainer.append(humidityContent)
    return humidityContainer
}

function createVisibilityContainer(visibility){
    const visibilityContainer = document.createElement("div")
    visibilityContainer.classList.add("visibility-container")
    const visibilityImage = document.createElement("div")
    visibilityImage.classList.add("visibility-image")
    const visibilityContent = document.createElement("div")
    visibilityContent.classList.add("visibility-content")

    const img = document.createElement("img")
    img.src=rainyImg;

    const p1 = document.createElement("p");
    p1.textContent = "visibility"
    const p2 = document.createElement("p");
    p2.textContent = `${visibility} \u0025`;

    visibilityImage.append(img)
    visibilityContent.append(p1)
    visibilityContent.append(p2)
    visibilityContainer.append(visibilityImage)
    visibilityContainer.append(visibilityContent)
    return visibilityContainer
}
function createWindContainer(wind){
    const windContainer = document.createElement("div")
    windContainer.classList.add("wind-container")
    const windImage = document.createElement("div")
    windImage.classList.add("wind-image")
    const windContent = document.createElement("div")
    windContent.classList.add("wind-content")

    const img = document.createElement("img")
    img.src=windImg;

    const p1 = document.createElement("p");
    p1.textContent = "wind"
    const p2 = document.createElement("p");
    p2.textContent = `${wind} km/h`;

    windImage.append(img)
    windContent.append(p1)
    windContent.append(p2)
    windContainer.append(windImage)
    windContainer.append(windContent)
    return windContainer
}


function createHourlyInfo(hour){
    const hourlyInfoContainer = document.createElement("div");
    hourlyInfoContainer.className = "hourlyInfoContainer"

    for(let i=0; i<24; i++){
        const div = document.createElement("div");
        div.className="hour"
        const time = document.createElement("p");
        const temp = document.createElement("p");
        time.textContent=`${hour[i].time.slice(11,16)}`;
        temp.textContent=`${hour[i].temp} \xB0C`;
        div.append(time);
        div.append(temp);

        hourlyInfoContainer.append(div);
    }
    


    return hourlyInfoContainer;
}

function clearUI(){
    while (currentWeatherContainer.firstChild) {
        currentWeatherContainer.removeChild(currentWeatherContainer.lastChild);
      }
    while (hourlyWeatherContainer.firstChild) {
        hourlyWeatherContainer.removeChild(hourlyWeatherContainer.lastChild);
      }
      
      
   
}


export {updateWeatherUI, clearUI}