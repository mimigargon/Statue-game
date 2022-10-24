import { LitElement, html, css } from "lit";

export class GameComponent extends LitElement {
  static get styles() {
    return css``;
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
      },
      time: {
        type: Number,
      },
      points: {
        type: Number,
      },
      highScorePoints: {
        type: Number,
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
  }

  firstUpdated() {
    this.actualUser = JSON.parse(
      localStorage.getItem("user." + localStorage.getItem("actualUser"))
    );
    console.log(this.actualUser)
  }

  toggleLights() {
    this.canWalk = !this.canWalk;
  }

  startGame() {
    if(this.canWalk === true){
      this.time = Math.max(10000 - this.actualUser.score * 100, 2000) +
      Math.random(-1500, 1500);
      setInterval(this.toggleLights.bind(this), this.time);
      this.requestUpdate();
    }else {
      this.time = 3000;
      setInterval(this.toggleLights.bind(this), this.time);
    }
  }

  pointsToScore(){
    if(this.canWalk === true) {
      this.points = this.points + 1;
      this.highScorePoints = this.highScorePoints + 1;
      this.actualUser.score = this.points;
      this.actualUser.highScore = this.highScorePoints;
    
      localStorage.setItem("user." + this.actualUser.name, JSON.stringify(this.actualUser));
      this.leftDblClickHandler();
      this.rightDblClickHandler();
      this.requestUpdate();

    }else {
      this.points = 0;
      localStorage.setItem("user." + this.actualUser.name, JSON.stringify(this.actualUser));
      this.requestUpdate();
    }
  } 

  leftDblClickHandler() {
    const leftButton = this.shadowRoot.querySelector('.left').addEventListener("dblclick", (event) => {
      this.actualUser.score = this.actualUser.score - 1; 
      localStorage.setItem("user." + this.actualUser.name, JSON.stringify(this.actualUser));
    });
  }

  rightDblClickHandler() {
    const rightButton = this.shadowRoot.querySelector('.right').addEventListener("dblclick", (event) => {
      this.actualUser.score = this.actualUser.score - 1;
      localStorage.setItem("user." + this.actualUser.name, JSON.stringify(this.actualUser));
    });
  }


  render() {
    return html`
      <div class="container">
        <div class="header-container">
          <h1>Red Light, Green Light</h1>
          <h4>Hi ${this.actualUser.name}</h4>
        </div>
        <div class="game-container">
          <p>High Score: ${this.actualUser.highScore}</p>
          <div id="lights-container">
          <button class="start-game" @click=${this.startGame}>Start!</button>
            ${this.canWalk
              ? html`<h1 class="green-light">${this.lights.green}</h1>`
              : html`<h1 class="red-light">${this.lights.red}</h1>`}
          </div>
          <p>Score: ${this.actualUser.score}</p>
        </div>
        <button class="left" @click="${this.pointsToScore}">👣 Left</button>
        <button class="right" @click=${this.pointsToScore}>Right 👣</button>
      </div>
    `;
  }
}

customElements.define("game-component", GameComponent);
