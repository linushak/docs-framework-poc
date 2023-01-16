# Overview

This section explains how to set up your environment to start
contributing to APIM.

# Prerequisites

You will need the following tools installed on your computer:

-   Java (JDK &gt;= 11)

-   Maven

-   Docker

-   NPM (preferably NVM)

# Get the project and prepare your workspace

Clone the project in your workspace  

<!-- -->

    git clone https://github.com/gravitee-io/gravitee-api-management

Build APIM Management API and Gateway  

<!-- -->

    # before 3.18.0-SNAPSHOT
    mvn -pl '!gravitee-apim-console-webui, !gravitee-apim-portal-webui' clean install -T 2C

    # starting from 3.18.0-SNAPSHOT, UIs projects are not managed by Maven anymore.
    mvn clean install -T 2C

You can use `-Dskip.validation=true` to skip license validation and
prettier checks.

This command will build create a `distribution` folder in the `target`
folder of each module. These folders contain a full distribution of
Management API and Gateway, with default plugins. These `distribution`
folder should be used as the `gravitee.home` environment variable

Prepare APIM Console UI and Portal UI  
Run `npm install` from the
`gravitee-api-management/gravitee-apim-console-webui` and
`gravitee-api-management/gravitee-apim-portal-webui` directories.

you can use `nvm use` to switch to the appropriate version of npm to
build the UIs.

## Run Prerequisites

Before starting APIM Management API and Gateway, you need to start
MongoDB and ElasticSearch.  
You can, for instance, use docker.

MongoDB  

<!-- -->

    docker run -p 27017:27017 --name local-mongo -d mongo:3

ElasticSearch  

<!-- -->

    docker run -d --name local-es7 -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.7.0

## Run Configuration

### APIM Gateway (gravitee-apim-gateway)

CLI Version  
Run `./gravitee` from the `${GRAVITEE_HOME}/bin` directory.

`${GRAVITEE_HOME}` refers to the `target/distribution` folder created
before.

IntelliJ configuration  
Create a new Run configuration in IntelliJ:

1.  Click **Run → Edit configurations → ✚ → Application**.

2.  Name it as required.

3.  Choose **Use classpath of module**:
    `gravitee-apim-gateway-standalone-container`.

4.  Select **Main class**:
    `io.gravitee.gateway.standalone.GatewayContainer`.

5.  In the VM options, add the following (change the path to point to
    your project):

        -Dgravitee.home="/home/user/dev/gravitee-api-management/gravitee-apim-gateway/gravitee-apim-gateway-standalone/gravitee-apim-gateway-standalone-distribution/target/distribution"

### APIM Management API (gravitee-apim-rest-api)

CLI Version  
Run `./gravitee` from the `${GRAVITEE_HOME}/bin` directory.

`${GRAVITEE_HOME}` refers to the `target/distribution` folder created
before.

IntelliJ configuration  
Create a new Run configuration in IntelliJ:

1.  Click **Run → Edit configurations → ✚ → Application**.

2.  Name it as required.

3.  Choose **Use classpath of module**:
    `gravitee-apim-rest-api-standalone-container`.

4.  Select **Main class**:
    `io.gravitee.rest.api.standalone.GraviteeApisContainer`.

5.  In the VM options, add the following (change the path to point to
    your project):

<!-- -->

    -Dgravitee.home="/home/user/dev/gravitee-api-management/gravitee-apim-rest-api/gravitee-apim-rest-api-standalone/gravitee-apim-rest-api-standalone-distribution/target/distribution"

### APIM Console (gravitee-apim-console-webui)

CLI Version  
Run `npm run serve` from the
`gravitee-api-management/gravitee-apim-console-webui` directory to start
the UI.

IntelliJ configuration  
Create a new Run configuration in IntelliJ:

1.  Click **Run → Edit configurations → ✚ → npm**.

2.  Name it as required.

3.  Choose **package.json:
    gravitee-api-management/gravitee-apim-console-webui/package.json**.

4.  Select **Command: run**.

5.  Select **Script: serve**.

To `npm install`, you can duplicate this configuration and choose
**Command &gt; Install**.

### APIM Portal (gravitee-apim-portal-webui)

CLI Version  
Run `npm run serve` from the
`gravitee-api-management/gravitee-apim-portal-webui` directory to start
the UI.

IntelliJ Configuration  
Create a new Run configuration in IntelliJ:

1.  Click **Run → Edit configurations → ✚ → npm**.

2.  Name it as required.

3.  Choose **package.json:
    gravitee-api-management/gravitee-apim-portal-webui/package.json**.

4.  Select **Command: run**.

5.  Select **Script: serve**.

To `npm install`, you can duplicate this configuration and choose
**Command &gt; Install**.
