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
    this.isRedLight = false;
    this.greenLightDuration =
      Math.max(10000 - this.actualUser.score * 100, 2000) +
      Math.random(-1500, 1500);
  }

  async firstUpdated() {
    await JSON.parse(
      localStorage.getItem("user." + localStorage.getItem("actualUser"))
    );
    this.actualUser = JSON.parse(
      localStorage.getItem("user." + localStorage.getItem("actualUser"))
    );
  }

  updated() {
    if (this.canWalk) {
      let greenLightInterval = setInterval(() => {
        this.toggleLights();
        clearInterval(greenLightInterval)
      }, 3000);
    } else {
      let redLightInterval = setInterval(() => {
        this.toggleLights();
        clearInterval(redLightInterval)
      }, this.greenLightDuration);
    }
  }

  toggleLights() {
    this.canWalk = !this.canWalk;
    
  }

  /*  pointsToScore(){
    
  } */

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
            ${this.canWalk
              ? html`<h1 class="green-light">${this.lights.green}</h1>`
              : html`<h1 class="red-light">${this.lights.red}</h1>`}
          </div>
          <p>Score: ${this.actualUser.score}</p>
        </div>
        <button class="left">👣 Left</button>
        <button class="right">Right 👣</button>
      </div>
    `;
  }
}

customElements.define("game-component", GameComponent);
