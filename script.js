const container = document.querySelector('.container')

const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetail = document.querySelector('.weather-detail')
const error = document.querySelector('.not-found')
const cityHide = document.querySelector('.city-hide');
search.addEventListener('click', () => {
    const APIkey = 'c25b3b073c1f3f1f95900fd5477d2ea5';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
cityHide.textContent=city;
            container.style.height = '400px';
            
            weatherBox.classList.remove('active');
            weatherDetail.classList.remove('active');
            error.classList.add('active');
            return;
        }
   


        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-detail .humidity span');
        const wind = document.querySelector('.weather-detail .wind span');




        if(cityHide.textContent==city){
            return;
        }
        else {cityHide.textContent = city;

                 container.style.height = '555px';
                    container.classList.add('active');
                    weatherBox.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetail.classList.add('active');
        error.classList.remove('active');
        setTimeout(() => {
               container.classList.remove('active');

        },1000);



         switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear-sky.png'
                break;
            case 'Rain':
                image.src = 'images/rain.png'
                break;
            case 'Snow':
                image.src = 'images/snowflake.png'
                break;
            case 'Mist':
                image.src = 'images/haze.png'
                break;
            case 'Cloud':
                image.src = 'images/cloudy.png'
                break;
            case 'Haze':
                image.src = 'images/haze.png'
                break;

            default:
                image.src = "images/cloudy.png"
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span> °C </span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;

        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        // const infoWeather=document.querySelector('.info-weather');
        //   const infoWeather=document.querySelector('.info-weather');
        //     const infoWeather=document.querySelector('.info-weather');

        }
       
    });

});
