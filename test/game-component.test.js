import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/statues-app.js';
import '../src/views/game-component';

describe('GameComponent', () => {
    let app;

beforeEach(async () => {
    app = await fixture(html `<statues-app></statues-app>`);
})
it('Game component is rendering', async () => {
    const el = await fixture(html `<game-component></game-component>`);
    expect(el).to.exist
});
it('If Start button clicked, game starts', async () => {
    const el = await fixture(html `<game-component green-interval red-interval can-walk=true actual-user='{"name": "User123", "score": 0, "highScore": 10}></game-component>`);
    expect(el.canWalk).to.deep.equal(true)
    expect(el.shadowRoot.querySelector('.green-light')).to.exist;
    
    expect(el.shadowRoot.querySelector('#start-game')).to.exist;
    
    el.shadowRoot.querySelector('#start-game').click();
    el.startGame();
    
    await el.updateComplete;
    
    
    expect(el.greenLightInterval).to.exist;
    expect(el.redLightInterval).to.exist;
})
it('If Stop button clicked, game stops', async () => {
    const el = await fixture(html `<game-component green-interval red-interval></game-component>`);
    
    expect(el.shadowRoot.querySelector('#stop-game')).to.exist;
    
    el.shadowRoot.querySelector('#stop-game').click();
    
    
    await el.updateComplete;
    
    expect(el.greenLightInterval).to.not.exist;
    expect(el.redLightInterval).to.not.exist;
});
it('If Right or Left button clicked, get one point', async () => {
    const el = await fixture(html `<game-component actual-user='{"name": "NewUser589", "score": 0, "highScore": 0}'></game-component>`);

    expect(el.actualUser).to.deep.equal({"name": "NewUser589", "score": 0, "highScore": 0})
    expect(el.shadowRoot.querySelector('.right')).to.exist;
    expect(el.shadowRoot.querySelector('.left')).to.exist;

    el.shadowRoot.querySelector('.right').click();
    el.shadowRoot.querySelector('.left').click()
    await el.updateComplete;

    expect(el.actualUser).to.deep.equal({name: "NewUser589", score: 2, highScore: 0})

});
it('If Ranking button clicked render ranking component', async () => {
    const el = await fixture(html `<game-component actual-user='{"name": "User123", "score": 0, "highScore": 10}></game-component>`);
    expect(el).to.exist;

    app.navigate({view: "ranking", user: {}})

    await el.updateComplete;

    expect(app.shadowRoot.querySelector('ranking-component')).to.exist;
});
});
