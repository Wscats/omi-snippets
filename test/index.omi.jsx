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
var a = "abc";

export default class extends WeElement {
  css() {
    return `p {
  color: red; }
  p span {
    font-size: 20px; }
    p span span {
      width: 400px; }
`;
  }
  render() {
    return html`
      <div>
        <p name="{this.data.name}">Hello World</p>
      </div>
    `;
  }

  install() {
    this.data = {
      name: "yao",
      skill: "ps",
      obj: {}
    };
  }
}
