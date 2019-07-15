import { Component as WeElement, createElement as h } from "react";
import styled from "styled-components";
const StyledComponents = styled.div``;

class MyC extends WeElement {
  render() {
    return h(
      StyledComponents,
      null,
      h("div", null, h("p", null, "123"), h("p", null))
    );
  }

  install() {}
}

MyC.css = `

`;
export default MyC;
