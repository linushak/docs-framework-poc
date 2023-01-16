# Prerequisites

-   Machine up and running

-   Gravitee YUM repository added

-   Gravitee APIM REST API installed and running

-   Nginx installed

# Security group

-   open port 8084

# Instructions

1.  Install Management UI:

        sudo yum install graviteeio-apim-management-ui-3x -y

2.  Restart Nginx:

        sudo systemctl restart nginx

3.  Verify:

        sudo ss -lntp '( sport = 8084 )'

    You should see that there’s a process listening on that port.

**NOTE:** The Management UI package does not provide it’s own service.
It provides:

-   a javascript application that can be found at
    `/opt/graviteeio/apim/management-ui`

-   an Nginx configuration that can be found at
    `/etc/nginx/conf.d/graviteeio-apim-management-ui.conf`

# Next

Next is link:{{
*/apim/3.x/apim\_installation\_guide\_amazon\_portal\_ui.html* |
relative\_url }}\[installing the Gravitee APIM Portal UI\].
