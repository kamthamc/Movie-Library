import * as React from 'react';
import * as ReactTestRenderer from 'react-test-renderer';


import { AppComponent } from '../src/AppComponent';


describe('AppComponent', () => {

    let appComponent;


    beforeEach(function () {
        appComponent = ReactTestRenderer.create(<AppComponent />);
    });

    test('initialization', () => {
        let tree = appComponent.toJSON();
        expect(tree.props.className).toBe('alpha');
    });

});

