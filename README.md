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
      - uses: tmshkr/handle-env@v1
        with:
          env: |
            FOO_VAR=42
            BAR_VAR=43
            BAZ_VAR=44
            SECRET_VAR=${{ secrets.SECRET_VAR }}
      - name: Print env vars
        run: cat .env
```
