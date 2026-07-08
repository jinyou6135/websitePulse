import './style.css'

document.querySelector('#app').innerHTML = `
  <main>
    
  </main>
`
const date = document.querySelector("#datepicker").value;
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);