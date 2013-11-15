/*
*	========================================================================
*	jquery.smock.js
*	========================================================================
*	Copyright (c) Alfredo Barron   2013. All rights reserved
*	Version       1.1
*	Created       24/10/2013
*	Last modified 14/11/2013
*	Email         contacto@alfredobarron.com
*	Web           http://www.alfredobarron.com
*	========================================================================
*/


(function($){

	/*  FUNCTION VALID ALL INPUT OF A FORM
		======================================================================== */
	$.fn.validateFormSmock = function() {
		//Se remueven los mensajes de validacion existentes
		$('.validate-smock').remove();
		//Se inicializan las variables
		var result = false;
		var thiss = 0;
		//Se crea la expresion regular para el input mail
		var emailRegex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
		//Se crea la expresion regular para la contraseña
		var strongPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;// Debe contener al menos 6 caracteres, un numero y una mayuscula
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
			if (required === true && (type === 'text' || tag === 'textarea' || type === 'email' || type === 'password' || type === 'tel')) {
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
					var select2 = $(this).siblings('div');
					var select2a = select2.children('a');
					select2a.focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>' + txtrequired + '</span>');
					result = false;
					return false;
				} else {
					result = true;
				}
			}
			//Se valida si el input RADIO o CHECKBOX es requerido y no esta checked
			if (required === true && type === 'radio' || type === 'checbox') {
				//if(this.checked == true)){
				//if (!$(this).is(':checked')){
				//$("input[name=mygroup][value=" + value + "]").attr('checked', 'checked');
				//$("input[name=mygroup][value=" + value + "]").prop('checked', true);
				var name = $("input[name='"+this.name+"']:checked").val();
				if (name === undefined){
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
			//Se valida si el input TEL no esta vacio y cumple con la expresion regular NUMERICO
			if (type === 'tel') {
				if ($(this).val() != '' && !numberRegex.test($(this).val())) {
					thiss = this;
					$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>Este campo solo admite números telefónicos</span>');
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
					$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>Este campo solo admite letras y números</span>');
					result = false;
					return false;
				} else {
					result = true;
				}
			}
			//Se valida si el input no esta vacio y contiene MINLENGTH o MAXLENGTH
			if ( (typeof(minlength) !== 'undefined' || typeof(maxlength) !== 'undefined') ) {
				//Si contiene ambos y son iguales
				if ($(this).val() != '' && minlength === maxlength){
					if ( ($(this).val().length != minlength) && ($(this).val().length != maxlength) ) {
						$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>El numero de caracteres debe ser igual a <b>' + maxlength + '</b></span>');
						result = false;
						return false;
					} else {
						result = true;
						
					}
				//Si contiene ambos y son diferentes
				}else if($(this).val() != '' && minlength != maxlength){
					if ( $(this).val().length < minlength || $(this).val().length > maxlength) {
						$(this).focus().after('<span class="validate-smock"><span class="glyphicon glyphicon-warning-sign"></span>El numero de caracteres debe ser menor a <b>' + minlength+ ' y mayor a' + maxlength + '</b></span>');
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
		if($('#form').validateFormSmock()){}
	*/






	/*  FUNCTION VALIDATE EQUAL PASSWORDS
		======================================================================== */
	$.validateEqualPassSmock = function(password, repassword){
		//Se remueven los mensajes de validacion existentes
		$('.validate-smock').remove();
		//Se inicializan las variables
		var result = false;
		//Se crea la expresion regular para la contraseña
		var strongPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;// Debe contener al menos 6 caracteres, un numero y una mayuscula
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
		}else {//Si no esta vacio y cumple con la expresion regular requerida se retorna true
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
		}else {//Si los passwords son iguales se retorna true
			result = true;
		}
		//Se retorna el resultado
		return result;
	}
	/*  METODO DE USO
		========================================================================
		if($.validateEqualPassSmock('#form #password', '#form #repassword'){}
	*/






	/*  FUNCTION VALIDATE EQUAL PASSWORDS VAR
		======================================================================== */
	$.validateEqualPassVarSmock = function(password, repassword) {
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
		}else {//Si los passwords son iguales se retorna true
			result = true;
		}
		//Se retorna el resultado
		return result;
	}
	/*  METODO DE USO
		========================================================================
		if($.validateEqualPassVarSmock(passwordActual, '#form #repassword'){}
	*/






	/*  FUNCTION CLEAR FORM
		======================================================================== */

	$.fn.clearFormSmock = function(options){
		//Variables default
		var settings = $.extend( {
			noClear: ''
		},options );
		//Se eliminan los espacios en blanco de la variable settings.noClear
		var noClearSinEspacios = settings.noClear.replace(/\s/g,'');
		//Se quiebra la variable noClearSinEspacios para obtener sus valores y se agregan en el array noClear
		var noClear = noClearSinEspacios.split(',');
		//Se inicializa la variable clear
		var clear = 1;
		//Se recorren todos los inputs del form
		return $(':input', this).each(function() {
			//Se obtiene el type y el tag del input
			var type = this.type;
			var tag = this.tagName.toLowerCase();
			//Si el tag trae el valor 'input' se sustituye por el valor type
			if(tag=='input'){
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
			if( $.inArray(type, noClear) <0 && $.inArray(tag, noClear) <0 ){
				//Se compara el type y se limpia
				switch(type) {
					case 'text':
					case 'password':
					case 'email':
					case 'number':
					case 'hidden':
					case 'tel':
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
		$('#form').clearFormSmock({noClear: 'email,radio,...'});
	*/






	/*  FUNCTION CONFIRM
		======================================================================== */

	$.confirmSmock = function(msj,callback){
		//Se remueve el panel de confirmacion en el body
		$('.back-confirmSmock, .confirmSmock').remove();
		//Se agrega el panel de confirmacion en el body
		$('body').append('<div class="back-confirmSmock"><div class="panel panel-default confirmSmock"><div class="panel-body"><br>' + msj + '<br><br></div><div class="panel-footer text-right"><a class="btn btn-default btn-sm cancel" href="#" >Cancelar</a> <a class="btn btn-danger btn-sm delete" href="#">Borrar</a></div></div></div>');
		//Se aplica la animacion de entrada del panel de confirmacion
		$('.confirmSmock').animate({top: "-5px", opacity :'1'}, 200);
		//Si se presiona el boton .cancel se retorna false
		$('.cancel').click(function(e){
			e.preventDefault();
			//Se remueve el panel de confirmacion del body
			$('.back-confirmSmock').fadeOut(200, function(){$('.back-confirmSmock').remove();});
			$('.confirmSmock').animate({top: "-500px", opacity :'1'}, 200, function(){$('.confirmSmock').remove();});
			callback(false);
		});
		//Si se presiona el boton .delete se retorna true
		$('.delete').click(function(e){
			e.preventDefault();
			//Se remueve el panel de confirmacion del body
			$('.back-confirmSmock').fadeOut(200, function(){$('.back-confirmSmock').remove();});
			$('.confirmSmock').animate({top: "-500px", opacity :'1'}, 200, function(){$('.confirmSmock').remove();});
			callback(true);
		});
	}
	/*  METODO DE USO
		========================================================================
		$.confirmSmock('En verdad deceas eliminar este elemento?', function(e){if(e){
			//Code here
		}});
	*/






	/*  FUNCTION ALERTS
		======================================================================== */
	
	//Se inicializa la variable alertSmockTime
	var alertSmockTime=0;
	//Se crea la funcion alertSmock
	$.alertSmock = function(msj,options){
		//Variables default
		var settings = $.extend( {
			type: '',
			time: 5000
		},options );
		var type=0;
		//Se compara el tipo de alerta y se asigna la clase
		switch(settings.type) {
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
		$('.alertSmock').animate({right: "+=370px", opacity :'1'}, 150);
		//Se eliminan todos las alertas del body
		alertSmockTime = setTimeout(function(){
			$('.alertSmock').animate({right: "-=370", opacity :'0'}, 150, function(){$('.alertSmock').remove();});
		},settings.time);
	}
	/*  METODO DE USO
		========================================================================
		$.alertSmock('hola mundo', {type: 'success', time: 10000});
	*/






	/*  FUNCTION FORMAT CURRENCY
		======================================================================== */
	$.formatCurrencySmock = function(num,prefix){
		num = Math.round(parseFloat(num)*Math.pow(10,2))/Math.pow(10,2);
		prefix = prefix || '';
		num += '';
		var splitStr = num.split('.');
		var splitLeft = splitStr[0];
		var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '.00';
		splitRight = splitRight + '00';
		splitRight = splitRight.substr(0,3);
		var regx = /(\d+)(\d{3})/;
		while (regx.test(splitLeft)) {
			splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
		}
		return prefix + splitLeft + splitRight;
	}





	/*  FUNCTION FORMAT DATE
		======================================================================== */
	$.formatDateSmock = function(options){
		//Variables default
		var settings = $.extend( {
			date: new Date(),
			format: '',
			separatorDate: '-',
			separatorTime: ':'
		},options );
		
		//Se obtiene el dia
		var dd = settings.date.getDate();
		//Se obtiene el mes
		var mm = settings.date.getMonth()+1;//January is 0!
		//Se obtiene el año
		var yyyy = settings.date.getFullYear();
		//Si el dia es menor que 10 se agrega 0 al inicio
		if(dd<10){dd='0'+dd}
		//Si el mes es menor que 10 se agrega 0 al inicio
		if(mm<10){mm='0'+mm}
		//Se obtiene la hora
		var hh = settings.date.getHours();
		//Se obtienen los minutos
		var mi = settings.date.getMinutes();
		//Se obtienen los segundos
		var ss = settings.date.getSeconds();
		//Si los minutos son menor que 10 se agrega 0 al inicio
		if(mi<10){mi='0'+mi}
		//Si los segundos son menor que 10 se agrega 0 al inicio
		if(ss<10){ss='0'+ss}
		//Se construye el formato para base de datos 0000-00-00 00:00:00
		//Se retorna la fecha formateada
		return yyyy+ settings.separatorDate +mm+ settings.separatorDate +dd+' '+hh+ settings.separatorTime +mi+ settings.separatorTime +ss;
	}
	/*  METODOS DE USO
		========================================================================
		var today = $.formatDateSmock({date:new Date(), format:'', separatorDate:'-', separatorTime:':'});
	*/
	






	/*  FUNCTION CONFIRM
		======================================================================== */
	/*$.fn.confirmSmock = function(msj,options){
		//Variables default
		var defaults = {
			type: '',
			selector: ''
		};
		var settings = $.extend( {}, defaults, options );
		var type=0;
		//Se compara el tipo de panel y se asigna la clase
		switch(settings.type) {
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
		//Se retorna
		return this.each(function(){
			//Se ejecuta el evento click al selector
			$(this).on('click', settings.selector, function(e){
				e.preventDefault();
				//Se agrega el panel de confirmacion en el body
				$('body').append('<div class="back-confirmSmock"><div class="panel panel-default confirmSmock"><div class="panel-body">' + msj + '</div><div class="panel-footer text-right"><a class="btn btn-default btn-sm cancel" href="#" >Cancelar</a> <a class="btn btn-danger btn-sm delete" href="#">Borrar</a></div></div></div>');
				//Se aplica la animacion de entrada del panel de confirmacion
				$('.confirmSmock').animate({top: "+=30%", opacity :'1'}, 150);
				$('.cancel').click(function(e){
					e.preventDefault();
					$('.back-confirmSmock').fadeOut(200, function(){$('.back-confirmSmock').remove();});
					$('.confirmSmock').fadeOut(200, function(){$('.confirmSmock').remove();});
					callback(false);
				});
				$('.delete').click(function(e){
					e.preventDefault();
					$('.back-confirmSmock').fadeOut(200, function(){$('.back-confirmSmock').remove();});
					$('.confirmSmock').fadeOut(200, function(){$('.confirmSmock').remove();});
					callback(true);
				});
			});
		});
		
		
	}*/
	/*  METODOS DE USO
		========================================================================
		$('#boton').confirmSmock('hola mundo', {type: 'success', time: 10000});
		$('#content').confirmSmock('hola mundo', {selector: '#boton', type: 'danger', time: 10000});
	*/


})(jQuery);