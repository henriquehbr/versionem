# Changelog

## Unreleased

### Bugfixes

- properly include previous versions when regenerating changelog ([HEAD](https://github.com/henriquehbr/versionem/commit/HEAD))

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

_2021-03-08_

### Features

- add link on commit hashes ([bef6038](https://github.com/henriquehbr/versionem/commit/bef6038))

### Updates

- modularize commit categorization and changelog formatting ([a7eaedd](https://github.com/henriquehbr/versionem/commit/a7eaedd))
- modularize changelog entry formatter ([86a98dd](https://github.com/henriquehbr/versionem/commit/86a98dd))