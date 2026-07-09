import './style.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = `<p class = "title">Loading...</p>`

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector("#app").innerHTML = `<p class="title">${data.title}</p>`;
        document.querySelector("#app").innerHTML += `<p class="copyright">${data.copyright}</p>`;
    }
);

console.log(API_KEY);