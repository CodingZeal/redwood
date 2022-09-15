
import { getConfig } from '@redwoodjs/internal'

import { loadDockerTemplates } from '../docker'

import { MOCK_REDWOOD_TOML } from './mock-config-toml';
// jest.mock('@redwoodjs/internal')

jest.mock('@redwoodjs/internal', () => ({
  getConfig: () => MOCK_REDWOOD_TOML,
}))

describe('docker deploy', () => {
  it('tests', async () => {
    // console.log(MOCK_REDWOOD_TOML)
    const actual = await loadDockerTemplates()
    expect(actual).toBe('foo')
  })
})
