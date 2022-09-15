import envinfo from 'envinfo'
import execa from 'execa'

import { ERRORS } from './constants'

interface SystemInformation {
  Virtualization: {
    Docker?: {
      version: string
      path: string
    }
  }
  System: {
    OS: string
  }
}

export async function canRunDocker() {
  try {
    const sysInfo = await _systemInfo()
    const hasDocker = _hasDocker(sysInfo)
    const isDockerRunning = await _isDockerRunning(sysInfo)
    return isDockerRunning && hasDocker
  } catch (err) {
    return false
  }
}

async function _systemInfo(): Promise<SystemInformation> {
  const info = await envinfo.run(
    {
      System: ['OS'],
      Virtualization: ['Docker'],
    },
    {
      json: true,
    }
  )

  return JSON.parse(info)
}

function _hasDocker({ Virtualization = {} }: SystemInformation) {
  return Object.keys(Virtualization).includes('Docker')
}

async function _isDockerRunning({
  System,
}: SystemInformation): Promise<boolean> {
  if (System.OS.split(' ').includes('Windows')) {
    throw new Error(ERRORS.SYSTEM_WINDOWS)
  }
  return (await _pingDockerSocketLinux()) === 'OK'
}

async function _pingDockerSocketLinux(): Promise<string> {
  try {
    const { stdout } = await execa('curl', [
      '-s',
      '--unix-socket',
      '/var/run/docker.sock',
      'http/_ping',
    ])
    return stdout
  } catch (err) {
    return 'ERROR'
  }
}
