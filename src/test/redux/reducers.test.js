import { createSelector } from 'reselect';
import issuesReducer from '../../redux/reducers/issues';

describe('Issues reducer sorts correctly', () => {

    const mockState = {
        test: {
            order: [
                1, 2, 3, 4, 5, 6, 7, 8
            ]
        }
    }

    test('Simple sort', () => {
        const newState = issuesReducer(mockState, {
            payload: {
                repoName: 'test',
                oldIndex: 1,
                newIndex: 0
            },
            type: 'REARRANGE_ISSUES'
        });
        expect(newState.test.order).toEqual([2, 1, 3, 4, 5, 6, 7, 8]);
    })

    test('End to end sort', () => {
        const newState = issuesReducer(mockState, {
            payload: {
                repoName: 'test',
                oldIndex: 0,
                newIndex: 7
            },
            type: 'REARRANGE_ISSUES'
        });
        expect(newState.test.order).toEqual([2, 3, 4, 5, 6, 7, 8, 1]);
    });

    test('Sort from high to low', () => {
        const newState = issuesReducer(mockState, {
            payload: {
                repoName: 'test',
                oldIndex: 7,
                newIndex: 0
            },
            type: 'REARRANGE_ISSUES'
        });
        expect(newState.test.order).toEqual([8, 1, 2, 3, 4, 5, 6, 7]);
    });

    test('Simple sort from high to low', () => {
        const newState = issuesReducer(mockState, {
            payload: {
                repoName: 'test',
                oldIndex: 5,
                newIndex: 2
            },
            type: 'REARRANGE_ISSUES'
        });
        expect(newState.test.order).toEqual([1, 2, 6, 3, 4, 5, 7, 8]);
    });

});
