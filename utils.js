const utils = {
  getScrollTop: () => {
    let doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  },

  getAverage: (elements, number) => {
    let sum = 0;
    let lastElements = elements.slice(Math.max(elements.length - number, 1));

    for (var i = 0; i < lastElements.length; i++) {
      sum = sum + lastElements[i];
    }

    return Math.ceil(sum / number);
  },

  scrollTo: (to, duration, callback) => {
    let start = utils.getScrollTop();
    let change = to - start;
    let currentTime = 0;
    let increment = 20;
    let speed = duration || 600;
    activeAnimation = true;

    const easeInOutCubic = function(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    };

    const animateScroll = function() {
      if (activeAnimation) {
        let val = to;

        currentTime += increment;

        val = easeInOutCubic(currentTime, start, change, speed);

        document.documentElement.scrollTo(0, val);

        if (currentTime < speed) {
          setTimeout(animateScroll, increment);
        } else if (typeof callback !== "undefined") {
          callback();
        }
      } else if (currentTime < speed) {
        callback();
      }
    };

    animateScroll();
  }
};
