import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/statues-app.js';

describe('StatuesApp', () => {
it('Home component is rendering first', async () => {
    const el = await fixture(html `<statues-app></statues-app>`);
    expect(el.shadowRoot.querySelector('home-component')).to.exist;
});
it('')

});
