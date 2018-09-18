# rollup-userscript-boilerplate

Boilerplate for building a userscript with ES modules using [Rollup](https://github.com/rollup/rollup).

## Why not webpack?

Webpack doesn't build very readable (or lightweight) code. Part of the appeal of userscripts is that you can go in and edit the code reasonably easily, so ideally the built code will look about the same as the source code, which I've found Rollup is pretty good at.

## Usage

- `npm run start` to watch the `src` directory
- `npm run build` to just build

## Userscript Header

The [header](https://tampermonkey.net/documentation.php) is generated each time the Rollup config is run using properties in `package.json` (the `userscript` object).

Properties like `match` and `grant` can be a string or an array. Array values will be expanded so that each value will get its own tag. Example:

```javascript
{
  // . . .
  "userscript": {
    // . . .
    "grant": [
      "GM_getValue",
      "GM_setValue"
    ]
  }
}

// will become:

// ==UserScript==
// . . .
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==
```

You can use any properties you want. The code that generates the header is at the top of `rollup.config.js`. You can alternatively just provide a header in the `banner` property of the default export.

## Notes

- The generated header won't be formatted with any extra spaces between the tag and value.
- The header is only generated once when running `watch`, so you'll have to restart the process for it to pick up any changes to `package.json`.
