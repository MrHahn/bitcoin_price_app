 let bt_price = $('#price');
 let submitButton = $('.submit-btn');
 let resetButton = $('.reset-btn');
 

 window.onload = (event) => {
 	getBitcoinPrice();
 	populateValues();
 }

 let checkInt = setInterval(getBitcoinPrice, 60000);

submitButton.click(function(){
	saveValues();
	checkInt = setInterval(getBitcoinPrice, 60000);
})

resetButton.click(function(){
	localStorage.clear();
	populateValues();
})

function populateValues(){
	if (localStorage.getItem('hiVal') && localStorage.getItem('loVal')){
		let hiVal = localStorage.getItem('hiVal');
		let loVal = localStorage.getItem('loVal');

		$('#highLimit').val(hiVal);
		$('#lowLimit').val(loVal);
	} else{
		$('#highLimit').val('');
		$('#lowLimit').val('');
		return;
	}
}

function getBitcoinPrice(){
	$.ajax({
	method: "GET",
	url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
	dataType: 'json',
	})
	.done(function(data){
		let priceString = data.bpi.USD.rate;
		let priceNum = Number(priceString.replace(',',''));
		let hi = Number($('#highLimit').val());
 		let lo = Number($('#lowLimit').val());
		bt_price.text(priceNum);
		console.log(priceNum);

		comparePrices(hi, lo, priceNum);
	})
	.fail(function(error){
		 console.log(error);
	})
}

function comparePrices(hiPrice, loPrice, currentPrice){
	console.log('comparing prices');
	if(hiPrice == 0 || loPrice == 0 ){
		console.log('one or more values empty');
		clearInterval(checkInt);
		return;
	}else if(currentPrice <= loPrice){
		//send low limit email
		console.log('sending low limit email ' + loPrice);
		sendNotification('buy_btc');
		clearInterval(checkInt);
	}else if (currentPrice >= hiPrice){
		//send high limit email
		console.log('sending high limit email ' + hiPrice);
		sendNotification('sell_btc');
		clearInterval(checkInt);
	}
	console.log('prices compared');
}

function sendNotification(tId){
	var data = {
    service_id: 'bc_notification',
    template_id: tId,
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
}

function saveValues(){
	let newHiPrice = Number($('#highLimit').val());
 	let newLoPrice = Number($('#lowLimit').val());

 	if(newHiPrice <= newLoPrice){
 		alert('High limit must be higher than low limit');
 	}else{
 		localStorage.setItem('hiVal', newHiPrice);
		localStorage.setItem('loVal', newLoPrice);
 	}
}

// todo

// need to have compare price return the service_id to the sendNotification function (the service id is what determies which email
// to send in emailjs)

// need to style out the page better

// look into email js to see if there is an email input in the api so i can add multiple emails though the app.


