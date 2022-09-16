export function convertJson(data: any) {
  let indent = ''
  const typeMethods: Record<any, any> = {
    undefined: () => null,
    null: () => null,
    number: (val: number) => val,
    boolean: (val: boolean) => (val ? 'true' : 'false'),
    string: (val: string) => val,
    array: (val: string[]) => {
      indent = _increaseIndent(indent)
      const output: string = val
        .map((v) => `\n${indent}- ${typeMethods[_matchType(v)](v, true)}`)
        .join('')
      indent = _decreaseIndent(indent)
      return output.trimEnd()
    },
    object: (
      x: Record<string, unknown>,
      inArray: boolean,
      rootNode: boolean
    ) => {
      let output = ''

      if (!rootNode) {
        indent = _increaseIndent(indent)
      }

      const isFirstArray = (i: number) => inArray && i === 0

      Object.entries(x || {}).map(([k, v], i) => {
        if (!isFirstArray(i)) {
          output += '\n' + indent
        }
        const nextType = _matchType(v)
        const thingNeedsBlank = nextType !== 'string' && nextType !== 'boolean'
        const m = thingNeedsBlank ? ':' : ': '
        output += k + m + typeMethods[_matchType(v)](v)
      })
      indent = _decreaseIndent(indent)
      return output.trimEnd()
    },
    function: () => {},
  }
  const type = _matchType(data)
  return typeMethods[type](data, true, true) + '\n'
}

function _increaseIndent(indent: string) {
  return indent.replace(/$/, '  ')
}

function _decreaseIndent(indent: string) {
  return indent.replace(/ {2}/, '')
}

function _matchType(data: unknown): string {
  if (Array.isArray(data)) {
    return 'array'
  }
  return typeof data
}
