import { Component as WeElement, createElement as h } from "react";
import styled from "styled-components";
const StyledComponents = styled.div`
  div {
    color: red;
  }
  div p {
    font-size: 14px;
  }
`;
const style = "a{color:red}";

class MyEno extends WeElement {
  constructor(...args) {
    super(...args);
    this.state = {
      name: "yao"
    };
  }

  render() {
    return h(
      StyledComponents,
      null,
      h(
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

MyEno.css = `div{color:red}div p{font-size:14px}`;
export default MyEno;
