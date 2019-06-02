import {
  // register component
  WeElement,
  // when you use component, you should define
  define,
  h
} from "omi";

import axios from "axios";

const myEno = class extends WeElement {
  css() {
    return `div {
  color: red; }
  div p {
    font-size: 14px; }
`;
  }
  render() {
    return h("div", null, "HELLO WORLD ", this.data.name);
  }

  install() {
    this.data = {
      name: "yao",
      skill: ["ps"]
    };
  }
};
define("my-eno", myEno);
