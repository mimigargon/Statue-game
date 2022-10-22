import { LitElement, html, css } from 'lit';
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
        type: Object,
      },
      views: {
        type: String,
      },
      users: {
        type: Array,
      }
    };
  }


  constructor() {
    super();
    this.actualUser = {},
    this.users = [];
    this.views = "home";
    installRouter((location) => {
      this.handleNavigation(location);
    }) 
  }

  handleNavigation(location){
    const route = location.pathname;
    if(this.views = route === "/"){
        "home"
    }
  }

  toGame(event){
    this.navigate(event.detail);
  }

  navigate(ev){
    window.history.pushState({}, "", ev.view);
    this.handleNavigation(window.location)
    this.views = ev.view;
    
  }
  
  handleViews(){
    switch(this.views){
      case "home": {
       return html `<home-component @to-game=${this.toGame}></home-component>`;
      }
      case "game": {
        return html `<game-component></game-component>`
      }
      default: {
        this.navigate({view: "home"});
        return html `<home-component @to-game=${this.toGame}></home-component>`
      }
    }
  }

  render() {
    return html`
    ${this.handleViews()}
    `;
  }
  
}
