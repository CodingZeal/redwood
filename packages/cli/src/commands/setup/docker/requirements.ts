import envinfo from 'envinfo'
import execa from 'execa'

interface SystemInformation {
  Virtualization: string[]
  System: string[]
}

export async function meetsDockerRequirements() {
  const sysInfo = await _introspectSystem()
  const hasDocker = _hasDocker(sysInfo)
  const isRunning = await _isDockerRunning()
  console.log({ isRunning })
  return hasDocker
}

async function _introspectSystem(): Promise<SystemInformation> {
  const info = await envinfo.run(
    {
      System: ['OS'],
      Virtualization: ['Docker'],
    },
    {
      json: true,
      showNotFound: false,
    }
  )
  return JSON.parse(info)
}

function _hasDocker({ Virtualization }: SystemInformation) {
  return Object.keys(Virtualization).includes('Docker')
}

async function _isDockerRunning() {

}

async function pingDockerSocketLinux({ System }: SystemInformation) {
  // curl -s --unix-socket /var/run/docker.sock http/_ping
  const { stdout } = await execa('curl', [
    '-s',
    '--unix-socket',
    '/var/run/docker.sock',
    'http/_ping',
  ])
  return stdout
}
