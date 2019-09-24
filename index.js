window.addEventListener("load", function() {
  utils.scrollTo(0, 50);

  const bigScroll = Object.create(BigScroll);

  bigScroll.init({
    duration: 600,
    maxScrollCount: 3,
    onStart: function(direction, scrollCount) {
      console.log(
        `scroll direction: ${direction} | scrollCount: ${scrollCount}`
      );

      utils.scrollTo(
        direction === "down"
          ? window.innerHeight * scrollCount
          : window.innerHeight * (scrollCount - 1)
      );
    },
    onEnd: function(direction, scrollCount) {
      console.log(
        `scroll direction: ${direction} | scrollCount: ${scrollCount}`
      );
    }
  });

  bigScroll.addListeners();
});
