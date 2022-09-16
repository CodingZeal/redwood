import { getConfig } from '@redwoodjs/internal/dist/config'
// import { getConfigPath } from '@redwoodjs/internal/dist/paths'

import { loadDockerTemplates } from '../docker'

import { MOCK_REDWOOD_TOML } from './mock-config-toml'

jest.mock('@redwoodjs/internal/dist/config')

/* eslint-disable-next-line */
const mockGetConfig = jest.mocked(getConfig)

describe('docker deploy', () => {
  it('tests', async () => {
    mockGetConfig.mockReturnValue(MOCK_REDWOOD_TOML)
    const actual = await loadDockerTemplates()
    expect(actual).toBe('foo')
  })
})
