# Repository

## Mongodb

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.8.0/1-page-acl-migration.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.8.0/1-page-acl-migration.js)  
This script replaces **excluded\_groups** by **visibility**,
**excludedAccessControls** and **accessControls** collection.
