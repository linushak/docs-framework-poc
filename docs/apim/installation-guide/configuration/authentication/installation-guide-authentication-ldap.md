# Overview

This page describes how to configure APIM to allow users to connect
using LDAP/AD accounts.

There are many ways in which the LDAP authentication sources can be
configured.

You need to be familiar with LDAP before trying to use it.

# LDAP configuration

    # ===================================================================
    # LDAP SECURITY PROPERTIES
    #
    # This sample file declared one ldap authentication source
    # ===================================================================
    security:
      type: basic
      providers:
        - type: ldap
          context:
            username: "uid=admin,ou=system"
            password: "secret"
            url: "ldap://localhost:389/dc=gravitee,dc=io"
            base: "c=io,o=gravitee"
          authentication:
            user:
              base: "ou=people"
              filter: "uid={0}"
            group:
              base: "o=authorization groups"
              filter: "member={0}"
              role:
                attribute: "cn"
                mapper: {
                  GRAVITEE-CONSUMERS: API_CONSUMER,
                  GRAVITEE-PUBLISHERS: API_PUBLISHER,
                  GRAVITEE-ADMINS: ADMIN,
                  GRAVITEE-USERS: USER
                }
          lookup:
            user:
              base: "ou=people"
              filter: "(&(objectClass=myObjectClass)(|(cn=*{0}*)(uid={0})))"
