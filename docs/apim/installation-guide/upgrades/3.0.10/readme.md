# Breaking Changes

## Management API

Starting with this version, `Apis` resources require authentication even
for the GET method.

If you are using the REST API directly, please note that you should
adapt your application.

`Apis` resources start with the path
`/management/organizations/DEFAULT/environments/DEFAULT/apis/`

## Portal API

Starting with this version, `Apis`, `Pages` and `Categories` resources
that were public for GET method require authentication if the users have
to sign in to access the portal. (forceLogin = true)

If you are using the REST API directly, please note that you should
adapt your application.

-   `Apis` resources start with the path
    `/portal/environments/DEFAULT/apis`

-   `Pages` resources start with the path
    `/portal/environments/DEFAULT/pages`

-   `Categories` resources start with the path
    `/portal/environments/DEFAULT/categories`
