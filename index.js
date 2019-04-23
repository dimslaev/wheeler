window.addEventListener("load", function() {
  utils.scrollTo(0, 50);

  const wheeler = new Wheeler({
    duration: 600,
    wheelCountMax: 3,
    onStart: function(direction, wheelCount) {
      console.log(`scrolling ${direction}`, wheelCount);

      utils.scrollTo(
        direction === "down"
          ? window.innerHeight * wheelCount
          : window.innerHeight * (wheelCount - 1)
      );
    }
  });

  wheeler.init();
});
