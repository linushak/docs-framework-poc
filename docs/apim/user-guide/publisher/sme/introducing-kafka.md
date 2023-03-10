# Overview

The Kafka connector implements the SME Connector API in order to provide
native integration with Apache Kafka. This connector can be leveraged in
the following ways depending on your use case:

-   Ingest data by exposing an endpoint that transforms requests into
    messages that are published into an Apache Kafka topic.

image:{% link
images/apim/3.x/api-publisher-guide/sme/kafka-controller.png %}\[\]

-   Stream your Kafka events to consumers thanks to web-friendly
    protocols such as HTTP or Websocket, and provide real-time
    integration capability to your ecosystem.

image:{% link
images/apim/3.x/api-publisher-guide/sme/kafka-controller2.png %}\[\]

# Getting started

This guide will take you through creating a Kafka endpoint, describe how
to produce and consume messages and provide the details of all the
configuration options available to you.

## Prerequisites

-   You must have installed the [Kafka
    plugin^](https://download.gravitee.io/#graviteeio-apim/plugins/connectors/gravitee-connector-kafka/).
    More information on installing a plugin can be found link:{% link
    pages/apim/3.x/installation-guide/installation-guide-plugins.adoc
    %}\[here\].

-   A basic understanding of Kafka is required, this
    [link^](https://kafka.apache.org/documentation/) is a good resource
    to get you started.

## Creating a Kafka endpoint

You have the two following options when creating a Kafka endpoint:

-   You can create it via a `curl` command in API Management, or

-   You can import an API definition using the Gravitee console.

### Creating a Kafka endpoint using API Management

Use standard API Management functionality to create an API endpoint (see
link:{% link pages/apim/3.x/user-guide/publisher/create-api.adoc
%}\[here\] for more detail on creating APIs)

    curl -H "Authorization: Basic YWRtaW46YWRtaW4=" \
         -H "Content-Type:application/json;charset=UTF-8" \
         -X POST \
         -d '"proxy": {"virtual_hosts": [{"path": "/kafka"}],"strip_context_path": false,"preserve_host":false,"groups": [{"name": "default-group","endpoints": [{"backup": false,"inherit": true,"name": "default","weight": 1,"type": "kafka","target": "[YOUR_KAFKA_HOST]"}],"load_balancing": {"type": "ROUND_ROBIN"},"http": {"connectTimeout": 5000,"idleTimeout": 60000,"keepAlive": true,"readTimeout": 10000,"pipelining": false,"maxConcurrentConnections": 100,"useCompression": true,"followRedirects": false}}]},' \
         http://MANAGEMENT_API_SERVER_DOMAIN/management/organizations/DEFAULT/environments/DEFAULT/apis

Once created, you can access the Kafka connector configuration via the
console, go to your API &gt; Proxy &gt; Endpoints.

image:{% link images/apim/3.x/api-publisher-guide/sme/kafka-console1.png
%}\[\]

On the Configuration tab, configure your settings, referring to the
link:{% link
pages/apim/3.x/user-guide/publisher/sme/kafka-connector-configuration.adoc
%}\[configuration section\] for any required information.

image:{% link images/apim/3.x/api-publisher-guide/sme/kafka-console2.png
%}\[\]

Add Kafka to the default group

image:{% link images/apim/3.x/api-publisher-guide/sme/kafka-console3.png
%}\[\]

For more details on the parameters defined in this call, refer to the
link:{% link
pages/apim/3.x/user-guide/publisher/sme/kafka-connector-configuration.adoc
%}\[configuring Kafka section\].
