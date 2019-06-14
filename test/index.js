var _class, _temp;

import { WeElement, define, h } from "omi"; // 123
// import axios from 'axios';

const style = "a{color:red}";
const myEno = ((_temp = _class = class myEno extends WeElement {
  constructor(...args) {
    super(...args);
    this.abc = 123;
  }

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

  // age = 18
  install() {
    this.data = {
      name: "789101112"
    };
  }

  testClick() {
    this.data.name = 789;
    this.update();
  }

  a() {}
}),
(_class.css =
  `
    div {
        color: red;

        p {
            font-size: 14px;
        }
    }
` + style),
(_class.num = 1 + 1),
(_class.abc = 2),
_temp);
define("my-eno", myEno);
