import { LitElement, html, css } from "lit";
import { installRouter } from "pwa-helpers/router.js";

import "./views/game-component";
import "./views/home-component";
import "./views/ranking-component";

export class StatuesApp extends LitElement {
  static get styles() {
    return css`
    `;
  }

  static get properties() {
    return {
      actualUser: {
        type: {
          name: {type: String},
          score: {type: Number},
          highScore: {type: Number}
        },
        attribute: "actual-user",
      },
      views: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.actualUser = {};
    this.views = "home";
    installRouter((location) => {
      this.handleNavigation(location);
    });
  }

  handleNavigation(location) {
    const route = location.pathname;
    this.views = route === "/" ? "home" : route.slice(1);
  }

  toGame(event) {
    this.navigate(event.detail);
  }

  toHome(event) {
    this.navigate(event.detail);
  }

  toRanking(event) {
    this.navigate(event.detail);
  }

  navigate(data) {
    window.history.pushState({}, "", data.view);
    this.handleNavigation(window.location);
    this.actualUser = data.user.name;
    localStorage.setItem("actualUser", this.actualUser);
  }

  handleViews() {
    switch (this.views) {
      case "home": {
        return html`<home-component @to-game=${this.toGame}></home-component>`;
      }
      case "game": {
        return html`<game-component
          .actualUser=${this.actualUser}
          @to-home=${this.toHome}
          @to-ranking=${this.toRanking}
        ></game-component>`;
      }
      case "ranking": {
        return html`<ranking-component
          @to-game=${this.toGame}
        ></ranking-component>`;
      }
      default: {
        this.navigate({ view: "home" });
        return html`<home-component @to-game=${this.toGame}></home-component>`;
      }
    }
  }

  render() {
    return html` ${this.handleViews()} `;
  }
}
customElements.define('statues-app', StatuesApp);
