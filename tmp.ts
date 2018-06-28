const types = [
    {
      name: 'Root',
      fields: [
        { type: 'string', name: 'gender' },
        // { type: 'int32', name: 'age' },
        // { type: 'message', name: 'book', typeName: 'Book' },
        { type: 'message', name: 'books', typeName: 'Book', repeated: true },
        // { type: 'message', name: 'books', typeName: 'Book' },
        // { type: 'string', name: 'name' },
      ]
    },
    {
      name: 'Book',
      fields: [
        { type: 'string', name: 'name' },
        { type: 'message', name: 'details', typeName: 'BookDetails' },
      ]
    },
    {
      name: 'BookDetails',
      fields: [
        { type: 'int32', name: 'pagesCount' }
      ]
    }
  ]
  
  const input = types[0];
  
  function generateIndent(indentLevel) {
      let indent = '';
      for (let i = 0; i < indentLevel; i++) {
          indent += '  '
      }
      return indent;
  }
  
  function gen(indent, input, res, root, root$) {
    const g = (indent, val) => res.push(generateIndent(indent) + val);
    const genAssign = (f, cast) => {
      g(indent, `${root}.${f.name} = ${cast(`${root$}["${f.name}"]`)}`)
    };
    const genChildAssign = (indent, f, repeated) => {
      const oldRoot = root;
      const oldRoot$ = root$
      const newRoot = `${f.name}_${f.typeName}`;
      const newRoot$ = `${f.name}_${f.typeName}$`;
      g(indent, `var ${newRoot} = ${f.typeName}()`);
      g(indent, `if let ${newRoot$} = ${oldRoot$}["${f.name}"] as? [String: Any] {`)
      const child = types.find(x => x.name === f.typeName);
      gen(indent + 1, child, res, newRoot, newRoot$);
      g(indent, `}`)
      if (repeated) {
        g(indent, `${oldRoot}.${f.name}.append(${newRoot})`)
      } else {
        g(indent, `${oldRoot}.${f.name} = ${newRoot}`);
      }
    };
  
    const genChildRepeatedAssign = (f) => {
      const oldRoot = root;
      const oldRoot$ = root$
      const newRoot = `${f.name}_${f.typeName}`;
      const newRoot$ = `${f.name}_${f.typeName}$`;
      g(indent, `if let arr = ${oldRoot$}["${f.name}"] as? [[String: Any]] {`)
      g(indent + 1, `for item in arr {`)
      genChildAssign(indent + 2, f, true)
      g(indent + 1, `}`)
      g(indent, `}`)
    };
  
    for (let f of input.fields) {
      switch (f.type) {
        case 'string':
          genAssign(f, (c) => `String(describing: ${c})`)
          break;
        case 'int32':
          genAssign(f, (c) => `Int32(${c} as? Int ?? 0)`)
          break;
        case 'message':
          if (f.repeated) {
            genChildRepeatedAssign(f);
          } else {
            genChildAssign(indent, f, false)
          }
          break;
        default:
          throw new Error('unknow type');
      }
    }
    return res;
  }
  
  let res = []
  gen(0, input, res, 'root', 'root$');
  console.log(res.join('\n'))