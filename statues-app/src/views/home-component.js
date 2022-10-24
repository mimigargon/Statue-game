import { LitElement, html, css } from 'lit';



export class HomeComponent extends LitElement {
    static get styles() {
        return css`
          
        `;
      }
      
      static get properties() {
        return {
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
        this.views = "";
      }

      onLogin() {
        const name = this.shadowRoot.querySelector("#name");

        if(name.value === ""){
          alert("You must introduce a name")
        } else if(!localStorage.getItem("user." + name.value)){
          let user = {
            name: name.value,
            score: 0,
            highScore: 0,
          };
          localStorage.setItem("user." + name.value, JSON.stringify(user))
          this.toGame("game", user);
        }else{
          const logUser = JSON.parse(localStorage.getItem("user." + name.value));
          this.toGame("game", logUser)
        }
      }

      toGame(view, user){
        this.dispatchEvent(new CustomEvent("to-game", {
          detail: {
            view: view,
            user: user
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