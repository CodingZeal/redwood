export function convert(data: Record<string, unknown>) {
  return process(data).join('')
}

function process(data: any, indent = 0, output = [] as string[]): string[] {
  for (const key in data) {
    const value = data[key]

    if (isArray(value)) {
      const line = `${'  '.repeat(indent)}${key}:\n`
      output.push(line)
      for (const i in value) {
        const arrVal = value[i]
        if (isArray(arrVal)) {
          indent++
          process(arrVal, indent, output)
          if (indent > 0) {
            indent--
          }
          continue
        }
        if (isObject(arrVal)) {
          indent += 2
          process(arrVal, indent, output)
          if (indent > 0) {
            indent--
          }
          continue
        }
        indent++
        const line = `${'  '.repeat(indent)}- ${arrVal}\n`
        output.push(line)
        indent--
      }
    }

    if (isObject(value)) {
      output.push(`${'  '.repeat(indent)}${key}:\n`)
      indent++
      for (const objKey in value) {
        const objVal = value[objKey]
        if (isArray(objVal)) {
          indent++
          process(objVal, indent, output)
          if (indent > 0) {
            indent--
          }
          continue
        }
        if (isObject(objVal)) {
          const line = `${'  '.repeat(indent)}${objKey}:\n`
          output.push(line)
          indent++
          process(objVal, indent, output)
          if (indent > 0) {
            indent--
          }
          continue
        }
        output.push(`${'  '.repeat(indent)}${objKey}: ${objVal}\n`)
        if (indent > 0) {
          indent--
        }
      }
      if (indent > 0) {
        indent--
      }
    }

    if (isString(value)) {
      output.push(`${'  '.repeat(indent)}${key}: ${value}\n`)
      continue
    }
  }
  return output
}

function isArray(data: unknown) {
  return typeOf(data) === 'array'
}

function isObject(data: unknown) {
  return typeOf(data) === 'object'
}

function isString(data: unknown) {
  return typeOf(data) === 'string'
}

function typeOf(data: unknown) {
  if (!data) {
    return null
  }

  if (Array.isArray(data)) {
    return 'array'
  }

  return typeof data
}
