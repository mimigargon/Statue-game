import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/statues-app.js';
import '../src/views/home-component';

describe('HomeComponent', () => {
let app, game;
beforeEach(async () => {
    app = await fixture(html `<statues-app></statues-app>`);
});
it('Home component is rendering first', async () => {
    const el = await fixture(html `<home-component></home-component>`);
    expect(el).to.exist;
})
it('If login is correct, redirect to game page', async () => {
    const el = await fixture(html `<home-component></home-component>`);
        
    el.shadowRoot.querySelector('#name').value = "NewUser589";
    el.onLogin();
    
    await app.updateComplete;
    
   game = app.shadowRoot.querySelector('game-component');
});
});