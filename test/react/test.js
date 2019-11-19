import { Component as WeElement, createElement as h } from "react";
import styled from "styled-components";
const StyledComponents = styled.div`
  div {
    color: red;
  }
`;

class C extends WeElement {
  render() {
    return h(
      StyledComponents,
      null,
      h("div", null, h("input", null), h("p", null, this.data.name))
    );
  }

  constructor(props) {
    super(props);
  }
}

export default C;
