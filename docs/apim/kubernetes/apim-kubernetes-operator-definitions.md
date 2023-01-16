<span class="label label-version">New in version 3.19.0</span> <span
class="label label-version">BETA release</span>

# Overview

The Gravitee Kubernetes Operator comes with three Custom Resource
Definitions (CRDs) - `ManagementContext`, `ApiDefinition`, and
`ApiResource`.

# `ManagementContext`

The `ManagementContext` custom resource represents the configuration for
a Management API.

Resources:

-   The `ManagementContext` CRD code is available on
    [GitHub^](https://github.com/gravitee-io/gravitee-kubernetes-operator/blob/master/api/v1alpha1/managementcontext_types.go).

-   The `ManagementContext` CRD API reference is documented link:{{
    */apim/3.x/apim\_kubernetes\_operator\_api\_reference.html#managementcontext*
    | relative\_url }}\[here\].

-   You can learn how to use the `ManagementContext` resource in link:{{
    */apim/3.x/apim\_kubernetes\_operator\_user\_guide\_management\_context.html*
    | relative\_url }}\[this section\].

The `ManagementContext` refers to a remote Management API. You can have
as many `ManagementContext` resources as you want, however you need to
reference the relevant `ManagementContext` from the API Definition in
order to indicate to the GKO where the API should be published.

## Examples

A basic example of an `ManagementContext` resource is shown below:

    apiVersion: gravitee.io/v1alpha1
    kind: ManagementContext
    metadata:
      name: dev-mgmt-ctx
    spec:
      baseUrl: http://localhost:8083
      auth:
        credentials:
          username: admin
          password: admin

The next example shows the same resource but with a Personal Token:

    apiVersion: gravitee.io/v1alpha1
    kind: ManagementContext
    metadata:
      name: dev-mgmt-ctx
    spec:
      baseUrl: http://localhost:8083
      auth:
        bearerToken: xxxx-yyyy-zzzz

You can then refer to the `ManagementContext` from the API, as shown in
the example below:

    apiVersion: gravitee.io/v1alpha1
    kind: ApiDefinition
    metadata:
      name: basic-api-example
    spec:
      name: "K8s Basic Example"
      contextRef:
        name: "dev-mgmt-ctx"
        namespace: "default"
      version: "1.1"
      description: "Basic api managed by Gravitee Kubernetes Operator"
      proxy:
        virtual_hosts:
          - path: "/k8s-basic"
        groups:
          - endpoints:
              - name: "Default"
                target: "https://api.gravitee.io/echo"

Read more about `ManagementContext` link:{{
*/apim/3.x/apim\_kubernetes\_operator\_user\_guide\_management\_context.html*
| relative\_url }}\[here\].

# `ApiDefinition`

The `APIDefinition` custom resource represents the configuration for a
single proxied API and its versions. It is similar to a YAML
representation of an API Definition in JSON format.

Resources:

-   The `ApiDefinition` CRD code is available on
    [GitHub^](https://github.com/gravitee-io/gravitee-kubernetes-operator/blob/master/api/v1alpha1/apidefinition_types.go).

-   The `ApiDefinition` CRD API reference is documented link:{{
    */apim/3.x/apim\_kubernetes\_operator\_api\_reference.html#apidefinition*
    | relative\_url }}\[here\].

-   You can learn how to use the `ApiDefinition` resource in link:{{
    */apim/3.x/apim\_kubernetes\_operator\_user\_guide\_api\_definition.html*
    | relative\_url }}\[this section\].

## Workflow

The following workflow is applied when a new `ApiDefinition` resource is
added to the cluster:

1.  The GKO listens for `ApiDefinition` resources.

2.  The GKO performs some required changes, such as computing
    automatically IDs or CrossIDs (for API or Plan).

3.  The GKO converts the definition to JSON format.

4.  The GKO compares the definition to the existing definition. If
    something has changed, the GKO pushes the definition to the
    Management API (if a `ManagementContext` is provided).

5.  The GKO deploys the API to the API Gateway.

## Examples

A basic example of an `ApiDefinition` resource is shown below:

    apiVersion: gravitee.io/v1alpha1
    kind: ApiDefinition
    metadata:
      name: basic-api-example
    spec:
      name: "K8s Basic Example"
      version: "1.0"
      description: "Basic api managed by Gravitee Kubernetes Operator"
      proxy:
        virtual_hosts:
          - path: "/k8s-basic"
        groups:
          - endpoints:
              - name: "Default"
                target: "https://api.gravitee.io/echo"

The same API with support for plans is shown in the example below:

    apiVersion: gravitee.io/v1alpha1
    kind: ApiDefinition
    metadata:
      name: apikey-example
    spec:
      name: "K8s OAuth2 Example"
      version: "1.0"
      description: "Api managed by Gravitee Kubernetes Operator with OAuth2 plan"
      resources:
        - name: "am-demo"
          type: oauth2-am-resource
          configuration:
            version: V3_X
            serverURL: "https://am-nightly-gateway.cloud.gravitee.io"
            securityDomain: "test-jh"
            clientId: "localjh"
            clientSecret: "localjh"
      plans:
        - name: "OAuth2"
          description: "Oauth2 plan"
          security: OAUTH2
          securityDefinition: '{"oauthResource":"am-demo"}'
      proxy:
        virtual_hosts:
          - path: "/k8s-oauth2"
        groups:
          - name: default-group
            endpoints:
              - name: "Default"
                target: "https://api.gravitee.io/echo"

Read more about `ApiDefinition` link:{{
*/apim/3.x/apim\_kubernetes\_operator\_user\_guide\_api\_definition.html*
| relative\_url }}\[here\].

# `ApiResource`

The `ApiResource` custom resource allows you to use the GKO to create
reusable link:{{ */apim/3.x/apim\_resources\_overview.html* |
relative\_url }}\[API resources\] by applying the `ApiResource` custom
resource definition. This enables you to define resources such as cache
or authentication providers once only and maintain them in a single
place, and then reuse them in multiple APIs - any further updates to
such a resource will be automatically propagated to all APIs containing
a reference to that resource.

Read more about `ApiResource` link:{{
*/apim/3.x/apim\_kubernetes\_operator\_user\_guide\_reusable\_resources.html*
| relative\_url }}\[here\].

## Examples

Here is an example of an `ApiResource` cache resource:

    apiVersion: gravitee.io/v1alpha1
    kind: ApiResource
    metadata:
      name: reusable-resource-cache
      namespace: default
    spec:
      name: "cache-resource"
      type: "cache"
      enabled: true
      configuration:
          timeToIdleSeconds: 0
          timeToLiveSeconds: 0
          maxEntriesLocalHeap: 1000

This reusable resource can then be later referenced in any
`ApiDefinition` resource using a reference to its namespaced name in the
`resources` field:

    apiVersion: gravitee.io/v1alpha1
    kind: ApiDefinition
    metadata:
      name: resource-ref-example
      namespace: default
    spec:
      name: "Resource reference example"
      version: "1.0"
      description: "An API with a reference to a reusable resource"
      resources:
        - ref:
            name: reusable-resource-cache
            namespace: default
      proxy:
        virtual_hosts:
          - path: "/resource-ref-sample"
        groups:
          - endpoints:
              - name: "Default"
                target: "https://api.gravitee.io/echo"

# CRD dependencies

## Resource deletion

Since an `ApiDefinition` can rely on a `ManagementContext`, resource
deletion is restricted until a check is performed first whether there is
an API associated with the respective `ManagementContext`. This is
achieved through the use of
[Finalizers^](https://kubernetes.io/docs/concepts/overview/working-with-objects/finalizers/).

# CRD samples

Check out some sample CRDs in the [GKO GitHub
repository^](https://github.com/gravitee-io/gravitee-kubernetes-operator/tree//config/samples/apim).
