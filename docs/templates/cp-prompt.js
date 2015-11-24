$('#btnPrompt').click(function(e) {
  e.preventDefault();
  $.smkConfirm({
    text:'Estas seguro?',
    accept:'Aceptar',
    cancel:'Cancelar'
  },function(res){
    // Code here
    if (res) {
      $.smkAlert({
        text: 'Respuesta ' + res,
        type: 'success'
      });
    } else {
      $.smkAlert({
        text: 'No hubo respuesta',
        type: 'info'
      });
    }
  });
});
