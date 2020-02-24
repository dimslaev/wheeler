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

  // Go back to top on page refesh
  smoothScrollTo("#page-1");

  Wheeler.init({
    duration: 600,
    minScrollCount: 0,
    maxScrollCount: 2,
    onScrollStart: function(scrollDirection, scrollCount) {
      console.log(
        `scroll direction: ${scrollDirection} | scrollCount: ${scrollCount}`,
      );

      if (scrollDirection === "down") {
        if (scrollCount === 0) {
          page1Animation();
        }

        if (scrollCount > 0) {
          smoothScrollTo("#page-" + (scrollCount + 1));
        }
      }
      if (scrollDirection === "up") {
        if (scrollCount === 0) {
          // do nothing
        } else if (scrollCount === 1) {
          page1AnimationReverse();
        } else {
          smoothScrollTo("#page-" + (scrollCount - 1));
        }
      }
    },
    onScrollEnd: function(scrollDirection, scrollCount) {
      console.log(
        `scroll direction: ${scrollDirection} | scrollCount: ${scrollCount}`,
      );

      if (scrollDirection === "up" && scrollCount === 1) {
        page1AnimationReverse();
        Wheeler.setScrollCount(0);
      }
    },
  });
});
