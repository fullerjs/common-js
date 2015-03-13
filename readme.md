# Common-js like module for browser tool for Fuller #
**Build everything with right tool**
[For more info about fuller](https://github.com/fullerjs/fuller)

### CommonJS ###
Tiny and deadly simple commonJS (nodejs like) module realization. It consists from just two functions _require_ and _exports_. You can write your client js like usual nodejs module.

```js
    var a = require('a');
    var b = function () {

    }
    exports('b', b);
```

Fuller will wrap all, app and each module, in closures. So your modules will be availible only for your app. If you need to make your module global (to be avalible outside your app), just use
```js
    exports('b', b, true);
```

## Options
* **prologue** – string will be inserted at the begining of the stream",
* **epilogue** — string will be inserted at the end of the stream",
* **itemPrologue** — string will be inserted before every item in the stream",
* **itemEpilogue** — string will be inserted after every item in the stream"
