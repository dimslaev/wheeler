class Wheeler {
  constructor(options) {
    this.preventNormalScroll = true;
    this.wheelCountMax = options.wheelCountMax || 3;
    this.wheelCount = 0;
    this.wheelWorks = true;
    this.onWheelStart = options.onStart;
    this.onWheelEnd = options.onEnd;
    this.duration = options.duration || 600;
    this.scrollings = [];
    this.prevTime = new Date().getTime();
    this.lastDirection = "down";
  }

  init() {
    window.addEventListener("wheel", this.wheelHandler, { passive: false });
  }

  wheelHandler = e => {
    let curTime = new Date().getTime();

    let value = e.wheelDelta || -e.deltaY || -e.detail;
    let delta = Math.max(-1, Math.min(1, value));

    if (this.scrollings.length > 149) {
      this.scrollings.shift();
    }

    this.scrollings.push(Math.abs(value));

    if (this.preventNormalScroll) {
      event.preventDefault();
    }

    let timeDiff = curTime - this.prevTime;
    this.prevTime = curTime;

    // enough to be considered a different scrolling action
    if (timeDiff > 200) {
      this.scrollings = [];
    }

    if (this.wheelWorks) {
      let averageEnd = utils.getAverage(this.scrollings, 10);
      let averageMiddle = utils.getAverage(this.scrollings, 70);
      let isAccelerating = averageEnd >= averageMiddle;

      // avoid double swipes...
      if (isAccelerating) {
        if (delta < 0) {
          this.wheel("down");
        } else {
          this.wheel("up");
        }
      }
    }

    return false;
  };

  wheel(direction) {
    this.wheelWorks = false;

    this.updateWheelCount(direction);

    if (this.onWheelStart) this.onWheelStart(direction, this.wheelCount);

    setTimeout(() => {
      setTimeout(() => {
        this.wheelWorks = true;

        this.lastDirection = direction;

        if (this.onWheelEnd) this.onWheelEnd(direction, this.wheelCount);
      }, 30);
    }, this.duration);
  }

  updateWheelCount(direction) {
    if (
      direction === "down" &&
      this.lastDirection === "down" &&
      this.wheelCount < this.wheelCountMax - 1
    )
      this.wheelCount++;

    if (
      direction === "up" &&
      this.lastDirection === "up" &&
      this.wheelCount > 1
    )
      this.wheelCount--;
  }

  destroy() {
    window.removeEventListener("wheel", this.wheelHandler);
  }
}
