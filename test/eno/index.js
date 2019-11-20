import { WeElement, h } from "omi";
import axios from "axios";
import a from "a";
export default class _class extends WeElement {
  render(props) {
    return h("div", null, "hello world");
  }

  constructor() {
    this.name = "a";
  }
}
_class.css = `
a{
    color:red;
}
`;
