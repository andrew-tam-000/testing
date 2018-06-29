import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { asyncAddIssues } from '../../redux/actions';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('Async add issue creater constructs appropriate action', done => {
    const store = mockStore({ todos: [] })

    const expectedAction = [
        {
            type: 'ADD_ISSUES',
            payload: {
                repoName: 'one',
                issues: [
                    {
                        id: 1,
                    },
                    {
                        id: 2
                    }
                ]
            }
        }
    ];

    store
        .dispatch(asyncAddIssues('one', 'two'))
        .then(
            () => {
                expect(store.getActions()).toEqual(expectedAction);
                done();
            }
        )

    ;

});
