# versionem

> Automated semantic versioning integrated to changelog generation

## Summary

- [versionem](#versionem)
  - [Summary](#summary)
  - [Why?](#why)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Options](#options)
  - [Tips](#tips)

## Why?

The changelog generation topic certainly has been around for a while, and for sure Node.js ecosystem wouldn't be outside of this, so why choose `versionem` (a.k.a the new kid on the block), over other already well-known and trusted tools

> **Note:** not all points listed on the table below might be of your interest, that's just my personal perspective on things, and why `versionem` should be considered as a valid competitor to this scenario, instead of just another wheel reinvention

|                                 | versionem | [`semantic-release`](https://github.com/semantic-release/semantic-release) | [`standard-version`](https://github.com/conventional-changelog/standard-version) | [`releasy`](https://github.com/vtex/releasy) |
| ------------------------------- | --------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------- |
| Changelog generation            | ✔️         | ✔️                                                                          | ✔️                                                                                | ✔️                                            |
| Automated semantic version bump | ✔️         | ✔️                                                                          | ✔️                                                                                | ❌                                            |
| Changelog regeneration          | ✔️         | ✔️                                                                          | ❌                                                                                | ❓[¹]                                         |
| CI independent                  | ✔️         | ❌                                                                          | ✔️                                                                                | ✔️                                            |
| GitHub Releases                 | ❌         | ✔️                                                                          | ⚠️[²]                                                                             | ✔️                                            |

1. Couldn't get it to work, returned: `[ERROR] Failed to release`, no issues in regard to this problem were found on the repository
2. Requires [`conventional-github-releaser`](https://github.com/conventional-changelog/releaser-tools/tree/master/packages/conventional-github-releaser)

## Installation

yarn:

```bash
# Local
$ yarn add -D versionem

# Global
$ yarn global add versionem
```

npm:

```bash
# Local
$ npm i -D versionem

# Global
$ npm i -g versionem
```

## Usage

```
versionem [path] [--dryRun] [--noPush] [--noTag] [--regenChangelog] [--silent]
```

> **Note:** You don't need the `path` argument if the project you want to release is in the current directory

## Options

- `--major`
  - Bumps major version number (x.0.0), equivalent of releasing a breaking change
- `--minor`
  - Bumps minor version number (0.x.0), equivalent of releasing a new feature
- `--patch`
  - Bumps patch version number (0.0.x), equivalent of releasing a bugfix
- `--publish`
  - Publishes the package to npm right after the release
- `--dryRun`
  - Run the whole release process without making a single modification to existing files nor creating new ones
- `--unreleased`
  - Includes to changelog commits created before a release (implicitly includes both `--noCommit` and `--noBump`)
- `--force`
  - Force release even when there aren't eligible commits
- `--releasePlaceholder`
  - Use a custom message for releases that doesn't contain eligible commits
- `--noPush`
  - Prevent pushing to remote after release
- `--noCommit`
  - Prevent release commit (implicitly includes both `--noTag` and `--noPush`)
- `--noLog`
  - Prevent changelog from being generated
- `--noTag`
  - Prevent release commit from being tagged
- `--noBump`
  - Prevent `package.json#version` field from being updated
- `--regenChangelog`
  - Regenerate all changelogs entries from scratch (overwriting existing ones), useful for existing codebases migrating to `versionem`
- `--silent`
  - Don't output any log or message from the CLI (except from errors)

## Tips

- ### Including unreleased commits on changelog

  For that, [Husky](https://github.com/typicode/husky) is essential, as in contrast to plain Git, it provides a clean and easy way to interact with Git hooks, and also, a special detail that makes it even more important for this to work, is that it allows to skip `post-commit` hook

  After follow Husky [setup tutorial](https://typicode.github.io/husky/#/?id=install), add the `post-commit` hook by running the following command:

  ```bash
  $ yarn add .husky/pre-commit "versionem --unreleased"
  ```
