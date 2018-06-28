import { createSelector } from 'reselect';
import { relevantRepositorySelector, relevantIssuesSelector } from '../../redux/providers';

const issues = {
    test: {
        byId: {
            1: {
                val: 11
            },
            2: {
                val: 21
            },
            3: {
                val: 31
            }
        },
        order: [2, 3, 1]
    },
    brokenTest: {
        byId: {
            10: {
                val: 10
            },
            20: {
                val: 20
            },
            30: {
                val: 30
            }
        },
        order: [3, 1, 2]
    }
}

const repositories = [
    {
        id: 'one-test',
        val: 5,
        name: 'one-test'
    },
    {
        id: 'test',
        val: 1,
        name: 'test'
    },
    {
        id: 'two-test',
        val: 10,
        name: 'two-test'
    }
]

describe('Relevant repository selector works', () => {


    test('Correct repository is selected when provided', () => {

        const mockState = {
            general: {
                selectedRepository: 'test'
            },
            repositories
        };

        const relevantRepository = relevantRepositorySelector(mockState);

        expect(relevantRepository).toEqual({
            id: 'test',
            val: 1,
            name: 'test'
        });
    })

    test('Undefined is returned when there is no repository', () => {

        const mockState = {
            general: {
                selectedRepository: ''
            },
            repositories
        };

        const relevantRepository = relevantRepositorySelector(mockState);
        expect(relevantRepository).toEqual();
    })

})

describe('Relevant issues selector works', () => {

    test('Correct list of issues is returned', () => {

        const mockState = {
            general: {
                selectedRepository: 'test'
            },
            repositories,
            issues
        }

        const relevantIssues = relevantIssuesSelector(mockState);

        expect(relevantIssues).toEqual([
            {
                val: 21
            },
            {
                val: 31
            },
            {
                val: 11
            },
        ]);

    })

});
