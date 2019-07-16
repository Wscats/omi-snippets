import { Component as WeElement, createElement as h } from "react";
import styled from "styled-components";
import axios from "axios";
const style = "a{color:red}";
const StyledComponents = styled.div`
  div {
    color: red;
  }
  div p {
    font-size: 14px;
  }
`;

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
          "okkookko"
        )
      )
    );
  }

  componentDidMount() {
    console.log("LifeCycle");
  }

  testClick() {
    this.setState({
      name: "jingnij"
    });
  }
}

MyEno.css = `div{color:red}div p{font-size:14px}`;
export default MyEno;
