import { WeElement, define, h } from "omi";

// import axios from 'axios';
// M
const style = "a{color:red}";

const myEno = class extends WeElement {
  static css = `div{color:red}div p{font-size:14px}
`;
  render() {
    return h(
      "div",
      null,
      this.data.name,
      h(
        "button",
        {
          onClick: this.testClick.bind(this)
        },
        "ok"
      )
    );
  }

  install() {
    this.data = {
      name: "123"
    };
  }
  testClick() {
    this.data.name = 789;
    this.update();
  }
  a() {}
};

define("my-eno", myEno);
