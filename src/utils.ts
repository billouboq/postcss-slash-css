import fs from "fs";

export function getFileContent(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err: Error, file: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(file);
      }
    });
  })
}

export function formatAST(ast) : AST.Node[] {
  return ast.nodes.map(({selector, nodes}) => {
    return {
      selector,
      props: nodes.map(({prop, value}) => ({prop, value}))
    }
  });
}