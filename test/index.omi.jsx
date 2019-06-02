import { WeElement, define, h } from "omi";

import axios from "axios";

const myEno = class extends WeElement {
  css() {
    return `div{color:red}div p{font-size:14px}
`;
  }

  render() {
    return h(
      "div",
      null,
      "HELLO WORLD UUUUU ",
      this.data.name,
      h("p", null, "ABC")
    );
  }

  install() {
    this.data = {
      name: "yao",
      skill: ["ps"]
    };
  }
};

define("my-eno", myEno);
