(function(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory();
  else if (typeof define === "function" && define.amd) define(factory);
  else if (typeof exports === "object") exports["BigScroll"] = factory();
  else root["BigScroll"] = factory();
})(typeof self !== "undefined" ? self : this, function() {
  "use strict";

  // VARS

  var BigScroll = {};
  var settings = {};
  var defaults = {
    minScrollCount: 0,
    maxScrollCount: 3,
    onScrollStart: function() {},
    onScrollEnd: function() {},
    scrollDuration: 600,
    touchSensitivity: 5
  };

  var scrollCount = 0;
  var isListening = true;
  var lastScrollDirection = "down";
  var wheelDeltas = [];
  var wheelLastTime = 0;
  var touchStartY = 0;
  var touchEndY = 0;

  // INIT

  function init(options) {
    destroy(); // prevent multiple initializations

    settings = extend(defaults, options || {});

    window.addEventListener("wheel", wheelHandler, {
      passive: false
    });
    window.addEventListener("touchstart", touchStartHandler);
    window.addEventListener("touchmove", touchMoveHandler, {
      passive: false
    });
  }

  // HANDLERS

  function wheelHandler() {
    event.preventDefault();

    var currTime = performance.now();
    var delta = event.wheelDelta || -event.deltaY || -event.detail;
    var direction = Math.max(-1, Math.min(1, delta));
    direction = direction < 0 ? "down" : "up";

    if (wheelDeltas.length > 149) {
      wheelDeltas.shift();
    }

    wheelDeltas.push(Math.abs(delta));

    var timeDiff = currTime - wheelLastTime;
    wheelLastTime = currTime;

    // enough to be considered a different scrolling action
    if (timeDiff > 200) {
      wheelDeltas = [];
    }

    if (!isListening) return;

    var averageEnd = getAverage(wheelDeltas, 10);
    var averageMiddle = getAverage(wheelDeltas, 70);
    var isAccelerating = averageEnd >= averageMiddle;

    // avoid double swipes...
    if (isAccelerating) {
      scroll(direction);
    }
  }

  function touchStartHandler() {
    touchStartY = event.touches[0].pageY;
  }

  function touchMoveHandler() {
    event.preventDefault();

    touchEndY = event.touches[0].pageY;

    if (!isListening) return;

    if (
      Math.abs(touchStartY - touchEndY) >
      (window.innerHeight / 100) * settings.touchSensitivity
    ) {
      if (touchStartY > touchEndY) {
        scroll("down");
      } else if (touchEndY > touchStartY) {
        scroll("up");
      }
    }
  }

  //  METHODS

  function scroll(direction) {
    isListening = false;

    if (settings.onScrollStart) settings.onScrollStart(direction, scrollCount);

    setTimeout(function() {
      isListening = true;

      lastScrollDirection = direction;

      updateScrollCount(direction);

      if (settings.onScrollEnd) settings.onScrollEnd(direction, scrollCount);
    }, settings.scrollDuration + 30);
  }

  function updateScrollCount(direction) {
    if (direction === "down" && lastScrollDirection === "down")
      setScrollCount(scrollCount + 1, true);

    if (direction === "up" && lastScrollDirection === "up")
      setScrollCount(scrollCount - 1, true);
  }

  function setScrollCount(count, caller) {
    if (count <= settings.maxScrollCount && count >= settings.minScrollCount)
      scrollCount = count;
    else if (!caller)
      console.error("Scroll count" + count + "falls outside min-max range.");
  }

  //  DESTROY

  function destroy() {
    window.removeEventListener("wheel", wheelHandler);
    window.removeEventListener("touchstart", touchStartHandler);
    window.removeEventListener("touchmove", touchMoveHandler);

    scrollCount = 0;
    isListening = true;
    lastScrollDirection = "down";
    settings = {};
  }

  // UTILS

  function getAverage(elements, number) {
    var sum = 0;
    var lastElements = elements.slice(Math.max(elements.length - number, 1));

    for (var i = 0; i < lastElements.length; i++) {
      sum = sum + lastElements[i];
    }

    return Math.ceil(sum / number);
  }

  function extend(a, b) {
    for (var key in b)
      if (Object.prototype.hasOwnProperty.call(b, key)) a[key] = b[key];
    return a;
  }

  // PUBLIC API

  BigScroll.init = init;
  BigScroll.destroy = destroy;
  BigScroll.setScrollCount = setScrollCount;

  return BigScroll;
});
