import envinfo from 'envinfo'
import execa, { ExecaChildProcess } from 'execa'

import { canRunDocker } from '../requirements'

jest.mock('envinfo')
jest.mock('execa')

const MOCK_SYS_INFO = {
  Virtualization: {
    Docker: {
      version: 'v0',
      path: '/i/dont/matter',
    },
  },
  System: {
    OS: 'macOS 2',
  },
}

describe('docker requirements', () => {
  it('returns true is requirements met, false if not', async () => {
    jest.mocked(envinfo.run).mockResolvedValueOnce('')
    const notMet = await canRunDocker()
    expect(notMet).toBeFalsy()

    jest
      .mocked(envinfo.run)
      .mockResolvedValueOnce(JSON.stringify(MOCK_SYS_INFO))
    jest.mocked(execa).mockImplementationOnce(
      () =>
        Promise.resolve({
          stdout: 'OK',
        }) as unknown as ExecaChildProcess<Buffer>
    )
    const met = await canRunDocker()
    expect(met).toBeTruthy()
  })
})
