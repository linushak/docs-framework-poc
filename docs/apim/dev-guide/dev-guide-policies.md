---
title: APIM Developer Guide - Policies
tags:
  - APIM
  - Developer guide
  - Policies
---

# Policies

Policies are steps in the Request/Response _gateway_ proxy chain. A _policy_ acts as a _proxy controller_ by guaranteeing if a given business rule is fulfilled during Request/Response processing.

Let's look at an example of how to develop a policy.

## Getting started

Before you start, don't forget to activate [OSS repositories](http://central.sonatype.org/pages/ossrh-guide.html) in your [Maven settings](https://maven.apache.org/settings.html).

## Policy skeleton generation

Imagine you want to create a policy that controls if requests contains the `X-Foo` header. Let's name it the _Foo header check policy_. Then you can generate your policy like this:

```
$ mvn archetype:generate\
    -DarchetypeGroupId=io.gravitee.maven.archetypes\
    -DarchetypeArtifactId=gravitee-policy-maven-archetype\
    -DarchetypeVersion=1.8.0\
    -DartifactId=foo-header-check-policy\
    -DgroupId=my.gravitee.extension.policy\
    -Dversion=1.0.0-SNAPSHOT\
    -DpolicyName=FooHeaderCheck
```

!!! note

    When generating a policy, choose a short but clear name for it, *without specifying the _policy_ suffix*. The `gravitee-policy-maven-archetype` will add it automatically.
    For example, *do not* specify the `policyName` of your policy like this:
    ```
    -DpolicyName=AmazingStuffPolicy
    ```
    Instead, do it like this:
    ```
    -DpolicyName=AmazingStuff
    ```

Once executed and parameters confirmed, the above command will create the `foo-header-check-policy` directory containing the following structure:

```
.
├── pom.xml
├── README.md
└── src
    ├── assembly
    │   └── policy-assembly.xml
    ├── main
    │   ├── java
    │   │   └── my
    │   │       └── gravitee
    │   │           └── extension
    │   │               └── policy
    │   │                   ├── FooHeaderCheckPolicyConfiguration.java
    │   │                   └── FooHeaderCheckPolicy.java
    │   └── resources
    │       └── plugin.properties
    └── test
        └── java
            └── my
                └── gravitee
                    └── extension
                        └── policy
                            └── FooHeaderCheckPolicyTest.java
```

The different generated files are as follows:

```
|===
|File |Description

| <<bookmark-pom>> |The main Maven POM file
| <<bookmark-readme>> |The main entry point for the policy documentation
| <<bookmark-policy-assembly>> |The common Maven assembly descriptor for any policies
| <<bookmark-configuration-class>> |The policy configuration class
| <<bookmark-policy-class>> |The policy class, from which the business behavior is implemented
| <<bookmark-descriptor>> |The policy descriptor file
| <<bookmark-test>> |The policy unit test Java class
|===
```

### pom.xml

Each policy (and more generally all Gravitee projects) are [Maven](https://maven.apache.org/) managed. A policy project is described by using the Maven [Project Object Model](https://maven.apache.org/pom.html) file.

### README.md

Each policy should have a dedicated `README.md` file to document it. The `README.md` file should contain everything related to the use of your policy: _What is its functionality? How can you use it? How can you configure it?_

### policy-assembly.xml

A policy is just a kind of Gravitee plugin.

It can be plugged into the <<gateway, APIM _gateway_>> by using the distribution file built from the `policy-assembly.xml` file.

Based on our _FooHeaderCheck_ policy, the distribution file structure is as follows:

```
.
├── foo-header-check-policy-1.0.0-SNAPSHOT.jar
├── lib
└── schemas
    └── urn:jsonschema:my:gravitee:extension:policy:FooHeaderCheckPolicyConfiguration.json
```

The different generated files are as follows:

```
|===
|File |Description

|`foo-header-check-policy-1.0.0-SNAPSHOT.jar` |The main _policy_ jar file
|`lib/` |Where the external dependencies are stored (from the Maven POM file dependencies - see https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html)
|`schemas/` |Where the JSON configuration schemas are stored
|===
```

### JSON Configuration schemas

Policy configuration is described inside one or several [Java Bean](http://docs.oracle.com/javase/tutorial/javabeans/) classes (see the example in the next section below).

During the packaging phase, each policy configuration class is processed to generate one or several [JSON schema(s)](http://json-schema.org) that will be read by the _gateway_ when the policy is plugged in.

JSON schema generation is performed by Gravitee's [json-schema-generator-maven-plugin](https://github.com/gravitee-io/json-schema-generator-maven-plugin) Maven plugin.

### FooHeaderCheckPolicyConfiguration.java

The policy configuration class.

Policy configuration is described in one or several [Java Bean](http://docs.oracle.com/javase/tutorial/javabeans/) class(es) where each attribute is a configuration parameter.

During packaging, policy configuration is compiled into link:#schemas[JSON Configuration schemas]. These schemas are used to parse [API definitions](https://github.com/gravitee-io/gravitee-gateway).

Policy configuration is injected into the policy class instance at runtime and can then be used during implementation.

### FooHeaderCheckPolicy.java

The main policy class. Contains business code that implements the policy.

A policy can be applied on several parts of the proxy chain:

* The Request phase
* The Response phase
* Both of them

### Apply policy during the Request phase

A policy can be applied to the proxy Request phase by just implementing a method dealing with the `io.gravitee.gateway.api.policy.annotations.OnRequest` annotation. For instance:

```
@OnRequest
public void onRequest(Request request, Response response, PolicyChain policyChain) {
    // Add a dummy header
    request.headers().set("X-DummyHeader", configuration.getDummyHeaderValue());

    // Finally continue chaining
    policyChain.doNext(request, response);
}
```

!!! note

    The `PolicyChain` *must always be called to end _on Request_ processing*. Ensure you make a call to the `PolicyChain#doNext()` or `PolicyChain#failWith()` to correctly end the _on Request_ processing.


### Apply policy during the Response phase

A policy can be applied to the proxy Response phase by just implementing a method which works the `io.gravitee.gateway.api.policy.annotations.OnResponse` annotation. For instance:

```
@OnResponse
public void onResponse(Request request, Response response, PolicyChain policyChain) {
    if (isASuccessfulResponse(response)) {
        policyChain.doNext(request, response);
    } else {
        policyChain.failWith(new PolicyResult() {
            @Override
            public boolean isFailure() {
                return true;
            }

            @Override
            public int httpStatusCode() {
                return HttpStatusCode.INTERNAL_SERVER_ERROR_500;
            }

            @Override
            public String message() {
                return "Not a successful response :-(";
            }
        });
    }
}

private static boolean isASuccessfulResponse(Response response) {
    switch (response.status() / 100) {
        case 1:
        case 2:
        case 3:
            return true;
        default:
            return false;
    }
}
```

!!! note

    The `PolicyChain` *must always be called to end _on Response_ processing*. Ensure you make a call to the `PolicyChain#doNext()` or `PolicyChain#failWith()` to correctly end the _on Response_ processing.


### Apply policy during both the Request and Response phases

A policy is not restricted to only one _gateway_ proxy phase. It can be applied during both the Request and Response phases by simply using both annotations in the same class.

### Provided parameters

The annotated methods can declare several parameters (but not necessary all of them) which will be automatically provided by the _gateway_ at runtime.

Available parameters are:

```
|===
|Parameter class |Mandatory |Description

|`io.gravitee.gateway.api.Request` |No |Wrapper to the Request object containing all information about the processed request (URI, parameters, headers, input stream, …)
|`io.gravitee.gateway.api.Response` |No |Wrapper to the Response object containing all information about the processed response (status, headers, output stream, …)
|`io.gravitee.gateway.api.policy.PolicyChain` |Yes |The current policy chain that gives control to the policy to continue (`doNext`) or reject (`failWith`) the current chain.
|`io.gravitee.gateway.api.policy.PolicyContext` |No |The policy context that can be used to get contextualized objects (API store, …).
|===
```

### plugin.properties

As mentioned previously, a policy is a kind of Gravitee plugin. Each plugin is described by the _plugin.properties_ descriptor which declares the following parameters:

```
|===
|Parameter |Description |Default value

|`id` |The policy identifier |_policy_ artifact id
|`name` |The policy name |N/A (mandatory parameter)
|`version` |The policy version |N/A (mandatory parameter)
|`description` |The policy description |"Description of the _Policy name_ Gravitee Policy"
|`class` |The main policy class |Path to the generated class file
|`type` |The type of Gravitee plugin |`policy`
|===
```

!!! note

    A policy is enabled when declared in the API definition. The policy identifier is used, as its name suggests, to identify the policy. You must ensure you choose the correct policy identifier* from the outset. It may be hard to rename it later if there are many API definitions linked to it.


### FooHeaderCheckPolicyTest.java

The [JUnit](http://junit.org/) unit test class for this policy.
