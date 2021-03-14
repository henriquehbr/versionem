# Changelog

## 0.10.3

_2021-03-14_

### Bugfixes

- avoid overriding release dates on --regenChangelog ([66b1c46](https://github.com/henriquehbr/versionem/commit/66b1c46))

## 0.10.2

_2021-03-09_

### Bugfixes

- properly include previous versions when regenerating changelog ([f205b74](https://github.com/henriquehbr/versionem/commit/f205b74))

## 0.10.1

_2021-03-08_

### Bugfixes

- prevent changelog generation without known commit types ([f7eed3a](https://github.com/henriquehbr/versionem/commit/f7eed3a))

### Updates

- unify commit fetching and parsing ([9cc37d4](https://github.com/henriquehbr/versionem/commit/9cc37d4))
- skip versioning step on unreleased mode ([3c28725](https://github.com/henriquehbr/versionem/commit/3c28725))
- remove commit type validation from categorization step ([1629b60](https://github.com/henriquehbr/versionem/commit/1629b60))
- warn when releasing only unknown commit types ([f0a9a0a](https://github.com/henriquehbr/versionem/commit/f0a9a0a))

## 0.10.0

_2021-03-06_

### Features

- add link on commit hashes ([bef6038](https://github.com/henriquehbr/versionem/commit/bef6038))

### Updates

- modularize commit categorization and changelog formatting ([a7eaedd](https://github.com/henriquehbr/versionem/commit/a7eaedd))
- modularize changelog entry formatter ([86a98dd](https://github.com/henriquehbr/versionem/commit/86a98dd))

## 0.9.2

_2021-03-05_

### Bugfixes

- cleanup unreleased section to avoid duplication ([ca7d5d9](https://github.com/henriquehbr/versionem/commit/ca7d5d9))
- amend changes on last commit when using --unreleased ([544f2c6](https://github.com/henriquehbr/versionem/commit/544f2c6))
- get bump flags from parameters instead `process.argv` ([65b6d57](https://github.com/henriquehbr/versionem/commit/65b6d57))

### Updates

- tag latest commit as HEAD instead it's hash ([2e6f3f2](https://github.com/henriquehbr/versionem/commit/2e6f3f2))
- include unreleased commits on changelog ([5da5c57](https://github.com/henriquehbr/versionem/commit/5da5c57))

## 0.9.1

_2021-02-28_

### Bugfixes

- prevent `git push` with --unreleased ([398328a](https://github.com/henriquehbr/versionem/commit/398328a))

### Updates

- reference typings on `package.json#types` field ([c39b9c2](https://github.com/henriquehbr/versionem/commit/c39b9c2))
- replace dynamic import for `read-pkg` ([9cd0c74](https://github.com/henriquehbr/versionem/commit/9cd0c74))

## 0.9.0

_2021-02-28_

### Features

- add --unreleased flag ([b28d54e](https://github.com/henriquehbr/versionem/commit/b28d54e))

### Bugfixes

- prevent `git push` when `--noCommit` is used ([dc71849](https://github.com/henriquehbr/versionem/commit/dc71849))

### Updates

- remove date from unreleased section on changelog ([a511b8b](https://github.com/henriquehbr/versionem/commit/a511b8b))
- remove `v` prefix from changelog versions ([292a145](https://github.com/henriquehbr/versionem/commit/292a145))
- skip `git tag` on --unreleased ([4b1b70d](https://github.com/henriquehbr/versionem/commit/4b1b70d))
- convert `getTags` parameters to a single object ([c3277ae](https://github.com/henriquehbr/versionem/commit/c3277ae))
- add JSDoc type annotations ([511538d](https://github.com/henriquehbr/versionem/commit/511538d))
- add package.json metadata ([9a73942](https://github.com/henriquehbr/versionem/commit/9a73942))

## 0.8.1

_2021-02-26_

### Bugfixes

- set `shell: true` on `npm publish` options ([1449b74](https://github.com/henriquehbr/versionem/commit/1449b74))
- pass `parsedOptions` instead `options` to `publishNpm` ([16a8fb5](https://github.com/henriquehbr/versionem/commit/16a8fb5))
- import `publish-npm.js` module on `index.js` ([82d5d4a](https://github.com/henriquehbr/versionem/commit/82d5d4a))

### Updates

- add npm registry url to package.json ([ddb5e4d](https://github.com/henriquehbr/versionem/commit/ddb5e4d))
- inherit `npm publish` command output ([e3ec8e0](https://github.com/henriquehbr/versionem/commit/e3ec8e0))

## 0.8.0

_2021-02-26_

### Features

- add --publish flag ([9120c25](https://github.com/henriquehbr/versionem/commit/9120c25))

## 0.7.0

_2021-02-26_

### Features

- add --noLog flag ([0b44fdf](https://github.com/henriquehbr/versionem/commit/0b44fdf))

## 0.6.0

_2021-02-26_

### Features

- add --noBump flag ([d6b982d](https://github.com/henriquehbr/versionem/commit/d6b982d))

## 0.5.0

_2021-02-26_

### Features

- add --noCommit flag ([194c86b](https://github.com/henriquehbr/versionem/commit/194c86b))

### Bugfixes

- check for changelog existence pre-removal on regeneration ([ea3d833](https://github.com/henriquehbr/versionem/commit/ea3d833))
- pass parsedOptions to changelog regeneration ([5a8568d](https://github.com/henriquehbr/versionem/commit/5a8568d))
- ignore commits without type ([049c3d8](https://github.com/henriquehbr/versionem/commit/049c3d8))

### Updates

- chore(release): v0.4.1 ([34b4ab2](https://github.com/henriquehbr/versionem/commit/34b4ab2))
- properly validate changelog existence on regeneration ([c04f377](https://github.com/henriquehbr/versionem/commit/c04f377))
- optimize commit type categorization logic ([45d4c19](https://github.com/henriquehbr/versionem/commit/45d4c19))

## 0.4.1

_2021-02-25_

### Bugfixes

- check for changelog existence pre-removal on regeneration ([548253c](https://github.com/henriquehbr/versionem/commit/548253c))
- pass parsedOptions to changelog regeneration ([6c167bb](https://github.com/henriquehbr/versionem/commit/6c167bb))
- ignore commits without type ([eb8c265](https://github.com/henriquehbr/versionem/commit/eb8c265))

### Updates

- properly validate changelog existence on regeneration ([d5ae697](https://github.com/henriquehbr/versionem/commit/d5ae697))
- optimize commit type categorization logic ([54a1d57](https://github.com/henriquehbr/versionem/commit/54a1d57))
- setup husky ([c588890](https://github.com/henriquehbr/versionem/commit/c588890))
- add `bin` field to package.json ([5404fe7](https://github.com/henriquehbr/versionem/commit/5404fe7))

## 0.4.0

_2021-02-23_

### Features

- add --silent flag ([7c5202a](https://github.com/henriquehbr/versionem/commit/7c5202a))

### Bugfixes

- convert regenerateChangelog parameters to object ([cbea1ab](https://github.com/henriquehbr/versionem/commit/cbea1ab))
- force push git tags ([36fb400](https://github.com/henriquehbr/versionem/commit/36fb400))

### Updates

- remove unused `basename` import from `path` ([5ff657c](https://github.com/henriquehbr/versionem/commit/5ff657c))
- use destructured parsedOptions properties ([fb53234](https://github.com/henriquehbr/versionem/commit/fb53234))

## 0.3.0

_2021-02-23_

### Features

- expose index.js internals as a API ([6b69b67](https://github.com/henriquehbr/versionem/commit/6b69b67))

### Bugfixes

- commit and push changes on the correct cwd ([3afe59a](https://github.com/henriquehbr/versionem/commit/3afe59a))

### Updates

- rename `pkg` parameter to `packageJson` ([bd4b3a3](https://github.com/henriquehbr/versionem/commit/bd4b3a3))
- pass parsedOptions instead options as parameter ([2c66e99](https://github.com/henriquehbr/versionem/commit/2c66e99))
- include cwd on push module parameters ([3cf2337](https://github.com/henriquehbr/versionem/commit/3cf2337))
- conditionally include package name on release commit message ([cb507bb](https://github.com/henriquehbr/versionem/commit/cb507bb))
- include "example-repo" on .gitignore ([fb3a43c](https://github.com/henriquehbr/versionem/commit/fb3a43c))
- rename `get-git-tags.js` to `get-tags.js` ([def4426](https://github.com/henriquehbr/versionem/commit/def4426))
- add missing validation for monorepo scenarios ([74df463](https://github.com/henriquehbr/versionem/commit/74df463))
- pass options object to every helper function ([09df21a](https://github.com/henriquehbr/versionem/commit/09df21a))
- add "async" keyword to API entry function ([6262174](https://github.com/henriquehbr/versionem/commit/6262174))
- rename dirname export to "__dirname" ([575fd8f](https://github.com/henriquehbr/versionem/commit/575fd8f))

## 0.2.0

_2021-02-20_

### Features

- add --regenChangelog flag ([a73c439](https://github.com/henriquehbr/versionem/commit/a73c439))

### Bugfixes

- subtract one commit only between releases ([9347365](https://github.com/henriquehbr/versionem/commit/9347365))

### Updates

- remove type from commit message header ([52f0f8c](https://github.com/henriquehbr/versionem/commit/52f0f8c))
- remove old changelog when regenerating ([22a2e27](https://github.com/henriquehbr/versionem/commit/22a2e27))
- remove preceding space on changelog title ([dd2b44e](https://github.com/henriquehbr/versionem/commit/dd2b44e))

## 0.1.1

_2021-02-19_

### Bugfixes

- conditionally add package name on changelog title ([93f5255](https://github.com/henriquehbr/versionem/commit/93f5255))

## 0.1.0

_2021-02-19_

### Features

- add support for single repos ([41beb4e](https://github.com/henriquehbr/versionem/commit/41beb4e))

### Updates

- add missing "basename" import ([d8c5cbd](https://github.com/henriquehbr/versionem/commit/d8c5cbd))
- add minimist to dependencies ([6056c4a](https://github.com/henriquehbr/versionem/commit/6056c4a))
- add write-pkg to dependencies ([bc260f7](https://github.com/henriquehbr/versionem/commit/bc260f7))
- update import path to dirname.js ([ff68291](https://github.com/henriquehbr/versionem/commit/ff68291))
- enable ES modules on package.json ([916e334](https://github.com/henriquehbr/versionem/commit/916e334))
- update script path on package.json ([ca202c2](https://github.com/henriquehbr/versionem/commit/ca202c2))
- rename "scripts/release" dir to "src" ([db98763](https://github.com/henriquehbr/versionem/commit/db98763))
- add release script dependencies ([1fe6223](https://github.com/henriquehbr/versionem/commit/1fe6223))
- add release script ([21a046b](https://github.com/henriquehbr/versionem/commit/21a046b))
- add .gitignore ([fab19bc](https://github.com/henriquehbr/versionem/commit/fab19bc))