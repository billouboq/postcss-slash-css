import postcss from "postcss";
import glob from "fast-glob";
import {getFileContent, formatAST} from "./utils";

export default postcss.plugin<RemoveDuplicateCSS.Options>('RemoveDuplicateCSS', (opts) => {
  if (!opts || !opts.targets) {
    throw new Error("This plugins needs an option object with a targets propertie");
  }

  return async (root) => {
    try {
      const cssFilesPath = await glob(opts.targets);

      for (let i = 0; i < cssFilesPath.length; i++) {
        const cssContent = await getFileContent(cssFilesPath[i]);
        const cssAst = postcss.parse(cssContent);
        const newAst = formatAST(cssAst);

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
      throw err;
    }
  };
});