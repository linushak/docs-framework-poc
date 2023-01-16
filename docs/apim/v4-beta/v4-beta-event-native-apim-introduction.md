---
title: Event-native API Management (V4 BETA)
tags:
  - Event-native API management
  - V4 BETA API Definition
  - New in version 3.20.0
  - BETA release
---

# Event-native API Management (V4 BETA)

## Event-driven asynchronous APIs

Most developers are familiar with synchronous APIs, where the client
sends a request to a server, and the server sends a response back. Every
time the client needs new data, it has to send a request. You can think
of synchronous APIs as a *client pull* model. RESTful APIs are a type of
synchronous API.

In contrast, asynchronous APIs are event-driven - the initial request
opens a connection and data (responses) is received back as and when it
becomes available, where certain events would trigger the responses.
Asynchronous APIs also allow you to stream data - a common use case in
banking and finance systems and applications, as well as many other
domains. Asynchronous APIs can use callbacks (such as synchronous API
webhooks) if the requested data is not available at the time of the
request. You can think of asynchronous APIs as a ‘server push’ model.
AsyncAPIs are a type of asynchronous API.

## Gravitee’s event-native API management

With the rise of cloud computing, many vendors started to build their
solutions for the cloud. Rather than taking on-premises software and
converting it to work as SaaS, it was built from the ground to to be
cloud-based. These solutions are said to be cloud-native.

Event-native API management is similar. Rather than taking a synchronous
API management solution and converting it to handle event-driven APIs,
an event-native API management solution is built from the ground up to
handle event-driven APIs.

Gravitee’s API management solution can run in event-native mode, and it
can support all asynchronous use cases, such as streaming or
event-driven APIs. Of course, Gravitee’s API management solution also
supports synchronous use cases.

Gravitee can act as a bridge between synchronous and asynchronous APIs.

For example, Gravitee can subscribe to a Kafka topic and then allow
filtered HTTP GET subscriptions from clients as shown in the following
diagram.

![Event-native API Management - Gateway](/images/apim/3.x/event-native/event-native-api-management-gateway.png "Gateway")

## BETA Features

The following features are available in the BETA release.

### HTTP POST and HTTP GET entrypoints

The HTTP POST and HTTP GET entrypoints are Community Edition (OSS)
plugins that enable external clients to publish and receive data via
standard HTTP POST / HTTP GET requests, and ease the ingestion of data
into event-oriented backends like Kafka.

They are available as separate plugins you can download from the
[entrypoints plugin download
page](https://download.gravitee.io/#graviteeio-apim/plugins/entrypoints/).

With the HTTP POST workflow, a client application running on HTTP can
post content to the Gravitee Gateway. The Gateway can then take that
content and push it over to Kafka as a message that Kafka can ingest.
The Gravitee Gateway acts as a protocol mediation layer in this context.
This enables API owners to quickly set up a sync-to-async integration.

The diagram below shows the workflow for this use case:

![Event-native API Management - HTTP POST](/images/apim/3.x/event-native/event-native-api-management-use-case-http-post.png "HTTP POST")

The HTTP POST entrypoint enables you to push messages to any supported
event broker via a "sync call" (post) - it can be used in combination
with specific Asynchronous API endpoints in different ways, depending on
what publish and subscribe mode actions are possible between the two
when using a connector.

### WebSocket and SSE entrypoints

The Server-Sent Events (SSE) and WebSocket entrypoints are available as
separate plugins you can download from the [entrypoints plugin download
page](https://download.gravitee.io/#graviteeio-apim/plugins/entrypoints/).
Please note that you need an Enterprise Edition (EE) license to use the
SSE Advanced entrypoint capabilities.

This feature enables you to front your event-driven backend - currently
only using Kafka or the MQTT5 connectors - with Websocket or Server-Sent
Events (SSE) so that API consumers can access events from the Kafka
backend via one of these more consumer-friendly protocols.

For example, if an API consumer cannot connect to a native Kafka
instance due to technical limitations (for example, if they cannot
implement a Kafka client themselves), Kafka topics can be made available
to that consumer via a more consumer-friendly protocol such as SSE or
Websocket.

The diagram below shows the workflow for this use case:

![Event-native API Management - Streaming](/images/apim/3.x/event-native/event-native-api-management-use-case-event-consumption-streaming.png "Streaming")

This feature enables you to potentially cover use cases in the fields of
Event-Driven Architecture (EDA) and Internet of Things (IoT) without the
Gateway and API Management components becoming a bottleneck.

In comparison to the [HTTP POST entrypoint use
case](#http_post_and_http_get_entrypoints) using Kafka (where the HTTP
POST method is just about sending information from the client app to
Kafka), with Websocket it is possible for the client app to send and
receive information from Kafka as well. SSE can consume information from
Kafka.

### Webhook entrypoint

This is a feature that enables you to front your backend with a
[Webhook^](https://en.wikipedia.org/wiki/Webhook). It has CE/OSS and EE
versions - Webhook, and Webhook Advanced, respectively. Both variants
are available as part of a separate plugin you can download from the
[entrypoints plugin download
page](https://download.gravitee.io/#graviteeio-apim/plugins/entrypoints/).
Please note that you need an Enterprise Edition (EE) license to use the
Webhook Advanced entrypoint capabilities.

With Webhook support, an API consumer subscribes to the Webhook API,
which basically indicates to the Gateway to listen for specific Kafka
messages and then call the consumer to let them know that an expected
event has occurred. This communication is performed via Webhook, however
it is always up to the Gateway to push the events or messages to the
consumer.

The diagram below shows the workflow for this use case:

![Event-native API Management - Event Consumption - Webhook](/images/apim/3.x/event-native/event-native-api-management-use-case-event-consumption-webhook.png "Event Consumption - Webhook")

## Security

Gravitee can still provide the same security as in previous versions.
You can secure access using an API key, JWT, or OAuth.
