import { MOCK_HEROKU_CTX } from '../__mocks__/ctx'
import { addendumStep } from '../addendum'
import { HerokuApi } from '../api'
import { PredeploySteps } from '../predeploy'

jest.mock('../stdio')
jest.mock('../api')

describe('message creation', () => {
  it('follows the heroku logs after finishing steps', async () => {
    await addendumStep(MOCK_HEROKU_CTX)
    expect(HerokuApi.followLogs).toHaveBeenCalled()
  })
  it('if any step has been disabled show manual finish message', async () => {
    await addendumStep({
      ...MOCK_HEROKU_CTX,
      predeploySteps: [
        {
          step: PredeploySteps.GENERATE_HOME_ROUTE,
          title: 'bar',
          description: 'baz',
          enabled: false,
        },
      ],
    })
    expect(HerokuApi.followLogs).toHaveBeenCalled()
  })
})
