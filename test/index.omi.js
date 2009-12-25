import { WeElement, define, h } from "omi";

// import axios from 'axios';

const myEno = class extends WeElement {
  static css = `div{color:red}div p{font-size:14px}
`;
  render() {
    return h("div", null, this.data.name, "12345");
  }

  install() {
    this.data = {
      name: "Eno Yao !)))))"
    };
  }
};

define("my-eno", myEno);
