export const ERRORS = {
  SYSTEM_WINDOWS: 'Redwood docker setup not supported on windows',
  DOCKER_MISSING: 'Please install docker',
  DOCKER_NOT_RUNNING: 'Docker is not running!',
  UNEXPECTED: 'An unexpected error occured!',
}

const TASKS = {
  CHECK_REQUIREMENTS: 'requirements',
}

export const TASK_FEEDBACK = {
  [TASKS.CHECK_REQUIREMENTS]: 'Checking system requirements',
}
