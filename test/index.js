import { WeElement, define, h } from "omi";
const style = "a{color:red}";

class myEno extends WeElement {
  constructor(...args) {
    super(...args);
    this.state = {
      name: "yao"
    };
  }

  render() {
    return h(
      "div",
      null,
      this.state.name,
      h(
        "button",
        {
          onClick: this.testClick.bind(this)
        },
        "ok"
      )
    );
  }

  componentDidMount() {
    console.log("LifeCycle");
  }

  testClick() {
    this.setState({
      name: "jing"
    });
  }
}

myEno.css = `div{color:red}div p{font-size:14px}`;
define("my-eno", myEno);
