export const ENTRYPOINT_API = `#!/bin/bash
source .env

yarn rw build api
rm -rf ./api/src
yarn rw serve api
`
