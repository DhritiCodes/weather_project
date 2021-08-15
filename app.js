// const cityname = document.getElementById('w-location');
// const description = document.getElementById('w-desc');
// const temperature = document.getElementById('w-string');
// const icon = document.getElementById('w-icon');
// const feelsLike = document.getElementById('w-icon');
// const humidity = document.getElementById('w-icon');
// const icon = document.getElementById('w-icon');
// const icon = document.getElementById('w-icon');

const weatherData = document.getElementById('weatherData');

const form = document.getElementById('form');
const userLocation = document.getElementById('userLocation');

//pain ui with fetched data values
function paintUI(w) {

    var imgUrl = `http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`;

    weatherData.innerHTML = `
        <h1 id="w-location">${w.name}, ${w.sys.country}</h1>
        <h3 class="text-dark" id="w-desc">${w.weather[0].main}, ${w.weather[0].description}</h3>
        <h3 id="w-string">Temperature : ${w.main.temp}&deg</h3>
        <img src=${imgUrl} id="w-icon">
        <ul id="w-details" class="list-group mt-3">
            <li class="list-group-item">Feels Like : ${w.main.feels_like}&deg</li>
            <li class="list-group-item">Humidity : ${w.main.humidity}%</li>
            <li class="list-group-item">Pressure : ${w.main.pressure} hPa</li>
            <li class="list-group-item">Wind Speed : ${w.wind.speed} m/s SSE</li>
        </ul>
        `
}


//fetch weather api data
function fetchApiData(city) {
    const loc = city;
    const key = 'ad9ec9565784ee70e0cdfd30fa06971a';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message === "city not found") {
                //invalid city name
                alert("Please enter valid city name");
            } else {
                paintUI(data);
            }
        })
        .catch(err => console.log(err))
}

//get user location from form
function getUserLocation(e) {
    const city = userLocation.value;

    if (city === "") {
        alert("enter valid city name");
    } else {
        fetchApiData(city);
        userLocation.value = " ";
    }

    e.preventDefault();
}

form.addEventListener('submit', getUserLocation);

fetchApiData('delhi');




// weather link
// https://api.openweathermap.org/data/2.5/weather?q=durgapur&appid=ad9ec9565784ee70e0cdfd30fa06971a&units=metric

// weather icon 
// http://openweathermap.org/img/wn/10d@2x.png

// function(resp) { return resp.json() }