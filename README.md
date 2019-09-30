# BigScroll

Replace normal scroll behaviour to produce custom full-page scroll animations.

### Options

| Option          | Type | Description                                        |
| --------------- | ---- | -------------------------------------------------- |
| scrollDirection | str  | Scroll direction ("down" or "up").                 |
| scrollCount     | int  | Consecutive scrollings without changing direction. |
| minScrollCount  | int  | Stop decrementing scrollCount at this value.       |
| maxScrollCount  | int  | Stop incrementing scrollCount at this value.       |
| duration        | int  | Scroll animation duration in miliseconds.          |

### Callbacks

| Callback | Type | Parameters             | Description                          |
| -------- | ---- | ---------------------- | ------------------------------------ |
| onStart  | func | direction, scrollCount | Fires when wheel / touchmove starts. |
| onEnd    | func | direction, scrollCount | Fires when wheel / touchmove ends.   |

### Methods

| Method         | Parameters     | Description                           |
| -------------- | -------------- | ------------------------------------- |
| setScrollCount | newScrollCount | Reset scrollCount to a desired value. |
