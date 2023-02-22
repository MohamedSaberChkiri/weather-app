const input = document.querySelector('.city')
const submit = document.querySelector('.submit')

const city = document.querySelector('.cityName')
const country = document.querySelector('.country')
const temprature = document.querySelector('.current_temp')
const feelslike = document.querySelector('.feelsLike')
const cond = document.querySelector('.condition')
const icon = document.querySelector('.image')

const loctime = document.querySelector('.localtime')
const windspd = document.querySelector('.windspeed')
const humd = document.querySelector('.humidity')

const showErr = document.querySelector('.alert')

let query
let key = '123a3c061e3b47d6b50195003232002'


submit.addEventListener('click',()=>{
    query = input.value
    fetchWeather()
    
})




async function fetchWeather(){
    const endpoint = new URL('http://api.weatherapi.com/v1/current.json')
    if(!query){
        showErr.innerHTML ='Please Enter a City Name'
        showErr.style.display ='flex'
        return
    }else{
        showErr.style.display ='none'
    endpoint.searchParams.set('q',query)
    endpoint.searchParams.set('key',key)
    //console.log(endpoint.toString())
    const response = await fetch(endpoint)
    if(response.status === 400) {
        showErr.innerHTML = `No city Matched ${query}`
        showErr.style.display = 'flex'
        return
    }else{
        showErr.style.display = 'none'
    const data = await response.json()

    const image = data.current.condition.icon

    city.innerHTML = data.location.name
    country.innerHTML = data.location.country
    temprature.innerHTML = data.current.temp_c
    feelslike.innerHTML = data.current.feelslike_c
    cond.innerHTML = data.current.condition.text
    icon.style.backgroundImage = `url('http:${image}')`

    loctime.innerHTML = data.location.localtime
    windspd.innerHTML = data.current.wind_kph
    humd.innerHTML = data.current.humidity}
    }
}