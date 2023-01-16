# Prerequisites

-   Machine up and running

-   Gravitee YUM repository added

-   Gravitee APIM REST API installed and running

-   Nginx installed

# Security group

-   open port 8085

# Instructions

1.  Install Portal UI:

        sudo yum install graviteeio-apim-portal-ui-3x -y

2.  Restart Nginx:

        sudo systemctl restart nginx

3.  Fix an issue

    There is a known issue with the Portal UI configuration. You can
    find a fix link:{{
    */apim/3.x/apim\_installation\_guide\_amazon\_issue.html* |
    relative\_url }}\[here\].

4.  Verify:

        sudo ss -lntp '( sport = 8085 )'

    You should see that there’s a process listening on that port.

**NOTE:** The Portal UI package does not provide it’s own service. It
provides:

-   a javascript application that can be found at
    `/opt/graviteeio/apim/portal-ui`

-   an Nginx configuration that can be found at
    `/etc/nginx/conf.d/graviteeio-apim-portal-ui.conf`

**Congratulations**, you have a fully functional Gravitee APIM!
