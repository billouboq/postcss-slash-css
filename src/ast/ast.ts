/// <reference path="./ast.d.ts" />

export function format(ast) : AST.Node[] {
  return ast.nodes.map(({selector, nodes}) => {
    return {
      selector,
      props: nodes.map(({prop, value}) => ({prop, value}))
    }
  });
}