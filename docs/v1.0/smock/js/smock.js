/*
 *	========================================================================
 *	smock.js
 *	========================================================================
 *	Copyright (c) Alfredo Barron   2014. All rights reserved
 *	Version       1.1
 *	Created       24/10/2013
 *	Last modified 07/01/2014
 *	Email         contacto@alfredobarron.com
 *	Web           http://www.alfredobarron.com
 *	========================================================================
 */
(function($) {
/*  FUNCTION VALID ALL INPUT OF A FORM
		======================================================================== */
	$.fn.smockValidateForm = function() {
		//Se remueven los mensajes de validacion existentes
		$('.validate-smock').remove();
		//Se inicializan las variables
		var result = false;
		var thiss = 0;
		//Se crea la expresion regular para el input mail
		var emailRegex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
		//Se crea la expresion regular para la contraseña
		var strongPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/; // Debe contener al menos 6 caracteres, un numero y una mayuscula
		//Se crea la expresion regular para el input number
		var numberRegex = /^([0-9])*$/;
		//Se crea la expresion regular para el input alphanumeric
		var alphanumericRegex = /^[a-z0-9]+$/i;
		//Se recorren todos los inputs del formulario
		$(':input', this).each(function() {
			//Se obtiene el type
			var type = this.type;
			//Se obtiene el tag
			var tag = this.tagName.toLowerCase();
			//Se obtiene el title
			var txtrequired = this.title;
			//Se obtiene si es requerido
			var required = this.required;
			//Se obtiene el type alternativo
			var typealt = this.alt;
			//Se obtiene el valor de longitud menor aceptada
			var minlength = $(this).attr('minlength');
			//Se obtiene el valor de longitud mayor aceptada
			var maxlength = $(this).attr('maxlength');
			//Si el input no contiene title se asigna un mensaje de validacion default
			if (txtrequired === '' || txtrequired === undefined) {
				txtrequired = 'Campo requerido';
			}
			//Se valida si los INPUTS son requeridos y no estan vacios
			if (required === true && (type === 'text' || tag === 'textarea' || type === 'password' || type === 'email')) {
				if ($(this).val() === '') {
					thiss = this;
					$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>' + txtrequired + '</span>');
					result = false;
					return false;
				} else {
					result = true;
				}
			}
			//Se valida si el input SELECT es requerido y no esta vacio
			if (required === true && tag === 'select') {
				if ($(this).val() === '') {
					thiss = this;
					//Select2 Se obtiene el div hermano
					var select2 = $(this).siblings('div');
					//Se obtiene el a hijo del div
					var select2a = select2.children('a');
					select2a.focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>' + txtrequired + '</span>');
					result = false;
					return false;
				} else {
					result = true;
				}
			}
			//Se valida si el input RADIO o CHECKBOX es requerido y no esta checked
			if (required === true && type === 'radio' || type === 'checkbox') {
				//var check = this.checked;
				//var check = $(this).is(':checked');
				//var check = $('input[name='+this.name+'][value=' + value + ']').attr('checked', 'checked');
				//$("input[name=mygroup][value=" + value + "]").prop('checked', true);
				var check = $("input[name='" + this.name + "']:checked").val();
				if (check === undefined) {
					thiss = this;
					$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>' + txtrequired + '</span>');
					result = false;
					return false;
				} else {
					result = true;
				}
			}
			//Se valida si el input EMAIL no esta vacio y cumple con la expresion regular
			if (type === 'email') {
				if ($(this).val() != '' && !emailRegex.test($(this).val())) {
					thiss = this;
					$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>Escribe una cuenta de correo valida</span>');
					result = false;
					return false;
				} else {
					result = true;
				}
			}
			//Se valida si el input PASSWORD no esta vacio y cumple con la expresion regular STRONGPASS
			if (type === 'password' && typealt == 'strongPass') {
				if ($(this).val() != '' && !strongPassRegex.test($(this).val())) {
					thiss = this;
					$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>La contraseña debe tener al menos 6 caracteres, un numero y una mayúscula</span>');
					result = false;
					return false;
				} else {
					result = true;
				}
			}
			//Se valida si el input NUMBER no esta vacio y cumple con la expresion regular NUMERICO
			if (typealt === 'number') {
				if ($(this).val() != '' && !numberRegex.test($(this).val())) {
					thiss = this;
					$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>Este campo solo admite números</span>');
					result = false;
					return false;
				} else {
					result = true;
				}
			}
			//Se valida si el input no esta vacio y cumple con la expresion regular ALFANUMERICO
			if (typealt === 'alphanumeric') {
				if ($(this).val() != '' && !alphanumericRegex.test($(this).val())) {
					thiss = this;
					$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>Este campo solo admite números o letras</span>');
					result = false;
					return false;
				} else {
					result = true;
				}
			}
			//Se valida si el input no esta vacio y contiene MINLENGTH o MAXLENGTH
			if ((typeof(minlength) !== 'undefined' || typeof(maxlength) !== 'undefined')) {
				//Si contiene ambos y son iguales
				if ($(this).val() != '' && minlength === maxlength) {
					if (($(this).val().length != minlength) && ($(this).val().length != maxlength)) {
						$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>El numero de caracteres debe ser igual a <b>' + maxlength + '</b></span>');
						result = false;
						return false;
					} else {
						result = true;
					}
					//Si contiene ambos y son diferentes
				} else if ($(this).val() != '' && minlength != maxlength) {
					if ($(this).val().length < minlength || $(this).val().length > maxlength) {
						$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>El numero de caracteres debe ser mayor a <b>' + minlength + '</b> y menor a <b>' + maxlength + '</b></span>');
						result = false;
						return false;
					} else {
						result = true;
					}
				}
			}
		});
/*  ============================
			FALTAN INPUTS POR VALIDAR 
			========================== */
		//Si se teclea algo en el input se remueven los mensajes de validacion
		$(thiss).keyup(function() {
			if ($(this).val() !== '') {
				$('.validate-smock').fadeOut('fast');
				return false;
			}
		});
		//Si cambia el input select se remueven los mensajes de validacion
		$(thiss).change(function() {
			if ($(this).val() !== '') {
				$('.validate-smock').fadeOut('fast');
				return false;
			}
		});
		//Se retorna el resultado
		return result;
	}
/*  METODO DE USO
		========================================================================
		if($('#form').smockValidateForm()){}
	*/
/*  FUNCTION VALIDATE EQUAL PASSWORDS
		======================================================================== */
	$.smockValidateEqualPass = function(password, repassword) {
		//Se remueven los mensajes de validacion existentes
		$('.validate-smock').remove();
		//Se inicializan las variables
		var result = false;
		//Se crea la expresion regular para la contraseña
		var strongPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/; // Debe contener al menos 6 caracteres, un numero y una mayuscula
		//Se obtiene el title de password
		var txtrequiredPass = $(password).attr('title');
		//Si password no contiene title se asigna un mensaje de validacion default
		if (txtrequiredPass === '' || txtrequiredPass === undefined) {
			txtrequiredPass = 'La contraseña debe tener al menos 6 caracteres, un numero y una mayúscula';
		}
		//Se obtiene el title de repassword
		var txtrequiredRePass = $(repassword).attr('title');
		//Si repassword no contiene title se asigna un mensaje de validacion default
		if (txtrequiredRePass === '' || txtrequiredRePass === undefined) {
			txtrequiredRePass = 'Las contraseñas no coinciden';
		}
		//Si se teclea algo en password se remueven los mensajes de validacion
		$(password).keyup(function() {
			if ($(this).val() !== '') {
				$('.validate-smock').fadeOut('fast');
				return false;
			}
		});
		//Si password esta vacio o no cumple con la expresion regular requerida se retorna false
		if ($(password).val() === '' || !strongPassRegex.test($(password).val())) {
			$(password).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>' + txtrequiredPass + '</span>');
			result = false;
			return false;
		} else { //Si no esta vacio y cumple con la expresion regular requerida se retorna true
			result = true;
		}
		//Si se teclea algo en repassword se remueven los mensajes de validacion
		$(repassword).keyup(function() {
			if ($(this).val() !== '') {
				$('.validate-smock').fadeOut('fast');
				return false;
			}
		});
		//Si los password son diferentes se retorna false
		if ($(password).val() !== $(repassword).val()) {
			$(repassword).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>' + txtrequiredRePass + '</span>');
			result = false;
			return false;
		} else { //Si los passwords son iguales se retorna true
			result = true;
		}
		//Se retorna el resultado
		return result;
	}
/*  METODO DE USO
		========================================================================
		if($.smockValidateEqualPass('#form #password', '#form #repassword')){}
	*/
/*  FUNCTION VALIDATE EQUAL PASSWORDS VAR
		======================================================================== */
	$.smockValidateEqualPassVar = function(password, repassword) {
		//Se remueven los mensajes de validacion existentes
		$('.validate-smock').remove();
		//Se inicializan las variables
		var result = false;
		//Se crea la expresion regular para la contraseña
		//var strongPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;// Debe contener al menos 6 caracteres, un numero y una mayuscula
		//Se obtiene el title de password
		var txtrequiredRePass = $(repassword).attr('title');
		//Si password no contiene title se asigna un mensaje de validacion default
		if (txtrequiredRePass === '' || txtrequiredRePass === undefined) {
			txtrequiredRePass = 'Las contraseñas no coinciden';
		}
		//Si se teclea algo en password se remueven los mensajes de validacion
		$(repassword).keyup(function() {
			if ($(this).val() !== '') {
				$('.validate-smock').fadeOut('fast');
				return false;
			}
		});
		//Si los password son diferentes se retorna false
		if (password !== $(repassword).val()) {
			thiss = this;
			$(repassword).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>' + txtrequiredRePass + '</span>');
			result = false;
			return false;
		} else { //Si los passwords son iguales se retorna true
			result = true;
		}
		//Se retorna el resultado
		return result;
	}
/*  METODO DE USO
		========================================================================
		if($.smockValidateEqualPassVar(passwordActual, '#form #repassword')){}
	*/
/*  FUNCTION CLEAR FORM
		======================================================================== */
	$.fn.smockClearForm = function(options) {
		//Variables default
		var settings = $.extend({
			noClear: ''
		}, options);
		//Se eliminan los espacios en blanco de la variable settings.noClear
		var noClearSinEspacios = settings.noClear.replace(/\s/g, '');
		//Se quiebra la variable noClearSinEspacios para obtener sus valores y se agregan en el array noClear
		var noClear = noClearSinEspacios.split(',');
		//Se inicializa la variable clear
		//var clear = 1;
		//Se recorren todos los inputs del form
		return $(':input', this).each(function() {
			//Se obtiene el type y el tag del input
			var type = this.type;
			var tag = this.tagName.toLowerCase();
			//Si el tag trae el valor 'input' se sustituye por el valor type
			if (tag == 'input') {
				tag = type;
			}
			//Se recorre la variable para obtener sus valores
/*$.each( noClear, function( key, value ) {
				//Si el type o el tag del input es diferente a noClean se limpia
				if((value != type) && (value != tag)){
					clear = 1;
					console.log(value+' '+type+' or '+tag);
				}else{//Si es igual no se limpia
					clear = 2;
					return false;
				}
				
			});
			//Si clear == 1 se limpia el input
			if(clear == 1){
			*/
			//Si el type o el tag del input no existen en el array noClean se limpia
			if ($.inArray(type, noClear) < 0 && $.inArray(tag, noClear) < 0) {
				//Se compara el type y se limpia
				switch (type) {
				case 'text':
				case 'password':
				case 'email':
				case 'number':
				case 'hidden':
					this.value = '';
					break;
				case 'checkbox':
				case 'radio':
					this.checked = false;
					break;
				}
				//Se compara el tag y se limpia
				switch (tag) {
				case 'textarea':
					this.value = '';
					break;
				case 'select':
					this.selectedIndex = -1;
					break;
				}
/*  ============================
					FALTAN INPUTS POR LIMPIAR
					========================== */
			}
		});
		//$(this)[0].reset();
	}
/*  METODO DE USO
		========================================================================
		$('#form').smockClearForm({noClear: 'email,radio,...'});
	*/
/*  FUNCTION CONFIRM
		======================================================================== */
	$.smockConfirm = function(msj, callback) {
		//Se remueve el panel de confirmacion en el body
		$('.back-confirmSmock, .confirmSmock').remove();
		//Se agrega el panel de confirmacion en el body
		$('body').append('<div class="back-confirmSmock"><div class="panel panel-default confirmSmock"><div class="panel-body"><br>' + msj + '<br><br></div><div class="panel-footer text-right"><a class="btn btn-default btn-sm cancel" href="#" >Cancelar</a> <a class="btn btn-danger btn-sm delete" href="#">Borrar</a></div></div></div>');
		//Se aplica la animacion de entrada del panel de confirmacion
		$('.confirmSmock').animate({
			top: "-5px",
			opacity: '1'
		}, 200);
		//Si se presiona el boton .cancel se retorna false
		$('.cancel').click(function(e) {
			e.preventDefault();
			//Se remueve el panel de confirmacion del body
			$('.back-confirmSmock').fadeOut(200, function() {
				$('.back-confirmSmock').remove();
			});
			$('.confirmSmock').animate({
				top: "-500px",
				opacity: '1'
			}, 200, function() {
				$('.confirmSmock').remove();
			});
			callback(false);
		});
		//Si se presiona el boton .delete se retorna true
		$('.delete').click(function(e) {
			e.preventDefault();
			//Se remueve el panel de confirmacion del body
			$('.back-confirmSmock').fadeOut(200, function() {
				$('.back-confirmSmock').remove();
			});
			$('.confirmSmock').animate({
				top: "-500px",
				opacity: '1'
			}, 200, function() {
				$('.confirmSmock').remove();
			});
			callback(true);
		});
	}
/*  METODO DE USO
		========================================================================
		$.smockConfirm('En verdad deceas eliminar este elemento?', function(e){if(e){
			//Code here
		}});
	*/
/*  FUNCTION ALERTS
		======================================================================== */
	//Se inicializa la variable alertSmockTime
	var alertSmockTime = 0;
	//Se crea la funcion alertSmock
	$.smockAlert = function(msj, options) {
		//Variables default
		var settings = $.extend({
			type: '',
			time: 5000
		}, options);
		var type = 0;
		//Se compara el tipo de alerta y se asigna la clase
		switch (settings.type) {
		case 'warning':
			type = 'alert-warning';
			break;
		case 'danger':
			type = 'alert-danger';
			break;
		case 'success':
			type = 'alert-success';
			break;
		case 'info':
			type = 'alert-info';
			break;
		default:
			type = '';
		}
		//Se eliminan todas las alertas existentes
		$('.alertSmock').remove();
		//Se reinicia el tiempo
		clearTimeout(alertSmockTime);
		//Se crea la alerta en el body
		$('body').append('<div class="alert alert-dismissable ' + type + ' alertSmock"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msj + '</div>');
		//Se aplica la animacion de entrada a la alerta
		$('.alertSmock').animate({
			right: "+=370px",
			opacity: '1'
		}, 150);
		//Se eliminan todos las alertas del body
		alertSmockTime = setTimeout(function() {
			$('.alertSmock').animate({
				right: "-=370",
				opacity: '0'
			}, 150, function() {
				$('.alertSmock').remove();
			});
		}, settings.time);
	}
/*  METODO DE USO
		========================================================================
		$.smockAlert('hola mundo', {type: 'success', time: 10000});
	*/
/*  FUNCTION FORMAT CURRENCY
		======================================================================== */
	$.smockFormatCurrency = function(num, prefix) {
		num = Math.round(parseFloat(num) * Math.pow(10, 2)) / Math.pow(10, 2);
		prefix = prefix || '';
		num += '';
		var splitStr = num.split('.');
		var splitLeft = splitStr[0];
		var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '.00';
		splitRight = splitRight + '00';
		splitRight = splitRight.substr(0, 3);
		var regx = /(\d+)(\d{3})/;
		while (regx.test(splitLeft)) {
			splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
		}
		return prefix + splitLeft + splitRight;
	}
/*  METODO DE USO
		========================================================================
		var moneda = $.smockFormatCurrency(10000,'$');
	*/
/*  FUNCTION DATE FORMAT
		======================================================================== */
	$.smockDateFormat = function(options) {
		//Variables default
		var settings = $.extend({
			date: new Date(),
			format: 'yyyymmdd hhmmss',
			lang: 'es',
			separatorDate: '-',
			separatorTime: ':'
		}, options);
		var date = new Date(settings.date);
		//Se obtiene el dia
		var dd = date.getDate();
		//Se obtiene el mes
		var mm = date.getMonth() + 1; //January is 0!
		//Se muestran los meses segun el lenguaje
		if (settings.lang == 'es') {
			if (settings.format == 'yyyyMdd' || settings.format == 'yyMdd' || settings.format == 'ddMyyyy' | settings.format == 'ddMyy') {
				var monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agos", "Septiembre", "Oct", "Nov", "Dic"];
			} else {
				var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
			}
		} else {
			if (settings.format == 'yyyyMdd' || settings.format == 'yyMdd' || settings.format == 'ddMyyyy' | settings.format == 'ddMyy') {
				var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			} else {
				var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			}
		}
		//Se obtiene el año
		var yyyy = date.getFullYear();
		//Se obtiene el año 2 digitos
		var yy = yyyy.toString().substring(2);
		//Si el dia es menor que 10 se agrega 0 al inicio
		if (dd < 10) {
			dd = '0' + dd
		}
		//Si el mes es menor que 10 se agrega 0 al inicio
		if (mm < 10) {
			mm = '0' + mm
		}
		//Se obtiene la hora
		var hh = date.getHours();
		//Se obtienen los minutos
		var mi = date.getMinutes();
		//Se obtienen los segundos
		var ss = date.getSeconds();
		//Si los minutos son menor que 10 se agrega 0 al inicio
		if (mi < 10) {
			mi = '0' + mi
		}
		//Si los segundos son menor que 10 se agrega 0 al inicio
		if (ss < 10) {
			ss = '0' + ss
		}
		//Se construye el formato para base de datos 0000-00-00 00:00:00
		//Se retorna la fecha formateada
		switch (settings.format) {
		case "yyyymmdd hhmmss":
			return yyyy + settings.separatorDate + mm + settings.separatorDate + dd + ' ' + hh + settings.separatorTime + mi + settings.separatorTime + ss;
		case "yyyymmdd":
			return yyyy + settings.separatorDate + mm + settings.separatorDate + dd;
		case "yyyyMMdd":
			return yyyy + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + dd;
		case "yyyyMdd":
			return yyyy + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + dd;
		case "yymmdd":
			return yy + settings.separatorDate + mm + settings.separatorDate + dd;
		case "yyMMdd":
			return yy + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + dd;
		case "yyMdd":
			return yy + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + dd;
		case "ddmmyyyy":
			return dd + settings.separatorDate + mm + settings.separatorDate + yyyy;
		case "ddMMyyyy":
			return dd + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + yyyy;
		case "ddMyyyy":
			return dd + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + yyyy;
		case "ddmmyy":
			return dd + settings.separatorDate + mm + settings.separatorDate + yy;
		case "ddMMyy":
			return dd + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + yy;
		case "ddMyy":
			return dd + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + yy;
		}
	}
/*  METODO DE USO
		========================================================================
		var today = $.smockDateFormat({date:new Date(), format:'yyyymmdd', lang: 'es', separatorDate:'-', separatorTime:':'});
	*/
	$.smockDateDiff = function(options) {
		//Variables default
		var settings = $.extend({
			fromDate: '01/01/2013',
			toDate: '12/31/2014',
			interval: 'years'
		}, options);
		var second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24,
			week = day * 7;
		var fromDate = new Date(settings.fromDate);
		var toDate = new Date(settings.toDate);
		var timediff = toDate - fromDate;
		if (isNaN(timediff)) return NaN;
		switch (settings.interval) {
		case "years":
			return toDate.getFullYear() - fromDate.getFullYear();
		case "months":
			return ((toDate.getFullYear() * 12 + toDate.getMonth()) - (fromDate.getFullYear() * 12 + fromDate.getMonth()));
		case "weeks":
			return Math.floor(timediff / week);
		case "days":
			return Math.floor(timediff / day);
		case "hours":
			return Math.floor(timediff / hour);
		case "minutes":
			return Math.floor(timediff / minute);
		case "seconds":
			return Math.floor(timediff / second);
		default:
			return undefined;
		}
	}
/*  METODO DE USO
		========================================================================
		var dif = $.smockDateDiff({fromDate:'01/01/2013 12:00:00', toDate:'12/31/2014 12:30:00', interval:'days'});
	*/
/*  FUNCTION GET URL
		======================================================================== */
	$.smockGetURL = function(folder) {
		//Se obtiene el protocolo http o https
		var protocol = $(location).attr('protocol');
		//Se obtiene el nombre del servidor o dominio
		var hostname = $(location).attr('hostname');
		//Se obtiene la o las subcarpetas
		var pathname = $(location).attr('pathname');
		//Se explota el pathname para obtener todos sus elementos separados por /
		pathname = pathname.split('/');
		//Se obtiene el ultimo elemento
		var last = pathname.pop();
		//Si el ultimo elemento no esta vacio
		if (last != '') {
			//Se explota el ultimo elemento
			file = last.split('.');
			//Si el ultimo elemento no es un archivo
			if (file.length < 2) {
				//Se agrega el ultimo elemento
				pathname.push(last);
			}
		}
		//Se dejan unicamente el numero de folders que se obtienen de la variable folders
		pathname = pathname.slice(0, folder + 1);
		//Se unen los elementos de el pathname separados por /
		pathname = pathname.join('/');
		//Se unen los elementos que forman la url
		var url = protocol + '//' + hostname + pathname;
		//Se retorna la url
		return url;
	}
/*  METODO DE USO
		========================================================================
		var url = $.smockGetURL(1);
	*/
/*  FUNCTION SMOOTH SCROLLING
		======================================================================== */
	$.smockScrolling = function(options) {
		//Variables default
		var settings = $.extend({
			speed: 1000
		}, options);
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, settings.speed);
					return false;
				}
			}
		});
	}
/*  METODO DE USO
		========================================================================
		$.smockScrolling({speed:1000});
	*/
})(jQuery);