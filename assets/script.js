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


// code fragment
var data = {
    service_id: 'bc_notification',
    template_id: 'template_3vlegl5',
    user_id: 'user_s5Q5IhQkNKMzjWTuJMyt3'
};
 
$.ajax('https://api.emailjs.com/api/v1.0/email/send', {
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json'
}).done(function() {
	console.log(data);
    alert('Your mail is sent!');
}).fail(function(error) {
    alert('Oops... ' + JSON.stringify(error));
});
// code fragment