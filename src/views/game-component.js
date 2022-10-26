import { LitElement, html, css } from "lit";

import styles from "../styles/styles"

export class GameComponent extends LitElement {
  static get styles() {
    return [css`

      .container {
        margin-top: 50px;
      }

      .header-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .game-container {
        margin-top: 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .lights-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-content: center;
      }

      p {
        margin-bottom: 35px;
        font-size: 27px;
        margin-top: -5px;
      }

      .green-light {
        font-size: 80px;
      }

      .red-light {
        font-size: 80px;
      }
    `, styles];
  }

  static get properties() {
    return {
      actualUser: {
        type: Object,
        attribute: "actual-user",
      },
      canWalk: {
        type: Boolean,
        attribute: "can-walk",
      },
      greenLightInterval: {
        type: String,
        attribute: "green-interval",
      },
      redLightInterval: {
        type: String,
        attribute: "red-interval",
      },
      lastMove: {
        type: String,
      },
      gameStarted: {
        type: Boolean,
      }
    };
  }

  constructor() {
    super();
    this.actualUser = {};
    this.lights = {
      green: "🏃",
      red: "🚨",
    };
    this.canWalk = false;
    this.greenLightInterval = "";
    this.redLightInterval = "";
    this.lastMove = "";
    this.gameStarted = false;
  }

  firstUpdated() {
    this.actualUser = JSON.parse(
      localStorage.getItem("user." + localStorage.getItem("actualUser"))
    );
  }

  toHome(view, user) {
    this.dispatchEvent(
      new CustomEvent("to-home", {
        detail: {
          view: view,
          user: user,
        },
      })
    );
  }

  toRanking(view, user) {
    this.dispatchEvent(
      new CustomEvent("to-ranking", {
        detail: {
          view: view,
          user: user,
        },
      })
    );
  }

  toggleLights() {
    this.canWalk = !this.canWalk;
  }

  startGame() {
    if (this.canWalk === true) {
      const time =
        Math.max(10000 - this.actualUser.score * 100, 2000) +
        Math.random(-1500, 1500);
      this.greenLightInterval = setInterval(
        this.toggleLights.bind(this),
        time
      );
      this.requestUpdate();
    } else {
      this.redLightInterval = setInterval(
        this.toggleLights.bind(this),
        3000
      );
    }
    this.gameStarted = true;
  }

  stopGame() {
    clearInterval(this.greenLightInterval);
    clearInterval(this.redLightInterval);
    this.gameStarted = false;
  }

  pointsToScore(move) {
    if (this.canWalk === true) {
      if (this.lastMove === move) {
        this.actualUser.score--;
      }else{
        this.actualUser.score++;
      }
      if(this.actualUser.score >= this.actualUser.highScore){
        this.actualUser.highScore = this.actualUser.score;
      }
      this.lastMove = move;
    } else {
      this.lastMove = undefined;
      this.actualUser.score = 0;
    }
    this.requestUpdate();
    this._updateUser();
  }

  _updateUser() {
    localStorage.setItem(
      "user." + this.actualUser.name,
      JSON.stringify(this.actualUser)
    );
  }

  render() {
    return html`
      <div class="container">
        <div class="header-container">
          <h1>Red Light, Green Light</h1>
          <h2>Hi ${this.actualUser.name}</h2>
          <div class="goto-buttons">
            <button
              class="to-home"
              @click=${() => {
                this.toHome("home", this.actualUser);
              }}
            >
              Home
            </button>
            <button
              id="to-ranking"
              @click=${() => {
                this.toRanking("ranking", this.actualUser);
              }}
            >
              Ranking
            </button>
          </div>
        </div>
        <div class="game-container">
          <p>High Score: ${this.actualUser.highScore}</p>
          <div class="buttons-container">
            <button id="start-game" @click=${this.startGame}>Start!</button>
            <button id="stop-game" @click=${this.stopGame}>Stop!</button>
          </div>
          <div id="lights-container">
            ${this.canWalk
              ? html`<h1 class="green-light">${this.lights.green}</h1>`
              : html`<h1 class="red-light">${this.lights.red}</h1>`}
          </div>
          <p>Score: ${this.actualUser.score}</p>
        </div>
        <div class="walk-buttons">
          <button
            class="left"
            @click="${() => {
              this.pointsToScore("left");
            }}"
            ?disabled=${!this.gameStarted}
          >
            👣 Left
          </button>
          <button
            class="right"
            @click="${() => {
              this.pointsToScore("right");
            }}"
            ?disabled=${!this.gameStarted}
          >
            Right 👣
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("game-component", GameComponent);
