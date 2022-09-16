/* eslint-disable */
import Listr from 'listr'
import path from 'path'
// import fs from 'fs-extra'

// import { canRunDocker } from './requirements'
import { getConfig } from '@redwoodjs/internal/dist/config'

export const command = 'docker'
export const description = 'Generate basic docker configs'

// check system for docker and running ✅
// read redwood.yml for app info
// check system for existing scaffold / running db
// interpolate each template
// write templates

// add configuation for cli


export const handler = async () => {
  const tasks = new Listr([
    // {
    //   title: 'Checking system requirements',
    //   task: canRunDocker,
    // },
    {
      title: 'Loading docker templates',
      task: () => loadDockerTemplates(),
    },
  ])
  await tasks.run()
  return 'foo'
}

export function loadDockerTemplates() {
  const REDWOOD_TOML = getConfig()

  // const packageJsonPath = path.join(getPaths().base, 'package.json')
  // const packageJson = fs.readFileSync(packageJsonPath, 'utf-8')
  // const templates = fs
  //   .readdirSync(path.join(__dirname, './templates'), {
  //     withFileTypes: true,
  //   })
  //   .map((files) => files)
  //   .filter((files) => files.name !== 'tmp')
  // console.log({ templates })
  // const projectName = getPaths().base
  console.log({ REDWOOD_TOML })
  return 'foo'
}

