### BigScroll

Inspired by Fullpage.js, yet allowing to decide on animation effects yourself, and only 1.77kb minified. 

[Example here.](https://dimslaev.github.io/BigScroll/example/example.html)

### Options

| Option          | Type | Description                                        |
| --------------- | ---- | -------------------------------------------------- |
| scrollDirection | str  | Scroll direction ("down" or "up").                 |
| scrollCount     | int  | Consecutive scrollings without changing direction. |
| minScrollCount  | int  | Stop decrementing scrollCount at this value.       |
| maxScrollCount  | int  | Stop incrementing scrollCount at this value.       |
| duration        | int  | Scroll animation duration in miliseconds.          |

### Callbacks

| Callback      | Type | Parameters             | Description                          |
| ------------- | ---- | ---------------------- | ------------------------------------ |
| onScrollStart | func | direction, scrollCount | Fires when wheel / touchmove starts. |
| onScrollEnd   | func | direction, scrollCount | Fires when wheel / touchmove ends.   |

### Methods

| Method         | Parameters     | Description                           |
| -------------- | -------------- | ------------------------------------- |
| setScrollCount | newScrollCount | Reset scrollCount to a desired value. |
