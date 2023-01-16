<span class="label label-version">New in version 3.19.0</span> <span
class="label label-version">BETA release</span>

# About Gravitee Kubernetes Operators

A [Kubernetes
operator^](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)
is a method of packaging, deploying, and managing a Kubernetes
application. A Kubernetes application is both deployed on Kubernetes and
managed using the Kubernetes API and `kubectl` tooling.

In this context, a Kubernetes operator is an application-specific
controller that extends the functionality of the Kubernetes API to
create, configure, and manage application instances.

# Architecture overview

The current functionality of the Gravitee Kubernetes Operator (GKO)
allows for three main deployment scenarios, as described below.

To learn how to deploy GKO on a remote cluster, see the link:{{
*/apim/3.x/apim\_kubernetes\_operator\_installation\_cluster.html* |
relative\_url }}\[Remote cluster deployment\] section.

## Standard deployment

In the standard deployment scenario, the Management API and the API
Gateway are deployed in the same Kubernetes cluster.

With this workflow, the GKO listens for link:{{
*/apim/3.x/apim\_kubernetes\_operator\_definitions.html* | relative\_url
}}\[Custom Resource Definitions (CRDs\]. For each custom resource, an
API is pushed to the Management API using the import endpoint. The API
Gateway deploys the APIs accordingly.

The following diagram illustrates the standard deployment architectural
approach:

image:{% link
/images/apim/3.x/kubernetes/gko-architecture-1-standard.png %}\[\]

## Deployment on multiple clusters

In this scenario, the assimption is that both of the following
requirements should be met:

1.  The user manages multiple Kubernetes clusters with a different set
    of APIs for each cluster.

2.  All APIs are managed using a single API Console.

To make this work with GKO, it should be installed on all the required
clusters.

The following diagram illustrates the multi-cluster deployment
architectural approach:

image:{% link
/images/apim/3.x/kubernetes/gko-architecture-2-multi-cluster.png %}\[\]

## Deployment on multiple environments

In this scenario, a single GKO is deployed that can publish APIs to
different environments (logical or physical). This is managed directly
from the link:{{
*/apim/3.x/apim\_kubernetes\_operator\_user\_guide\_api\_definition.html*
| relative\_url }}\[API Definition\] custom resource, which refers a
link:{{
*/apim/3.x/apim\_kubernetes\_operator\_user\_guide\_management\_context.html*
| relative\_url }}\[Management Context\] custom resource.

Note that in this case different APIs are published on each of the
environments. This is because APIs use the `ManagementContext` CRD,
which can reference any Management API, however an `ApiDefinition` CRD
can only have one Management Context.

The following diagram illustrates the multi-environment deployment
architectural approach:

image:{% link
/images/apim/3.x/kubernetes/gko-architecture-3-multi-env.png %}\[\]
