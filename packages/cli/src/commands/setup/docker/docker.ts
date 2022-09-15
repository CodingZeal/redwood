/* eslint-disable */

// import { Argv } from 'yargs'

import Listr from 'listr'

import path from 'path'

import fs from 'fs-extra'

// import { getConfig } from '@redwoodjs/internal/src/config'

import { meetsDockerRequirements } from './requirements'

export const command = 'docker'
export const description = 'Generate basic docker configs'

// check system for docker and running
// read redwood.yml for app info
// check system for existing scaffold / running db
// interpolate each template
// write templates

// add configuation for cli

export const handler = async () => {
  // const REDWOOD_TOML = getConfig()
  const tasks = new Listr([
    {
      title: 'Checking system requirements',
      task: meetsDockerRequirements,
    },
    {
      title: 'Loading docker templates',
      task: loadDockerTemplates,
    },
  ])
  await tasks.run()
  return 'foo'
}


function loadDockerTemplates() {
  const templates = fs
    .readdirSync(path.join(__dirname, './templates'), {
      withFileTypes: true,
    })
    .map((files) => files)
    .filter((files) => files.name !== 'tmp')

  console.log({ templates })
}


// // inspired by gatsby/packages/gatsby-cli/src/create-cli.js and
// // and gridsome/packages/cli/lib/commands/info.js
// import envinfo from 'envinfo'
// import terminalLink from 'terminal-link'

// export const command = 'info'
// export const description = 'Print your system environment information'
// export const builder = (yargs) => {
//   yargs.epilogue(
//     `Also see the ${terminalLink(
//       'Redwood CLI Reference',
//       'https://redwoodjs.com/docs/cli-commands#info'
//     )}`
//   )
// }
// export const handler = async () => {
//   try {
//     const output = await envinfo.run({
//       System: ['OS', 'Shell'],
//       Binaries: ['Node', 'Yarn'],
//       Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
//       // yarn workspaces not supported :-/
//       npmPackages: '@redwoodjs/*',
//       Databases: ['SQLite'],
//     })
//     console.log(output)
//   } catch (e) {
//     console.log('Error: Cannot access environment info')
//     console.log(e)
//     process.exit(1)
//   }
// }
