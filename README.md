# Getting Started

In order to run and build this project, please execute the following commands:

    * npm install
    * npm run build
    * npm run production-server

    * Or simply `npm install && npm run build && npm run production-server`

# Running test suite

    * npm test

# Server-Side Integration

The assumption here is that we will persist all the ordered issues per repository on a per-API-key basis.

This means that any users that load the page with the same API key will recieve the same cached order of issues.

The storage on our server would look something like this:

    {
        apiKey1: {
            repo1: {
                order: [4, 2, 3, 1, 5, 6, 7]
            },
            repo2: {
                order: [2, 1, 3, 4, 5, 6, 7]
            }
        },
        apiKey2: {
            repo1: {
                order: [7, 2, 3, 1, 5, 6, 4]
            },
            repo2: {
                order: [1, 2, 3, 7, 5, 6, 4]
            }
        }
    }

1) When the user submits the thier API key on the initial screen, two API requests will be made:
    - One to the github API, to retrieve all the repositories associated with that API key
    - Another to our backend API, which will return the all known sort orders associated with that API key

2) When a user interacts with an issue list:
    - Another backend API endpoint will get hit that will update the sort order stored on the server (for that API key)

NOTE: There is added complexity here if we want the sorted issue lists to be synced across multiple users who are viewing
repos associated with the same API key.  Perhaps some form of real-time push notifications (e.g. sockets) would help
keep all the browsers in sync.  With a traditional API model, we would have to continously poll our backend API endpoint
that retrieves all orderings associated with the API key, and update the UI appropriately

# TODO (Improvements)
    * Handle the case where an issue no longer exists, but gets cached into the persistent value
    * Issues API only returs /open/ issues - need to make sure this is accounted for
