= Install APIM Console
:page-sidebar: apim_3_x_sidebar
:page-permalink: apim/3.x/apim_installguide_management_ui_install_zip.html
:page-folder: apim/installation-guide/with-zip
:page-description: Gravitee.io API Management - Management UI - Installation with .zip
:page-keywords: Gravitee.io, API Platform, API Management, API Gateway, oauth2, openid, documentation, manual, guide, reference, api
:page-layout: apim3x

== Prerequisites

Your environment must meet the requirements listed below before you install APIM Console.

NOTE: Before you begin, ensure APIM API is installed and running.

=== Browsers

APIM Console is supported with the two most recent versions of all modern internet browsers.

== Download and extract the `.zip` archive

You can download the binaries https://gravitee.io/downloads/api-management[here, window=\"_blank\"] or from the https://download.gravitee.io/graviteeio-apim/distributions/graviteeio-full-{{ site.products.apim._3x.version }}.zip[Gravitee Downloads page, window=\"_blank\"].

[source,bash]
[subs="attributes"]
$ curl -L https://download.gravitee.io/graviteeio-apim/distributions/graviteeio-full-{{ site.products.apim._3x.version }}.zip -o gravitee-standalone-distribution-{{ site.products.apim._3x.version }}.zip

Once you have downloaded the archive, extract the `graviteeio-apim-console-ui-xxx` directory and place it in the required location.

[source,bash]
[subs="attributes"]
$ unzip gravitee-standalone-distribution-{{ site.products.apim._3x.version }}.zip

== Deploy or run APIM Console

=== Deploy
APIM Console is a client-side only AngularJS application and can be deployed on any HTTP server, such as https://httpd.apache.org/[Apache] or http://nginx.org/[Nginx].

=== Run with Python

[source,bash]
[subs="attributes"]
$ cd graviteeio-apim-console-ui-{{ site.products.apim._3x.version }}
$ python3 -m http.server
$ Serving HTTP on 0.0.0.0 port 8000 ...

=== Run with Node.js

[source,bash]
[subs="attributes"]
$ npm install http-server -g
$ cd graviteeio-apim-console-ui-{{ site.products.apim._3x.version }}
$ http-server
