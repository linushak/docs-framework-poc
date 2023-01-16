<span class="label label-version">New in version 3.5</span>

# Overview

From APIM 3.5, you can use Design Studio to design your APIs with an
intuitive drag and drop interface.

You design your APIs by adding and configuring new *flows* at both API
and plan level. You can then customize your flows with link:{{
*/apim/3.x/apim\_policies\_overview.html* | relative\_url
}}\[Policies<sup>\]\ and\ link:{{\ */apim/3.x/apim\_resources\_overview.html*\ |\ relative\_url\ }}\[Resources</sup>\].

You can also migrate existing API definitions to Design Studio.

# How to access Design Studio

APIM Console opens Design Studio automatically when you click the
**Design** menu option for an API, as long as one of the following
conditions is met:

-   Your API was created in APIM 3.5 or above using the **DESIGN
    STUDIO** API creation method (see link:{{
    */apim/3.x/apim\_publisherguide\_create\_apis.html* | relative\_url
    }}\[Create APIs^\] for more details)

-   Your API design was previously migrated to Design Studio (see
    link:{{
    */apim/3.x/apim\_publisherguide\_design\_studio\_migrate.html* |
    relative\_url }}\[Migrate to Design Studio^\] for more details)

Otherwise, the **Design** function is available as in earlier APIM
versions.

With the APIM Console **Design** function, HTTP methods were linked
directly to policies. With Design Studio, HTTP methods are linked to a
flow. This means that you can have a path with policies linked to
different HTTP methods.

By default, the selection of a flow is based on the operator defined in
the flow itself.

You can use the operator either to select a flow with a path which
matches exactly, or when the start of the path matches. You can then use
the **Best match** option to select the flow from the path that is
closest.

image:{% link
images/apim/3.x/api-publisher-guide/design-studio/graviteeio-design-studio-best-match.png
%}\[\]

# Quick tour

Design Studio shows a visual representation of a plan’s flows
horizontally, with the request and response phases clearly demarcated,
and the policies associated with each phase shown.

Each plan can have more than one set of request and response flows, each
with its own definition (for example, HTTP method).

image:{% link
images/apim/3.x/api-publisher-guide/design-studio/quick-tour.png
%}\[Design Studio\]

-   The list on the left shows the plans associated with the API, which
    you can expand to see the different flows defined

-   The central pane shows the currently selected flows with their
    associated policies

-   The list on the right shows the list of policies, organized into
    sections by type
