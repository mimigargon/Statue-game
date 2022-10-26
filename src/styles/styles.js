import {css} from "lit";

export default css `

* {
    font-family: fantasy;
    color: black;
  }

  .container {
    display: flex;
    flex-direction: column;
    place-content: center;
    align-items: center;
  }

  button {
    background-color: transparent;
    border: 2px solid black;
    border-radius: 20px;
    padding: 10px 20px 10px 20px;
    font-size: 17px;
    cursor: pointer;
  }
`;