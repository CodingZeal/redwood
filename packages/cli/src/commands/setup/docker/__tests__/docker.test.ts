import * as docker from '../docker'

describe('docker deploy', () => {
  it('tests', async () => {
    const actual = await docker.handler()
    expect(actual).toBe('foo')
  })
})
