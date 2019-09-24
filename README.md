# BigScroll

Replace normal scroll behaviour to produce custom effects based on `scrollCount` and `scrollDirection`.

### Options

| Option         | Type | Description                                           |
| -------------- | ---- | ----------------------------------------------------- |
| direction      | str  | Scroll direction ("down" or "up").                    |
| scrollCount    | int  | Consecutive scrollings without changing direction     |
| maxScrollCount | int  | Stop listeners after a given wheel/touchmove counter. |
| duration       | int  | Duration of animation / interaction in miliseconds.   |

### Callbacks

| Callback | Type | Parameters           | Description                          |
| -------- | ---- | -------------------- | ------------------------------------ |
| onStart  | func | [direction, counter] | Fires when wheel / touchmove starts. |
| onEnd    | func | [direction, counter] | Fires when wheel / touchmove ends.   |
