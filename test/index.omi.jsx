import { WeElement, define, h } from "omi";

// import axios from 'axios';

const myEno = class extends WeElement {
  css() {
    return `div{color:red}
`;
  }

  render() {
    return h("div", null, this.data.name);
  }

  install() {
    this.data = {
      name: "Eno Yao !"
    };
  }
};

define("my-eno", myEno);
