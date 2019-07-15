import { WeElement, h } from "omi";
export default class _class extends WeElement {
  constructor(...args) {
    super(...args);
    this.aaa = void 0;
  }

  render(props) {
    return h("div", null, "123    hello world123456");
  }
}
_class.css = ``;
