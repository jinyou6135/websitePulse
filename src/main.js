import './style.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const datepicker = document.querySelector("#datepicker");

const today = new Date();
datepicker.value = `${today.getFullYear()}-` + `${String(today.getMonth() + 1).padStart(2, "0")}-` + `${String(today.getDate()).padStart(2, "0")}`;


const date = document.querySelector("#datepicker").value;

document.querySelector("#app").innerHTML = `<p class = "title">Loading...</p>`

function loadApod(date) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
        .then(response => response.json())
        .then(data => {

            if (data.code) {
                document.querySelector("#app").innerHTML = `
                    <p class="title">Error: ${data.msg}</p>
                `;
                return;
            }

            let media;

            if (data.media_type === "image") {
                media = `<img src = "${data.url}" class = "media" alt = ${data.title}/>`;
            } else if (data.url.includes("youtube")) {
                media = `<iframe src = "${data.url}" class="media"></iframe>`;
            } else {
                media = `<video src = "${data.url}" controls class="media"></video>`;
            }

            document.querySelector("#app").innerHTML = `
            <div class="background">
                <p class="title">${data.title}</p>
                <p class="explanation">${data.explanation}</p>
                ${media}
                <p class="copyright"><strong>Copyright:</strong> ${data.copyright || "NASA APOD"}</p>
            </div>
        `;
    })
    .catch(err => {
        document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
    });
}

loadApod(datepicker.value);

datepicker.addEventListener("change", () => {
    loadApod(datepicker.value);
});