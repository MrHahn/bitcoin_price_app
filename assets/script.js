let button = document.querySelector('button');
let span = document.querySelector('span');

window.onload = makeRequest();

button.addEventListener('click', makeRequest );


function makeRequest(){
	let XHR = new XMLHttpRequest();

XHR.onreadystatechange = function(){
	if(XHR.readyState == 4 && XHR.status == 200){
		let price = JSON.parse(XHR.responseText).bpi.USD.rate;
		span.innerHTML = price
	}
};

XHR.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');
XHR.send();
}
