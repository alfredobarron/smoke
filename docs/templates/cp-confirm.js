$('#btnConfirm').click(function(e) {
  e.preventDefault();
  $.smkConfirm({
    text:'Estas seguro?',
    accept:'Aceptar',
    cancel:'Cancelar'
  },function(res){
    // Code here
    if (res) {
      $.smkAlert({text: 'Confirmado!!', type:'success'});
    }
  });
});
