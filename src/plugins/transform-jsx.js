module.exports = function({ types: t }) {
  const jsxVisitor = {
    Program: {
      exit(path, state) {
        //仅向tsx文件中自动注入
        if(state.file.opts.filename.indexOf(".tsx") === -1){
          return ;
        }
        const hasImpTxsToElem = (path) => {
          return path.node.body.filter(p => p.type === 'ImportDeclaration').some(p => p.source.value.indexOf("createElement") !== -1);
        }
        // 注入 h 函数
        if (path.node.start === 0) {
          if (!hasImpTxsToElem(path)) {
            path.node.body.unshift(
              t.importDeclaration(
                [t.ImportSpecifier(t.identifier('createElement'), t.identifier('createElement'))],
                t.stringLiteral('@component/control/createElement')
              )
            )
          } else {
            const vueSource = path.node.body
              .filter(p => p.type === 'ImportDeclaration')
              .find(p => p.source.value == '@component/control/createElement')
            const key = vueSource.specifiers.map(s => (s.imported || s.local).name)
            if (key.includes('createElement')) {
            } else {
              vueSource.specifiers.unshift(t.ImportSpecifier(t.identifier('createElement'), t.identifier('createElement')))
            }
          }
        }
      }
    }
  }
  return {
    visitor: jsxVisitor
  }
}