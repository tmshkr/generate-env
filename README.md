# handle-env

Simple utility to handle creating and deleting a .env file for a GitHub Actions workflow.

The .env file will be available to subsequent steps in the workflow, and then (optionally) deleted at the end of the job with [shred](<https://en.wikipedia.org/wiki/Shred_(Unix)>).

Helps with remote development, for example, using [VS Code](https://code.visualstudio.com/docs/remote/ssh) and [ngrok-ssh](https://github.com/marketplace/actions/ngrok-ssh).
