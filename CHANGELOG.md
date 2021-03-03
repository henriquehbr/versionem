# Changelog

## Unreleased

### Bugfixes

- amend changes on last commit when using --unreleased (544f2c6)
- get bump flags from parameters instead `process.argv` (65b6d57)

### Updates

- include unreleased commits on changelog (c3367fb)

## 0.9.1

_2021-03-01_

### Bugfixes

- prevent `git push` with --unreleased (398328a)

### Updates

- reference typings on `package.json#types` field (c39b9c2)
- replace dynamic import for `read-pkg` (9cd0c74)

## 0.9.0

_2021-03-01_

### Features

- add --unreleased flag (b28d54e)

### Bugfixes

- prevent `git push` when `--noCommit` is used (dc71849)

### Updates

- remove date from unreleased section on changelog (a511b8b)
- remove `v` prefix from changelog versions (292a145)
- skip `git tag` on --unreleased (4b1b70d)
- convert `getTags` parameters to a single object (c3277ae)
- add JSDoc type annotations (511538d)
- add package.json metadata (9a73942)

## 0.8.1

_2021-03-01_

### Bugfixes

- set `shell: true` on `npm publish` options (1449b74)
- pass `parsedOptions` instead `options` to `publishNpm` (16a8fb5)
- import `publish-npm.js` module on `index.js` (82d5d4a)

### Updates

- add npm registry url to package.json (ddb5e4d)
- inherit `npm publish` command output (e3ec8e0)

## 0.8.0

_2021-03-01_

### Features

- add --publish flag (9120c25)

## 0.7.0

_2021-03-01_

### Features

- add --noLog flag (0b44fdf)

## 0.6.0

_2021-03-01_

### Features

- add --noBump flag (d6b982d)

## 0.5.0

_2021-03-01_

### Features

- add --noCommit flag (194c86b)

### Bugfixes

- check for changelog existence pre-removal on regeneration (ea3d833)
- pass parsedOptions to changelog regeneration (5a8568d)
- ignore commits without type (049c3d8)

### Updates

- chore(release): v0.4.1 (34b4ab2)
- properly validate changelog existence on regeneration (c04f377)
- optimize commit type categorization logic (45d4c19)

## 0.4.1

_2021-03-01_

### Bugfixes

- check for changelog existence pre-removal on regeneration (548253c)
- pass parsedOptions to changelog regeneration (6c167bb)
- ignore commits without type (eb8c265)

### Updates

- properly validate changelog existence on regeneration (d5ae697)
- optimize commit type categorization logic (54a1d57)
- setup husky (c588890)
- add `bin` field to package.json (5404fe7)

## 0.4.0

_2021-03-01_

### Features

- add --silent flag (7c5202a)

### Bugfixes

- convert regenerateChangelog parameters to object (cbea1ab)
- force push git tags (36fb400)

### Updates

- remove unused `basename` import from `path` (5ff657c)
- use destructured parsedOptions properties (fb53234)

## 0.3.0

_2021-03-01_

### Features

- expose index.js internals as a API (6b69b67)

### Bugfixes

- commit and push changes on the correct cwd (3afe59a)

### Updates

- rename `pkg` parameter to `packageJson` (bd4b3a3)
- pass parsedOptions instead options as parameter (2c66e99)
- include cwd on push module parameters (3cf2337)
- conditionally include package name on release commit message (cb507bb)
- include "example-repo" on .gitignore (fb3a43c)
- rename `get-git-tags.js` to `get-tags.js` (def4426)
- add missing validation for monorepo scenarios (74df463)
- pass options object to every helper function (09df21a)
- add "async" keyword to API entry function (6262174)
- rename dirname export to "__dirname" (575fd8f)

## 0.2.0

_2021-03-01_

### Features

- add --regenChangelog flag (a73c439)

### Bugfixes

- subtract one commit only between releases (9347365)

### Updates

- remove type from commit message header (52f0f8c)
- remove old changelog when regenerating (22a2e27)
- remove preceding space on changelog title (dd2b44e)

## 0.1.1

_2021-03-01_

### Bugfixes

- conditionally add package name on changelog title (93f5255)

## 0.1.0

_2021-03-01_

### Features

- add support for single repos (41beb4e)

### Updates

- add missing "basename" import (d8c5cbd)
- add minimist to dependencies (6056c4a)
- add write-pkg to dependencies (bc260f7)
- update import path to dirname.js (ff68291)
- enable ES modules on package.json (916e334)
- update script path on package.json (ca202c2)
- rename "scripts/release" dir to "src" (db98763)
- add release script dependencies (1fe6223)
- add release script (21a046b)
- add .gitignore (fab19bc)