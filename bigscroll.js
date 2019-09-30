const BigScroll = {
  init: function(options) {
    this.isListening = true;
    this.scrollCount = 0;
    this.minScrollCount = options.minScrollCount || 0;
    this.maxScrollCount = options.maxScrollCount || 3;
    this.onScrollStart = options.onStart || function() {};
    this.onScrollEnd = options.onEnd || function() {};
    this.scrollDuration = options.scrollDuration || 600;
    this.lastScrollDirection = "down";

    this.wheel = {
      deltas: [],
      lastTime: 0
    };

    this.touchSensitivity = 5;
    this.touches = {
      startY: 0,
      endY: 0
    };
  },
  addListeners: function() {
    window.addEventListener("wheel", this.wheelHandler.bind(this), {
      passive: false
    });
    window.addEventListener("touchstart", this.touchStartHandler.bind(this));
    window.addEventListener("touchmove", this.touchMoveHandler.bind(this), {
      passive: false
    });
  },
  wheelHandler: function() {
    event.preventDefault();

    let currTime = performance.now();
    let delta = event.wheelDelta || -event.deltaY || -event.detail;
    let direction = Math.max(-1, Math.min(1, delta));
    direction = direction < 0 ? "down" : "up";

    if (this.wheel.deltas.length > 149) {
      this.wheel.deltas.shift();
    }

    this.wheel.deltas.push(Math.abs(delta));

    let timeDiff = currTime - this.wheel.lastTime;
    this.wheel.lastTime = currTime;

    // enough to be considered a different scrolling action
    if (timeDiff > 200) {
      this.wheel.deltas = [];
    }

    if (!this.isListening) return;

    let averageEnd = utils.getAverage(this.wheel.deltas, 10);
    let averageMiddle = utils.getAverage(this.wheel.deltas, 70);
    let isAccelerating = averageEnd >= averageMiddle;

    // avoid double swipes...
    if (isAccelerating) {
      this.scroll(direction);
    }
  },
  touchStartHandler: function() {
    this.touchStartY = event.touches[0].pageY;
  },
  touchMoveHandler: function() {
    event.preventDefault();

    this.touchEndY = event.touches[0].pageY;

    if (!this.isListening) return;

    if (
      Math.abs(this.touchStartY - this.touchEndY) >
      (window.innerHeight / 100) * this.touchSensitivity
    ) {
      if (this.touchStartY > this.touchEndY) {
        this.scroll("down");
      } else if (this.touchEndY > this.touchStartY) {
        this.scroll("up");
      }
    }
  },
  scroll: function(direction) {
    this.isListening = false;

    if (this.onScrollStart) this.onScrollStart(direction, this.scrollCount);

    setTimeout(() => {
      this.isListening = true;

      this.lastScrollDirection = direction;

      this.updateScrollCount(direction);

      if (this.onScrollEnd) this.onScrollEnd(direction, this.scrollCount);
    }, this.scrollDuration + 30);
  },
  updateScrollCount: function(direction) {
    if (direction === "down" && this.lastScrollDirection === "down")
      this.setScrollCount(this.scrollCount + 1, true);

    if (direction === "up" && this.lastScrollDirection === "up")
      this.setScrollCount(this.scrollCount - 1, true);
  },
  setScrollCount: function(scrollCount, caller) {
    if (
      scrollCount <= this.maxScrollCount &&
      scrollCount >= this.minScrollCount
    )
      this.scrollCount = scrollCount;
    else if (!caller)
      console.error(`Scroll count ${scrollCount} falls outside min-max range.`);
  },
  destroy: function() {
    window.removeEventListener("wheel", this.wheelHandler);
    window.removeEventListener("touchstart", this.touchStartHandler);
    window.removeEventListener("touchmove", this.touchMoveHandler);
  }
};
