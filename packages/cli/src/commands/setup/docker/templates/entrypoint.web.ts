export const ENTRYPOINT_WEB = `
#!/bin/bash
source .env

yarn rw build web
rm -rf ./web/src
yarn rw serve web
`
