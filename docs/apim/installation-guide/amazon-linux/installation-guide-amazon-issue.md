# Overview

There is currently a known issue in the Portal UI configuration. After
installation the `baseURL` in
`/opt/graviteeio/apim/portal-ui/assets/config.json` is incorrect, as
shown here

image::{% link
images/apim/3.x/installation/amazon-known-issues/portal-ui-known-issue.png
%}\[incorrect baseURL in Portal UI configuration\]

**NOTE:** Obviously your actual IP will differ from the one shown in
this example.

# Fix

1.  Remove the <http://localhost:8083> from the baseURL

        sudo perl -pi -e 's/"baseURL": "http:\/\/localhost:8083/"baseURL": "/g' /opt/graviteeio/apim/portal-ui/assets/config.json

2.  Restart Nginx:

        sudo systemctl restart nginx
