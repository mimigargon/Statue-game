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
});
