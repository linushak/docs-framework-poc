# *View* renamed to *Categories*

In the new portal, *views* are called *categories*. But in the
management console, they are still called *views*. To be consistent, the
term *View* is replaced by *Category* in the whole platform.

Linked to this issue:
[\#3843](https://github.com/gravitee-io/issues/issues/3843)

## Mongodb

Before running any script, please create a dump of your existing
database.

[upgrades/3.x/3.0.2/mongodb/1-rename-view-in-category.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.0.2/1-rename-view-in-category.js)  
This script renames a field in *apis* collection, rename *views*
collection, change 3 parameters, replace *view* by *category* in
*audits* collection and convert documentation view LINK to ctagory LINK
