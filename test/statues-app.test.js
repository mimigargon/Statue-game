import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/statues-app.js';

describe('StatuesApp', () => {
it('Home component is rendering first', async () => {
    const el = await fixture(html `<statues-app></statues-app>`);
    expect(el.shadowRoot.querySelector('home-component')).to.exist;
});
it('If login is correct, redirect to game page', async () => {
    const el = await fixture(html `<statues-app></statues-app>`);
    const homeView = el.shadowRoot.querySelector('home-component');
    homeView.shadowRoot.querySelector('#name').value = "NewUser589";
    homeView.onLogin();

    await el.updateComplete;

    expect(el.shadowRoot.querySelector('game-component')).to.exist;
});
it('If Start button clicked, game starts', async () => {
    const el = await fixture(html`<statues-app></statues-app>`);

    const gameView = el.shadowRoot.querySelector('game-component');
    expect(gameView.gameStarted).to.equal(false);
    expect(gameView.shadowRoot.querySelector('.green-light')).to.not.exist;

    gameView.shadowRoot.querySelector('#start-game').click();

    await el.updateComplete ;

    expect(gameView.greenLightInterval).to.exist;
    expect(gameView.redLightInterval).to.exist;
    expect(gameView.gameStarted).to.equal(true);
});
it('If Stop button clicked, game stops', async () => {
    const el = await fixture(html`<statues-app></statues-app>`);
    const gameView = el.shadowRoot.querySelector('game-component');
    expect(gameView.gameStarted).to.equal(false);

    gameView.shadowRoot.querySelector('#stop-game').click();

    await el.updateComplete;

    expect(gameView.greenLightInterval).to.be.empty;
    expect(gameView.redLightInterval).to.be.empty;
    expect(gameView.gameStarted).to.equal(false);
});
it('If Right or Left button clicked, get one point', async () => {
    const el = await fixture(html`<statues-app></statues-app>`);
    const gameView = el.shadowRoot.querySelector('game-component');
    
    expect(gameView.actualUser).to.deep.equal({"name": "NewUser589", "score": 0, "highScore": 0});

    gameView.shadowRoot.querySelector('.right').click();
    gameView.shadowRoot.querySelector('.left').click();

    el.updateComplete;

    expect(gameView.actualUser).to.deep.equal({"name": "NewUser589", "score": 2, "highScore": 2})
});
it('If Right or Left button clicked twice, one point less', async () => {
    const el = await fixture(html`<statues-app></statues-app>`);
    const gameView = el.shadowRoot.querySelector('game-component');
    
    expect(gameView.actualUser).to.deep.equal({"name": "NewUser589", "score": 2, "highScore": 2});

    gameView.shadowRoot.querySelector('.right').click();
    gameView.shadowRoot.querySelector('.left').click();

    el.updateComplete;

    expect(gameView.actualUser).to.deep.equal({"name": "NewUser589", "score": 0, "highScore": 2})
});
it('If Ranking button clicked, render ranking component', async () => {
    const el = await fixture(html`<statues-app></statues-app>`);
    const gameView = el.shadowRoot.querySelector('game-component');

    gameView.shadowRoot.querySelector('#to-ranking').click();

    el.navigate({view: "ranking", user: {}});

    await el.updateComplete;

    expect(el.shadowRoot.querySelector('ranking-component')).to.exist;
})
});
