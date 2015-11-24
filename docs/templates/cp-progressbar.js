$('#btnProgressbar').click(function(e) {
  e.preventDefault();
  $.smkProgressBar({
    element:'body',
    status:'start',
    bgColor: '#000',
    barColor: '#fff',
    content: 'Loading...'
  });
  setTimeout(function(){
    $.smkProgressBar({
      status:'end'
    });
  }, 1000);
});
