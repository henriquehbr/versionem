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

- `--dryRun`
  - Run the whole release process without making a single modification to existing files nor creating new ones
- `--noPush`
  - Prevent pushing to remote after release
- `--noCommit`
  - Prevent from making a release commit (implicitly includes `--noTag`)
- `--noTag`
  - Don't tag the release commit
- `--regenChangelog`
  - Regenerate all changelogs entries from scratch (overwriting existing ones), useful for existing codebases migrating to `versionem`
- `--silent`
  - Don't output any log or message from the CLI (except from errors)
