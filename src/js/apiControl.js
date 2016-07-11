/* global google */
/* global fbmax */
/* global fbName */

let oldman;
let questionCounter = 0;
const voiceSelect = document.getElementById('voice');
const oldmanCounter = [0, 0, 0, 0];
const tips = [[], [], [], [], []];
const questionTitle = [`一、也許我住在這裡會感到開心？`, `二、他們當我的鄰居我會比較自在？`, `三、哪裡最熱鬧呢？`, `四、哪邊聽起來最讓老人住得舒適？`, `五、哪個機構聽起來可以把性命託付給他們？`];
const contact = [[], [], [], []];
const data = {"result":{"offset":0,"limit":10000,"count":4,"sort":"","results":[{"_id":"1","ADDRESS_CODE":"04473049184817075730","L1_CODE":"04","L1_NAME":"銀髮族服務","ORG_TYPE":"07","ORG_GROUP_NAME":"老人公寓","ORG_NAME":"臺北市朱崙老人公寓","DIVISION":"中山區","PERSON_IN_CHARGE":"委託單位：天主教耕莘醫療財團法人永和耕莘醫院","CONTACT_NAME":"李主任","ZONE_CODE":"10492","CITY":"臺北市","ADDRESS":"臺北市10492龍江路15號4-7樓","PHONE":"02-2778-5153","FAX":"","WEB_HOMEPAGE":"http://www.cthyh.org.tw/longcare/JL/","ORG_INTRODUCTION":"一、提供全天候(二十四小時)門禁管理及保護性看視服務二、提供本市老人福利相關訊息，以及視長者需要協助轉介三、協助住民健康照顧計畫及完整建檔四、協助參與文康休閒、社區活動及銀髮志工服務","REGISTERED":"","CREATE_DATE":"","PROP_TITLE":"","PROP":"","BEDNO_TITLE":"","BEDNO":"","LAT":"25.0474355","LON":"121.5404969","DEPT_NAME":"","POST_DATE":"2014/10/16 上午 12:00:00"},{"_id":"2","ADDRESS_CODE":"04473091373842954636","L1_CODE":"04","L1_NAME":"銀髮族服務","ORG_TYPE":"07","ORG_GROUP_NAME":"老人公寓","ORG_NAME":"臺北市陽明老人公寓","DIVISION":"士林區","PERSON_IN_CHARGE":"委託單位：財團法人臺北市私立恆安老人長期照顧中心(長期照護型)","CONTACT_NAME":"邱主任","ZONE_CODE":"11191","CITY":"臺北市","ADDRESS":"臺北市11191格致路7號3-6樓","PHONE":"02-2861-9296","FAX":"","WEB_HOMEPAGE":"http://www.hangan.org/about01.aspx","ORG_INTRODUCTION":"公寓之設備與服務包括套房住屋、營養膳食、清潔維護、醫護服務、藝文康樂、社團聯誼及各項特別服務。","REGISTERED":"","CREATE_DATE":"","PROP_TITLE":"","PROP":"","BEDNO_TITLE":"","BEDNO":"","LAT":"25.1363417","LON":"121.5461712","DEPT_NAME":"","POST_DATE":"2014/10/16 上午 12:00:00"},{"_id":"3","ADDRESS_CODE":"04510839609926939011","L1_CODE":"04","L1_NAME":"銀髮族服務","ORG_TYPE":"07","ORG_GROUP_NAME":"老人公寓","ORG_NAME":"臺北市中山老人住宅","DIVISION":"中山區","PERSON_IN_CHARGE":"委託單位：財團法人臺灣省私立健順養護中心","CONTACT_NAME":"邱小姐、吳小姐","ZONE_CODE":"10459","CITY":"臺北市","ADDRESS":"臺北市10459新生北路二段101巷2號","PHONE":"02-2542-0006","FAX":"","WEB_HOMEPAGE":"http://www.zselder.blogspot.com/","ORG_INTRODUCTION":"服務對象：一、設籍臺北市滿一年。二、年滿65歲以上者，但申請同住之配偶不在此限；為長者往生或離所時，同住之配偶需年滿60歲，始得續住。三、無失智。四、能生活自理，或經巴氏量表評估達90分以上者。五、中低、低收入戶得優先受理進住。 服務內容：住宅之設備與服務包括套房住屋、營養膳食、清潔維護、福利諮詢、醫護服務、藝文康樂、社團聯誼及各項特別服務","REGISTERED":"","CREATE_DATE":"","PROP_TITLE":"","PROP":"","BEDNO_TITLE":"","BEDNO":"","LAT":"25.0573143","LON":"121.5284135","DEPT_NAME":"","POST_DATE":"2014/10/16 上午 12:00:00"},{"_id":"4","ADDRESS_CODE":"04866933562404811383","L1_CODE":"04","L1_NAME":"銀髮族服務","ORG_TYPE":"07","ORG_GROUP_NAME":"老人公寓","ORG_NAME":"臺北市大龍老人住宅","DIVISION":"大同區","PERSON_IN_CHARGE":"委託單位：天主教耕莘醫療財團法人永和耕莘醫院","CONTACT_NAME":"簡主任","ZONE_CODE":"10369","CITY":"臺北市","ADDRESS":"臺北市10369民族西路105號4-9樓","PHONE":"02-6617-8186","FAX":"","WEB_HOMEPAGE":"http://www.cthyh.org.tw/longcare/dl/02.htm","ORG_INTRODUCTION":"服務對象：一、設籍臺北市滿一年。二、年滿65歲以上者，但申請同住之配偶不在此限；為長者往生或離所時，同住之配偶需年滿60歲，始得續住。三、無失智。四、能生活自理，且經巴氏量表評估達90分以上者。五、申請入住五樓視障區之視障長者須符合前開1至4項規定。","REGISTERED":"","CREATE_DATE":"","PROP_TITLE":"","PROP":"","BEDNO_TITLE":"","BEDNO":"","LAT":"25.0687255","LON":"121.5173584","DEPT_NAME":"","POST_DATE":"2014/10/16 上午 12:00:00"}]}}; // eslint-disable-line max-len
// Fetch the list of voices and populate the voice options.
function loadVoices() {
  // Fetch the available voices.
	const voices = speechSynthesis.getVoices();

	voices.forEach((voice, i) => {
	// Create a new option element.
		const option = document.createElement('option');
    // Set the options value and text.
		option.value = voice.name;
		option.innerHTML = voice.name;

    // Add the option to the voice selector.
		voiceSelect.appendChild(option);
	});
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = (e) => {
	loadVoices();
};

function speak(text) {
  // Create a new instance of SpeechSynthesisUtterance.
	const msg = new SpeechSynthesisUtterance();
  // Set the attributes.
	msg.text = text;
	msg.volume = parseFloat(0.5);
	msg.rate = parseFloat(7.5);
	msg.pitch = parseFloat(1.5);
  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.
	if (voiceSelect.value) {
		// msg.voice = speechSynthesis.getVoices().filter((voice) => {
		// 	return voice.name === voiceSelect.value;
		// })[0];
	}
  // Queue this utterance.
	window.speechSynthesis.speak(msg);
}

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
	setTimeout(() => {
		$(".Api").addClass('move');
	}, 1);
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
	// const oldurl = "http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=a5674541-0175-47bf-a8ac-0f8c6edd37a1"; // eslint-disable-line max-len
	// $.get(oldurl, (data) => {
	// 	for (let i = 0; i < 4; i++) {
	// 		tips[0].push(data.result.results[i].ADDRESS.substring(8));
	// 		tips[1].push(data.result.results[i].CONTACT_NAME);
	// 		tips[2].push(data.result.results[i].DIVISION);
	// 		tips[3].push(data.result.results[i].ORG_INTRODUCTION);
	// 		tips[4].push(data.result.results[i].PERSON_IN_CHARGE);
	// 		contact[0].push(data.result.results[i].ORG_NAME);
	// 		contact[1].push(data.result.results[i].PHONE);
	// 		contact[2].push(data.result.results[i].LAT);
	// 		contact[3].push(data.result.results[i].LON);
	// 	}
	// })
	// .done((data) => {
	// 	speak('come on 開始回答');
	// 	$('.oldBtn').parent().remove();
	// 	generateQuestion();
	// })
	// .fail(() => {
	// 	speak('wow something 錯了唷');
	// 	alert("ERROR!! refresh your browser!?");
	// });
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
	speak('come on 開始回答');
	$('.oldBtn').parent().remove();
	generateQuestion();
});

$('.questionContainer').on('click', '.Api', function (event) {
	// update the score.
	const className = $(this).attr('class').substring(8, 9);
	const targetCounter = `.counter${className}`;
	const PlusValue = parseInt($(targetCounter).text(), 10) + 1;
	$(targetCounter).text(PlusValue);

	// migrate the question list.
	$(this).parent().parent().
	remove();

	// check if go to google map.
	if (questionCounter !== 5) {
		speak('下一題  喵喵');
		setTimeout(() => {
			generateQuestion();
		}, 500);
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
		document.getElementById('quote').innerHTML = `${fbName}, 大約再過<span>${age}</span>年您即將退休，也許你適合:`;

		console.log(`${contact[0][compareVal]}, ${contact[1][compareVal]}, ${contact[2][compareVal]}, ${contact[3][compareVal]}`);// eslint-disable-line max-len
		const resultX = parseFloat(contact[2][compareVal]);
		const resultY = parseFloat(contact[3][compareVal]);
		google.maps.event.addDomListener(window, 'load', initialize(resultX, resultY));

		setTimeout(() => {
			$(".mapContainer").addClass("move");
		}, 1000);

		setTimeout(() => {
			const text = $('#quote').text();
			speak(text);
		});
	}
});

