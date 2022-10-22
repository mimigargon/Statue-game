import { LitElement, html, css } from 'lit';



export class GameComponent extends LitElement {
    static get styles() {
        return css`
          
        `;
      }
      
      static get properties() {
        return {
          
        };
      }
    
    
      constructor() {
        super();
        
      }
    
      render() {
        return html`
          <h1>HOLA</h1>
        `;
      }
}

customElements.define("game-component", GameComponent);