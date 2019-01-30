var awardsHelper = {
    init: function(){
        let count = 0,
            awardsArray = ['Cannes Health Lions—Lighter Blue (Silver)', 'Etsy enamel pin la croix', 'Franzen copper mug vaporware poutine', 'craft beer hammock chicharrones'];


        setInterval(function () {
            count++;
            $("#js-awards-name").fadeOut(400, function () {
              $(this).text(awardsArray[count]).fadeIn(400);

              if(count == awardsArray.length -1){
                  count = 0;
              }
            });
          }, 7000);
    }
};





