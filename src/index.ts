import postcss from "postcss";
import glob from "fast-glob";
import { getFileContent } from "./utils";

export default postcss.plugin<RemoveDuplicateCSS.Options>('RemoveDuplicateCSS', (opts) => {
  if (!opts || !opts.targets) {
    throw new Error("This plugins needs an option object with a targets propertie");
  }

  return async (root) => {
    try {
      // get all external targets files
      const cssFilesPath = await glob(opts.targets);
      const getFileContentPromises = cssFilesPath.map(filePath => getFileContent(filePath));
      const cssFilesContent = await Promise.all(getFileContentPromises);

      cssFilesContent.forEach(targetCSSContent => {
        const targetAST = postcss.parse(targetCSSContent).nodes;

        root.walkRules((rule) => {
          // search for duplicate selector
          const findedAst = targetAST.find(ast => ast.selector === rule.selector);

          if (findedAst) {
            rule.walkDecls(function(decl) {
              // if css properties are the sames (props and value) remove it
              if (findedAst.nodes.some(prop => prop.prop === decl.prop && prop.value === decl.value)) {
                decl.remove();
              }
            });

            // if selector doesn't have any props then remove selector
            if (!rule.nodes || !rule.nodes.length) {
              rule.remove();
            }
          }
        });
      });
    } catch (err) {
      throw err;
    }
  };
});
