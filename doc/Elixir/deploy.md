# Elixir/deploy
## Best practices for deploying Elixir apps

https://www.cogini.com/blog/best-practices-for-deploying-elixir-apps/

## Locking dependency versions

The process starts in your dev environment. When you run `mix deps.get`, mix fetches the dependencies listed in the [[Elixir/mix/exs|mix.exs]], but they are normally only *loosely specified versions*, e.g. `{:plug_cowboy, "~> 2.0"}` will actually install the latest compatible version, 2.6.3.

![[Elixir/mix/lock]]

# Managing Erlang and Elixir versions

For simple deployments, we can [install Erlang and Elixir from binary packages](https://github.com/cogini/mix-deploy-example/tree/master/bin). Instead of using the packages that come with the OS, which are generally out of date, use the [packages from Erlang Solutions](https://www.erlang-solutions.com/resources/download.html).

One disadvantage of OS packages is that only one version can be installed at a time. If different projects need different versions, then we have a conflict. Similarly, when we upgrade Erlang or Elixir, we need to first test the code with the new version, moving it through dev and test environments, then putting it into production. If anything goes wrong, we need to be able to roll back quickly. To support this, we need to precisely specify runtime versions and keep multiple versions installed so we can switch between them.

When building a release for production, Elixir is just another library dependency as far as Erlang is concerned. We can also package the Erlang virtual machine inside the release, so it's not necessary to install Erlang on the prod machine globally at all. Just install the release and it includes the matching VM.

That lets us upgrade production systems with no drama. We have apps which have been running continuously for years on clusters of servers, upgrading through multiple Elixir and Erlang versions with no downtime.

![[Erlang/asdf]]

# Building and testing

We normally develop on macOS and deploy to Linux. The Erlang VM mostly isolates us from the operating system, and mix manages library dependencies tightly, so we don't find it necessary to use Docker or Vagrant. It _is_ necessary, however, to build the release with an Erlang VM executable that matches your target system. You can't just build the release on macOS and use it on a Linux server.

For simple projects, we [build on the same server that runs the app](https://www.cogini.com/blog/deploying-an-elixir-app-to-digital-ocean-with-mix-deploy/): check out the code from git, build a release, then deploy it locally running under systemd.

In larger projects, a CI/CD server checks out the code, runs tests, then builds a release. We then deploy to the cloud using [AWS CodeDeploy](https://github.com/cogini/mix_deploy#codedeploy) or [deploy the release using Ansible](https://www.cogini.com/blog/deploying-elixir-apps-with-ansible/).

Like your dev machine, the build server runs ASDF. When it makes a build, it automatically uses the versions of Erlang and Elixir specified in the `.tool-versions` file, which is in sync with the code. These [build scripts](https://github.com/cogini/mix-deploy-example/tree/master/bin) handle the setup and build process.

![[Erlang/release]]

![[Elixir/mix/Release]]

## Running database migrations

In the deployed system, we don't have mix. The release command script allows us to call an Elixir function to [run migrations from a release](https://www.cogini.com/blog/running-ecto-migrations-in-a-release/).

`/srv/foo/current/bin/foo eval "Foo.Release.migrate"`

# [[Elixir/Configuration]]

## Environment vars

The simplest way to configure your app is via OS environment variables. You can set them via the systemd supervisor or container runtime. Your application then calls `System.get_env/1` in `config/releases.exs` or application startup. Note that these environment vars are read at _runtime_, not when building your app.

[mix_systemd](https://github.com/cogini/mix_systemd) supports reading environment vars from files, e.g.

`/srv/foo/etc/environment /etc/foo/environment /run/foo/environment`

This lets you set config defaults in the release, then override them in the environment or at runtime.

![[Elixir/Configuration]]

![[Configuration/Config providers]]

![[Configuration/config files]]


## Config servers and vaults

![[Configuration/server]]
![[Configuration/vault]]
![[Configuration/provider]]


## Application initialization

Instead of doing a lot of work in your `config/releases.exs` file, keep it focused on getting the data. Handle application config in your [Application.start/2](https://hexdocs.pm/elixir/Application.html#start/2) or [Supervisor.init/1](https://hexdocs.pm/elixir/Supervisor.html#c:init/1). This leverages the supervision structure of OTP, allowing components to fail and be restarted with the right configuration.

# Supervising your app

In the Erlang OTP framework, we use supervisors to start and stop processes, restarting them in case of problems. It's turtles all the way down: you need a supervisor to make sure your Erlang VM is running, restarting it if there is a problem.

Ignore the haters, systemd is the best supervisor we have right now, and all the Linux distros are standardizing on it. We might as well take advantage of it. Systemd handles all the things that "well behaved" daemons need to do. Instead of scripts, it has declarative config that handles standard situations. It sets up the environment, handles logging and controls permissions.

[mix_systemd](https://github.com/cogini/mix_systemd) generates a systemd unit file for your app and [mix_deploy](https://github.com/cogini/mix_deploy) generates the scripts it needs to start and configure it.

# Permissions and directories

For security, following the [principle of least privilege](https://www.cogini.com/blog/improving-app-security-with-the-principle-of-least-privilege/), we limit the app to _only_ what it really needs to do its job. If the app is compromised, the attacker can only do what the app can do.

We use one OS user (`deploy`) to upload the release files, and another (e.g. `foo`) to run the app. This means that the app only needs to have read-only access to its own source code and config. The app user account does not need permissions to restart the app, that's handled by the deploy user or systemd.

We make use of [[systemd]] features and cloud services. Instead of writing our own log files, we send them to [[journald]], which sends them to CloudWatch Logs or ELK. When running in the cloud, the app should be stateless. Instead of putting files on the disk, it keeps state in an [[RDS]] database and uses [[S3]] for file storage.

The result is that many apps can run without needing write access to anything on the disk, improving security.

# Deploying the app

So now we have a release tarball and some config files, time to put them on a server.

-   [Build and deploy to the same server](https://www.cogini.com/blog/deploying-an-elixir-app-to-digital-ocean-with-mix-deploy/)
-   Build with CodeBuild and deploy with CodeDeploy [doc](https://github.com/cogini/mix_deploy#codedeploy) and [example](https://github.com/cogini/mix-deploy-example/blob/master/config/aws.exs)
-   [Build on a build server and deploy using Ansible](https://www.cogini.com/blog/deploying-elixir-apps-with-ansible/)

# Connecting to the outside world

The app isn't much use if we can't talk to it. There are two options for how to receive traffic, direct or via a proxy.

You can [serve your Phoenix app with ](https://www.cogini.com/blog/serving-your-phoenix-app-with-nginx/)[[Linux/nginx]], but listening direct gives you lower latency and overall lower complexity. Erlang can handle lots of load with no problems. For example, [[Heroku]]'s routing layer is based on Erlang. We have apps that handle a billion requests a day, including [[DDOS]] attacks. You can [handle 3000 requests per second](https://www.cogini.com/blog/benchmarking-phoenix-on-digital-ocean/) on a simple $5/month [[Digital Ocean]] droplet.

In a modern cloud app running running behind a load balancer, then listening on port 4000 is fine, just tell the load balancer to use that port. For a freestanding app, we need to listen to port 80 and/or port 443 for [[SSL]]. We normally [redirect traffic from port 80 to 4000 in the firewall using iptables](https://www.cogini.com/blog/port-forwarding-with-iptables/).

You may need to set some [HTTP options](https://ninenines.eu/docs/en/cowboy/2.6/manual/cowboy_http/) that [Nginx](https://www.nginx.com/) was dealing with, e.g.:

`config :foo, FooWeb.Endpoint,   http: [     compress: true,     protocol_options: [max_keepalive: 5_000_000]   ],`

## Things you probably don't need right now

While they are cool, you don't initially need to worry about:

-   Hot code updates
-   [[Erlang/Distributed]]

# Additional topics

-   [Deploying an Elixir app to Digital Ocean with mix_deploy](https://www.cogini.com/blog/deploying-an-elixir-app-to-digital-ocean-with-mix-deploy/)
-   [Serving Phoenix static assets from a CDN](https://www.cogini.com/blog/serving-phoenix-static-assets-from-a-cdn/)
-   [Deploying Elixir apps without sudo](https://www.cogini.com/blog/deploying-elixir-apps-without-sudo/)
-   [Benchmarking Phoenix on Digital Ocean](https://www.cogini.com/blog/benchmarking-phoenix-on-digital-ocean/)
-   [Improving app security with the principle of least privilege](https://www.cogini.com/blog/improving-app-security-with-the-principle-of-least-privilege/)
-   [Presentation on Elixir performance](https://www.cogini.com/blog/presentation-on-elixir-performance/)
-   [Incrementally migrating a legacy app to Phoenix](https://www.cogini.com/blog/incrementally-migrating-a-legacy-app-to-phoenix/)
-   [Secure web applications with GraphQL and Elixir](https://www.cogini.com/blog/secure-web-applications-with-graphql-and-elixir/)
