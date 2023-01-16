<span class="label label-version">New in version 3.19.0</span> <span
class="label label-version">BETA release</span>

# How to synchronize your API CRDs with an existing Management API

The following examples for creating a Management Context and creating an
API referencing that context are based on the assumption that a
Management API has already been deployed in a namespace called
`apim-example`. The connection to that Management API uses the default
in-memory credentials.

## Example - creating a Management Context for an existing Management API

    cat <<EOF | kubectl apply -f -
    apiVersion: gravitee.io/v1alpha1
    kind: ManagementContext
    metadata:
      name: apim-example-context
      namespace: apim-example
    spec:
      baseUrl: http://acme-apim3-api.apim-example.svc:83
      environmentId: DEFAULT
      organizationId: DEFAULT
      auth:
        credentials:
          username: admin
          password: admin
    EOF

## Example - creating an API referencing an existing Management Context

    cat <<EOF | kubectl apply -f -
    apiVersion: gravitee.io/v1alpha1
    kind: ApiDefinition
    metadata:
      name: basic-api-example
      namespace: apim-example
    spec:
      name: gko-example
      contextRef:
        name: apim-example-context
        namespace: apim-example
      version: "1.0.0"
      description: "Basic api managed by Gravitee Kubernetes Operator"
      proxy:
        virtual_hosts:
          - path: "/k8s-basic"
        groups:
          - endpoints:
              - name: "Default"
                target: "https://api.gravitee.io/echo"
    EOF

## Using an APIM export endpoint to create an API Definition from an existing API

The Management API feature provides an [export
endpoint^](https://docs.gravitee.io/apim/3.x/management-api/3.18/index.html#tag/APIs/operation/getEvent)
that enables you to export an API as an API Definition resource.

This allows you to easily create an API Definition from a given
environment by calling the endpoint and piping the result to a `kubectl`
command. For example:

    curl -s -H "Authorization: Bearer $TOKEN" "https://apim-example-api.team-gko.gravitee.xyz/management/organizations/DEFAULT/environments/DEFAULT/apis/$API_ID/crd" | kubectl apply -f -

## Starting and stopping your API

By default the API will start automatically. If you want to stop it
later (or just create an API definition in "stop mode"), set the `state`
property value to `STOPPED`, as shown in the example below:

    cat <<EOF | kubectl apply -f -
    apiVersion: gravitee.io/v1alpha1
    kind: ApiDefinition
    metadata:
      name: basic-api-example
      namespace: apim-example
    spec:
      name: gko-example
      contextRef:
        name: apim-example-context
        namespace: apim-example
      version: "1.0.0"
      description: "Basic api managed by Gravitee Kubernetes Operator"
      state: "STOPPED"
      proxy:
        virtual_hosts:
          - path: "/k8s-basic"
        groups:
          - endpoints:
              - name: "Default"
                target: "https://api.gravitee.io/echo"
    EOF

To start the API again, change the `state` property value back to
`STARTED`.

## Updating your API

To update the API, follow the example below - it shows a simple update
of the API name, path, and endpoint target.

Before you proceed, ensure that the steps above have been completed.

    cat <<EOF | kubectl apply -f -
    apiVersion: gravitee.io/v1alpha1
    kind: ApiDefinition
    metadata:
      name: basic-api-example
      namespace: apim-example
    spec:
      name: gko-example-updated
      contextRef:
        name: apim-example-context
        namespace: apim-example
      version: "1.0.0"
      description: "Basic api managed by Gravitee Kubernetes Operator"
      proxy:
        virtual_hosts:
          - path: "/k8s-basic-updated"
        groups:
          - endpoints:
              - name: "Default"
                target: "https://api.gravitee.io/whattimeisit"
    EOF

## Deleting your API

Before you proceed, ensure that the steps above have been completed.

The example below shows a simple deletion of the API definition:

    kubectl -n apim-example delete apidefinitions.gravitee.io basic-api-example
