import { LitElement, html, css } from "lit";

export class GameComponent extends LitElement {
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

      button {
        background-color: transparent;
        border: 2px solid black;
        border-radius: 20px;
        padding: 10px 20px 10px 20px;
        font-size: 17px;
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
    `;
  }

  static get properties() {
    return {
      actualUser: {
        type: Object,
      },
      lights: {
        type: Object,
      },
      canWalk: {
        type: Boolean,
        attribute: 'can-walk',
      },
      time: {
        type: Number,
      },
      points: {
        type: Number,
      },
      highScorePoints: {
        type: Number,
      },
      greenLightInterval: {
        type: String,
        attribute: "green-interval"
      },
      redLightInterval: {
        type: String,
        attribute: "red-interval"
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
    this.canWalk = true;
    this.time = 0;
    this.points = 0;
    this.highScorePoints = 0;
    this.leftClicks = 0;
    this.rightClicks = 0;
    this.greenLightInterval = "";
    this.redLightInterval = "";
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
      this.time =
        Math.max(10000 - this.actualUser.score * 100, 2000) +
        Math.random(-1500, 1500);
      this.greenLightInterval = setInterval(
        this.toggleLights.bind(this),
        this.time
      );
      this.requestUpdate();
    } else {
      this.time = 3000;
      this.redLightInterval = setInterval(
        this.toggleLights.bind(this),
        this.time
      );
    }
  }

  stopGame() {
    clearInterval(this.greenLightInterval);
    clearInterval(this.redLightInterval);
  }

  pointsToScore() {
    if (this.canWalk === true) {
      this.actualUser.score = this.points;
      this.actualUser.highScore = this.highScorePoints;

      if (this.actualUser.highScore > this.actualUser.score) {
        this.highScorePoints = this.highScorePoints + 0;
        this.points = this.points + 1;
      } else if (this.actualUser.score === this.actualUser.highScore) {
        this.points = this.points + 1;
        this.highScorePoints = this.highScorePoints + 1;
      }

      localStorage.setItem(
        "user." + this.actualUser.name,
        JSON.stringify(this.actualUser)
      );

      this.requestUpdate();
    } else {
      this.points = 0;
      this.actualUser.score = this.points;
      localStorage.setItem(
        "user." + this.actualUser.name,
        JSON.stringify(this.actualUser)
      );
      this.requestUpdate();
    }
  }

  dblClickHandler() {
    this.points = this.points - 2;
    this.actualUser.score = this.points;
    this.highScorePoints = this.highScorePoints + 0;
    this.actualUser.highScore = this.highScorePoints;
    if (this.points === 0) {
      this.points = this.points - 0;
    }
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
            @click="${this.pointsToScore}"
            @dblclick="${this.dblClickHandler}"
          >
            👣 Left
          </button>
          <button
            class="right"
            @click="${this.pointsToScore}"
            @dblclick="${this.dblClickHandler}"
          >
            Right 👣
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("game-component", GameComponent);
