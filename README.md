# handle-env

Simple utility to handle creating and deleting a .env file for a GitHub Actions workflow.

The .env file will be available to subsequent steps in the workflow, and then (optionally) deleted at the end of the job with [shred](<https://en.wikipedia.org/wiki/Shred_(Unix)>).

Helps with remote development, for example, using [VS Code](https://code.visualstudio.com/docs/remote/ssh) and [ngrok-ssh](https://github.com/marketplace/actions/ngrok-ssh).

## Usage

```yaml
name: handle-env
on:
  workflow_dispatch:

jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: tmshkr/handle-env@v1.1
        with:
          env: |
            FOO_VAR=42
            BAR_VAR=43
            BAZ_VAR=44
            SECRET_VAR=${{ secrets.SECRET_VAR }}
      - name: Print .env file
        run: cat .env
```

## The `.wait` file

Before the action deletes the .env file, it will look for a `.wait` file in the `$GITHUB_WORKSPACE` directory.

If the `.wait` file exists, the action will wait for that file to be deleted before deleting the .env file.

This can be useful when debugging a workflow, so that you can use or inspect the .env file before it is deleted.
