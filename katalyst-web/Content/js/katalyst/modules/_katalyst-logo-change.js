
var change = {
  logo: $("#change-logo-animation"),
  dot1: $(".dot1"),
  dot2: $(".dot2"),
  dot3: $(".dot3"),
  dot4: $(".dot4"),
  dot5: $(".dot5"),
  dot6: $(".dot6"),
  dot7: $(".dot7"),
  dot8: $(".dot8"),
  dot9: $(".dot9"),
  bar1: $(".bar1"),
  bar2: $(".bar2"),
  bar3: $(".bar3"),
  bar4: $(".bar4"),
  bar5: $(".bar5"),
  bar6: $(".bar6"),
  init: function() {
    change.animate();
  },
  animate: function() {
    var tl = new TimelineMax(),
        delay = 1;
    //animation to dot 2, dot2 stays here
    tl.to([change.dot2, change.dot3, change.dot4, change.dot5, change.dot6, change.dot7, change.dot8, change.dot9], 0.10, {x: "+=110", willChange: "transform", ease: Power0.easeIn} , delay)
      .to(change.bar1, 0.10, {width: "+=75", willChange: "transform", ease: Power0.easeIn} , delay);

    delay+=0.10;
    //animation to dot 3, dot3 and 4 stay here
    tl.to([change.dot3, change.dot4, change.dot5, change.dot6, change.dot7, change.dot8, change.dot9], 0.10, {x: "+=82", willChange: "transform", ease: Power0.easeIn} , delay)
      .to(change.bar2, 0.10, {width: "+=43", willChange: "transform", ease: Power0.easeIn} , delay);

    delay+=0.10;
    //animation to dot 5, dot5 stays here
    tl.to([change.dot5, change.dot6, change.dot7, change.dot8, change.dot9], 0.10, {x: "+=82", willChange: "transform", ease: Power0.easeIn} , delay);

    delay+=0.10;
    //animation to dot 6, dot6 and dot7 stay here
    tl.to(change.bar3, 0.10, {width: "+=43", willChange: "transform", ease: Power0.easeIn} , delay)
      .to([change.dot6, change.dot7, , change.dot8, change.dot9], 0.10, {x: "+=82", willChange: "transform", ease: Power0.easeIn} , delay);

    delay+=0.10;
    //animation to dot 8, dot8 stays here
    tl.to(change.bar4, 0.10, {width: "+=43", willChange: "transform", ease: Power0.easeIn} , delay)
      .to([change.dot8, change.dot9], 0.10, {x: "+=82", willChange: "transform", ease: Power0.easeIn} , delay);

    delay+=0.10;
    //animation to dot 9
    tl.to(change.bar5, 0.10, {width: "+=75", willChange: "transform", ease: Power0.easeIn} , delay)
      .to([change.dot9], 0.10, {x: "+=110", willChange: "transform", ease: Power0.easeIn} , delay);

    delay+=0.10;

    tl.to([change.dot3, change.dot4, change.dot6, change.dot7], 0.25, {y: "-=60", willChange: "transform", ease: Power0.easeIn} , delay)
      .to([change.bar2, change.bar3], 0.25, {y: "-=28", x: "-=20", width: "+=50", rotation: -45, willChange: "transform", ease: Power0.easeIn}, delay)
      .to([change.bar4], 0.25, {y: "-=28", x: "-=30", width: "+=50", rotation: 45, willChange: "transform", ease: Power0.easeIn}, delay);

    delay+=0.25;

    tl.to([change.dot4, change.dot7], 0.25, {y: "+=138", willChange: "transform", ease: Power0.easeIn} , delay)
      .to(change.bar6, 0.25, {height: "+=98", willChange: "transform", ease: Power0.easeIn} , delay);
  }
}