---
title: Event-native API Management (V4 BETA) User Guide
tags:
  - Event-native API management
  - V4 BETA API Definition
  - New in version 3.20.0
  - BETA release
---

# Event-native API Management (V4 BETA) User Guide

This document assumes you are familiar with synchronous APIs,
asynchronous APIs, and the OpenAPI specification.

Before running any of the examples on this page, work through some of
the [example use cases](v4-beta-event-native-apim-example-use-cases.md) so you
know that the event-native engine is running.

## Asynchronous APIs

In this release, you can create asynchronous APIs and connect to event
brokers and asynchronous data sources. You can configure asynchronous
API connections using the RESTful interface to the management API.

The OpenAPI specification for the management API is available at [`swagger.json`](/api-ref/apim/3.x/management-api/3.20/swagger.json) ([reference documentation](../api-reference/apim-rest-api-reference-index.md#apim-console-api-reference)). Examples of how to use the management API to configure asynchronous APIs can be found in the [Gravitee Postman Collections](https://www.postman.com/gravitee-io/workspace/gravitee-public-workspace/overview), which are described in [example use cases](event_native_apim_example_use_cases.md).

The management API is in beta and it may change.

## Entrypoints and endpoints

An *entrypoint* is how an end user connects to the Gravitee Gateway. An
*endpoint* is how the Gravitee Gateway connects to the source of data.

The following types of entrypoints are available:

- SSE (Server-Sent Events)
- SSE advanced (Enterprise Edition only)
- WebSocket
- HTTP GET
- HTTP POST
- Webhook
- Webhook advanced (Enterprise Edition only)

For more information about these entrypoints, see [HTTP POST and HTTP GET entrypoints](v4-beta-event-native-apim-introduction.md#http-post-and-http-get-entrypoints) and [WebSocket and SSE entrypoints](v4-beta-event-native-apim-introduction.md#websocket-and-sse-entrypoints).

The following types of endpoints are available:

- Kafka
- Kafka advanced (Enterprise Edition only)
- MQTT
- MQTT advanced (Enterprise Edition only)

## How to create a V4 BETA asynchronous API

The [Gravitee V4 BETA Postman Collection](https://www.postman.com/gravitee-io/workspace/gravitee-public-workspace/overview) contains several examples of how to create and test an asynchronous API using the event-native V4 BETA API definition and [the new V4 BETA policy execution engine](v4-beta-new-policy-execution-engine-introduction.md).

For example, to create an HTTP POST entrypoint that connects to a Kafka endpoint, send a POST request to `{{management_host}}/management/organizations/DEFAULT/environments/DEFAULT/v4/apis/`, where `{{management_host}}` is the host for the management API, with the following message body:

```
    {
        "name": "Data Ingestion to Kafka",
        "apiVersion": "1.0",
        "definitionVersion": "4.0.0",
        "type": "async",
        "description": "Data Ingestion to Kafka",
        "listeners": [
            {
                "type": "http",
                "paths": [
                    {
                        "path": "/data/ingestion/kafka"
                    }
                ],
                "entrypoints": [
                    {
                        "type": "http-post",
                        "configuration": {
                            "requestHeadersToMessage": false
                        }
                    }
                ]
            }
        ],
        "endpointGroups": [
            {
                "name": "default",
                "type": "kafka",
                "endpoints": [
                    {
                        "name": "default",
                        "type": "kafka",
                        "weight": 1,
                        "inheritConfiguration": false,
                        "configuration": {
                            "bootstrapServers": "kafka:9092",
                            "topics" : ["demo"],
                            "consumer" : {
                                "enabled": false
                            },
                            "producer": {
                                "enabled": true
                            }
                        }
                    }
                ]
            }
        ],
        "flows": [
            {
                "name": "",
                "selectors": [],
                "request": [],
                "response": [],
                "subscribe": [],
                "publish": [],
                "enabled": true
            }
        ]
    }
```

## Quality of Service

When working with asynchronous APIs, quality of service is important.
Quality of service defines the guaranteed level of message delivery. For
example, a quality of service of "none" means that a given message might
be delivered zero, one, or several times. A quality of service of
"at-most-once" means that a given message will be delivered zero or one
times, with no duplication.

A higher quality of service could lead to lower system performance
depending on the endpoint chosen.

The quality-of-service levels are described in the following table.

<table>
<caption>Table Quality of service levels</caption>
<colgroup>
<col style="width: 20%" />
<col style="width: 80%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Level</p></td>
<td style="text-align: left;"><p>Description</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>None</p></td>
<td style="text-align: left;"><p>A given message might be delivered
zero, one, or many times. This level allows high throughput and good
performance but without guaranteed delivery. After failure or
disconnection, the client will only receive messages sent after
reconnection.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Auto (0 or N)</p></td>
<td style="text-align: left;"><p>A given message might be delivered
zero, one, or many times. This level allows a trade-off between
performance and delivery guarantee. Delivery is highly dependent on the
capabilities supported by the endpoint connector. In case of failure or
disconnection, after reconnection the client will resume, if possible,
from a previously saved state, although duplication of messages could
potentially exist.</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>At-Most-Once (0 or 1)</p></td>
<td style="text-align: left;"><p>A given message might be delivered zero
times or once without any duplication. Depending on the capabilities of
the entrypoint connector, performance could be degraded.</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>At-Least-Once (1 or N)</p></td>
<td style="text-align: left;"><p>A given message is delivered once or
many times. This level gives a good balance between guaranteed delivery
and performance when compared to At-Most-Once, especially when the
entrypoint connector is not able to resume message streams after
failure.</p></td>
</tr>
</tbody>
</table>

### Setting quality of service

You can set quality of service levels with the `qos` object in the
`entrypoints` object, as shown in the following example. See the [`swagger.json`](/api-ref/apim/3.x/management-api/3.20/swagger.json) definition of the Management API for a list of possible `qos` values you can specify.

```
  "entrypoints": [
    {
      "type": "sse",
      "qos": "none",
      "configuration": {
        "heartbeatIntervalInMs": 5000,
        "metadataAsComment": false,
        "headersAsComment": false
      }
    }
  ]
```

### Compatibility

Not all levels of quality of service work with every entrypoint /
endpoint combination. The following table shows how they can be used.

<table>
<caption>Table Quality of service compatibility matrix</caption>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>Entrypoint</p></td>
<td style="text-align: left;"><p>MQTT5 endpoint</p></td>
<td style="text-align: left;"><p>MQTT5 advanced endpoint</p></td>
<td style="text-align: left;"><p>Kafka endpoint</p></td>
<td style="text-align: left;"><p>Kafka advanced endpoint</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>SSE</p></td>
<td style="text-align: left;"><p>At-Least-Once, At-Most-Once</p></td>
<td style="text-align: left;"><p>At-Least-Once, At-Most-Once</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
<td style="text-align: left;"><p>None, Auto, At-Least-Once,
At-Most-Once</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>SSE advanced</p></td>
<td style="text-align: left;"><p>At-Least-Once, At-Most-Once</p></td>
<td style="text-align: left;"><p>At-Least-Once, At-Most-Once</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
<td style="text-align: left;"><p>None, Auto, At-Least-Once,
At-Most-Once</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>HTTP POST</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>HTTP GET</p></td>
<td style="text-align: left;"><p>Auto</p></td>
<td style="text-align: left;"><p>Auto</p></td>
<td style="text-align: left;"><p>Auto</p></td>
<td style="text-align: left;"><p>Auto, At-Least-Once,
At-Most-Once</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Websocket</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>Webhook</p></td>
<td style="text-align: left;"><p>At-Least-Once, At-Most-Once</p></td>
<td style="text-align: left;"><p>At-Least-Once, At-Most-Once</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
<td style="text-align: left;"><p>None, Auto, At-Least-Once,
At-Most-Once</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>Webhook advanced</p></td>
<td style="text-align: left;"><p>At-Least-Once, At-Most-Once</p></td>
<td style="text-align: left;"><p>At-Least-Once, At-Most-Once</p></td>
<td style="text-align: left;"><p>None, Auto</p></td>
<td style="text-align: left;"><p>None, Auto, At-Least-Once,
At-Most-Once</p></td>
</tr>
</tbody>
</table>


## Policies

Policies are steps in the gateway execution chain. A policy guarantees that a given business rule will be fulfilled during processing.

Policies can be set on request, response, subscribe, or publish phases. The following example shows how to set a policy on a subscribe phase.

```
  "subscribe": [
    {
      "name": "Message filtering",
      "description": "Apply filter to messages",
      "enabled": true,
      "policy": "message-filtering",
      "configuration": {
        "filter": "{#message.headers.foo == #subscription.metadata['bar']}"
      }
    }
  ]
```

For an example, see *04 - Event Consumption - Webhook* &gt; *Webhook Messaging Filtering* &gt; *Create API* in the [Gravitee V4 BETA Postman Collection](https://www.postman.com/gravitee-io/workspace/gravitee-public-workspace/overview).

## Use cases

The [Gravitee V4 BETA Postman Collection](https://www.postman.com/gravitee-io/workspace/gravitee-public-workspace/overview) contains several examples of how end users can work with your asynchronous APIs. Some examples are described on [Event consumption](event_native_apim_example_use_cases.md#event_consumption).
