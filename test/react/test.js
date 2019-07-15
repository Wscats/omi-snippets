import { Component as WeElement, createElement as h } from "react";

class C extends WeElement {
  render() {
    return h("div", null, h("p", null, this.data.name));
  }

  install() {
    this.data = {
      name: "abc"
    };
  }
}

C.css = ``;
export default C;
