"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const postcss_1 = __importDefault(require("postcss"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const getFileContent = util_1.default.promisify(fs_1.default.readFile);
exports.default = postcss_1.default.plugin('slashcss', (opts) => {
    if (!opts || !opts.targets) {
        throw new Error("This plugins needs an option object with a targets propertie");
    }
    return async (root) => {
        try {
            // get all external targets files
            const cssFilesPath = await fast_glob_1.default(opts.targets);
            const getFileContentPromises = cssFilesPath.map(filePath => getFileContent(filePath, "utf-8"));
            const cssFilesContent = await Promise.all(getFileContentPromises);
            cssFilesContent.forEach(targetCSSContent => {
                const targetsAST = postcss_1.default.parse(targetCSSContent).nodes;
                root.walkRules((rule) => {
                    // search for duplicate selector
                    const findedAst = targetsAST.find(ast => ast.selector === rule.selector);
                    if (findedAst) {
                        rule.walkDecls(function (decl) {
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
        }
        catch (err) {
            throw err;
        }
    };
});
