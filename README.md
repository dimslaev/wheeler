# Wheeler
Replace normal scroll behaviour with custom wheel / touchmove handlers. 


### Options
| Option | Type | Parameters | Description |
|---|---|---|---|
| direction | str | - | Scroll direction ("down" or "up"). |
| wheelCount | int | - | Updated wheel/touchmove tries count based on direction. |
| wheelCountMax | int | - | Stop listeners after a given wheel/touchmove counter. |
| onStart | func | [direction, counter] | Fires when wheel / touchmove starts. |
| onEnd  | func | [direction, counter] | Fires when wheel / touchmove ends. |
| duration | int | - | Duration of animation / interaction in miliseconds. | 


### Example 
```javascript
  const wheeler = new Wheeler({
    duration: 600,
    wheelCountMax: 3,
    onStart: function(direction, wheelCount) {
      console.log(`scrolling ${direction}`, wheelCount);
      
      if (direction === 'down' && wheelCount === 1) 
        document.body.classList.add(`scrolled-down-page-1`)
    }
  });
```
