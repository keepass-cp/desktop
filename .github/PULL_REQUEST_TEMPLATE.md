Thanks for taking the time to contribute! :gift:

Please follow these steps:

1. work on the right branch: it must be `develop-{feature}` for new feature and `hotfix-{fix}` for hotfix
2. make sure the feature you add is not listed in [banned features](https://github.com/keepass-cp/desktop/wiki/Unsupported-Features)
3. check compatibility with [the project roadmap](https://github.com/keepass-cp/desktop/wiki/TODO) and key features: you should not break anything
4. if your feature is introducing a lot of new UI or changing any UX or design concept, please open an issue to discuss it first
5. please respect existing style in code, styles, and markup (hint: install and enable [editorconfig](http://editorconfig.org/) in your editor)
6. added the least possible dependency (none is the best)
7. test your code: it must work in all Windows, OSX, and Linux
8. if your code is platform-dependent, please add corresponding switches
9. respect each platform: don't create a behaviour that breaks interface guidelines or user expectations
10. run `yarn bundle` and make sure it's working
11. replace this message with the actual description
