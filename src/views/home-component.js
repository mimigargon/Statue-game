import { LitElement, html, css } from "lit";

export class HomeComponent extends LitElement {
  static get styles() {
    return css`
      * {
        font-family: fantasy;
        color: black;
      }
      .container {
        display: flex;
        flex-direction: column;
        place-content: center;
        align-items: center;
        margin-top: 10%;
      }

      h2 {
        font-size: 155px;
        margin-top: -1%;
      }

      form {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        align-items: center;
      }

      #name {
        padding: 10px 90px 10px 10px;
        border: 2px black solid;
        border-radius: 20px;
      }

      button {
        margin-top: 10%;
        background-color: transparent;
        font-size: 25px;
        padding: 10px 50px 10px 50px;
        border-radius: 20px;
        border: 2px solid black;

      }
    `;
  }

  static get properties() {
    return {
      title: {
        type: String,
      },
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
          <button type="submit">JOIN</button>
        </form>
      </div>
    `;
  }
}

customElements.define("home-component", HomeComponent);
