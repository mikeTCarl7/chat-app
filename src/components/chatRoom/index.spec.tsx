import React from 'react';
import ReactDom from 'react-dom';

import renderer from 'react-test-renderer';
import ChatRoom from './index';

jest.mock('./index', ()=> 'ChatRoom');
describe('<ChatRoom />', ()=>{
    it('renders without crashing', ()=>{
        const div = document.createElement('div');
        ReactDom.render(<ChatRoom/>, div);
        ReactDom.unmountComponentAtNode(div);
    })
});

