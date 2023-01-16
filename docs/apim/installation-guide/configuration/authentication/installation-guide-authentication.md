# Overview

APIM natively support several types of authentication for accessing
APIM:

-   Authentication providers (such as in-memory, LDAP and databases)

-   Social providers (such as GitHub and Google)

-   A custom OAuth2 / OpenID authorization server

# Identity providers

You can specify as many identity providers as you want. APIM API loops
through the providers in the order they are declared in the `providers`
section of the `gravitee.yml` file until one of the authentication
methods completes successfully.

    security:
      providers:
        # First authentication source
        - type: ldap
          ...

        # Second authentication source
        - type: memory
          ...

        # Third authentication source
        - type: gravitee
          ...

# Configuring authentication in APIM

In this section, the *organization* scope roughly corresponds to APIM
Console, and the *environment* scope roughly corresponds to APIM Portal.
For a better understanding of the scope of application of identity
providers, we recommend you read the link:{{
*/apim/3.x/apim\_adminguide\_organizations\_and\_environments.html* |
relative\_url }}\[Organizations and environments\] section of the
Administration Guide.

You can configure Social providers and define custom OAuth2 / OpenID
authorization servers in APIM Console. All identity providers are
defined at organization level. You can then choose whether to make each
provider available at environment level as well.

You can see which identity providers are defined in APIM Console as
follows:

-   To view organization-level identity providers, click **Organization
    settings &gt; Authentication** (note that this list also indicates
    which providers are enabled for environment-level authentication)

-   To view identity providers which are also enabled for
    environment-level authentication, click **Settings &gt;
    Authentication**

## Creating providers with the required scope

You define new providers in APIM Console with the **Organization
settings &gt; Authentication** menu entry. If you want the identity
provider to be available at environment level as well, you can enable it
for APIM Portal authentication when you specify its details.

image::{% link
images/apim/3.x/installation/authentication/provider-activation-portal-enablement.png
%}\[\]

## Activating providers

Once a new provider is defined, you need to activate it in the
organization and/or environment-level list by checking the **Activated**
checkbox, to make it available to the relevant login window:

image::{% link
images/apim/3.x/installation/authentication/provider-organization-list-activate.png
%}\[\]

## Example

In this example, three providers have been defined — Google, GitHub and
GraviteeIO AM.

-   Only GitHub and GraviteeIO AM are **activated** for APIM Console
    authentication (in the organization-level list).

-   Only Google and GraviteeIO AM are **enabled** for APIM Portal
    authentication.

image::{% link
images/apim/3.x/installation/authentication/provider-organization-list.png
%}\[\]

You can see that **GitHub** and **GraviteeIO AM** are visible on the
APIM Console login screen:

image::{% link
images/apim/3.x/installation/authentication/console-login-screen.png
%}\[\]

In the environment-level list, only Google and GraviteeIO AM appear, and
only GraviteeIO AM is **activated**.

image::{% link
images/apim/3.x/installation/authentication/provider-environment-list.png
%}\[\]

As a result, you can only see **GraviteeIO AM** on the APIM Portal login
screen:

image::{% link
images/apim/3.x/installation/authentication/portal-login-screen.png
%}\[\]
