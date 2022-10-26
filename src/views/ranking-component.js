import { LitElement, html, css } from "lit";

import styles from "../styles/styles";
import rankingComponentStyles from "../styles/ranking-component-styles";

export class RankingComponent extends LitElement {
  static get styles() {
    return [styles, rankingComponentStyles];
  }

  static get properties() {
    return {
      users: {
        type: Array,
      },
      actualUser: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.users = [];
    this.actualUser = {};
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith("user.")) {
        this.users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
  }

  firstUpdated() {
    this.actualUser = JSON.parse(
      localStorage.getItem("user." + localStorage.getItem("actualUser"))
    );
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
        <h1>Score rakning</h1>
        <button
          class="to-game"
          @click=${() => {
            this.toGame("game", this.actualUser);
          }}
        >
          Game
        </button>
        <table>
          <tr>
            <th>Users</th>
            <th>High score</th>
          </tr>
          ${this.users.map((user) => {
            return html`
              <tr>
                <td>${user.name}</td>
                <td>${user.highScore}</td>
              </tr>
            `;
          })}
        </table>
      </div>
    `;
  }
}

customElements.define("ranking-component", RankingComponent);
