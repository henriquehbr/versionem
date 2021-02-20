# Changelog

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