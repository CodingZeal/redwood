export function convertJson(data: any) {
  let indent = ''
  const typeMethods: Record<any, any> = {
    undefined: () => '',
    null: () => '',
    number: (val: number) => val,
    boolean: (val: boolean) => (val ? 'true' : 'false'),
    string: (val: string) => val,
    array: (val: string[]) => {
      indent = _increaseIndent(indent)
      const output: string = val
        .map((v) => `\n${indent}- ${typeMethods[_matchType(v)](v, true)}`)
        .join('')
      indent = _decreaseIndent(indent)
      return output
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

      // Object.keys(x || {}).forEach((k, i) => {
      //   const val = x[k]

      //   if (_matchType(val) === 'undefined') {
      //     return
      //   }

      //   if (!(inArray && i === 0)) {
      //     output += '\n' + indent
      //   }

      //   output += k + ': ' + typeMethods[_matchType(val)](val)
      // })
      const o = Object.entries(x).map(([k, v]) => {
        
      })
      indent = _decreaseIndent(indent)
      return output
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
