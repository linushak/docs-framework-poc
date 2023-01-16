# Overview

New user accounts can be registered in either APIM Console or APIM
Portal.

# Prerequisites

To work correctly, new user accounts require the following
configuration:

-   email link:{{
    */apim/3.x/apim\_installguide\_rest\_apis\_configuration.html#smtp-configuration*
    | relative\_url }}\[SMTP configuration^\]

-   the **Allow User Registration** option enabled in **Settings**:

    image::{% link
    images/apim/3.x/api-consumer-guide/create-account/graviteeio-developer-create-account-activate-settings.png
    %}\[\]

-   the password validation regex configured in `gravitee.yml` (the
    default regex is based on [OWASP
    recommendations^](https://owasp.org/www-community/OWASP_Validation_Regex_Repository))

          # Password complexity validation policy
          # Applications should enforce password complexity rules to discourage easy to guess passwords.
          # Passwords should require a minimum level of complexity that makes sense for the application and its user population.
          password:
            policy:
              # Regex pattern for password validation (default to OWASP recommendations).
              # 8 to 32 characters, no more than 2 consecutive equal characters, min 1 special characters (@ & # ...), min 1 upper case character.
              pattern: ^(?:(?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))(?!.*(.)\1{2,})[A-Za-z0-9!~<>,;:_\-=?*+#."'&§`£€%°()\\\|\[\]\-\$\^\@\/]{8,32}$
                      # Example : ^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$
                      # ^                # start-of-string
                      #(?=.*[0-9])       # a digit must occur at least once
                      #(?=.*[a-z])       # a lower case letter must occur at least once
                      #(?=.*[A-Z])       # an upper case letter must occur at least once
                      #(?=.*[@#$%^&+=])  # a special character must occur at least once
                      #(?=\S+$)          # no whitespace allowed in the entire string
                      #.{8,}             # anything, at least eight places though
                      #$                 # end-of-string

# Register as a new user

1.  Click **Sign In** in the top menu. The login form is displayed:

    image::{% link
    images/apim/3.x/api-consumer-guide/create-account/graviteeio-developer-create-account-login-form.png
    %}\[\]

2.  Click the **Sign Up** link at the bottom of the form. You are
    redirected to a registration form.

3.  Fill in the form and click **SIGN UP**.

    image::{% link
    images/apim/3.x/api-consumer-guide/create-account/graviteeio-developer-create-account-signin-form.png
    %}\[\]

    APIM sends you a validation email.

    image:{% link
    images/apim/3.x/api-consumer-guide/create-account/graviteeio-developer-create-account-email-registration-1.png
    %}\[Confirmation, 300\] image:{% link
    images/apim/3.x/api-consumer-guide/create-account/graviteeio-developer-create-account-email-registration-2.png
    %}\[Email, 300\]

    By default, the link is available for 24h (86400s), but this can be
    changed in `gravitee.yml`.

        user:
          creation:
            token:
              expire-after: 86400

4.  Click the link in the email.

5.  Confirm registration by defining your password and clicking the
    **CONFIRM** button.

    image::{% link
    images/apim/3.x/api-consumer-guide/create-account/graviteeio-developer-create-account-confirm-registration.png
    %}\[\]

    You can click on the `eye` icon to display the password

    APIM displays a message confirming your registration is complete.

    image::{% link
    images/apim/3.x/api-consumer-guide/create-account/graviteeio-developer-create-account-confirm-registration-validated.png
    %}\[Registration successful, 300\]

# Expired link

If the link expires, you will see this message:

image::{% link
images/apim/3.x/api-consumer-guide/create-account/graviteeio-developer-create-account-link-expire.png
%}\[Expiration message, 300\]

Click **Back to registration** to return to the registration page and
send a new registration request.

# Password validation

If the password does not respect some security rules (see link:{{
*/apim/3.x/apim\_consumerguide\_create\_account.html#prerequisites* |
relative\_url }}\[Prerequisites\]), you will see this message:

image::{% link
images/apim/3.x/api-consumer-guide/create-account/graviteeio-developer-create-account-unsecure-password.png
%}\[\]
