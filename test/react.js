import { Component as WeElement, createElement as h } from "react";
export default connect()(
  class MyAbcAbc extends WeElement {
    render() {
      return html`
        h("div", null, h("p", null, this.data.title));
      `;
    }

    componentDidMount() {
      this.data = {
        title: "omi",
        name: "ract"
      };
    }
  }
);
