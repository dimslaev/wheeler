window.addEventListener("load", function() {
  utils.scrollTo(0, 50);

  const page1 = document.querySelector("#page-1");
  const h1 = page1.querySelector("h1");
  const h2 = page1.querySelector("h2");
  const wings = page1.querySelectorAll(".wing");
  const page2 = document.querySelector("#page-2");
  const page3 = document.querySelector("#page-3");

  const page1Animation = function() {
    h1.style.transition = "opacity 0.3s";
    h1.style.opacity = 0;

    h2.style.transition = "opacity 0.3s 0.3s";
    h2.style.opacity = 1;

    wings[0].style.transition = "transform 0.3s 0.15s";
    wings[1].style.transition = "transform 0.3s 0.15s";
    wings[0].style.transform = "translateX(-100%)";
    wings[1].style.transform = "translateX(100%)";
  };

  const page1AnimationReverse = function() {
    h1.style.transition = "opacity 0.3s 0.3s";
    h1.style.opacity = 1;

    h2.style.transition = "opacity 0.3s";
    h2.style.opacity = 0;

    wings[0].style.transition = "transform 0.3s";
    wings[1].style.transition = "transform 0.3s";
    wings[0].style.transform = "translateX(0)";
    wings[1].style.transform = "translateX(0)";
  };

  const bigScroll = Object.create(BigScroll);

  bigScroll.init({
    duration: 600,
    minScrollCount: 0,
    maxScrollCount: 3,
    onStart: function(scrollDirection, scrollCount) {
      console.log(
        `scroll direction: ${scrollDirection} | scrollCount: ${scrollCount}`
      );

      if (scrollDirection === "down") {
        if (scrollCount === 0) {
          page1Animation();
        }

        if (scrollCount > 0) {
          utils.scrollTo(window.innerHeight * scrollCount);
        }
      }
      if (scrollDirection === "up") {
        if (scrollCount === 0) {
          // do nothing
        } else if (scrollCount === 1) {
          page1AnimationReverse();
        } else if (scrollCount === 3) {
          utils.scrollTo(0);
          bigScroll.setScrollCount(0);
          page1AnimationReverse();
        } else {
          utils.scrollTo(window.innerHeight * (scrollCount - 2));
        }
      }
    },
    onEnd: function(scrollDirection, scrollCount) {
      console.log(
        `scroll direction: ${scrollDirection} | scrollCount: ${scrollCount}`
      );
    }
  });

  bigScroll.addListeners();
});
