import { Component as WeElement, createElement as h } from "react";

class MyAbcAbc extends WeElement {
  render() {
    return h("p", null, this.state.title);
  }

  constructor(props) {
    super(props);
    this.state.title = "Eno Yao";
  }
}

MyAbcAbc.css = `p{color:#58bc58}`;
export default MyAbcAbc;
