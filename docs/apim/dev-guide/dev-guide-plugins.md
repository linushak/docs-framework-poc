---
title: APIM Developer Guide - Plugins
tags:
  - APIM
  - Developer guide
  - Plugins
---

## Plugins

APIM _plugins_ are additional components that can be _plugged into_ the Gravitee ecosystem. You can use plugins to extend and customize the behavior of Gravitee to meet your strategic needs.

!!! note

    APIM includes a default set of plugins with each distribution. You can also obtain and install some additional plugins from Gravitee. For more information, see the Installation Guide.

This section describes how to create your own custom plugins.

## Common structure

Each plugin follows the following common structure:

```
-----------------
.
├── pom.xml
├── README.md
└── src
    ├── assembly
    │   └── <plugin>-assembly.xml
    ├── main
    │   ├── java
    │   │   └── <main java files>
    │   └── resources
    │       └── plugin.properties
    └── test
        └── java
            └── <test java files>
-----------------
```

The different key files are as follows:

```
|===
| File                                                               | Description

| <<gravitee-dev-guide-plugins-pom, `pom.xml`>>                      | The main Maven POM file
| <<gravitee-dev-guide-plugins-readme, `README.md`>>                 | The main entry point for the plugin documentation
| <<gravitee-dev-guide-plugins-assembly, `<plugin>-assembly.xml`>>   | The common Maven assembly descriptor
| <<gravitee-dev-guide-plugins-descriptor, `plugin.properties`>>     | The plugin descriptor file
|===
```

### pom.xml

Any plugins (and more generally any Gravitee projects) are [Maven](https://maven.apache.org/) managed. A plugin project is described by using the Maven [Project Object Model](https://maven.apache.org/pom.html) file.

### README.md

Each plugin should have a dedicated `README.md` file to document it. The `README.md` file should contain everything related to the use of your plugin: _What is its functionality? How can you use it? How can you configure it?_

### <plugin>-assembly.xml

In order to be plugged into the Gravitee ecosystem, a plugin needs to be deployed following a given file structure. The `<plugin>-assembly.xml` file is the [Maven Assembly](http://maven.apache.org/plugins/maven-assembly-plugin/) descriptor used to build the distribution file.

Commonly, a plugin distribution file is organized as follows:

```
-----------------
.
├── <main Jar file>.jar
└── lib
-----------------
```

The different files are as follows:

```
|===
| File                   | Description

| `<main Jar File>.jar`  | The plugin's main Jar file
| `lib/`                 | A directory containing external libraries to correctly execute the <main Jar File>.jar
|===
```

#### <main Jar File>.jar

Each plugin has its main `.jar` file containing the business behavior *plus* the `<<gravitee-dev-guide-plugins-descriptor, plugin descriptor file>>`.

#### lib/

This directory contains all the plugin's external dependencies (non provided-scope Maven dependencies).

### plugin.properties

The `plugin.properties` file is the descriptor of the plugin. It acts as the _ID Card_ of the plugin and will be read by APIM Gateway during the plugin loading process.

Hereafter parameters included into the descriptor:

```
|===
| Parameter	    | Description

| id	        | The plugin identifier
| name	        | The plugin name
| version	    | The plugin version
| description	| The plugin description
| class	        | The main plugin class
| type	        | The type of plugin (_policy_, _reporter_)
|===
```

!!! note

    Naturally, the plugin identifier has to be unique to be correctly loaded by APIM Gateway.

## Deployment

Deploying a plugin is as easy as copying the plugin archive (zip) into the dedicated directory. By default, you need to deploy the archives in `${GRAVITEE_HOME/plugins}`. Refer to the [configuration documentation](../installation-guide/configuration/gateway/installation-guide-gateway-configuration.md#configure_the_plugins_repository) for more information.

!!! warning

    You must restart APIM nodes when applying new or updated plugins!
