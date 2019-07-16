import { WeElement, define, h } from "omi";

class ComponentName extends WeElement {
  render(props) {
    return h("div", null, h("p", null, this.data.title));
  }

  install() {
    this.data = {
      title: "omi"
    };
  }
}

ComponentName.css = `p{color:#58bc58}`;
define("component-name", ComponentName);
