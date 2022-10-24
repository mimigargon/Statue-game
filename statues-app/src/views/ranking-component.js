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
            type: Object,
          }
        };
      }
    
    
      constructor() {
        super();
        this.users = {};
      }

      firstUpdated() {
        this.users = JSON.parse(
          localStorage.getItem("user." + localStorage.getItem("users"))
        );
        console.log(this.users)
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
          <tr>
            <td>${this.users.name}</td>
            <td>${this.users.highScore}</td>
          </tr>
          </table>
        </div>
        `;
      }
}

customElements.define("ranking-component", RankingComponent);