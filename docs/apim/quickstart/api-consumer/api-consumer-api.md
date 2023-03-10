= Consuming an API with APIM API
:page-sidebar: apim_3_x_sidebar
:page-permalink: apim/3.x/apim_quickstart_consume_api.html
:page-folder: apim/quickstart
:page-layout: apim3x

== Overview

This guide walks you through creating your first application and subscribing to your first API with APIM API. For a brief overview of how to set up your first API, see the *Publish your first API* section of the Quick Start Guide.

NOTE: APIM includes several ways to access and secure an API, as described in (link:{{ '/apim/3.x/apim_publisherguide_plans_subscriptions.html' | relative_url }}[API Publisher Plans and subscriptions]).
In this example, we will access an API using an link:{{ '/apim/3.x/apim_policies_apikey.html' | relative_url }}[API Key].
Only trusted applications can access the API data by requesting an API Key.

== Create your application and subscribe to an API

Create application request::
[source]
----
curl -H "Authorization: Basic YWRtaW46YWRtaW4=" \
     -H "Content-Type:application/json;charset=UTF-8" \
     -X POST \
     -d '{"name":"My first Application","type":"Web","description":"Web client for Gravitee.io Echo API"}' \
     http://MANAGEMENT_API_SERVER_DOMAIN/portal/environments/DEFAULT/applications
----

Subscribe to API request::
[source]
----
curl -H "Authorization: Basic $lmA_AUTH" \
     -H "Content-Type:application/json;charset=UTF-8" \
     -X POST \
     -d '{"application":"[APPLICATION_ID]","plan":"[PLAN_ID]"' \
     http://MANAGEMENT_API_SERVER_DOMAIN/portal/environments/DEFAULT/subscriptions
----

For more information, see the complete link:{{ '/apim/3.x/apim_installguide_rest_apis_documentation.html' | relative_url }}[Rest API documentation].
