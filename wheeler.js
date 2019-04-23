var scrollings = [];
var preventNormalScroll = true;
var wheelWorks = true;
var wheelCount = 0;
var duration = 600;
var prevTime = new Date().getTime();
var sections = document.getElementsByTagName("section");

function MouseWheelHandler(e) {
  var curTime = new Date().getTime();

  e = e || window.event;
  var value = e.wheelDelta || -e.deltaY || -e.detail;
  var delta = Math.max(-1, Math.min(1, value));

  if (scrollings.length > 149) {
    scrollings.shift();
  }

  scrollings.push(Math.abs(value));

  if (preventNormalScroll) {
    event.preventDefault();
  }

  var timeDiff = curTime - prevTime;
  prevTime = curTime;

  // enough to be considered a different scrolling action)
  if (timeDiff > 200) {
    scrollings = [];
  }

  if (wheelWorks) {
    var averageEnd = getAverage(scrollings, 10);
    var averageMiddle = getAverage(scrollings, 70);
    var isAccelerating = averageEnd >= averageMiddle;

    // avoid double swipes...
    if (isAccelerating) {
      if (delta < 0) {
        scrolling("down");
      } else {
        scrolling("up");
      }
    }
  }

  return false;
}

function scrolling(direction) {
  console.log(`scrolling ${direction}`);

  wheelWorks = false;

  triggerEvent("wheeler", {
    detail: { direction, duration, wheelCount }
  });

  setTimeout(function() {
    setTimeout(function() {
      wheelWorks = true;
      if (direction === "down") wheelCount++;
      else wheelCount--;
    }, 30);
  }, duration);
}

function scrollTo(to, duration, callback) {
  var start = getScrollTop();
  var change = to - start;
  var currentTime = 0;
  var increment = 20;
  activeAnimation = true;

  var easeInOutCubic = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  };

  var animateScroll = function() {
    if (activeAnimation) {
      var val = to;

      currentTime += increment;

      if (duration) {
        val = easeInOutCubic(currentTime, start, change, duration);
      }

      document.documentElement.scrollTo(0, val);

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      } else if (typeof callback !== "undefined") {
        callback();
      }
    } else if (currentTime < duration) {
      callback();
    }
  };

  animateScroll();
}

function getScrollTop() {
  var doc = document.documentElement;
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
}

function getAverage(elements, number) {
  var sum = 0;

  var lastElements = elements.slice(Math.max(elements.length - number, 1));

  for (var i = 0; i < lastElements.length; i++) {
    sum = sum + lastElements[i];
  }

  return Math.ceil(sum / number);
}

function triggerEvent(name, params) {
  var event = new CustomEvent(name, params);
  window.dispatchEvent(event);
}

window.addEventListener("wheel", MouseWheelHandler, { passive: false });

window.addEventListener(
  "wheeler",
  function(e) {
    scrollTo(
      sections[
        e.detail.direction === "down"
          ? e.detail.wheelCount + 1
          : e.detail.wheelCount - 1
      ].offsetTop,
      e.detail.duration
    );
  },
  false
);

window.addEventListener("load", function() {
  scrollTo(0, 50);
});
