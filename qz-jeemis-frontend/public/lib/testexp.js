function parse (str) {
  str = str.trim()
  if (str.length === 0) {
    throw new Error('nothing')
  }
  if (str[0] === '(' && str[str.length - 1] === ')') {
    return parse(str.slice(1, -1))
  }
  let lv = 0
  let pos = -1
  let type
  for (let i = 0; i < str.length; ++i) {
    if (str[i] === '(') {
      lv += 1
    } else if (str[i] === ')') {
      lv -= 1
      if (lv < 0) {
        throw new Error('bracket not match')
      }
    } else if (str[i] === '+' && lv === 0) {
      pos = i
      type = 'add'
      break
    } else if (str[i] === '*' && lv === 0 && type == null) {
      pos = i
      type = 'mul'
    }
  }
  if (lv !== 0) {
    throw new Error('bracket not match')
  }
  if (pos !== -1) {
    return {
      type,
      l: parse(str.slice(0, pos)),
      r: parse(str.slice(pos + 1))
    }
  } else {
    return {
      type: 'ident',
      v: str
    }
  }
}

function deepCopy (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function debracket (ast) {
  if (ast.type !== 'ident') {
    debracket(ast.l)
    debracket(ast.r)
    if (ast.type === 'mul') {
      if (ast.l.type === 'add') {
        const l = ast.l
        const r1 = ast.r
        const r2 = deepCopy(r1)
        ast.type = 'add'
        ast.l = {
          type: 'mul',
          l: l.l,
          r: r1
        }
        ast.r = {
          type: 'mul',
          l: l.r,
          r: r2
        }
        debracket(ast.l)
        debracket(ast.r)
      } else if (ast.r.type === 'add') {
        const r = ast.r
        const l1 = ast.l
        const l2 = deepCopy(l1)
        ast.type = 'add'
        ast.l = {
          type: 'mul',
          l: l1,
          r: r.l
        }
        ast.r = {
          type: 'mul',
          l: l2,
          r: r.r
        }
        debracket(ast.l)
        debracket(ast.r)
      }
    }
  }
}

function output (ast) {
  if (ast.type === 'ident') {
    return ast.v
  } else if (ast.type === 'mul') {
    let l = output(ast.l)
    let r = output(ast.r)
    if (ast.l.type === 'add') {
      l = '(' + l + ')'
    }
    if (ast.r.type === 'add') {
      r = '(' + r + ')'
    }
    return l + '*' + r
  } else if (ast.type === 'add') {
    return output(ast.l) + '+' + output(ast.r)
  }
}

function f (str) {
  const ast = parse(str)
  debracket(ast)
  return output(ast)
}
