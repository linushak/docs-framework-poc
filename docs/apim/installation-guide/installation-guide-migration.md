# Upgrade Notes

If you plan to skip versions when you upgrade, ensure that you read the
version-specific upgrade notes for each intermediate version. You may be
required to perform manual actions as part of the upgrade.

Be sure to run scripts on the correct database since `gravitee` is not
always the default database! Check your db name by running `show dbs;`

# Breaking changes

## API key and JWT plans

The security chain (the internal process that selects the executable
plan for the incoming request and applies the related security rules)
parses all active plans to select and execute the relevant one.

**Prior to this version:**

-   The API key plan was executed if the request contained an API key.

-   The JWT plan was executed if the request contained a Bearer token.

**From this version:**

The security chain has been improved to select and execute plans more
efficiently. As a result, API keys and JWT plans are now only executed
if there is an active subscription related to the provided security
token. If there is no relevant subscription, the currently parsed plans
are not executed and the security chain moves to parse the next
available plans. The process continues until the security chain parses
plans related to the provided security token and these plans are
executed, or until all available plans are parsed without a match.

Specific examples of this change are provided in the table below:

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>API plans</p></td>
<td style="text-align: left;"><p>Request</p></td>
<td style="text-align: left;"><p>Prior to this version</p></td>
<td style="text-align: left;"><p>From this version</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>API key plan + Keyless plan</p></td>
<td style="text-align: left;"><p>Request contains an invalid API
key</p></td>
<td style="text-align: left;"><p>API key plan is executed = HTTP 401
unauthorized</p></td>
<td style="text-align: left;"><p>Keyless plan is executed</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>JWT plan 1 + JWT plan 2</p></td>
<td style="text-align: left;"><p>Request contains a Bearer token valid
for JWT plan 2</p></td>
<td style="text-align: left;"><p>JWT plan 1 is executed = HTTP 401
unauthorized</p></td>
<td style="text-align: left;"><p>JWT plan 2 is executed</p></td>
</tr>
</tbody>
</table>

# Breaking changes

## Portal API

Endpoint: `[GET] portal/environments/{envId}/applications`.

For performance reasons, calling `/applications?size=-1` will no longer
return the number of subscribers and the only information available in
the owner of each application will be:

-   id

-   displayName

-   email

# Breaking changes

## Environment Audits

Endpoint:
`[GET] management/organizations/{orgId}/environments/{envId}/apis/{api}/audit`
(link:{{ */apim/3.x/management-api/* | relative\_url | append:
current\_version | append: */index.html#operation/getApiAudits* }}\[API
audits^\]).

Before this version, the Management API allowed getting all audits of
all environments and organizations with this endpoint.

As of 3.18.0, a GET request will return the audits of the environment
specified in the url and no longer return organization audits. To get
organization audits you need to use the following endpoint:
`[GET] management/organizations/{orgId}/audit`.

The query params `envLog:boolean` & `orgLog:boolean` are removed. Now to
get only environment or organization audit you have to use the query
params `referenceType:string` with `ENVIRONMENT` or `ORGANIZATION`. You
can also filter by environment id with `environment:string` query
params.

## Platform alerts on multi-environments APIM

Before this version, platform alerts were common to all environments.
That led to inconsistencies while handling platform alerts on
multi-environments APIM.

From this version, platform alerts are scoped to the environment. For
example, if you create an alert on your `production` environment, it is
related only to this environment.

Old platform alerts existing before Gravitee upgrade will be linked to
the default environment. You will see them disappear from your others
(non-default) environments, and will have to recreate them manually if
relevant.

## System Roles Edition

To provide more flexibility in the way roles are managed, some system
roles have been made editable. From now on, the permissions of the
following roles can be edited:

1.  The Environment Admin Role.

2.  The API Primary Owner Role

3.  The Application Primary Owner Role

The Organization Admin Role remains a read-only role. If any accidental
loss of access happened to one of the roles listed above, the
Organization Admin Role will be the only one able to revert the changes.

This mode is deactivated by default, you can toggle it on via
`gravitee.yml` :

    console:
      systemRoleEdition:
        enabled: true

Updating permissions for system roles should be done carefully to avoid
any unexpected behavior.

## Plugin renaming

From this version, and for the next 3.18.x versions and greater, the
name of the Elasticsearch repository component changes.  
As a consequence, the Elasticsearch repository component available on
<https://download.gravitee.io> is now  
`gravitee-*apim*-repository-elasticsearch-x.y.z.zip`

instead of  
`gravitee-repository-elasticsearch-x.y.z.zip`

This plugin has also been moved in another folder:  
<https://download.gravitee.io/#graviteeio-apim/plugins/repositories/gravitee-apim-repository-elasticsearch/>.

You can download directly the Elasticsearch repository using this
link:  
<https://download.gravitee.io/graviteeio-apim/plugins/repositories/gravitee-apim-repository-elasticsearch/gravitee-apim-repository-elasticsearch-3.18.0.zip>

## MySQL

In 3.18.0, the MySQL Java driver has been updated to 8.0.29. As a
consequence, TLS 1.0 and 1.1 are no longer supported.

# Plans data

Since this version, APIM improves plans data storage, and uses the
`plans` database collection as the unique source of plans data.

Before trusting data in `plans` collection, we have to ensure their
reliability.

In 3.10, an upgrader was introduced to fix data, but was running in
dry-run mode per default.

This upgrader will run once again during APIM 3.18 startup, with dry-run
mode disabled : if relevant, it will fix plans data in your database as
it’s explained in [this
documentation](https://docs.gravitee.io/pages/apim/3.x/installation-guide/upgrades/3.10.8/README.html#plans_anomalies_in_database)

# Breaking changes

From this version, and for the next 3.17.x versions, the name of the
Elasticsearch repository component changes.  
As a consequence, the Elasticsearch repository component available on
<https://download.gravitee.io> is now  

`gravitee-*apim*-repository-elasticsearch-x.y.z.zip`  

instead of  

`gravitee-repository-elasticsearch-x.y.z.zip`

This plugin has also been moved in another folder:
<https://download.gravitee.io/#graviteeio-apim/plugins/repositories/gravitee-apim-repository-elasticsearch/>.  

You can download directly the Elasticsearch repository using this
link:  
<https://download.gravitee.io/graviteeio-apim/plugins/repositories/gravitee-apim-repository-elasticsearch/gravitee-apim-repository-elasticsearch-3.17.3.zip>

# Breaking Changes

## Management API Documentation

From this version, APIM’s Management API documentation is now using
OpenAPI v3 format, instead of the old Swagger v2 format.

As a consequence, the specification of this API is now accessible from:

-   `{host:port}/management/openapi.yaml`

-   `{host:port}/management/openapi.json`

To allow a smooth transition, the old URL
(`{host:port}/management/swagger.json`) will remain available until
3.18.0.

## Docker Images - Enterprise Edition

To reduce the number of security vulnerabilities and ensure a better
maintenance in the future, the base Docker images used for the
Enterprise Edition have changed.

As of 3.17.0, APIM Gateway EE and Management API EE base Docker images
are moving from **Ubuntu** to **Alpine** with JDK 17. It means users
creating their own Docker images based on the one provided by
Gravitee.io might need to update their Dockerfile to make them
compatible with the Alpine distribution.

*Notes*: Community Edition users will not be affected as the base images
were already **Alpine** ones.

# Upgrade Order

In order to achieve a 0 downtime upgrade, APIM has to be upgraded before
upgrading the gateways.

On hybrid architectures where gateway bridge feature is enabled,
gateways have to be upgraded in this order :

1.  The bridge server gateway

2.  The bridge client gateway

# Deprecated Bridge Endpoints

Since bridge client rely on their own internals to fulfil API key
requests, the \`\`/apis/{api.id}/keys/{api.key}\`\` endpoint has been
deprecated on the bridge server and will be removed in a future version.

The \`\`/keys/\_search\`\` endpoint has been deprecated and replaced
with \`\`/keys/\_findByCriteria\`\` endpoint. It will be removed in a
future version.

More information on the gateway bridge feature can be found
[here](https://docs.gravitee.io/apim/3.x/apim_installguide_hybrid_deployment.html#apim_gateway_http_bridge_server).

# The mongodb upgrade scripts have been moved

For the sake of improving our documentation management process, we have
started decommissioning our
[release](https://github.com/gravitee-io/release) repository (which
contained among other things this guide).

As a part of this change, our mongodb upgrade scripts are not hosted
inside the release repository anymore and have been moved to the
[gravitee-api-management](https://github.com/gravitee-io/gravitee-api-management/tree/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts)
repository.

## MongoDB

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.17.0/api-keys-cleanup.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.17.0/api-keys-cleanup.js)  
This script performs some cleanup on the keys collection in order to
avoid issues while moving to the new model.

# Breaking changes

From this version, and for the next 3.17.x versions, the name of the
Elasticsearch repository component changes.  
As a consequence, the Elasticsearch repository component available on
<https://download.gravitee.io> is now  
`gravitee-*apim*-repository-elasticsearch-x.y.z.zip`

instead of  
`gravitee-repository-elasticsearch-x.y.z.zip`

This plugin has also been moved in another folder:  
<https://download.gravitee.io/#graviteeio-apim/plugins/repositories/gravitee-apim-repository-elasticsearch/>.

You can download directly the Elasticsearch repository using this
link:  
<https://download.gravitee.io/graviteeio-apim/plugins/repositories/gravitee-apim-repository-elasticsearch/gravitee-apim-repository-elasticsearch-3.16.5.zip>

# Breaking Change

## Docker Images - Enterprise Edition

To reduce the number of security vulnerabilities and ensure a better
maintenance in the future, the base Docker images used for the
Enterprise Edition have changed.

As of 3.16.2, APIM Gateway EE and Management API EE base Docker images
are moving from **Ubuntu** to **Alpine** with JDK 17. It means users
creating their own Docker images based on the one provided by
Gravitee.io might need to update their Dockerfile to make them
compatible with the Alpine distribution.

*Notes*: Community Edition users will not be affected as the base images
were already **Alpine** ones.

# API definition import process changes

Gravitee 3.16.0 introduces a new **crossId** in API definition, which
identifies entities across environments. This improves the API import
and promotion processes reliability.

If you are using the *API import from JSON definition* feature, we
**highly recommend** updating your API definitions by re-exporting your
API.

Otherwise, if you import an API definition which doesn’t contain
**crossId**, Gravitee will do the best-effort to import your API
definition without it.

# Deprecations

The Rest API endpoints listed below are deprecated since Gravitee
v3.0.9, and will be removed in a future version.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Deprecated Endpoint</p></td>
<td style="text-align: left;"><p>Replace With</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>POST /apis/{api.id}/import</p></td>
<td style="text-align: left;"><p>POST /apis/import</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>POST
/apis/{api.id}/import/swagger</p></td>
<td style="text-align: left;"><p>PUT
/apis/{api.id}/import/swagger</p></td>
</tr>
</tbody>
</table>

# Breaking changes

## API key and JWT plans

The security chain (the internal process that selects the executable
plan for the incoming request and applies the related security rules)
parses all active plans to select and execute the relevant one.

**Prior to this version:**

-   The API key plan was executed if the request contained an API key.

-   The JWT plan was executed if the request contained a Bearer token.

**From this version:**

The security chain has been improved to select and execute plans more
efficiently. As a result, API keys and JWT plans are now only executed
if there is an active subscription related to the provided security
token. If there is no relevant subscription, the currently parsed plans
are not executed and the security chain moves to parse the next
available plans. The process continues until the security chain parses
plans related to the provided security token and these plans are
executed, or until all available plans are parsed without a match.

Specific examples of this change are provided in the table below:

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>API plans</p></td>
<td style="text-align: left;"><p>Request</p></td>
<td style="text-align: left;"><p>Prior to this version</p></td>
<td style="text-align: left;"><p>From this version</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>API key plan + Keyless plan</p></td>
<td style="text-align: left;"><p>Request contains an invalid API
key</p></td>
<td style="text-align: left;"><p>API key plan is executed = HTTP 401
unauthorized</p></td>
<td style="text-align: left;"><p>Keyless plan is executed</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>JWT plan 1 + JWT plan 2</p></td>
<td style="text-align: left;"><p>Request contains a Bearer token valid
for JWT plan 2</p></td>
<td style="text-align: left;"><p>JWT plan 1 is executed = HTTP 401
unauthorized</p></td>
<td style="text-align: left;"><p>JWT plan 2 is executed</p></td>
</tr>
</tbody>
</table>

# Breaking changes

From this version, and for the next 3.15.x versions, the name of the
Elasticsearch repository component changes.  
As a consequence, the Elasticsearch repository component available on
<https://download.gravitee.io> is now  
`gravitee-*apim*-repository-elasticsearch-x.y.z.zip`

instead of  
`gravitee-repository-elasticsearch-x.y.z.zip`

This plugin has also been moved in another folder:  
<https://download.gravitee.io/#graviteeio-apim/plugins/repositories/gravitee-apim-repository-elasticsearch/>.

You can download directly the Elasticsearch repository using this
link:  
<https://download.gravitee.io/graviteeio-apim/plugins/repositories/gravitee-apim-repository-elasticsearch/gravitee-apim-repository-elasticsearch-3.15.9.zip>

# Breaking Change

## Docker Images - Enterprise Edition

To reduce the number of security vulnerabilities and ensure a better
maintenance in the future, the base Docker images used for the
Enterprise Edition have changed.

As of 3.15.6, APIM Gateway EE and Management API EE base Docker images
are moving from **Ubuntu** to **Alpine** with JDK 17. It means users
creating their own Docker images based on the one provided by
Gravitee.io might need to update their Dockerfile to make them
compatible with the Alpine distribution.

*Notes*: Community Edition users will not be affected as the base images
were already **Alpine** ones.

# Breaking Change

## Management API

Since they were deprecated since version 3.12.0, the Rest API endpoints
listed below have been removed.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Removed Endpoint</p></td>
<td style="text-align: left;"><p>Replace With</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>PUT
/apis/{api.id}/keys/{apiKey.key}</p></td>
<td style="text-align: left;"><p>PUT
/apis/{api.id}/subscriptions/{subscription.id}/apikeys/{apiKey.id}</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>DELETE
/apis/{api.id}/keys/{apiKey.key}</p></td>
<td style="text-align: left;"><p>DELETE
/apis/{api.id}/subscriptions/{subscription.id}/apikeys/{apiKey.id}</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>POST
/apis/{api.id}/keys/_verify?apiKey={apiKey.key}</p></td>
<td style="text-align: left;"><p>GET
/apis/{api.id}/subscriptions/_canCreate?application={application.id}&amp;key={apiKey.key}</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>DELETE
/apis/{api.id}/subscriptions/{subscription.id}/keys/{apiKey.key}</p></td>
<td style="text-align: left;"><p>DELETE
/apis/{api.id}/subscriptions/{subscription.id}/apikeys/{apiKey.id}</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>GET
/apis/{api.id}/subscriptions/{subscription.id}/keys</p></td>
<td style="text-align: left;"><p>GET
/apis/{api.id}/subscriptions/{subscription.id}/apikeys</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>POST
/apis/{api.id}/subscriptions/{subscription.id}</p></td>
<td style="text-align: left;"><p>POST
/apis/{api.id}/subscriptions/{subscription.id}/apikeys/_renew</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>POST
/apis/{api.id}/subscriptions/{subscription.id}/keys/{apiKey.key}/_reactivate</p></td>
<td style="text-align: left;"><p>POST
/apis/{api.id}/subscriptions/{subscription.id}/apikeys/{apiKey.id}/_reactivate</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>GET
/applications/{application.id}/subscriptions/{subscription.id}/keys</p></td>
<td style="text-align: left;"><p>GET
/applications/{application.id}/subscriptions/{subscription.id}/apikeys</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>POST
/applications/{application.id}/subscriptions/{subscription.id}</p></td>
<td style="text-align: left;"><p>POST
/applications/{application.id}/subscriptions/{subscription.id}/apikeys/_renew</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>DELETE
/applications/{application.id}/subscriptions/{subscription.id}/keys/{apiKey.key}</p></td>
<td style="text-align: left;"><p>DELETE
/applications/{application.id}/subscriptions/{subscription.id}/apikeys/{apiKey.id}</p></td>
</tr>
</tbody>
</table>

## Deprecation of path-based API creation

The path-based approach to create APIs will be removed in our next LTS
and has been deprecated. From now on, this mode is disabled by default
but can still be re-activated from your organization settings.

## Gateway

### Custom policy breaking changes

We’ve made huge improvements on the v3.15.0 in order to considerably
decrease the memory and cpu resources required to serve the traffic on
the gateway. For that, we rework some parts of the gateway which have
impacts on few policies we maintain and could have impact on your custom
policies you may have developed.

To summarize, here is the short list of the possible breaking changes
that could impact you:

1.  Rework the way request and response headers are internally managed

2.  Policy class loading

Details on each breaking changes are given below.

All policies maintained by Gravitee’s teams are already ready to work
with APIM v3.15.0. You may consider upgrading your custom policies if
they match one of the following cases:

-   Your policy relies on a static object instance that was previously
    instantiated per api and will become shared starting from the
    v3.15.0 of APIM

-   Your policy manipulate request or response headers and should move
    to new way to manage headers.

For each of these cases, please find the appropriate actions below.

#### Http headers

Starting from 3.15.0 we rework the way the request and response headers
are manage to make them even performant than ever.

For that reason, if your custom policy relies on headers make sure to
upgrade it by replacing `io.gravitee.common.http.HttpHeaders` with the
new headers class `io.gravitee.gateway.api.http.HttpHeaders` and migrate
the few methods where name changed a bit:

-   `new HttpHeaders()` → `HttpHeaders.create()`

-   `headers.containsKey("key")` → `headers.contains("key")`

-   `headers.get("key")` → `headers.getAll("key")` (previous get
    returned a list)

#### Policy class loading

We’ve made huge improvements on the v3.15.0 by reworking the way
policies are loaded when deploying an api on the APIM gateway. While
previously, one ClassLoader were instantiated per deployed api, we
decided to shift to a single ClassLoader instance to avoid memory
pressure, especially when deploying a lot of apis. Also, policy
instances are now reused across all the requests instead of
re-instantiate them on each call.

For that, we had to adapt some policies we support in order to make sure
they work with the new class loading and policy instantiation
mechanisms. Basically, policy instances are now considered as fully
stateless and must get rid of any state which cannot be shared across
the whole platform.

All the policies we support were already stateless. However, few changes
have been made on some of them to move from static maps to cache
instances that can be safely accessed and revoked concurrently.

**For all custom policies** you may have developed, we strongly
recommend adopting the same strategy by **avoiding usage of static
instances in your policies**. If you are unable to adapt your policy
before the migration to v3.15.0, there is still the possibility to
explicitly switch back to the previous class loading behavior by setting
the following configuration:

\`\`\`yaml classloader: legacy: enabled: true \`\`\`

We highly recommend adopting the new class loading strategy as soon as
possible as it may not be maintained in the future versions.

# Breaking changes

## Gateway

From with this version, the name of the APIM Gateway component changes.
As a consequence:

1.  The APIM Gateway component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim-gateway*-x.y.z.zip` instead of
    `gravitee-gateway-x.y.z.zip`

2.  The name of the APIM Gateway folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim-gateway*-x.y.z` instead of
    `graviteeio-gateway-x.y.z`

# Gateway bridge upgrade

On hybrid architectures where gateway bridge feature is enabled,
gateways have to be upgraded in this order :

1.  The bridge server gateway

2.  The bridge client gateway

More information on the gateway bridge feature can be found
[here](https://docs.gravitee.io/apim/3.x/apim_installguide_hybrid_deployment.html#apim_gateway_http_bridge_server).

# Elastic Search reporter plugins configuration

Before Gravitee 3.14 :

-   For ES&gt;=7, GeoIp and UserAgent plugins are enabled by default in
    Gravitee, and can’t be disabled

-   For ES&lt;7, those plugins are disabled by default and can be
    enabled in Gravitee configuration.

Since Gravitee 3.14, it behave the same way for all ES versions : GeoIp
and UserAgent plugins are be enabled by default, and can be disabled by
overriding default `reporters.elasticsearch.pipeline.plugins.ingest`
configuration.

If your Gravitee configuration enables a plugin which is not available
on your ES instance, you will get this kind of error message on gateway
startup :

`Unable to create ES pipeline 'gravitee_pipeline': status[400] response[{"error":{"root_cause":[{"reason":"No processor type exists with name [geoip]","processor_type":"geoip"}]`

And then, you have to override
`reporters.elasticsearch.pipeline.plugins.ingest` default configuration,
to remove unrelevant plugin.

# Breaking changes

## Gateway

From with this version, the name of the APIM Gateway component changes.
As a consequence:

1.  The APIM Gateway component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim-gateway*-x.y.z.zip` instead of
    `gravitee-gateway-x.y.z.zip`

2.  The name of the APIM Gateway folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim-gateway*-x.y.z` instead of
    `graviteeio-gateway-x.y.z`

# Breaking changes

## Gateway

HTTP Bridge Service is now disabled by default starting.

If you are using this feature, **do not forget to update your
settings.**

For more information, [click
here](https://docs.gravitee.io/apim/3.x/apim_installguide_hybrid_deployment.html#apim_gateway_http_bridge_server)
for documentation.

## Management Web UI

From with this version, the name of the APIM Console component changes.
As a consequence:

1.  The APIM Console component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim-console*-webui-x.y.z.zip` instead of
    `gravitee-management-webui-x.y.z.zip`

2.  The name of the APIM Console folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim-console*-ui-x.y.z` instead of
    `graviteeio-management-ui-x.y.z`

## Portal Web UI

From with this version, the name of the APIM Portal component changes.
As a consequence:

1.  The APIM Portal component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim*-portal-webui-x.y.z.zip` instead of
    `gravitee-portal-webui-x.y.z.zip`

2.  The name of the APIM Portal folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim*-portal-ui-x.y.z` instead of
    `graviteeio-portal-ui-x.y.z`

In future versions, others plugins & components might be renamed. Stay
tuned!

# Breaking changes

## Gateway

From with this version, the name of the APIM Gateway component changes.
As a consequence:

1.  The APIM Gateway component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim-gateway*-x.y.z.zip` instead of
    `gravitee-gateway-x.y.z.zip`

2.  The name of the APIM Gateway folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim-gateway*-x.y.z` instead of
    `graviteeio-gateway-x.y.z`

# Breaking changes

## Management Web UI

From with this version, the name of the APIM Console component changes.
As a consequence:

1.  The APIM Console component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim-console*-webui-x.y.z.zip` instead of
    `gravitee-management-webui-x.y.z.zip`

2.  The name of the APIM Console folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim-console*-ui-x.y.z` instead of
    `graviteeio-management-ui-x.y.z`

## Portal Web UI

From with this version, the name of the APIM Portal component changes.
As a consequence:

1.  The APIM Portal component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim*-portal-webui-x.y.z.zip` instead of
    `gravitee-portal-webui-x.y.z.zip`

2.  The name of the APIM Portal folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim*-portal-ui-x.y.z` instead of
    `graviteeio-portal-ui-x.y.z`

In future versions, others plugins & components might be renamed. Stay
tuned!

# Breaking Change

**Policy plugin `gravitee-policy-apikey` prior to version 2.3.0 is no
longer compatible with APIM 3.12.0.**

Starting in version 3.12.0, you must use `gravitee-policy-apikey` &gt;=
2.3.0.

# Default Settings Change Announcement

HTTP Bridge Service will be disabled by default starting in version
3.13.

If you are using this feature, **do not forget to update your
settings.**

For more information, [click
here](https://docs.gravitee.io/apim/3.x/apim_installguide_hybrid_deployment.html#apim_gateway_http_bridge_server)
for documentation.

# API Keys

## Model Change

Before this version, API keys contained a **key** attribute, which is
both the value of the key and also the database ID.

Starting in version 3.12.0, APIKeys now contain distinct attributes:

-   **key**: API key value

-   **ID**: API key database unique ID

The 3 Portal API endpoints listed below now expose distinct **IDs** and
**keys** in the HTTP response (previously, the key attribute was exposed
as ***ID***) :

-   GET /subscriptions/{subscription.id}

-   POST /subscriptions/{subscription.id}

-   POST /subscriptions/{subscription.id}/\_renew

## Deprecated Endpoints

The Rest API endpoints listed below are now deprecated, and will be
removed in a future version.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Deprecated Endpoint</p></td>
<td style="text-align: left;"><p>Replace With</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>PUT
/apis/{api.id}/keys/{apiKey.key}</p></td>
<td style="text-align: left;"><p>PUT
/apis/{api.id}/subscriptions/{subscription.id}/apikeys/{apiKey.id}</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>DELETE
/apis/{api.id}/keys/{apiKey.key}</p></td>
<td style="text-align: left;"><p>DELETE
/apis/{api.id}/subscriptions/{subscription.id}/apikeys/{apiKey.id}</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>POST
/apis/{api.id}/keys/_verify?apiKey={apiKey.key}</p></td>
<td style="text-align: left;"><p>GET
/apis/{api.id}/subscriptions/_canCreate?application={application.id}&amp;key={apiKey.key}</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>DELETE
/apis/{api.id}/subscriptions/{subscription.id}/keys/{apiKey.key}</p></td>
<td style="text-align: left;"><p>DELETE
/apis/{api.id}/subscriptions/{subscription.id}/apikeys/{apiKey.id}</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>GET
/apis/{api.id}/subscriptions/{subscription.id}/keys</p></td>
<td style="text-align: left;"><p>GET
/apis/{api.id}/subscriptions/{subscription.id}/apikeys</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>POST
/apis/{api.id}/subscriptions/{subscription.id}</p></td>
<td style="text-align: left;"><p>POST
/apis/{api.id}/subscriptions/{subscription.id}/apikeys/_renew</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>POST
/apis/{api.id}/subscriptions/{subscription.id}/keys/{apiKey.key}/_reactivate</p></td>
<td style="text-align: left;"><p>POST
/apis/{api.id}/subscriptions/{subscription.id}/apikeys/{apiKey.id}/_reactivate</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>GET
/applications/{application.id}/subscriptions/{subscription.id}/keys</p></td>
<td style="text-align: left;"><p>GET
/applications/{application.id}/subscriptions/{subscription.id}/apikeys</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>POST
/applications/{application.id}/subscriptions/{subscription.id}</p></td>
<td style="text-align: left;"><p>POST
/applications/{application.id}/subscriptions/{subscription.id}/apikeys/_renew</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>DELETE
/applications/{application.id}/subscriptions/{subscription.id}/keys/{apiKey.key}</p></td>
<td style="text-align: left;"><p>DELETE
/applications/{application.id}/subscriptions/{subscription.id}/apikeys/{apiKey.id}</p></td>
</tr>
</tbody>
</table>

# Repository

## MongoDB

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.12.0/api-keys-migration.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.12.0/api-keys-migration.js)  
This script adds **key** and **api** columns in api keys **keys** table.

# Breaking changes

## Management Web UI

From with this version, the name of the APIM Console component changes.
As a consequence:

1.  The APIM Console component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim-console*-webui-x.y.z.zip` instead of
    `gravitee-management-webui-x.y.z.zip`

2.  The name of the APIM Console folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim-console*-ui-x.y.z` instead of
    `graviteeio-management-ui-x.y.z`

## Portal Web UI

From with this version, the name of the APIM Portal component changes.
As a consequence:

1.  The APIM Portal component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim*-portal-webui-x.y.z.zip` instead of
    `gravitee-portal-webui-x.y.z.zip`

2.  The name of the APIM Portal folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim*-portal-ui-x.y.z` instead of
    `graviteeio-portal-ui-x.y.z`

In future versions, others plugins & components might be renamed. Stay
tuned!

# Repository

## Mongodb

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.11.1/1-event-debug-migration.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.11.1/1-event-debug-migration.js)  
This script removes the `API_ID` property for events of type `DEBUG`.

# Breaking changes

From with this version, the name of the APIM Rest APIs component
changes. As a consequence:

1.  The APIM Rest API component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim*-rest-api-x.y.z.zip` instead of
    `gravitee-management-rest-api-x.y.z.zip`

2.  The name of the APIM Rest API folder within the full distribution
    zip file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim*-rest-api-x.y.z` instead of
    `graviteeio-rest-api-x.y.z`

In future versions, others plugins & components might be renamed. Stay
tuned!

# Security update

From this version, API properties can be encrypted.

Encryption key is located in gravitee.yml of Rest APIs and gateway.

You should not use this default key, and set your own custom 32 bytes
length secret.

\`\`\`ỳml \# Encrypt API properties using this secret api: properties:
encryption: secret: vvLJ4Q8Khvv9tm2tIPdkGEdmgKUruAL6 \`\`\`

# Breaking changes

## API key and JWT plans

The security chain (the internal process that selects the executable
plan for the incoming request and applies the related security rules)
parses all active plans to select and execute the relevant one.

**Prior to this version:**

-   The API key plan was executed if the request contained an API key.

-   The JWT plan was executed if the request contained a Bearer token.

**From this version:**

The security chain has been improved to select and execute plans more
efficiently. As a result, API keys and JWT plans are now only executed
if there is an active subscription related to the provided security
token. If there is no relevant subscription, the currently parsed plans
are not executed and the security chain moves to parse the next
available plans. The process continues until the security chain parses
plans related to the provided security token and these plans are
executed, or until all available plans are parsed without a match.

Specific examples of this change are provided in the table below:

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>API plans</p></td>
<td style="text-align: left;"><p>Request</p></td>
<td style="text-align: left;"><p>Prior to this version</p></td>
<td style="text-align: left;"><p>From this version</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>API key plan + Keyless plan</p></td>
<td style="text-align: left;"><p>Request contains an invalid API
key</p></td>
<td style="text-align: left;"><p>API key plan is executed = HTTP 401
unauthorized</p></td>
<td style="text-align: left;"><p>Keyless plan is executed</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>JWT plan 1 + JWT plan 2</p></td>
<td style="text-align: left;"><p>Request contains a Bearer token valid
for JWT plan 2</p></td>
<td style="text-align: left;"><p>JWT plan 1 is executed = HTTP 401
unauthorized</p></td>
<td style="text-align: left;"><p>JWT plan 2 is executed</p></td>
</tr>
</tbody>
</table>

# Breaking changes

From this version, and for the next 3.10.x versions, the name of the
Elasticsearch repository component changes.  
As a consequence, the Elasticsearch repository component available on
<https://download.gravitee.io> is now  
`gravitee-*apim*-repository-elasticsearch-x.y.z.zip`

instead of  
`gravitee-repository-elasticsearch-x.y.z.zip`

This plugin has also been moved in another folder:  
<https://download.gravitee.io/#graviteeio-apim/plugins/repositories/gravitee-apim-repository-elasticsearch/>.

You can download directly the Elasticsearch repository using this
link:  
<https://download.gravitee.io/graviteeio-apim/plugins/repositories/gravitee-apim-repository-elasticsearch/gravitee-apim-repository-elasticsearch-3.10.15.zip>

# Breaking Change

## Docker Images - Enterprise Edition

To reduce the number of security vulnerabilities and ensure a better
maintenance in the future, the base Docker images used for the
Enterprise Edition have changed.

As of 3.10.13, APIM Gateway EE and Management API EE base Docker images
are moving from **Ubuntu** to **Alpine** with JDK 17. It means users
creating their own Docker images based on the one provided by
Gravitee.io might need to update their Dockerfile to make them
compatible with the Alpine distribution.

*Notes*: Community Edition users will not be affected as the base images
were already **Alpine** ones.

# Elastic Search reporter plugins configuration

Before Gravitee 3.10.9 :

-   For ES&gt;=7, GeoIp and UserAgent plugins are enabled by default in
    Gravitee, and can’t be disabled

-   For ES&lt;7, those plugins are disabled by default and can be
    enabled in Gravitee configuration.

Since Gravitee 3.10.9, it behave the same way for all ES versions :
GeoIp and UserAgent plugins are be enabled by default, and can be
disabled by overriding default
`reporters.elasticsearch.pipeline.plugins.ingest` configuration.

If your Gravitee configuration enables a plugin which is not available
on your ES instance, you will get this kind of error message on gateway
startup :

`Unable to create ES pipeline 'gravitee_pipeline': status[400] response[{"error":{"root_cause":[{"reason":"No processor type exists with name [geoip]","processor_type":"geoip"}]`

And then, you have to override
`reporters.elasticsearch.pipeline.plugins.ingest` default configuration,
to remove unrelevant plugin.

# Breaking changes

## Gateway

From with this version, the name of the APIM Gateway component changes.
As a consequence:

1.  The APIM Gateway component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim-gateway*-x.y.z.zip` instead of
    `gravitee-gateway-x.y.z.zip`

2.  The name of the APIM Gateway folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim-gateway*-x.y.z` instead of
    `graviteeio-gateway-x.y.z`

# Plans anomalies in database

## TLDR

In Gravitee &lt; 3.10.8, some processes have caused database
inconsistencies, regarding plans and flows.

Gravitee 3.10.8, introduces an automated process to detect and fix those
anomalies.

By default, this process will run in dry mode and won’t do any database
modification. Check the `gravitee-upgraders.log` file to see if any of
your API is concerned, and how it will be fixed.

After check, fix those database anomalies by disabling the dry mode.

## What are those database anomalies ?

In Gravitee &lt; 3.10.8, some processes have caused inconsistencies in
database, regarding plans and flows.

Concerned processes are :

-   import an API

-   promote an API

-   duplicate an API

-   rollback an API

For concerned APIs, plans and flows displayed in console doesn’t reflect
the ones runned by gateway.

## How to fix it ?

Gravitee 3.10.8, introduces an automated process to detect and fix those
anomalies.

This process will run on management API startup. By default, it will run
in *dry* mode, to detect and list anomalies without fixing them in
database.

After you checked those anomalies have to be fixed, you can disable the
*dry* mode, and restart your API to update your database.

## My APIs are concerned ?

On management API startup, you will see this trace in the console, or
the dedicated `gravitee-upgraders.log` log file.

If no anomaly was detected :

    14:19:43.171 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - Starting PlansDataFixUpgrader execution with dry-run enabled
    14:19:43.352 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - No plan data anomaly found
    14:19:43.360 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - Finishing PlansDataFixUpgrader execution

If anomalies were detected :

    14:51:50.890 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - Starting PlansDataFixUpgrader execution with dry-run enabled
    14:51:50.979 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader -
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader - ##############################################################
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader - #                           WARNING                          #
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader - ##############################################################
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader -
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader - We detected database anomalies in your plans data.
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader -
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader - THIS IS A DRY RUN. DATABASE WON'T BE UPDATED.
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader - To fix anomalies, disable the dry run mode.
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader - Below, a list of changes that would happen without dry run
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader - See related documentation : https://docs.gravitee.io/apim/3.x/apim_installguide_migration.html#upgrade_to_3_10_8
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader -
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader - ##############################################################
    14:51:50.980 [main] WARN  i.g.r.a.s.i.u.PlansDataFixUpgrader -
    14:51:50.980 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - Plans anomalies found for API "Movies" (99999999-6595-9999-8a7e-796595985132) :
    14:51:50.981 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - - Will create plan "Gold-Recreated" for API "Movies" (99999999-6595-9999-8a7e-796595985132), which is missing in plans table
    14:51:50.982 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - - Will create plan "Free-Recreated" for API "Movies" (99999999-6595-9999-8a7e-796595985132), which is missing in plans table
    14:51:50.982 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - - Will close plan "Free" (66664545-1234-1234-1234-1234567891425), cause it's absent from api definition
    14:51:51.019 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - Plans anomalies found for API "Horses" (0456455556-5465-5465-4894955554) :
    14:51:51.019 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - - Will create plan "LimitedUsage-Recreated" for API "Horses" (0456455556-5465-5465-4894955554), which is missing in plans table
    14:51:51.025 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - Plans anomalies found for API "Petstore" (121112-1211-1111-121121211) :
    14:51:51.025 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - - Will create plan "Silver-Recreated" for API "Petstore" (121112-1211-1111-121121211), which is missing in plans table
    14:51:51.058 [main] INFO  i.g.r.a.s.i.u.PlansDataFixUpgrader - Finishing PlansDataFixUpgrader execution

## How anomalies are fixed ?

This process will fix your API plans data.

But it won’t change the runtime behavior of your APIs in the gateway,
until you redeploy them manually from console.

### Some plans were considered by gateway, but were not visible in console :

They will be recreated in console, and you will see new plans appear :

-   with name suffixed by "-Recreated"

-   with description "This plan has been recreated during a data fix
    process. See documentation : …"

Those plans will be in `deprecated` state, without any subscription. It
will allow you to check those plans and their flows, and close them if
relevant.

### Some plans visible in console were not considered by gateway :

Those plans will be closed, as they were not actually used during API
runtime.

## I’m ready. How to disable the dry mode and fix data ?

To fix data in your database, turn off the dry-mode, setting the
`services.plans-data-fix-upgrader.dryRun` parameter to false. Then,
restart the management API.

## Further configuration ?

You can configure this process in gravitee.yml, for example :

    services:
      plans-data-fix-upgrader:
        enabled: true
        dryRun: true
        notifyApiOwner: false

Possible configuration keys are :

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Key</p></td>
<td style="text-align: left;"><p>Description</p></td>
<td style="text-align: left;"><p>Default value</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>enabled</p></td>
<td style="text-align: left;"><p>If set to false, the process won’t
execute</p></td>
<td style="text-align: left;"><p>true</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>dryRun</p></td>
<td style="text-align: left;"><p>If set to true, the process won’t make
any database change, but only list changes.</p></td>
<td style="text-align: left;"><p>true</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>notifyApiOwner</p></td>
<td style="text-align: left;"><p>If set to true, an email notification
will be send to the api owner for each fixed API.</p></td>
<td style="text-align: left;"><p>false</p></td>
</tr>
</tbody>
</table>

# Breaking changes

## Management Web UI

From with this version, the name of the APIM Console component changes.
As a consequence:

1.  The APIM Console component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim-console*-webui-x.y.z.zip` instead of
    `gravitee-management-webui-x.y.z.zip`

2.  The name of the APIM Console folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim-console*-ui-x.y.z` instead of
    `graviteeio-management-ui-x.y.z`

## Portal Web UI

From with this version, the name of the APIM Portal component changes.
As a consequence:

1.  The APIM Portal component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim*-portal-webui-x.y.z.zip` instead of
    `gravitee-portal-webui-x.y.z.zip`

2.  The name of the APIM Portal folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim*-portal-ui-x.y.z` instead of
    `graviteeio-portal-ui-x.y.z`

In future versions, others plugins & components might be renamed. Stay
tuned!

# Breaking changes

From this version, the name of the APIM Rest APIs component changes. As
a consequence:

1.  The APIM Rest API component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim*-rest-api-x.y.z.zip` instead of
    `gravitee-management-rest-api-x.y.z.zip`

2.  The name of the APIM Rest API folder within the full distribution
    zip file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim*-rest-api-x.y.z` instead of
    `graviteeio-rest-api-x.y.z`

In future versions, others plugins & components might be renamed. Stay
tuned!

# Repository

## Mongodb

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.10.1/1-upgrade-parameters-for-theme-console.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.10.1/1-upgrade-parameters-for-theme-console.js)  
This script upgrade default value of `theme.logo` in parameters

# Breaking changes

From with this version, the name of some components of Gravitee.io APIM
changes. As a consequence, the following plugins are renamed :

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>before 3.10.0</p></td>
<td style="text-align: left;"><p>after 3.10.0</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.mongodb-x.y.z.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.mongodb-x.y.z.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.jdbc-x.y.z.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.jdbc-x.y.z.zip</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.redis-x.y.z.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.redis-x.y.z.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.hazelcast-x.y.z.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.hazelcast-x.y.z.zip</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.gateway.bridge.http.client-x.y.z.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.gateway.bridge.http.client-x.y.z.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.gateway.bridge.http.server-x.y.z.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.gateway.bridge.http.server-x.y.z.zip</p></td>
</tr>
</tbody>
</table>

These plugins have also been moved in another folder on
<https://download.gravitee.io>. For instance, the MongoDB plugin is now
available using this link:

<https://download.gravitee.io/graviteeio-apim/plugins/repositories/gravitee-apim-repository-mongodb/gravitee-apim-repository-mongodb-3.10.0.zip>

In future versions, others plugins will be renamed. Stay tuned!

# Breaking changes

## Threat protection policies

From this version, configuration form for JSON Threat Protection Policy
and XML Threat Protection Policy changes: `null` is no longer
authorized, only `-1` is accepted for a *no limit* setting.

### Impacts

-   If some fields are set to `null` in your db, and if you want to edit
    this policy configuration through **APIM Console**, then the form
    will replace them by the default value. Please, be careful when
    updating your policy if you do not want the default values to be
    applied.

-   If some fields are set to `null` in your db, and if you want to edit
    this policy configuration through **REST API**, an error message
    will appear if you do not set an explicit value for those fields in
    your request payload.

## Management Rest API

From with this version, the name of the APIM Rest APIs component
changes. As a consequence:

1.  The APIM Rest API component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim*-rest-api-x.y.z.zip` instead of
    `gravitee-management-rest-api-x.y.z.zip`

2.  The name of the APIM Rest API folder within the full distribution
    zip file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim*-rest-api-x.y.z` instead of
    `graviteeio-rest-api-x.y.z`

In future versions, others plugins & components might be renamed. Stay
tuned!

# Breaking changes

From with this version, the name of some components of Gravitee.io APIM
changes. As a consequence, the following plugins are renamed :

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>before 3.9.3</p></td>
<td style="text-align: left;"><p>after 3.9.3</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.mongodb-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.mongodb-3.9.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.jdbc-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.jdbc-3.9.x.zip</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.redis-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.redis-3.9.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.hazelcast-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.hazelcast-3.9.x.zip</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.gateway.bridge.http.client-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.gateway.bridge.http.client-3.9.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.gateway.bridge.http.server-3.9.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.gateway.bridge.http.server-3.9.x.zip</p></td>
</tr>
</tbody>
</table>

These plugins have also been moved in another folder on
<https://download.gravitee.io>. For instance, the MongoDB plugin is now
available using this link:

<https://download.gravitee.io/graviteeio-apim/plugins/repositories/gravitee-apim-repository-mongodb/gravitee-apim-repository-mongodb-3.9.3.zip>

In future versions, others plugins will be renamed. Stay tuned!

# Important: Alert Engine

For users of Gravitee Enterprise Edition with Alert Engine, please check
your gravitee configuration to ensure that the alert engine feature is
explictly enable. Starting from this version, the alert engine connector
is disabled by default if the option `alerts.alert-engine-enabled` is
missing from the gravitee.yaml. (see
<https://docs.gravitee.io/ae/apim_installation.html#configuration>)

# Warning

**For JDBC users only**, please don’t upgrade to 3.9.0 since we detected
a critical bug in a liquibase script that could lead to data loss.  
This will be fixed in 3.9.1.  
We apologize for this inconvenience.

GitHub issue: [5711](https://github.com/gravitee-io/issues/issues/5711)

# Breaking changes

From this version, in order to propose a better swagger descriptor, all
enum values **returned** by the APIM API are in uppercase.

Lowercase and uppercase values are still accepted in incoming requests.

# Memory management

Starting from this new version, the default Xms and Xmx parameters has
been fixed to 256m. Previous value was too high and does not reflect
real memory usage for both the API Gateway and Management API.

If, for some reasons, you need to increase those default values, you can
set the `GIO_MIN_MEM` and `GIO_MAX_MEM` environment variables in your
scripts. Those variables are then "injected" into the JAVA\_OPTS during
bootstrap.

# APIM API - Tags and Tenants

This version changes permissions' scope from `ENVIRONMENT` to
`ORGANIZATION` for:

-   TAG

-   TENANT

-   ENTRYPOINT

These permissions are now readonly for the scope `ENVIRONMENT`. They
will be deleted on version 3.10. If you are using these permissions,
please update them for the scope `ORGANIZATION`.

# Repository

## Mongodb

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.9.0/1-tags-and-tenants-migration.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.9.0/1-tags-and-tenants-migration.js)  
This script adds referenceId set to *DEFAULT* and referenceType set to
*ORGANIZATION* to tags, tenants and entrypoint collections.

[/apim/3.x/mongodb/3.9.0/2-events-migration.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.9.0/2-events-migration.js)  
This script modifies events, so an event can be linked to more than one
environment.

# Breaking changes

From with this version, the name of some components of Gravitee.io APIM
changes. As a consequence, the following plugins are renamed :

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>before 3.8.6</p></td>
<td style="text-align: left;"><p>after 3.8.6</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.mongodb-3.8.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.mongodb-3.8.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.jdbc-3.8.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.jdbc-3.8.x.zip</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.redis-3.8.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.redis-3.8.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.hazelcast-3.8.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.hazelcast-3.8.x.zip</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.gateway.bridge.http.client-3.8.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.gateway.bridge.http.client-3.8.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.gateway.bridge.http.server-3.8.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.gateway.bridge.http.server-3.8.x.zip</p></td>
</tr>
</tbody>
</table>

These plugins have also been moved in another folder on
<https://download.gravitee.io>. For instance, the MongoDB plugin is now
available using this link:

<https://download.gravitee.io/graviteeio-apim/plugins/repositories/gravitee-apim-repository-mongodb/gravitee-apim-repository-mongodb-3.8.6.zip>

In future versions, others plugins will be renamed. Stay tuned!

# Repository

## Mongodb

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.8.0/1-page-acl-migration.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.8.0/1-page-acl-migration.js)  
This script replaces **excluded\_groups** by **visibility**,
**excludedAccessControls** and **accessControls** collection.

# Repository

Since 3.7, you have the ability to configure a prefix for your tables or
collections name.

Rate limit configuration has to be defined in both Gateway and
Management `gravitee.yml` files.

With this centralized configuration, you can disable the liquibase phase
of the gateway, if you do not want it to modify your dbms.

If you choose to use prefix, follow these instructions.

## Mongodb

### New installation

You just have to modify the `gravitee.yml` files of gateway and console
to configure `management.mongodb.prefix` and `ratelimit.mongodb.prefix`.
Default value is empty.

### Migrate an existing installation

Before running any script, please create a dump of your existing
database.

If you want to prefix your collections, you will have to rename them.
You can use the following script.

Check documentation at
<https://docs.gravitee.io/apim/3.x/apim_installguide_repositories_mongodb.html>

This script rename all the collections adding the `prefix` and
`rateLimitPrefix`.

For the following steps, we admit you choose this prefix: prefix\_

1.  Modify `gravitee.yml` to configure `management.mongodb.prefix` and
    `ratelimit.mongodb.prefix` if needed.

2.  Run the following script to rename your collections:
    [/apim/3.x/mongodb/3.7.0/1-rename-collections-with-prefix.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.7.0/1-rename-collections-with-prefix.js)

3.  Run your instances!

## JDBC

### New installation

You just have to modify the `gravitee.yml` files of gateway and console
to configure `management.jdbc.prefix` and `ratelimit.jdbc.prefix`.
Default value is empty.

### Migrate an existing installation

Before running any script, please create a dump of your existing
database.

If you want to prefix your tables, you will have to rename them. Check
documentation at
<https://docs.gravitee.io/apim/3.x/apim_installguide_repositories_jdbc.html>

For the following steps, we admit you choose this prefix: prefix\_

1.  Modify `gravitee.yml` to configure `management.jdbc.prefix` and
    `ratelimit.jdbc.prefix` if needed.

2.  Run the application on a new database to generate
    `prefix_databasechangelog`

3.  Replace the content of `databasechangelog` table by the generated
    one from `prefix_databasechangelog`

4.  Rename your tables following this syntax: prefix\_tablename

5.  Rename your indexes following this syntax: idx\_prefix\_indexname

6.  Rename your primary keys following this syntax: pk\_prefix\_pkname

7.  Run your instances!

# Elasticsearch

With Elasticsearch version above 7.x, `geoip` and `user_agent` plugins
are automatically enabled.

# APIM API

Two new configuration keys have been added to the `gravitee.yml` file,
they should be set with the URLs of the UI console and the management
API: \`\`\`yml console: ui: url: gravitee\_apim\_ui\_url \# TO UPDATE
WITH YOUR OWN URL api: url: gravitee\_apim\_management\_api\_url \# TO
UPDATE WITH YOUR OWN URL \`\`\`

NB: **For Gravitee Cockpit to work properly these URLs are mandatory**,
they will be used by Cockpit to interact with your APIM installation.

# Breaking changes

## Gateway

From with this version, the name of the APIM Gateway component changes.
As a consequence:

1.  The APIM Gateway component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim-gateway*-x.y.z.zip` instead of
    `gravitee-gateway-x.y.z.zip`

2.  The name of the APIM Gateway folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim-gateway*-x.y.z` instead of
    `graviteeio-gateway-x.y.z`

# Breaking changes

## Management Web UI

From with this version, the name of the APIM Console component changes.
As a consequence:

1.  The APIM Console component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim-console*-webui-x.y.z.zip` instead of
    `gravitee-management-webui-x.y.z.zip`

2.  The name of the APIM Console folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim-console*-ui-x.y.z` instead of
    `graviteeio-management-ui-x.y.z`

## Portal Web UI

From with this version, the name of the APIM Portal component changes.
As a consequence:

1.  The APIM Portal component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim*-portal-webui-x.y.z.zip` instead of
    `gravitee-portal-webui-x.y.z.zip`

2.  The name of the APIM Portal folder within the full distribution zip
    file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim*-portal-ui-x.y.z` instead of
    `graviteeio-portal-ui-x.y.z`

In future versions, others plugins & components might be renamed. Stay
tuned!

# Breaking changes

## Threat protection policies

From this version, configuration form for JSON Threat Protection Policy
and XML Threat Protection Policy changes: `null` is no longer
authorized, only `-1` is accepted for a *no limit* setting.

### Impacts

-   If some fields are set to `null` in your db, and if you want to edit
    this policy configuration through **APIM Console**, then the form
    will replace them by the default value. Please, be careful when
    updating your policy if you do not want the default values to be
    applied.

-   If some fields are set to `null` in your db, and if you want to edit
    this policy configuration through **REST API**, an error message
    will appear if you do not set an explicit value for those fields in
    your request payload.

## Management Rest API

From with this version, the name of the APIM Rest APIs component
changes. As a consequence:

1.  The APIM Rest API component available on
    <https://download.gravitee.io> is now
    `gravitee-*apim*-rest-api-x.y.z.zip` instead of
    `gravitee-management-rest-api-x.y.z.zip`

2.  The name of the APIM Rest API folder within the full distribution
    zip file (graviteeio-full-x.y.z.zip) is now
    `graviteeio-*apim*-rest-api-x.y.z` instead of
    `graviteeio-rest-api-x.y.z`

In future versions, others plugins & components might be renamed. Stay
tuned!

# Improvements

Some performance improvements have been made
([\#6066](https://github.com/gravitee-io/issues/issues/6066)). As a
consequence, the scheduled service used to automatically close expired
subscriptions now runs every hour instead of every 5 seconds

# Breaking changes

From with this version, the name of some components of Gravitee.io APIM
changes. As a consequence, the following plugins are renamed :

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>before 3.5.18</p></td>
<td style="text-align: left;"><p>after 3.5.18</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.mongodb-3.5.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.mongodb-3.5.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.jdbc-3.5.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.jdbc-3.5.x.zip</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.redis-3.5.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.redis-3.5.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.hazelcast-3.5.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.hazelcast-3.5.x.zip</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>gravitee.repository.gateway.bridge.http.client-3.5.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.gateway.bridge.http.client-3.5.x.zip</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>gravitee.repository.gateway.bridge.http.server-3.5.x.zip</p></td>
<td
style="text-align: left;"><p>gravitee.<strong>apim</strong>.repository.gateway.bridge.http.server-3.5.x.zip</p></td>
</tr>
</tbody>
</table>

These plugins have also been moved in another folder on
<https://download.gravitee.io>. For instance, the MongoDB plugin is now
available using this link:

<https://download.gravitee.io/graviteeio-apim/plugins/repositories/gravitee-apim-repository-mongodb/gravitee-apim-repository-mongodb-3.5.18.zip>

In future versions, others plugins will be renamed. Stay tuned!

# Repository

## Mongodb

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.5.14/1-fix-cors-env-vars.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.5.14/1-fix-cors-env-vars.js)  
This script migrate CORS environment variables for portal and console.
(See below).

# Breaking Changes

## Environment variables

Some environment variables have been doubled for the portal and the
console, see correspondence table:

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>before 3.5.14</p></td>
<td style="text-align: left;"><p>after 3.5.14 (for portal)</p></td>
<td style="text-align: left;"><p>after 3.5.14 (for console)</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>portal.http.cors.allow-origin</p></td>
<td
style="text-align: left;"><p>http.api.portal.cors.allow-origin</p></td>
<td style="text-align: left;"><p>X</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>console.http.cors.allow-origin</p></td>
<td style="text-align: left;"><p>X</p></td>
<td
style="text-align: left;"><p>http.api.management.cors.allow-origin</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>portal.http.cors.allow-headers</p></td>
<td
style="text-align: left;"><p>http.api.portal.cors.allow-headers</p></td>
<td style="text-align: left;"><p>X</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>console.http.cors.allow-headers</p></td>
<td style="text-align: left;"><p>X</p></td>
<td
style="text-align: left;"><p>http.api.management.cors.allow-header</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>portal.http.cors.allow-methods</p></td>
<td
style="text-align: left;"><p>http.api.portal.cors.allow-methods</p></td>
<td style="text-align: left;"><p>X</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>console.http.cors.allow-methods</p></td>
<td style="text-align: left;"><p>X</p></td>
<td
style="text-align: left;"><p>http.api.management.cors.allow-methods</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>portal.http.cors.exposed-headers</p></td>
<td
style="text-align: left;"><p>http.api.portal.cors.exposed-headers</p></td>
<td style="text-align: left;"><p>X</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>console.http.cors.exposed-headers</p></td>
<td style="text-align: left;"><p>X</p></td>
<td
style="text-align: left;"><p>http.api.management.cors.exposed-headers</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>portal.http.cors.max-age</p></td>
<td style="text-align: left;"><p>http.api.portal.cors.max-age</p></td>
<td style="text-align: left;"><p>X</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>console.http.cors.max-age</p></td>
<td style="text-align: left;"><p>X</p></td>
<td
style="text-align: left;"><p>http.api.management.cors.max-age</p></td>
</tr>
</tbody>
</table>

# Breaking Changes

## Management API

If you are using the REST API directly, please note that now these
requests need authentication:

-   
-   
-   
-   
-   
-   
-   
-   

# Repository

## Mongodb

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.5.2/1-add-DEFAULT-referenceId-in-memberships.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.5.2/1-add-DEFAULT-referenceId-in-memberships.js)  
This script add the "DEFAULT" `referenceId` for memberships with `null`
one. This bug impacts users created when using social authentication
since version 3.5.0.

# Breaking Changes

## Environment variables

Some environment variables have been doubled for the portal and the
console, see correspondence table:

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>before 3.5.0</p></td>
<td style="text-align: left;"><p>after 3.5.0 (for portal)</p></td>
<td style="text-align: left;"><p>after 3.5.0 (for console)</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>authentication.localLogin.enabled</p></td>
<td
style="text-align: left;"><p>portal.authentication.localLogin.enabled</p></td>
<td
style="text-align: left;"><p>console.authentication.localLogin.enabled</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>scheduler.tasks</p></td>
<td style="text-align: left;"><p>portal.scheduler.tasks</p></td>
<td style="text-align: left;"><p>console.scheduler.tasks</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>scheduler.notifications</p></td>
<td style="text-align: left;"><p>portal.scheduler.notifications</p></td>
<td
style="text-align: left;"><p>console.scheduler.notifications</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>reCaptcha.enabled</p></td>
<td style="text-align: left;"><p>portal.reCaptcha.enabled</p></td>
<td style="text-align: left;"><p>console.reCaptcha.enabled</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>reCaptcha.siteKey</p></td>
<td style="text-align: left;"><p>portal.reCaptcha.siteKey</p></td>
<td style="text-align: left;"><p>console.reCaptcha.siteKey</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>portal.support.enabled</p></td>
<td style="text-align: left;"><p>portal.support.enabled</p></td>
<td style="text-align: left;"><p>console.support.enabled</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>portal.userCreation.enabled</p></td>
<td style="text-align: left;"><p>portal.userCreation.enabled</p></td>
<td style="text-align: left;"><p>console.userCreation.enabled</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>portal.userCreation.automaticValidation.enabled</p></td>
<td
style="text-align: left;"><p>portal.userCreation.automaticValidation.enabled</p></td>
<td
style="text-align: left;"><p>console.userCreation.automaticValidation.enabled</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>http.cors.allow-origin</p></td>
<td style="text-align: left;"><p>portal.http.cors.allow-origin</p></td>
<td style="text-align: left;"><p>console.http.cors.allow-origin</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>http.cors.allow-headers</p></td>
<td style="text-align: left;"><p>portal.http.cors.allow-headers</p></td>
<td
style="text-align: left;"><p>console.http.cors.allow-headers</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>http.cors.allow-methods</p></td>
<td style="text-align: left;"><p>portal.http.cors.allow-methods</p></td>
<td
style="text-align: left;"><p>console.http.cors.allow-methods</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>http.cors.exposed-headers</p></td>
<td
style="text-align: left;"><p>portal.http.cors.exposed-headers</p></td>
<td
style="text-align: left;"><p>console.http.cors.exposed-headers</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>http.cors.max-age</p></td>
<td style="text-align: left;"><p>portal.http.cors.max-age</p></td>
<td style="text-align: left;"><p>console.http.cors.max-age</p></td>
</tr>
</tbody>
</table>

# Distribution

From this version, Gravitee.IO APIM is distributed with MongoDB and JDBC
plugins, as well as Hybrid HTTP plugin (gateway-bridge-http), in the
`full` ZIP.  
You no longer have to choose between the "full" or "full-jdbc" ZIP file.

# Repository

## Mongodb

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.5.01-duplicate-some-parameters-for-console.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.5.0/1-duplicate-some-parameters-for-console.js)  
This script duplicates some parameters for the console to have different
behaviors between portal and console. It also modifies the \_id of each
mongo document to add referenceId and referenceType.

# Repository

## Mongodb

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.4.0/1-update-audit-to-replace-PORTAL-with\_ORGANIZATION-and-ENVIRONMENT.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.4.0/1-update-audit-to-replace-PORTAL-with_ORGANIZATION-and-ENVIRONMENT.js)  
This script convert PORTAL audit into ENVIRONMENT audits or ORGANIZATION
audits regarding some conditions.

[/apim/3.x/mongodb/3.4.0/2-update-default-role-REVIEWER.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.4.0/2-update-default-role-REVIEWER.js)  
This script add new permissions to the default REVIEWER role.

# Repository

## Mongodb

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.3.0/1-update-users-and-identityProviders.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.3.0/1-update-users-and-identityProviders.js)  
This script replaces **referenceId** and **referenceType** with
**organizationId** for `users` and `identity_providers` collections.

[/apim/3.x/mongodb/3.3.0/2-update-json-validation-policy-scopes.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.3.0/2-update-json-validation-policy-scopes.js)  
This script replaces **REQUEST** and **RESPONSE** with
**REQUEST\_CONTENT** and **RESPONSE\_CONTENT** for json-validation
policy configuration in `apis` collections.

# Deprecation

## Management API

Starting with this version, `User` and `IdentityProvider` are now linked
to an organization and not to an environment. As a consequence, the
Management REST API has been updated. If you are using the REST API
directly, please note that you should adapt your URL for these resources
as they will no longer be accessible from version 4.x In the meantime,
these resources will be tagged as `Deprecated`.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Deprecated in 3.3.0, deleted in 4.x</th>
<th style="text-align: left;">Since 3.3.0</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/configuration/identities</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/configuration/identities</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/configuration/rolescopes</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/configuration/rolescopes</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="even">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="odd">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="even">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/search/users</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/search/users</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/user</p></td>
<td style="text-align: left;"><p>/organizations/DEFAULT/user</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/user/subscribeNewsletter</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/user/subscribeNewsletter</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/user/avatar</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/user/avatar</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/user/login</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/user/login</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/user/logout</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/user/logout</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/user/tasks</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/user/tasks</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/user/tags</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/user/tags</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/user/notifications</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/user/notifications</p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/user/tokens</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/user/tokens</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/users</p></td>
<td style="text-align: left;"><p>/organizations/DEFAULT/users</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="even">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="odd">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="even">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="odd">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="even">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="odd">
<td style="text-align: left;"></td>
<td style="text-align: left;"></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/users/registration</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/users/registration</p></td>
</tr>
<tr class="odd">
<td
style="text-align: left;"><p>/organizations/DEFAULT/environments/DEFAULT/users/registration/finalize</p></td>
<td
style="text-align: left;"><p>/organizations/DEFAULT/users/registration/finalize</p></td>
</tr>
</tbody>
</table>

# Breaking Changes

## Portal UI

The variables css of `gv-link` component has been modified to improve
the theme’s customization. Now the component uses :

-   Active border color `--gv-link-active--bdc` instead of Active border
    bottom color `--gv-link-active--bdbc`

-   Active border style `--gv-link-active--bds` instead of Active border
    bottom style `--gv-link-active--bdbs`

-   Active border width `--gv-link-active--bdw` instead of Active border
    bottom width `--gv-link-active--bdbw`

For example, if you has set `--gv-link-active--bdbw=3px`, now you should
set `--gv-link-active--bdw=0 0 3px 0`

# Docker images

All the UI based docker images (APIM Console, APIM Portal) are now using
HTTP port 8080 and HTTPS port 8443 by default to avoid the need of a
root account to use 80/443 to improve the security of our platform.

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

# Breaking changes

The `portalURL` parameter in the gravitee.yml file has been removed. It
has become useless with this issue
[\#4144](https://github.com/gravitee-io/issues/issues/4144).

As this `portalURL` stands for the former portal, it will be replaced by
the `management.url` parameter in the console settings. This parameter
will be initialized with the former `portalURL` value if it still exists
in your gravitee.yml. Otherwise, the default value of `management.url`
is <http://localhost:3000>

The `portal.url` parameter in the console settings will also have a
default value : <http://localhost:4100>

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

# Important

If you are using mongoDB, it is **strongly recommended** to run the
scripts to upgrade your database **before** starting the new version of
the gravitee REST APIs. Otherwise, you could experience data corruption
issues.

Mongo version **MUST** be at least **3.6**

# General

## Organization & Environment

In this new version Gravitee comes with a new way of managing your
environments. By default, Gravitee is configured with a first
Organization: \`\`\` organization { id: DEFAULT, name: Default
organization } \`\`\` And a first Environment in this Organization:
\`\`\` environment { id: DEFAULT, name: Default environment,
organization: DEFAULT } \`\`\`

It will allow you to manage more than one environment for each instance
of Gravitee.

# Breaking Changes

## API-Key policy

In this new version, if api-keys used to call an API is invalid or has
expired, the gateway will fail with a **401** (instead of 403 in
previous versions of Gravitee).

## Management API

If you are using the REST API directly, please note that you will have
to adapt the URL from `https://host/management/` to
`https://host/management/organizations/DEFAULT/environments/DEFAULT/`

The resource `/views/default` has been deleted since a view does not
have a **default** field anymore.

## Management UI

The actual portal has been replaced by a brand new version, with its own
location. As a consequence, the URL of the management UI has been
modified to remove the **/management** part.

For instance, to access the *Platform Overview* page, you should use
`https://host/\#!/platform` instead of
`https://host/#!/management/platform`

## Memberships, roles and role mappings

One major breaking change in this new version is the replacement of
**MANAGEMENT** and **PORTAL** scopes by **ENVIRONNMENT** and
**ORGANIZATION** scopes. It’s not just a renaming but a dispatch of
permissions among these 2 news scopes. As a consequence, all existing
memberships, roles, groups and Identity Providers role mappings should
be updated.

-   Memberhips, roles and groups have to be updated with migration
    scripts [here](#mongodb)

-   Role Mappings for Identity Providers stored in database will be
    updated with a specific upgrader. See [Upgrader](#upgrader)

-   Role mappings defined in the **gravitee.yml** file have to be
    updated with these new scopes.

Here’s a correlation table of permissions before and after migration :

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Permission Name</th>
<th style="text-align: left;">Scope Name before migration</th>
<th style="text-align: left;">Scope name after migration</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>INSTANCE</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>GROUP</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>TAG</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>TENANT</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>API</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>ROLE</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ORGANIZATION</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>APPLICATION</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>PLATFORM</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>AUDIT</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>NOTIFICATION</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>USER</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ORGANIZATION</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>MESSAGE</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>DICTIONARY</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>ALERT</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>ENTRYPOINT</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>SETTINGS</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>DASHBOARD</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>QUALITY_RULE</p></td>
<td style="text-align: left;"><p>MANAGEMENT</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>METADATA</p></td>
<td style="text-align: left;"><p>PORTAL</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>DOCUMENTATION</p></td>
<td style="text-align: left;"><p>PORTAL</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>APPLICATION</p></td>
<td style="text-align: left;"><p>PORTAL</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>VIEW</p></td>
<td style="text-align: left;"><p>PORTAL</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>TOP_APIS</p></td>
<td style="text-align: left;"><p>PORTAL</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>SETTINGS</p></td>
<td style="text-align: left;"><p>PORTAL</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>API_HEADER</p></td>
<td style="text-align: left;"><p>PORTAL</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>IDENTITY_PROVIDER</p></td>
<td style="text-align: left;"><p>PORTAL</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>CLIENT_REGISTRATION_PROVIDER</p></td>
<td style="text-align: left;"><p>PORTAL</p></td>
<td style="text-align: left;"><p>ENVIRONMENT</p></td>
</tr>
</tbody>
</table>

# Repository

## Mongodb

Before running any script, please create a dump of your existing
database.

[/apim/3.x/mongodb/3.0.0/1-collections-linked-to-environment-or-organization.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.0.0/1-collections-linked-to-environment-or-organization.js)  
This script adds new fields that refer the default environment or the
default organization.

[/apim/3.x/mongodb/3.0.0/2-roles-groups-and-memberships-migration.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.0.0/2-roles-groups-and-memberships-migration.js)  
This script migrates permission values in roles since MANAGEMENT roles
and PORTAL roles have been merged and dispatched into new ENVIRONMENT
and ORGANIZATION roles. It also updates memberships and groups by adding
or removing columns. All previous indexes for **roles** and
**memberships** will be deleted and replaced by new indexes.

[/apim/3.x/mongodb/3.0.0/3-replace-apiArray-by-unique-api.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.0.0/3-replace-apiArray-by-unique-api.js)  
This script adds a new field that refers the api and remove the api
array. All previous indexes for **plans** will be deleted and replaced
by new indexes.

[/apim/3.x/mongodb/3.0.0/4-remove-devMode.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.0.0/4-remove-devMode.js)  
This script removes the *devMode* parameter, since the legacy portal has
been replaced.

[/apim/3.x/mongodb/3.0.0/5-remove-orphan-documentation-pages.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.0.0/5-remove-orphan-documentation-pages.js)  
Due to a bug in a previous version of gravitee when importing APIs,
orphan pages may have been created. Orphan pages are all pages with a
parentId but no page with such id exists. In some situation, this can
lead to errors when accessing portal or apis documentation. You may use
this script to find and remove orphan pages.

*Note: You can make a *dry run* by commenting line 6 and uncommenting
line 5.*

[/apim/3.x/mongodb/3.0.0/6-remove-ALL-view-and-defaultView-field.js](https://raw.githubusercontent.com/gravitee-io/gravitee-api-management/master/gravitee-apim-repository/gravitee-apim-repository-mongodb/src/main/resources/scripts/3.0.0/6-remove-ALL-view-and-defaultView-field.js)  
This script removes the *All* **view**, since the legacy portal has been
replaced and the new portal does not need this default view anymore. The
script also updates existing views to remove **defaultView** field.

# Upgrader

## Identity providers

Because of the evolution of the roles and their scope, role mappings in
**Identity Providers** must be updated. To achieve this, a specific
service has been created and will be launched at APIM startup. As this
is not necessary to launch this service more than once, it can be
disabled with some configuration.

    services:
      # v3 upgrader service. Can be disabled after first launch.
      v3-upgrader:
        enabled: true

# Docker

Docker images for Gravitee.io APIM have been renamed to follow the same
conventions as the others Gravitee.io modules.

In the case of Gravitee.io APIM, all the images have been prefixed by
`-apim`.

For example, for the API gateway `graviteeio/gateway` has been replaced
by `graviteeio/apim-gateway`.

Please have a look to the documentation at:
<https://docs.gravitee.io/apim/3.x/apim_installguide_docker_images.html>
