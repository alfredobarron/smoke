
$(document).ready(function(){
	//smockScrolling
	$.smockScrolling({speed:200});
	//Scroll se activa el menu segun la seccion en la que se este
	$('body').scrollspy({ target: '.list-group' })
	//Se activa el menu al click
	$('.list-group a').click(function(){
		$('.list-group-item').removeClass('active');
		$(this).addClass('active');
	});

	//vacio
	$('#formVacio #btn').click(function(e){
		e.preventDefault();
		if($('#formVacio').smockValidateForm()){
			alert($('#formVacio #text').val())
		}
	});
	//email
	$('#formEmail #btn').click(function(e){
		e.preventDefault();
		if($('#formEmail').smockValidateForm()){
			alert($('#formEmail #text').val())
		}
	});
	//password
	$('#formPass #btn').click(function(e){
		e.preventDefault();
		if($('#formPass').smockValidateForm()){
			alert($('#formPass #text').val())
		}
	});
	//number
	$('#formNumber #btn').click(function(e){
		e.preventDefault();
		if($('#formNumber').smockValidateForm()){
			alert($('#formNumber #text').val())
		}
	});
	//alphanumeric
	$('#formAlphanumeric #btn').click(function(e){
		e.preventDefault();
		if($('#formAlphanumeric').smockValidateForm()){
			alert($('#formAlphanumeric #text').val())
		}
	});
	//numero de caracteres
	$('#formNumCaracteres #btn').click(function(e){
		e.preventDefault();
		if($('#formNumCaracteres').smockValidateForm()){
			alert($('#formNumCaracteres #text').val())
		}
	});
	//rango de caracteres
	$('#formRangoCaracteres #btn').click(function(e){
		e.preventDefault();
		if($('#formRangoCaracteres').smockValidateForm()){
			alert($('#formRangoCaracteres #text').val())
		}
	});
	//equal pass
	$('#formEqualPass #btn').click(function(e){
		e.preventDefault();
		if($.smockValidateEqualPass('#formEqualPass #text', '#formEqualPass #text2')){
			alert($('#formEqualPass #text').val())
		}
	});
	//equal var pass
	var passwordActual = 'Smock1';
	$('#formEqualVarPass #btn').click(function(e){
		e.preventDefault();
		if($.smockValidateEqualPassVar(passwordActual, '#formEqualVarPass #text')){
			alert($('#formEqualVarPass #text').val())
		}
	});
	//limpiar formulario
	$('#formClear #btn').click(function(e){
		e.preventDefault();
		$('#formClear').smockClearForm({noClear: 'email, checkbox'});
	});
	//alert
	$('#btnAlert').click(function(e){
		e.preventDefault();
		$.smockAlert('hola mundo');
	});
	//alert Success
	$('#btnAlertSuccess').click(function(e){
		e.preventDefault();
		$.smockAlert('Alert type "success"', {type:'success'});
	});
	//alert Info
	$('#btnAlertInfo').click(function(e){
		e.preventDefault();
		$.smockAlert('Alert type "info"', {type:'info'});
	});
	//alert Warning
	$('#btnAlertWarning').click(function(e){
		e.preventDefault();
		$.smockAlert('Alert type "warning"', {type:'warning'});
	});
	//alert Danger
	$('#btnAlertDanger').click(function(e){
		e.preventDefault();
		$.smockAlert('Alert type "danger"', {type:'danger'});
	});
	//alert Danger
	$('#btnAlertTime').click(function(e){
		e.preventDefault();
		$.smockAlert('Alert type "success" time 10 segundos', {type:'success', time: 10000});
	});
	//Confirm
	$('#btnConfirm').click(function(e){
		e.preventDefault();
		$.smockConfirm('Mensaje de confirmación', function(e){if(e){
			$.smockAlert('Confirmaste', {type:'success'});
		}});
	});
	//Curency
	$('#formCurrency #btn').click(function(e){
		e.preventDefault();
		if($('#formCurrency').smockValidateForm()){
			var moneda = $.smockFormatCurrency($('#formCurrency #text').val(),'$');
			$('#formCurrency #result').text(moneda);
		}
	});
	//URL
	$('#formURL #btn').click(function(e){
		e.preventDefault();
		var url = $.smockGetURL();
		$('#formURL #result').text(url);
	});
	//Date Format obtener fecha
	$('#formFormatDate #btn').click(function(e){
		e.preventDefault();
		var fecha = $.smockDateFormat();
		$('#formFormatDate #result').text(fecha);
	});
	//Date Format obtener fecha
	$('#formFormatDate1 #btn').click(function(e){
		e.preventDefault();
		var fecha = $.smockDateFormat({date: $('#formFormatDate1 #date').val()});
		$('#formFormatDate1 #result').text(fecha);
	});
	//Date Format formatear
	$('#formFormatDate2 #btn').click(function(e){
		e.preventDefault();
		var fecha = $.smockDateFormat({format:'ddMMyyyy'});
		$('#formFormatDate2 #result').text(fecha);
	});
	//Date Format lenguaje
	$('#formFormatDate3 #btn').click(function(e){
		e.preventDefault();
		var fecha = $.smockDateFormat({format:'ddMyyyy', lang:'en'});
		$('#formFormatDate3 #result').text(fecha);
	});
	//Date Format perzonalizar
	$('#formFormatDate4 #btn').click(function(e){
		e.preventDefault();
		var fecha = $.smockDateFormat({separatorDate:'/', separatorTime:'.'});
		$('#formFormatDate4 #result').text(fecha);
	});
	//Date Diff
	$('#formDateDiff #btn').click(function(e){
		e.preventDefault();
		var fecha = $.smockDateDiff({fromDate:$('#formDateDiff #date').val(), toDate:$('#formDateDiff #date2').val(), interval:'days'});
		$('#formDateDiff #result').text(fecha + 'Dias');
	});

});