import { LitElement, html, css } from 'lit';



export class HomeComponent extends LitElement {
    static get styles() {
        return css`
          
        `;
      }
      
      static get properties() {
        return {
          user: {
            type: Object,
          },
          title: {
            type: String,
          },
          views: {
            type: String,
          }
        };
      }
    
    
      constructor() {
        super();
        this.user = {};
        this.views = "";
      }

      onLogin() {
        const name = this.shadowRoot.querySelector("#name");

        if(name.value === ""){
          alert("You must introduce a name")
        } else if(!localStorage.getItem(name.value)){
          this.user = {
            name: name.value,
            score: 0,
            highScore: 0,
          };
          localStorage.setItem("user." + name.value, JSON.stringify(this.user))
          this.toGame("game");
        }else{
          alert("This name is already taken!")
        }
      }

      toGame(view){
        this.dispatchEvent(new CustomEvent("to-game", {
          detail: {
            view: view,
          }
        }))
      }

    
    
      render() {
        return html`
        <div class="container">
          <h2>Create a new player</h2>
          <form class="login-form" @submit=${this.onLogin}>
            <input type='text' id="name" name="name"/>
            <button type="submit">JOIN</button>
          </form>
        </div>

        `;
      }
}

customElements.define("home-component", HomeComponent);