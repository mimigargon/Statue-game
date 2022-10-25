import { LitElement, html, css } from 'lit';



export class RankingComponent extends LitElement {
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

     table{
      font-size: 20px;
     }
        `;
      }
      
      static get properties() {
        return {
          users: {
            type: Array,
          }
        };
      }
    
    
      constructor() {
        super();
        this.users = [];
        for(let i = 0; i < localStorage.length; i++){
          if(localStorage.key(i).startsWith("user.")){
            this.users.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          }
        }
      }

    
      render() {
        return html`
        <div class="container">
          <h1>Score rakning</h1>
          <table>
          <tr>
            <th>Users</th>
            <th>High score</th>
          </tr>
          ${this.users.map((user) => {
            return html `
            <tr>
              <td>${user.name}</td>
              <td>${user.highScore}</td>
            </tr>
            `;
          })}
          </table>
        </div>
        `;
      }
}

customElements.define("ranking-component", RankingComponent);