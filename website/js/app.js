// Create a new date instance dynamically with JS
const d = new Date();
const newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
document.querySelector('#entryHolder').style.display = "none";
// Personal API Key for OpenWeatherMap API
const apiKey = '13f1473acdb89267f932793a8c56106a';
const newZip = document.getElementById('zip').value;
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${newZip},&appid=${apiKey}&units=metric`
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
        updateUI();    
    })
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
/* Dynamically updating the UI */
const updateUI = async () => {
    let request = await fetch('/all');

    let dateList = document.querySelector('#date_list');
    let tempList = document.querySelector('#temperature_list');
    let contentList = document.querySelector('#content_list');
    let entryHolder = document.querySelector('#entryHolder');

    entryHolder.style.display = "grid";


    try {
        let allData = await request.json();
        console.log(allData);
        dateList.innerHTML    = `<li class="query_item">Date: ${allData.date}</li>`;
        tempList.innerHTML    = `<li class="query_item">Temperature: ${allData.temperature}</li>`;
        contentList.innerHTML = `<li class="query_item">User response: ${allData.user_response}</li>`;
        entryHolder.scrollIntoView({behavior: "smooth"});
    } catch (error) {
        console.log("error", error);
    }
}