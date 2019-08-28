import { Component as WeElement, createElement as h } from "react";
import styled from "styled-components";
const StyledComponents = styled.div`
  p {
    color: #58bc58;
  }
`;

class ComponentName extends WeElement {
  render() {
    return h(
      StyledComponents,
      null,
      h("div", null, h("input", null), h("p", null, this.data.title))
    );
  }

  install() {
    this.data = {
      title: "omi"
    };
  }
}

export default ComponentName;
