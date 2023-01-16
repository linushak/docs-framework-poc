API rating is a good way to promote your APIs. Only members of the API
with correct permissions are allowed to rate it.

Permission RATING:

-   CREATE: users can give a rating from 0 to 5

-   READ: users can see the ratings of the API

-   UPDATE: users can add a comment to their rating

-   DELETE: users can delete any comment

A member can also answer a rating.

Permission RATING\_ANSWER:

-   CREATE: users can answer a rating

-   READ: users can see the rating answers of the API

-   DELETE: users can delete any answer

By default, API rating is disabled. To enable it, configure
`gravitee.yml` as follows:

    ...
    # Allows to rate an API (default value: false)
    rating :
      enabled: true
