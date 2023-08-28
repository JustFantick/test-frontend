async function initWeatherWidgets() {
	const weatherApi = {
		key: '9f23b56e8dcad8299bf4e5a2a3fc932b',
		baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
	}

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

function interactMenuBurger() {
	const menuIcon = document.querySelector('.menu-burger');
	const menuBody = document.querySelector('.drop-down-menu');

	menuIcon.addEventListener('click', () => {
		if (!menuIcon.classList.contains('active') || !menuBody.classList.contains('active')) {
			openMenu();

			menuBody.addEventListener('click', (e) => {
				e.preventDefault();
				closeMenu();
			}, { once: true });
		} else {
			closeMenu();
		}
	});

	function openMenu() {
		menuIcon.classList.add('active');
		menuBody.classList.add('active');
	}
	function closeMenu() {
		menuIcon.classList.remove('active');
		menuBody.classList.remove('active');
	}
}
interactMenuBurger();

const body = document.querySelector('body');

function initNavigation() {
	if (window.innerWidth > 890) {
		placeElementsAsDesctop();
		const navBlock = document.querySelector('.nav');
		const headerHeight = document.querySelector('.header__body').offsetHeight;

		navBlock.classList.remove('fixed');

		body.onscroll = () => {
			if (headerHeight <= scrollY) {
				navBlock.classList.add('fixed');
			} else {
				navBlock.classList.remove('fixed');
			}
		};
	} else {
		body.onscroll = () => { };
		const navBlock = document.querySelector('.nav');
		navBlock.classList.add('fixed');
		placeElementsAsMobile();
	}

	function placeElementsAsDesctop() {
		const titleBlock = document.querySelector('.header__logo');
		const searchBlock = document.querySelector('.search');
		const navListBlock = document.querySelector('.nav__list.nav-list');

		const weatherWidget = document.querySelector('.header__weather');
		const headerRightSection = document.querySelector('.header__right-section');
		const navContainer = document.querySelector('.nav');

		weatherWidget.after(titleBlock);
		headerRightSection.prepend(searchBlock);
		navContainer.prepend(navListBlock);
	}

	function placeElementsAsMobile() {
		const titleBlock = document.querySelector('.header__logo');
		const searchBlock = document.querySelector('.search');
		const navListBlock = document.querySelector('.nav__list.nav-list');

		const dropDownMenuBlock = document.querySelector('.drop-down-menu');
		const navContainer = document.querySelector('.nav');
		const navRightSection = document.querySelector('.nav__right-section');

		navRightSection.prepend(searchBlock);
		navContainer.prepend(titleBlock);
		dropDownMenuBlock.prepend(navListBlock);
	}
}
//Breaking point 890px
initNavigation();
window.addEventListener('resize', initNavigation);