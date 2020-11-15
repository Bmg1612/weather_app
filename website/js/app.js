/*
* Setting the display of the results div to none so that
* it only appears when the generate button is clicked
*/
document.querySelector('#entryHolder').style.display = "none";

// HTML DOM target
const button = document.querySelector('.button');

// Event listener to add function to existing HTML DOM element
button.addEventListener('click', performAction = () => {
    // Create a new date instance dynamically with JS
    const d = new Date();
    const newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

    const newZip = document.getElementById('zip').value;
    const newFeeling = document.getElementById('feeling').value;
    // Personal API Key for OpenWeatherMap API
    const apiKey = 'xxxxxxxxxxxxxxxxx';
    const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${newZip},&appid=${apiKey}&units=metric`;
    displayWeather(baseUrl)
    .then ((data) => {
        postData('/data', {
            date: newDate,
            temperature: data.main.temp,
            user_response: newFeeling
        });
        updateUI();   
    })
});

/* Function to GET Web API Data*/
const displayWeather = async (url) => {
    let request = await fetch(url);
    try {
        const data = await request.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log("There was an error:", error);
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
        // console.log(newData);
        return newData
    } catch(error) {
        console.log("There was an error:", error);
    }
}

/* Dynamically updating the UI */
const updateUI = async () => {
    let request = await fetch('/data');

    let dateList = document.querySelector('#date_list');
    let tempList = document.querySelector('#temperature_list');
    let contentList = document.querySelector('#content_list');
    let entryHolder = document.querySelector('#entryHolder');
    //Showing the results div when the button is clicked
    entryHolder.style.display = "grid";

    try {
        let allData = await request.json();
        dateList.innerHTML    = `<li class="query_item">Date: ${allData.date}</li>`;
        tempList.innerHTML    = `<li class="query_item">Temperature: ${allData.temperature.toFixed(0)}ºC</li>`;
        contentList.innerHTML = `<li class="query_item">Feeling: ${allData.user_response}</li>`;
        entryHolder.scrollIntoView({behavior: "smooth"});
    } catch (error) {
        console.log("There was an error:", error);
    }
}