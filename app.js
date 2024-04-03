const ApiKey = `49af8dde964736772a06e0718225bfb3`;

// API by lon and lat = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`

// API by city name = `http://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={ApiKey}`

// IMG_URL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

// link to website.... https://openweathermap.org/


const form = document.querySelector('form')
const search = document.querySelector('#search')
const weather = document.querySelector('#weather')

const getCity = async (city) => {
    url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${ApiKey}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data);
    console.log(data[0].lat);
    console.log(data[0].lon);
    const lat = data[0].lat
    const lon = data[0].lon
    getWeather(lat, lon)
}

const getWeather = async(city) => {
    weather.innerHTML = `<h2>Loading...</h2>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    console.log(response);
    console.log(data);
    showWeather(data)
}


const showWeather = (data) => {
    if (data.cod == '404') {
        weather.innerHTML = `<h2>Location Not Found</h2>`
    }

    weather.innerHTML = `
    <div>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" >
    </div>
    <div>
         <h2>${data.main.temp} ℃</h2>
         <h2>${data.weather[0].main}</h2>
    </div>
    
    
    
    `
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // getCity(search.value);
    getWeather(search.value);
    search.value = ''
})