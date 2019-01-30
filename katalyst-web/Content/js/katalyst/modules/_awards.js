var awardsHelper = {
    init: function(){
        let count = 0,
            awardsArray = ['Cannes Health Lions—Lighter Blue (Silver)', 'Etsy enamel pin la croix', 'Franzen copper mug vaporware poutine', 'craft beer hammock chicharrones'];


        setInterval(function () {
            count++;
            $("#name").fadeOut(400, function () {
              $(this).text(awardsArray[count]).fadeIn(400);
            });
          }, 7000);
    }
};





