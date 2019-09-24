const utils = {
  getAverage: function(elements, number) {
    let sum = 0;
    let lastElements = elements.slice(Math.max(elements.length - number, 1));

    for (var i = 0; i < lastElements.length; i++) {
      sum = sum + lastElements[i];
    }

    return Math.ceil(sum / number);
  },
  scrollTo: function(to, speed = 600) {
    let start = window.pageYOffset;
    let change = to - start;
    let currentTime = 0;
    let increment = 20;

    const easeInOutCubic = function(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    };

    const animateScroll = function() {
      let val = to;
      currentTime += increment;
      val = easeInOutCubic(currentTime, start, change, speed);

      window.scrollTo(0, val);
      if (currentTime < speed) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }
};
