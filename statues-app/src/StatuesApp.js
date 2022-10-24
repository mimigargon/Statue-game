import { LitElement, html, css } from "lit";
import { installRouter } from "pwa-helpers/router.js";

import "./views/game-component";
import "./views/home-component";
import "./views/ranking-component";

export class StatuesApp extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      actualUser: {
        type: Object,
      },
      views: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    (this.actualUser = {}), (this.views = "home");
    installRouter((location) => {
      this.handleNavigation(location);
    });
  }

  handleNavigation(location) {
    const route = location.pathname;
    if ((this.views = route === "/")) {
      ("home");
    }
  }

  toGame(event) {
    this.navigate(event.detail);
  }

  async navigate(data) {
    window.history.pushState({}, "", data.view);
    this.handleNavigation(window.location);
    this.views = data.view;
    await data.user;
    this.actualUser = data.user;
    localStorage.setItem("actualUser", this.actualUser.name);
  }

  handleViews() {
    switch (this.views) {
      case "home": {
        return html`<home-component @to-game=${this.toGame}></home-component>`;
      }
      case "game": {
        return html`<game-component
          .actualUser=${this.actualUser}
        ></game-component>`;
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
