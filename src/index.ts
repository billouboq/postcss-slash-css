import postcss from "postcss";
import glob from "fast-glob";
import * as AST from "./ast/ast";
import * as files from "./files/files";

export default postcss.plugin('RemoveDuplicateCSS', (opts) => {
  return async (root, result) => {
    try {
      const cssFilesPath = await glob(opts.targets);

      for (let i = 0; i < cssFilesPath.length; i++) {
        const cssContent = await files.getContent(cssFilesPath[i]);
        const cssAst = postcss.parse(cssContent);
        const newAst = AST.format(cssAst);

        root.walkRules((rule) => {
          const findedAst = newAst.find(ast => ast.selector === rule.selector);

          if (findedAst) {
            rule.walkDecls(function(decl) {
              if (findedAst.props.some(prop => prop.prop === decl.prop && prop.value === decl.value)) {
                decl.remove();
              }
            });

            if (!rule.nodes || !rule.nodes.length) {
              rule.remove();
            }
          }
        });
      }
    } catch (err) {
      console.log("err", err);
      console.error(err);
    }
  };
});