# Erlang releases

The most important part of the deployment process is using [[Erlang]] "releases". A release combines the [[Erlang/VM]], your application, and the libraries it depends on into a tarball, which you deploy as a unit. The release has a script to start the app, launched and supervised by the OS init system (e.g. [[Linux/systemd]]). If it dies, the system restarts it.

Releases handle a lot of the details you need to run things reliably in production, e.g.:

-   Packaging
-   Configuration
-   Running migrations
-   Getting a console on a running app
-   Upgrades

