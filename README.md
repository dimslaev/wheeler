### Wheeler

Perform custom animations depending on wheel count and direction. Only 1.77kb minified. 

[Example here.](https://dimslaev.github.io/wheeler/example/)

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
