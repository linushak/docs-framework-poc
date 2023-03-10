= Test your API
:page-sidebar: apim_3_x_sidebar
:page-permalink: apim/3.x/apim_quickstart_consume_test.html
:page-folder: apim/quickstart
:page-layout: apim3x

Now that you have created your application, you can go ahead and obtain your API key.

. Click *Applications* in the top menu.
. Click *My subscriptions* in the sub-menu.
+
image::{% link images/apim/3.x/quickstart/consume/graviteeio-create-first-app-9.png %}[]

. Select your application in the list on the left.
. Select the API in the list on the right.
. Copy the `curl` command at the bottom of the page.
+
[IMPORTANT]
====
By default, the host in the command is `https://api.company.com`. You need to change this value in the *Sharding Tags* section of the Management UI settings.

image::{% link images/apim/3.x/quickstart/consume/graviteeio-settings-sharding-tags.png %}[]
====
+
You can use your API Key by setting the HTTP Header `X-Gravitee-Api-Key` or using the request query parameter `api-key`.
+
[source]
----
curl http://GATEWAY_SERVER_DOMAIN/myfirstapi \
     -H "X-Gravitee-Api-Key:<your-api-key>"
----
+
The Gravitee.io Echo API data is returned successfully.

You can now test API requests, as described in the https://github.com/gravitee-io/gravitee-sample-apis/blob/master/gravitee-echo-api/README.md[Gravitee.io Echo API documentation].
