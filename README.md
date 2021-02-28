# versionem

> Automated semantic versioning integrated to changelog generation

## Summary

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)

## Installation

yarn:

```
$ yarn add -D versionem
```

npm:

```
$ npm i -D versionem
```

## Usage

```
versionem [path] [--dryRun] [--noPush] [--noTag] [--regenChangelog] [--silent]
```

> **Note:** You don't need the `path` argument if the project you want to release is in the current directory

## Options

- `--publish`
  - Publishes the package to npm right after the release
- `--dryRun`
  - Run the whole release process without making a single modification to existing files nor creating new ones
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
