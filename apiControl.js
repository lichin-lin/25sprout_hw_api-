/* global google */
/* global fbmax */
/* global fbName */
let oldman;
let questionCounter = 0;
const oldmanCounter = [0, 0, 0, 0];
const tips = [[], [], [], [], []];
const questionTitle = [`一、也許我住在這裡會感到開心？`, `二、他們當我的鄰居我會比較自在？`, `三、哪裡最熱鬧呢？`, `四、哪邊聽起來最讓老人住得舒適？`, `五、哪個機構聽起來可以把性命託付給他們？`];
const contact = [[], [], [], []];

function generateQuestion() {
	const form = $(`<form class="questionSection"><h2>${questionTitle[questionCounter]}</h2><div class="questions"></div></form>`); // eslint-disable-line max-len
	// $('.questionContainer').append(form);
	$('.questionContainer').append(form);
	form.addClass('active');
	for (let i = 0; i < 4; i++) {
		const newAnwser = tips[questionCounter];
		const newQuestion = $(`<div class="Api Api_${i + 1}">${newAnwser[i]}</div>`);// eslint-disable-line max-len
		$('.questionContainer form:last-child .questions').append(newQuestion);
		newQuestion.addClass('active');
	}
	questionCounter += 1;
}

function initialize(x, y) {
	const mapOptions = {
		center: { lat: x, lng: y },
		zoom: 15,
	};
	const newMap = new google.maps.Map(
		document.getElementById('map-canvas'),
		mapOptions);
	const marker = new google.maps.Marker({
		map: newMap,
		position: { lat: x, lng: y },
		title: 'Hello World!',
	});
}

$('.oldBtn').on('click', () => {
	const oldurl = "http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=a5674541-0175-47bf-a8ac-0f8c6edd37a1"; // eslint-disable-line max-len
	$.get(oldurl, (data) => {
		for (let i = 0; i < 4; i++) {
			tips[0].push(data.result.results[i].ADDRESS.substring(8));
			tips[1].push(data.result.results[i].CONTACT_NAME);
			tips[2].push(data.result.results[i].DIVISION);
			tips[3].push(data.result.results[i].ORG_INTRODUCTION);
			tips[4].push(data.result.results[i].PERSON_IN_CHARGE);
			contact[0].push(data.result.results[i].ORG_NAME);
			contact[1].push(data.result.results[i].PHONE);
			contact[2].push(data.result.results[i].LAT);
			contact[3].push(data.result.results[i].LON);
		}
	})
	.done((data) => {
		$('.oldBtn').parent().remove();
		generateQuestion();
	});
});

$('.questionContainer').on('click', '.Api', function (event) {
	// update the score.
	const className = $(this).attr('class').substring(8);
	const targetCounter = `.counter${className}`;
	const PlusValue = parseInt($(targetCounter).text(), 10) + 1;
	$(targetCounter).text(PlusValue);

	// migrate the question list.
	$(this).parent().parent().
	remove();

	// check if go to google map.
	if (questionCounter !== 5) {
		generateQuestion();
	} else {
		let compareVal = 0;
		for (let i = 0; i < 4; i++) {
			const nowVal = parseInt($(`.counter${i + 1}`).text(), 10);
			if (compareVal < nowVal) {
				compareVal = i;
			}
		}
		$('#shopName').text(contact[0][compareVal]);
		$('#shopTel').text(contact[1][compareVal]);
		$('#shopADD').text(tips[0][compareVal]);
		$('.mapContainer').addClass('active');
		$('.questionContainer').addClass('nonactive');
		const age = 65 - fbmax;
		document.getElementById('quote').innerHTML = `${fbName}, 大約再過${age}年您即將退休，也許你適合: `;

		console.log(`${contact[0][compareVal]}, ${contact[1][compareVal]}, ${contact[2][compareVal]}, ${contact[3][compareVal]}`);// eslint-disable-line max-len
		const resultX = parseFloat(contact[2][compareVal]);
		const resultY = parseFloat(contact[3][compareVal]);
		google.maps.event.addDomListener(window, 'load', initialize(resultX, resultY));

		setTimeout(() => {
			$(".mapContainer").addClass("move");
		}, 1500);
	}
});
