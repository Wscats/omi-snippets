var prettier = require('prettier')
var code = `
import {
    // register component
    WeElement,
    // when you use component, you should define
    define,
    // JSX
    h,
    // html
    htm,
    html
} from "omi";

// JS
var a = 'abc'

export default class extends WeElement {
    css() {
        return ("p {color: red; }p span {font-size: 20px; }p span span {width: 100px; }")
    }
    render() {
        return (
            <div>
                <p name={this.data.name}>Hello World</p>

            </div>
        )
    }

    install() {
        this.data = {
            name: 'yao',
            skill: 'ps'
        }
    }
}


`
var code = prettier.format(code, {
    parser: "babel",
    // pluginSearchDirs: ["./dir-with-plugins"],
    // plugins: ["./foo-plugin"]
    semi: false, 
    // parser: "babel"
});
console.log(code);