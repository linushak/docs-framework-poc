# Breaking changes

The `portalURL` parameter in the gravitee.yml file has been removed. It
has become useless with this issue
[\#4144](https://github.com/gravitee-io/issues/issues/4144).

As this `portalURL` stands for the former portal, it will be replaced by
the `management.url` parameter in the console settings. This parameter
will be initialized with the former `portalURL` value if it still exists
in your gravitee.yml. Otherwise, the default value of `management.url`
is <http://localhost:3000>

The `portal.url` parameter in the console settings will also have a
default value : <http://localhost:4100>
