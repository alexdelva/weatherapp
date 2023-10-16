var apiKey = "f4a4db39fc643b7e0ec6a745b67faa0b"


var titleEl = document.getElementById('title')
var tempEl = document.getElementById('temp')
var windEl = document.getElementById('wind')
var humidityEl = document.getElementById('humidity')

var searchBtn = document.getElementById('searchBtn')
var cityInput = document.getElementById('searchBar')
var fiveDayForcastEl = document.getElementById('fiveday-forecast')


function searchCity(){
    var cityName=cityInput.value
    displayWeather(cityName)
    saveCity(cityName)
}
//saveCity(cityName)
function saveCity(cityName){
var previousSearch = JSON.parse(localStorage.getItem("weatherInfo")) || []
previousSearch.push(cityName)
localStorage.setItem("weatherInfo",JSON.stringify(previousSearch))
console.log(previousSearch)
var searchHtml=""
for (let i = 0; i < previousSearch.length; i++) {
    searchHtml+=`<li class="list-group-item "><button type="button" class="btn btn-secondary previous-search" w-100">${previousSearch[i]}</button></li>`    
}
document.getElementById("list-group").innerHTML=searchHtml
var searchHistory=document.querySelectorAll(".previous-search")
for (let i = 0; i < searchHistory.length; i++) {
searchHistory[i].addEventListener("click",searchAgain)
    
}
}
function searchAgain(event){
    var city=event.target.textContent
    displayWeather(city)
}

function displayWeather(cityName) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial"

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {
            console.log(currentData)
            titleEl.innerHTML = currentData.name +
            dayjs.unix(currentData.dt).format("(MM/DD/YYYY)") + "<img src='https://openweathermap.org/img/wn/" + currentData.weather[0].icon + "@2x.png'>"
            
            tempEl.innerHTML = "Temp: " + currentData.main.temp + "°F"
            windEl.innerHTML = "Wind: " + currentData.wind.speed + " MPH"
            humidityEl.innerHTML = "Humidity: " + currentData.main.humidity + "%"
            
            
        })
        
        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial"
        
        fetch(forecastUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (forecastData) {
            console.log(forecastData)
            
            // grab every 12pm for each day for 5 days 
            
            //5 day Forecast Information
            var forecastArr = forecastData.list
            for (let i = 5, j = 1; i < forecastArr.length; i = i + 8, j++) {
                
                var cardTitle = document.getElementById("card-title" + j)
                cardTitle.textContent = dayjs.unix(forecastArr[i].dt).format("(MM/DD/YYYY)")
                
                console.log(forecastArr[i],j)
            
                
                //This isnt working???
                var cardPicEl=document.getElementById("img"+j)
                cardPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + forecastArr[i].weather[0].icon +"@2x.png") 


                var tempEl = document.getElementById("temp" + j)
                tempEl.textContent = "Temp: " + forecastArr[i].main.temp + "°F"


                var windEl = document.getElementById("wind" + j)
                windEl.textContent = "Wind: " + forecastArr[i].wind.speed + " MPH"

                var humidityEl = document.getElementById("humidity" + j)
                humidityEl.textContent = "Humidity: " + forecastArr[i].main.humidity + "%"

            }
        })
}

searchBtn.addEventListener("click", searchCity)

