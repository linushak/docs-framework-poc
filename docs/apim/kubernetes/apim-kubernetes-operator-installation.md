<span class="label label-version">New in version 3.19.0</span> <span
class="label label-version">BETA release</span>

The current GKO deployment process is mostly identical for both possible
scenarios, as follows:

1.  In a typical deployment scenario, you can deploy the GKO on an
    existing, APIM-ready remote / cloud-based cluster.

2.  For testing purposes, you can also set up a local cluster and deploy
    the GKO on it.

# Deploying GKO on an existing cluster

Deploying the Gravitee Kubernetes Operator (GKO) on an existing remote /
cloud-based APIM-ready Kubernetes cluster involves the following stages:

1.  Deploy the GKO on your cluster.

2.  Create a Management Context custom resource.

3.  Create an API Definition custom resource - this creates a new API on
    the cluster.

4.  Test the new API by calling it through the APIM Gateway.

Read all about it link:{{
*/apim/3.x/apim\_kubernetes\_operator\_installation\_cluster.html* |
relative\_url }}\[here\].

# Setting up a new local cluster for GKO deployment

If you do not have an existing APIM-ready Kubernetes cluster you can
deploy the GKO on, you can create and set up a local cluster on your
machine.

This setup involves the following stages:

1.  Set up your environment (prerequisite step).

2.  Create a local APIM-ready Kubernetes cluster.

3.  Monitor the APIM pods startup until they are ready.

4.  Check if the console is up and running.

After the local cluster setup, the next steps are to:

1.  link:{{
    */apim/3.x/apim\_kubernetes\_operator\_installation\_cluster.html* |
    relative\_url }}\[Deploy the GKO on the cluster\]

2.  link:{{
    */apim/3.x/apim\_kubernetes\_operator\_user\_guide\_play.html* |
    relative\_url }}\[Try out the GKO functionality\]

It is strongly recommended to only use local GKO cluster deployments for
testing purposes - never in production.

Learn all about local cluster installation and setup link:{{
*/apim/3.x/apim\_kubernetes\_operator\_installation\_local.html* |
relative\_url }}\[here\].
