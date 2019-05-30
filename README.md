# Omi Snippets

[Try it Now!](https://marketplace.visualstudio.com/items?itemName=Wscats.omi-snippets)

Visual Studio Code syntax highlighting for single-file Omi.js components (enabled by omil).

Or [Download Vsix!](https://github.com/Wscats/omi-snippets/releases/download/0.27/omi-snippets-0.2.7.vsix) to install in Visual Studio Code

# Quick Start

- Install [Omi Snippets](https://marketplace.visualstudio.com/items?itemName=Wscats.omi-snippets).
- Try it with [omil](https://github.com/Wscats/omil), a Omi.js components loader based on webpack.
- Via Marketplace Control: search for `Omi Snippets` and click install.
- Manual: clone this repo and install `omi-snippets.vsix` into your Visual Studio Code.
> In addition, if you want to build and install the extension from source, you need to install [vsce](https://code.visualstudio.com/api/working-with-extensions/publishing-extension), like this.

```bash
# Then, clone the repository and compile it.
git clone https://github.com/Wscats/omi-snippets
cd omi-snippets
yarn
vsce package
```
![wscats](https://wscats.github.io/omi-snippets/images/omi-snippets.gif)

# Code Snippets

|trigger|snippet|
|-|-|
|import|`import { * } from 'omi'`|
|export default|`export default {}`|
|modult.export"|`modult.export = {}`|
|render|`render(){}`|
|css|`css(){}`|
|template|`<template></template>`|
|templateLang|`<template lang></template>`|
|script|`<script></script>`|
|style|`<style></style>`|
|styleLang|`<style lang></style>`|
|scaffold|`<template><script><style>`|
|...|...|

**NOTE:** You still need to install corresponding packages for pre-processors (e.g. `JSX, SASS, TypeScript`) to get proper syntax highlighting for them.

# Enabling JSX Highlighting

The `<script>` block uses the syntax highlighting currently active for you normal `.js` files. To support JSX highlighting inside Omi files, just set [Babel javascript highlighting package](https://packagecontrol.io/packages/Babel), which supports JSX, as your default JS highlighting. 

> Note you may need to explicitly disable Sublime's default `JavaScript` package to make it work.

# Contributors

| [<img src="https://avatars1.githubusercontent.com/u/17243165?s=460&v=4" width="60px;"/><br /><sub>Eno Yao</sub>](https://github.com/Wscats)| [<img src="https://avatars2.githubusercontent.com/u/5805270?s=460&v=4" width="60px;"/><br /><sub>Aaron Xie</sub>](https://github.com/aaron-xie)|  <img src="https://wscats.github.io/omi-snippets/images/lemon.png" width="60px;"/><br /><sub>Lemon</sub>  |  <img src="https://wscats.github.io/omi-snippets/images/jing.jpg" width="60px;"/><br /><sub>Jing</sub>  |  <img src="https://avatars1.githubusercontent.com/u/50255537?s=460&v=4" width="60px;"/><br /><sub>Lin</sub>  |
| - | - | - | - | - |


# Thanks

- [html-snippets](https://github.com/abusaidm/html-snippets)
- [vscode-javascript](https://github.com/xabikos/vscode-javascript)
- [vscode-javascript-snippets](https://github.com/nathanchapman/vscode-javascript-snippets)
- [vsc-css-snippets](https://github.com/joy-yu/vsc-css-snippets)

# License

[MIT](http://opensource.org/licenses/MIT)