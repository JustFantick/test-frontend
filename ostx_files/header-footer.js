const weatherApi = {
	key: '9f23b56e8dcad8299bf4e5a2a3fc932b',
	baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

async function initWeatherWidgets() {
	const responseJson = await fetch(`${weatherApi.baseUrl}?q=${'London'}&appid=${weatherApi.key}&units=metric`);
	const weatherObj = await responseJson.json();

	const date = new Intl.DateTimeFormat('en', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
	}).format(new Date);

	const weatherWidgets = document.querySelectorAll('.weather-widget');
	if (weatherWidgets.length) {
		weatherWidgets.forEach(
			widget => widget.innerHTML = `${date} | ${Math.round(weatherObj.main.temp)}°C London`
		);
	};
};

initWeatherWidgets();