import {css} from "lit";

export default css `
.container {
    margin-top: 10%;
  }

  h2 {
    font-size: 155px;
    margin-top: -1%;
  }

  form {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  #name {
    padding: 10px 90px 10px 10px;
    border: 2px black solid;
    border-radius: 20px;
  }

  .login-btn {
    margin-top: 10%;
    background-color: transparent;
    font-size: 25px;
    padding: 10px 50px 10px 50px;
    border-radius: 20px;
    border: 2px solid black;
    cursor: pointer;

  }
`