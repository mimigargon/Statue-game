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
    }else {
      this.time = 3000;
      setInterval(this.toggleLights.bind(this), this.time);
    }
  }

  pointsToScore(){
    if(this.canWalk === true) {
      this.points = this.points + 1;
      this.actualUser.score = this.points;
      localStorage.setItem("user." + this.actualUser.name, JSON.stringify(this.actualUser));
      
    }else {
      this.points = 0;
      this.actualUser.score = this.points;
      localStorage.setItem("user." + this.actualUser.name, JSON.stringify(this.actualUser));
    }
  } 

 /*  lessPoints() {
    const leftButton = this.shadowRoot.querySelector('.left');
    const rightButton = this.shadowRoot.querySelector('.right');
    leftButton.addEventListener('dblclick');
    rightButton.addEventListener('dblclick');
    if(leftButton || rg){
      this.points = this.points - 1;
      this.actualUser.score = this.points
      localStorage.setItem("actualUser", this.actualUser.score)
      console.log('se ha hecho doble click')
    }

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
