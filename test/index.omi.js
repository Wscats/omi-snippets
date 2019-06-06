import { WeElement, define, h } from "omi";

// import axios from 'axios';
// M
const style = "a{color:red}";

const myEno = class extends WeElement {
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

  static css =
    `
    div{
        color:red;
        p{
            font-size:14px;
        }
    }
` + style;
  install() {
    this.data = {
      name: "123"
    };
  }
  testClick() {
    this.data.name = 456;
    this.update();
  }
};

define("my-eno", myEno);
