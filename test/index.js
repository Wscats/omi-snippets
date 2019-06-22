import { WeElement, define, h } from "omi"; // 123345123
// 456789
// import axios from 'axios';

const style = "a{color:red}";

class myEno extends WeElement {
  constructor(...args) {
    super(...args);
    this.abc = 123;
    this.qwesd = void 0;
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

  a() {
    console.log(1123123);
  }
}

myEno.css =
  `div{color:red}div p{font-size:14px}
` + style;
myEno.abc = 2123;
define("my-eno", myEno);
