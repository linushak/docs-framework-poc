# Elasticsearch

With Elasticsearch version above 7.x, `geoip` and `user_agent` plugins
are automatically enabled.

# APIM API

Two new configuration keys have been added to the `gravitee.yml` file,
they should be set with the URLs of the UI console and the management
API: \`\`\`yml console: ui: url: gravitee\_apim\_ui\_url \# TO UPDATE
WITH YOUR OWN URL api: url: gravitee\_apim\_management\_api\_url \# TO
UPDATE WITH YOUR OWN URL \`\`\`

NB: **For Gravitee Cockpit to work properly these URLs are mandatory**,
they will be used by Cockpit to interact with your APIM installation.
