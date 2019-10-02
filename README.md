### BigScroll

Inspired by Fullpage.js, yet allowing to decide on animation effects yourself, and only 1.77kb minified. 

[Example here.](https://dimslaev.github.io/BigScroll/example/example.html)

### Options

| Option          | Type | Description                                        |
| --------------- | ---- | -------------------------------------------------- |
| scrollDirection | str  | Scroll direction ("down" or "up").                 |
| scrollCount     | num  | Consecutive scrollings without changing direction. |
| minScrollCount  | num  | Stop decrementing scrollCount at this value.       |
| maxScrollCount  | num  | Stop incrementing scrollCount at this value.       |
| duration        | num  | Scroll animation duration in miliseconds.          |
| onScrollStart | func | Fires when wheel / touchmove starts. Parameters [direction, scrollCount]|
| onScrollEnd   | func | Fires when wheel / touchmove ends.  Parameters [direction, scrollCount] |

### Methods

| Method         | Parameters     | Description                           |
| -------------- | -------------- | ------------------------------------- |
| setScrollCount | newScrollCount | Reset scrollCount to a desired value. |
