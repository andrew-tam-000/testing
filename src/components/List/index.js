import React, { Component } from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';

import MaterialList from '@material-ui/core/List';
import MaterialListItem from '@material-ui/core/ListItem';
import MaterialListItemText from '@material-ui/core/ListItemText';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
const SortableIssueList = SortableContainer( ({...props}) => <MaterialList {...props}/>);
const SortableIssue = SortableElement( props => <MaterialListItem {...props}/>);

class List extends Component {
    render() {
        const { items, isSortable, handleItemClick, ...props } = this.props;

        const ListComponent = isSortable ? SortableIssueList : MaterialList;
        const ListItemComponent = isSortable ? SortableIssue : MaterialListItem;

        return items && items.length ? (
            <ListComponent {...props}>
                {
                    _.map(
                        items,
                        ({handleItemClickArgs, ...listItemProps}) => (
                            <ListItemComponent
                                {...listItemProps}
                                onClick={() => handleItemClickArgs && handleItemClick && handleItemClick.apply(null, handleItemClickArgs)}
                            />
                        )
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
        onItemClickArgs: PropTypes.array
    })),
    emptyMessage: PropTypes.string,
    isSortable: PropTypes.bool,
    handleItemClick: PropTypes.func
};

export default List;
