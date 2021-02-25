# Changelog

## v0.4.1

_2021-02-25_

### Bugfixes

- check for changelog existence pre-removal on regeneration (548253c)
- pass parsedOptions to changelog regeneration (6c167bb)
- ignore commits without type (eb8c265)

### Updates

- properly validate changelog existence on regeneration (d5ae697)
- optimize commit type categorization logic (54a1d57)
- setup husky (c588890)
- add `bin` field to package.json (5404fe7)

## v0.4.0

_2021-02-23_

### Bugfixes

- convert regenerateChangelog parameters to object (cbea1ab)
- force push git tags (36fb400)

### Features

- add --silent flag (7c5202a)

### Updates

- Merge pull request #3 from henriquehbr/feat/silent-mode (936b482)
- set `silent: true` on versionem API call (bfb6818)
- remove unused `basename` import from `path` (5ff657c)
- use destructured parsedOptions properties (fb53234)

## v0.3.0

_2021-02-23_

### Bugfixes

- commit and push changes on the correct cwd (3afe59a)

### Features

- expose index.js internals as a API (6b69b67)

### Updates

- rename `pkg` parameter to `packageJson` (bd4b3a3)
- pass parsedOptions instead options as parameter (2c66e99)
- Merge pull request #2 from henriquehbr/tests (3b2d6f8)
- include cwd on push module parameters (3cf2337)
- add "single chore commit" case (c595c6b)
- conditionally include package name on release commit message (cb507bb)
- include "example-repo" on .gitignore (fb3a43c)
- rename `get-git-tags.js` to `get-tags.js` (def4426)
- add missing validation for monorepo scenarios (74df463)
- pass options object to every helper function (09df21a)
- add "async" keyword to API entry function (6262174)
- rename dirname export to "__dirname" (575fd8f)
- setup bare-bones jest environment (efabab1)

## v0.2.0

_2021-02-20_

### Bugfixes

- subtract one commit only between releases (9347365)

### Features

- add --regenChangelog flag (a73c439)

### Updates

- Merge pull request #1 from henriquehbr/feat/regenerate-changelog (a0f65ef)
- remove type from commit message header (52f0f8c)
- remove old changelog when regenerating (22a2e27)
- remove preceding space on changelog title (dd2b44e)

## v0.1.1

_2021-02-20_

### Bugfixes

- conditionally add package name on changelog title (93f5255)

## v0.1.0

_2021-02-20_

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