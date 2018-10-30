# Free cross-platform password manager compatible with KeePass (alternative to KeeWeb)

This webapp is a desktop, browser extension and mobile app password manager compatible with KeePass databases. It doesn't require any server or additional resources.

> TODO : Screen of app

## Quick Links

- Apps : [Desktop](https://github.com/keepass-cp/desktop/releases)
- Timeline : [Changelog](CHANGELOG.md), [Roadmap][roadmap]

## Status

Project roadmap with planned features and approximate schedule is on [Roadmap][roadmap] page.

## Development

For development the requirement is :

- [Node.JS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

1. Install depencies `yarn`
2. Start webpack `yarn bundle`
3. Start electron `yarn serve`

## Contributing

Please, read contribution guidelines: [for issues](.github/ISSUE_TEMPLATE.md) and [for pull requests](.github/PULL_REQUEST_TEMPLATE.md).
For pull requests: branch is important! `release-X.Y` is only for stable release, `master` is for beta release, `develop` is for development version (nightly version), use branch in this formats : `develop-{feature}` for new feature and `hotfix-{fix}` for hotfix.
Here's a [list of issues](hhttps://github.com/keepass-cp/desktop/labels/help%20wanted) which need help.

## Donations

**KeePass CP** is not free to develop. It takes many time to develop and maintain.
You can help the project or say "thank you" with this button :

[<img src=".github/paypal-donate.png" alt="Donate with PayPal" width="100">](https://paypal.me/orblazer)

_Please note: donation does not imply any type of service contract._

## License

[MIT](LICENSE)

[roadmap]: https://github.com/keepass-cp/desktop/wiki/TODO
