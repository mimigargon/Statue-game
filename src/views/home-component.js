import { LitElement, html, css } from "lit";

import styles from "../styles/styles";
import homeComponentStyles from "../styles/home-component-styles";

export class HomeComponent extends LitElement {
  static get styles() {
    return [styles, homeComponentStyles];
  }

  static get properties() {
    return {
      views: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.views = "";
  }

  onLogin() {
    const name = this.shadowRoot.querySelector("#name");

    if (name.value === "") {
      alert("You must introduce a name");
    } else if (!localStorage.getItem("user." + name.value)) {
      let user = {
        name: name.value,
        score: 0,
        highScore: 0,
      };
      localStorage.setItem("user." + name.value, JSON.stringify(user));
      this.toGame("game", user);
    } else {
      const logUser = JSON.parse(localStorage.getItem("user." + name.value));
      this.toGame("game", logUser);
    }
  }

  toGame(view, user) {
    this.dispatchEvent(
      new CustomEvent("to-game", {
        detail: {
          view: view,
          user: user,
        },
      })
    );
  }

  render() {
    return html`
      <div class="container">
        <h1>Create a new player</h1>
        <h2>👻</h2>
        <form class="login-form" @submit=${this.onLogin}>
          <input type="text" id="name" name="name" />
          <button class="login-btn" type="submit">JOIN</button>
        </form>
      </div>
    `;
  }
}

customElements.define("home-component", HomeComponent);
