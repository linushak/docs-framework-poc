---
title: Gravitee Kubernetes Operator (GKO)
tags:
  - Gravitee Kubernetes Operator
  - GKO
  - Introduced in version 3.19.0
  - BETA release
  - K8s
---

# Gravitee Kubernetes Operator (GKO)

## Overview

APIM 3.19.0 has introduced the BETA release of the Gravitee Kubernetes Operator (GKO) - a new technical component designed to be deployed on an existing APIM-ready Kubernetes Cluster. It can also be deployed on a local cluster for testing purposes.

You can use the GKO to define, deploy, and publish APIs to your API Portal and API Gateway and to manage Custom Resource Definitions (CRDs) as part of the process.

The GKO also enables you to create reusable [API resources](../user-guide/publisher/resources/resources-overview.md) by applying the [`ApiResource` custom resource definition](apim-kubernetes-operator-user-guide-reusable-resources.md). This enables you to define resources such as cache or authentication providers once only and maintain them in a single place, and then reuse them in multiple APIs - any further updates to such a resource will be automatically propagated to all APIs containing a reference to that resource.

In future releases, the GKO will support additional functionality to enable the following:

- Using the GKO as an Ingress Controller for deploying Ingresses to an API Gateway.
- Deploying Gravitee products (API Management, Access Management, Alert Engine).
- Improving automation processes through covering CICD aspects when using Kubernetes with APIM.
- Managing most API Management resources without directly relying on the Console or on the Management API.

## Rationale

When it comes to Gravitee deployment, there are two main components that can be deployed, as follows:

1. The APIs and applications around those APIs.
2. The actual API Gateway and the Management Console itself.

An increasing number of Gravitee users have already been implementing an Infrastructure-as-code (IAC) practice using Gravitee.

To support IAC-based use cases, Gravitee should enable users to handle Gravitee platform deployment ???as code??? by performing all the deployment types of actions below without ever having to use an UI:

- Push/deploy APIs to the API Gateway.
- Test the APIs.
- Promote the APIs across different environments - Test, UAT, Dev, Prod, and so on.

Up until now, Gravitee customers have been deploying APIs using the following two main approaches:

1. **Using the Gravitee Console and UI.** Gravitee comes with an easy-to-use, self-serve UI that is often used for development. This is backed by a backend service that is a part of the Gravitee web application.
2. **Using REST APIs.** Every action in the Gravitee UI de facto represents a REST API with a JSON payload. This is all documented using an API spec. As a result, everything users can do in the UI can be done via REST API calls backed by JSON files. A lot of users would use tools and systems like GitLab, Jenkins, Bitbucket, or GitHub Actions, for example, to manage everything as JSON files. An API definition in Gravitee is also a JSON file that explains what the endpoints are, what the protections are, and so on.

While the REST API method is compatible with an IAC approach, there has been feedback from many Gravitee users who are going "Kubernetes-native" that they would prefer to be able to deploy APIs and the Gravitee APIM Gateway and Console via [Custom Resource Definitions (CRDs)](apim-kubernetes-operator-definitions.md).

The Gravitee Kubernetes Operator has made all this possible in APIM version 3.19.0.

## How it works

If you deploy APIs in a Kubernetes cluster, you can describe your API as an API extension of Kubernetes using CRDs. This approach removes the need to deploy by relying on the Console/UI or the REST API - when you deploy natively to your K8s cluster, there is an operator there that can deploy the API to your API Gateway without relying on a UI or REST API. This is powered by the Kubernetes API and the Gravitee Kubernetes Operator.

## Learn more

You can find more detailed information about the Gravitee Kubernetes Operator in the following sections:

- [Architecture](apim-kubernetes-operator-architecture.md)
- [Quick Start](apim-kubernetes-operator-quick-start.md)
- [Installation and deployment](apim-kubernetes-operator-installation.md)
- [User Guide](apim-kubernetes-operator-user-guide.md)
- [API reference](apim-kubernetes-operator-api-reference.md)
