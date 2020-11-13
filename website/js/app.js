// Create a new date instance dynamically with JS
const d = new Date();
const newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
// Personal API Key for OpenWeatherMap API
const apiKey = '13f1473acdb89267f932793a8c56106a';
const newZip = document.getElementById('zip').value;
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${newZip},&units=metric&appid=${apiKey}`
// Event listener to add function to existing HTML DOM element
const newFeeling = document.getElementById('feeling').value;
const button = document.querySelector('.button');
/* Function called by event listener */
button.addEventListener('click', performAction = (e) => {
    e.preventDefault();
    displayWeather(baseUrl)
    .then ((data) => {
        postData('/data', {
            date: newDate,
            temperature: data.main.temp,
            user_response: newFeeling
        });
    });
});

/* Function to GET Web API Data*/
const displayWeather = async (baseUrl) => {
    let request = await fetch(baseUrl);
    try {
        const data = await request.json();
        console.log(`${newZip}`)
        console.log(data);
        return data;
    } catch(error) {
        // ALERT? or Console.log?
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    let response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        let newData = await response.json();
        console.log(newData);
        return newData
    } catch(error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
