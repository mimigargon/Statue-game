import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/statues-app.js';
import '../src/views/game-component';

describe('GameComponent', () => {
    let app
beforeEach(async () => {
    app = await fixture(html `<statues-app></statues-app>`)
});
it('Game component is rendering', async () => {
    const el = await fixture(html `<game-component></game-component>`);
    expect(el).to.exist;
});
it('If Start button clicked, game starts', async () => {
    const el = await fixture(html`<game-component actual-user='{"name": "User1234", "score": 0, "highScore": 0}'></game-component>`);

    expect(el.gameStarted).to.equal(false);
    expect(el.shadowRoot.querySelector('.green-light')).to.not.exist;

    el.shadowRoot.querySelector('#start-game').click();

    await el.updateComplete ;

    expect(el.greenLightInterval).to.exist;
    expect(el.redLightInterval).to.exist;
    expect(el.gameStarted).to.equal(true);
});
it('If Stop button clicked, game stops', async () => {
    const el = await fixture(html`<game-component actual-user='{"name": "User1234", "score": 0, "highScore": 0}'></game-component>`);
    
    expect(el.gameStarted).to.equal(false);

    el.shadowRoot.querySelector('#stop-game').click();

    await el.updateComplete;

    expect(el.greenLightInterval).to.be.empty;
    expect(el.redLightInterval).to.be.empty;
    expect(el.gameStarted).to.equal(false);
});
it('If Right or Left button clicked, get one point', async () => {
    const el = await fixture(html`<game-component></game-component>`);
    
    expect(el.actualUser).to.deep.equal({"name": "NewUser589", "score": 0, "highScore": 0});

    el.shadowRoot.querySelector('.right').click();
    el.shadowRoot.querySelector('.left').click();

    el.updateComplete;

    expect(el.actualUser).to.deep.equal({"name": "NewUser589", "score": 2, "highScore": 2})
});
it('If Right or Left button clicked twice, one point less', async () => {
    const el = await fixture(html`<game-component></game-component>`);
    
    expect(el.actualUser).to.deep.equal({"name": "NewUser589", "score": 2, "highScore": 2});

    el.shadowRoot.querySelector('.right').click();
    el.shadowRoot.querySelector('.left').click();

    el.updateComplete;

    expect(el.actualUser).to.deep.equal({"name": "NewUser589", "score": 0, "highScore": 2})
});
it('If Ranking button clicked, render ranking component', async () => {
    const el = await fixture(html`<game-component></game-component>>`);
    
    el.shadowRoot.querySelector('#to-ranking').click();

    app.navigate({view: "ranking", user: {}});

    await el.updateComplete;

    expect(app.shadowRoot.querySelector('ranking-component')).to.exist;
})
});