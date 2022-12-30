import { IHerokuContext } from './ctx'

export const HEROKU_ERRORS = {
  MISSING_PROJECT_PATH: 'There was an issue finding the project path',
  HANDLE_DELETE: 'No app name provided to delete.',
  NO_SUPPORT: 'Only OSX is supported at this time',
  NO_HEROKU: 'Heroku CLI not found',
  IS_WINDOWS: 'Windows is not supported at this time',
  NOT_LOGGED_IN: 'User is not logged in to Heroku',
  APP_CREATE_FAIL: 'Could not create app. Correct any errors and try again',
  POSTGRES_NOT_CONFIGURED: 'Postgres is not configured for this app',
}

export class HerokuApi {
  static async apps({ spawn }: IHerokuContext) {
    return await spawn('heroku apps --json', {
      stdin: 'inherit',
      stderr: 'inherit',
    })
  }

  static async create({ appName, spawn }: IHerokuContext): Promise<string> {
    try {
      const output = await spawn(`heroku create ${appName} --manifest`)
      await spawn(`heroku addons:create heroku-postgresql --app ${appName}`)
      await spawn(`heroku buildpacks:add heroku/nodejs --app ${appName}`)
      await spawn(
        `heroku buildpacks:add heroku-community/nginx --app ${appName}`
      )
      // Heroku strips out the packages declared under devDependencies before deploying the application. SKIP_PRUNING prevents this. We need redwood cli to be available in heroku dynos.
      // https://devcenter.heroku.com/articles/nodejs-support
      await spawn(`heroku config:set YARN2_SKIP_PRUNING=true --app ${appName}`)
      return output.toString()?.split(' | ')[0]
    } catch (err: any) {
      if (err.stderr?.includes('already taken')) {
        return 'already taken'
      }
      throw err
    }
  }

  static async destroy({ spawn, appName }: IHerokuContext): Promise<string> {
    const out = await spawn(
      `heroku apps:destroy ${appName} --confirm ${appName}`
    )
    return out.toString()
  }

  static async login({ spawn }: IHerokuContext): Promise<string> {
    return (await spawn('heroku auth:login', {
      stderr: 'inherit',
      stdin: 'inherit',
      stdout: 'pipe',
      reject: false,
    })) as string
  }

  static async logout({ spawn }: IHerokuContext): Promise<void> {
    await spawn('heroku auth:logout')
  }

  static async addRemote({ appName, spawn }: IHerokuContext) {
    await spawn(`heroku git:remote -a ${appName}`)
  }

  static async push({ spawn }: IHerokuContext) {
    await spawn('git push heroku main', {
      stdio: 'inherit',
      killSignal: 'SIGINT',
    })
  }

  static async followLogs({ appName, spawn }: IHerokuContext) {
    await spawn(`heroku logs --tail --app ${appName}`, {
      stdio: 'inherit',
    })
  }
}
