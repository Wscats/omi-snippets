// var compileSass = require('./sass.node.spk.js');

// compileSass('./test.scss', {
//     style: 'nested'
// }, function (result) {
//     console.log(result.text);
//     // handleResult(targetPath_, result);
// });

// const sass = require('../node_modules/node-sass')
// console.log(sass)
// var result = sass.renderSync({
//     data: `
//         p {
//             color: red;
//             span {
//                 font-size: 14px;
//             }
//         }
//     `
// });
// console.log(result.css.toString())

const sass = require('./sass.sync.js')
console.log(sass)