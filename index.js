window.addEventListener("load", function() {
  utils.scrollTo(0, 50);

  const bigScroll = Object.create(BigScroll);

  bigScroll.init({
    duration: 600,
    maxScrollCount: 3,
    onStart: function(scrollDirection, scrollCount) {
      console.log(
        `scroll direction: ${scrollDirection} | scrollCount: ${scrollCount}`
      );

      utils.scrollTo(
        scrollDirection === "down"
          ? window.innerHeight * scrollCount
          : window.innerHeight * (scrollCount - 1)
      );
    },
    onEnd: function(scrollDirection, scrollCount) {
      console.log(
        `scroll direction: ${scrollDirection} | scrollCount: ${scrollCount}`
      );
    }
  });

  bigScroll.addListeners();
});
