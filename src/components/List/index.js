import React, { Component } from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';

import MaterialList from '@material-ui/core/List';
import MaterialListItem from '@material-ui/core/ListItem';
import MaterialListItemText from '@material-ui/core/ListItemText';

import { SortableContainer } from 'react-sortable-hoc';


const SortableIssueList = SortableContainer( ({...props}) => <MaterialList {...props}/>);

class List extends Component {
    render() {
        const { items, isSortable, ...props } = this.props;

        const ListComponent = isSortable ? SortableIssueList : MaterialList;

        return items && items.length ? (
            <ListComponent {...props}>
                {
                    _.map(
                        items,
                        ({content}) => content
                    )
                }
            </ListComponent>
        ) : (
            <MaterialListItem>
                <MaterialListItemText>
                    { this.props.emptyMessage || 'List is empty' }
                </MaterialListItemText>
            </MaterialListItem>
        );
    }
}

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.element,
        key: PropTypes.integer
    })),
    emptyMessage: PropTypes.string,
    isSortable: PropTypes.bool
};

export default List;
