import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MaterialListItemText from '@material-ui/core/ListItemText';
import MaterialList from '@material-ui/core/List';
import List from '../../../components/List/';

Enzyme.configure({ adapter: new Adapter() });

describe('Correct number of children are rendered', () => {
    function getNumChildren(wrapper) {
        const children = wrapper.find(MaterialList).children();
        const numListItems = children.length;
        return numListItems;
    }

    test('Multiple children', () => {
        const items = [
            {
                key: 1,
                children: 'hello'
            },
            {
                key: 2,
                children: 'bye bye'
            }
        ];

        const wrapper = shallow(<List items={items}/>);
        expect(getNumChildren(wrapper)).toEqual(2);
    });

    test('No children', () => {
        const items = [];
        const wrapper = shallow(<List items={items}/>);
        expect(getNumChildren(wrapper)).toEqual(0);
    });

    test('One child', () => {
        const items = [
            {
                key: 1,
                children: 'Hi'
            }
        ];
        const wrapper = shallow(<List items={items}/>);
        expect(getNumChildren(wrapper)).toEqual(1);
    });
});



describe('Empty message is portrayed correctly', () => {

    function getMessage(wrapper) {
        return wrapper.find(MaterialListItemText).children().text();
    }

    test('Default message works', () => {
        const items = [];
        const wrapper = shallow(<List items={items}/>);
        expect(getMessage(wrapper).toLowerCase()).toEqual('list is empty');
    });

    test('Custom message works', () => {
        const items = [];
        const wrapper = shallow(<List items={items} emptyMessage='Test Message'/>);
        expect(getMessage(wrapper).toLowerCase()).toEqual('test message');
    });

    test('Message not shown when there are items', () => {
        const items = [
            {
                key: 1,
                children: 'hi'
            }
        ];
        const wrapper = shallow(<List items={items}/>);
        expect(wrapper.find(MaterialListItemText).length).toEqual(0);
    });

});


describe('Sortable correctly replaces material list', () => {

    test('Material list is present when there are items', () => {
        const items = [
            {
                key: 1,
                children: 'hello'
            },
            {
                key: 2,
                children: 'bye bye'
            }
        ];
        const wrapper = shallow(<List items={items}/>);
        expect(wrapper.find(MaterialList).length).toEqual(1);
    });

    test('Material list is not present when there are items and its sortable', () => {
        const items = [
            {
                key: 1,
                children: 'hello',
                index: 1
            },
            {
                key: 2,
                children: 'bye bye',
                index: 2
            }
        ];

        const wrapper = shallow(<List items={items} isSortable={true}/>);
        expect(wrapper.find(MaterialList).length).toEqual(0);
    });
});
