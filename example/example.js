window.addEventListener("load", function() {
  var page1 = document.querySelector("#page-1");
  var h1 = page1.querySelector("h1");
  var h2 = page1.querySelector("h2");
  var wings = page1.querySelectorAll(".wing");
  var page2 = document.querySelector("#page-2");
  var page3 = document.querySelector("#page-3");

  var page1Animation = function() {
    h1.style.transition = "opacity 0.3s";
    h1.style.opacity = 0;

    h2.style.transition = "opacity 0.3s 0.3s";
    h2.style.opacity = 1;

    wings[0].style.transition = "transform 0.3s 0.15s";
    wings[1].style.transition = "transform 0.3s 0.15s";
    wings[0].style.transform = "translateX(-100%)";
    wings[1].style.transform = "translateX(100%)";
  };

  var page1AnimationReverse = function() {
    h1.style.transition = "opacity 0.3s 0.3s";
    h1.style.opacity = 1;

    h2.style.transition = "opacity 0.3s";
    h2.style.opacity = 0;

    wings[0].style.transition = "transform 0.3s";
    wings[1].style.transition = "transform 0.3s";
    wings[0].style.transform = "translateX(0)";
    wings[1].style.transform = "translateX(0)";
  };

  var scrollY = function(y, speed = 600) {
    var start = window.pageYOffset;
    var change = y - start;
    var currentTime = 0;
    var increment = 20;

    var easeInOutCubic = function(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    };

    var animateScroll = function() {
      var val = y;
      currentTime += increment;
      val = easeInOutCubic(currentTime, start, change, speed);

      window.scrollTo(0, val);
      if (currentTime < speed) {
        setTimeout(animateScroll, increment);
      }
    };
    setTimeout(animateScroll, 0);
  };

  scrollY(0, 0);

  BigScroll.init({
    duration: 600,
    minScrollCount: 0,
    maxScrollCount: 3,
    onScrollStart: function(scrollDirection, scrollCount) {
      console.log(
        `scroll direction: ${scrollDirection} | scrollCount: ${scrollCount}`
      );

      if (scrollDirection === "down") {
        if (scrollCount === 0) {
          page1Animation();
        }

        if (scrollCount > 0) {
          scrollY(window.innerHeight * scrollCount);
        }
      }
      if (scrollDirection === "up") {
        if (scrollCount === 0) {
          // do nothing
        } else if (scrollCount === 1) {
          page1AnimationReverse();
        } else if (scrollCount === 3) {
          scrollY(0);
          page1AnimationReverse();
        } else {
          scrollY(window.innerHeight * (scrollCount - 2));
        }
      }
    },
    onScrollEnd: function(scrollDirection, scrollCount) {
      console.log(
        `scroll direction: ${scrollDirection} | scrollCount: ${scrollCount}`
      );
      if (window.pageYOffset === 0 && scrollCount === 2)
        BigScroll.setScrollCount(0);
    }
  });
});
