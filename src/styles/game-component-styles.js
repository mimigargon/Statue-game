import {css} from "lit";

export default css `
.container {
    margin-top: 50px;
  }

  h2 {
    font-size: 30px;
  }

  .header-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .game-container {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .lights-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
  }

  p {
    margin-bottom: 35px;
    font-size: 27px;
    margin-top: -5px;
  }

  .green-light {
    font-size: 80px;
  }

  .red-light {
    font-size: 80px;
  }

`