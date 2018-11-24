  $(document).ready(function(){
    $('.col').height($('.col').width());

    $(window).resize(function(){
     $('.col').height($('.col').width());
    })

    // $('.col').click(function(){
    //   const p1 = $('#player1').detach();
    //   $('.col[x=3][y=10]').append(p1);
    // })
  })
