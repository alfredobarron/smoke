
$(document).ready(function(){

	// smkScrolling
	$.smkScrolling({speed:200});
	// Scroll se activa el menú según la sección en la que se este
	$('body').scrollspy({ target: '.list-group' });
	// Se activa el menú al click
	$('.list-group a').click(function(){
		$('.list-group-item').removeClass('active');
		$(this).addClass('active');
	});


	/*
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|	Validate
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	*/
	// Validate Empty
	$('#formEmpty button').click(function(){
		if($('#formEmpty').smkValidate()){
			$.smkAlert({text: 'Validate!!' , type: 'success'});
		}
	});
	// Validate Email
	$('#formEmail button').click(function(){
		if($('#formEmail').smkValidate()){
			$.smkAlert({text: $('#formEmail input').val(), type: 'success'});
		}
	});
	// Validate Number
	$('#formNumber button').click(function(){
		if($('#formNumber').smkValidate()){
			$.smkAlert({text: $('#formNumber input').val(), type: 'success'});
		}
	});
	// Validate Alphanumeric
	$('#formAlphanumeric button').click(function(){
		if($('#formAlphanumeric').smkValidate()){
			$.smkAlert({text: $('#formAlphanumeric input').val(), type: 'success'});
		}
	});
	// Validate Currency
	$('#formCurrency button').click(function(){
		if($('#formCurrency').smkValidate()){
			$.smkAlert({text: $('#formCurrency input').val(), type: 'success'});
		}
	});
	// Validate Number Character
	$('#formNumberChar button').click(function(){
		if($('#formNumberChar').smkValidate()){
			$.smkAlert({text: $('#formNumberChar input').val(), type: 'success'});
		}
	});
	// Validate Range character
	$('#formRangeChar button').click(function(e){
		if($('#formRangeChar').smkValidate()){
			$.smkAlert({text: $('#formRangeChar input').val(), type: 'success'});
		}
	});
	// Validate Strong password
	$('#formStrongPassword button').click(function(){
		if($('#formStrongPass').smkValidate()){
			$.smkAlert({text: $('#formStrongPass input').val(), type: 'success'});
		}
	});
	// Validate Equal password
	$('#formEqualPass button').click(function(){
		if($('#formEqualPass').smkValidate()){
			if($.smkEqualPass('#formEqualPass #pass1', '#formEqualPass #pass2')){
				$.smkAlert({text: $('#formEqualPass #pass1').val(), type: 'success'});
			}
		}
	});
	// Validate Equal password vs var
	var smkPassword = 'Smoke1';
	$('#formEqualPassVar button').click(function(){
		if($('#formEqualPassVar').smkValidate()){
			if($.smkEqualPass(smkPassword, '#formEqualPassVar #pass')){
				$.smkAlert({text: $('#formEqualPassVar #pass').val(), type: 'success'});
			}
		}
	});
	// Clear form
	$('#formClear button').click(function(){
		$('#formClear').smkClear();
	});




	/*
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|	Alert
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	*/
	// Alert Default
	$('#btnAlert').click(function(e){
		e.preventDefault();
		$.smkAlert();
	});
	// Alert Warning
	$('#btnAlertWarning').click(function(e){
		e.preventDefault();
		$.smkAlert({text:'Alert type "warning"', type:'warning'});
	});
	// Alert Success
	$('#btnAlertSuccess').click(function(e){
		e.preventDefault();
		$.smkAlert({text:'Alert type "success"', type:'success'});
	});
	// Alert Danger 10 seconds
	$('#btnAlertDanger').click(function(e){
		e.preventDefault();
		$.smkAlert({text:'Alert type "danger" time 10 seconds', type:'danger', time: 10});
	});
	// Alert Info permanent
	$('#btnAlertInfo').click(function(e){
		e.preventDefault();
		$.smkAlert({text:'Alert type "info" permanent', type:'info', permanent: true});
	});




	/*
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|	Confirmation
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	*/
	$('#btnConfirm').click(function(e){
		e.preventDefault();
		$.smkConfirm({text:'Are you sure?', accept:'Accept', cancel:'Cancel'}, function(e){if(e){
			$.smkAlert({text: 'Confirm!!', type:'success'});
		}});
	});



	/*
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|   ProgressBar
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	*/
	$('#btnProgressBar').click(function(event) {
		event.preventDefault();
		$.smkProgressBar({element:'body', status:'start'});
		setTimeout(function(){ $.smkProgressBar({element:'body', status:'end'}); }, 1000);
	});






	/*
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|   Fullscreen
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	*/
	$('#fullscreen').smkFullscreen();






	/*
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|   Panel
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	*/
	$('#panel').smkPanel();





	/*
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|	Currency
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	*/
	$('#formCurrencyConv button').click(function(){
		if($('#formCurrencyConv').smkValidate()){
			var currency = $.smkCurrency($('#formCurrencyConv input').val(), '$');
			$.smkAlert({text: currency, type:'success'});
		}
	});




	/*
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|	GetURL
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	*/
	$('#formURL button').click(function(){
		var url = $.smkGetURL();
		$.smkAlert({text: url, type:'success'});
	});




	/*
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|	Date
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	*/
	// Date Get
	$('#formDate button').click(function(){
		var date = $.smkDate();
		$.smkAlert({text: date, type:'success'});
	});

	// Date Customize
	$('#formDateCustomize button').click(function(){
		var date = $.smkDate({
			date: $('#formDateCustomize #date').val(),
			format: $('#formDateCustomize #format').val(),
			lang: $('#formDateCustomize #lang').val()
		});
		$.smkAlert({text: date, type:'success'});
	});




	/*
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	|	Date Diff
	|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	*/
	$('#formDateDiff button').click(function(){
		var interval = $('#formDateDiff #interval').val();
		var date = $.smkDateDiff({
			fromDate: $('#formDateDiff #date1').val(),
			toDate: $('#formDateDiff #date2').val(),
			interval: interval
		});
		$.smkAlert({text: date + ' ' + interval, type:'success'});
	});

});