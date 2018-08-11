"use strict";

const { MODES } = require("./constants");

module.exports = {
  formatAST,
  getSingleFormatedAST,
}

function formatAST(ast) {
  const formatedAST = {};

  ast.forEach(item => {
    if (!formatedAST[item.selector]) {
      formatedAST[item.selector] = [];
    }

    item.nodes.forEach(({ prop, value }) => {
      formatedAST[item.selector].push(`${prop}|${value}`);
    });
  });

  return formatedAST;
}

function getSingleFormatedAST({asts, mode = MODES.ATLEAST_ONE} = {}) {
  if (!asts || !asts.length) {
    return {};
  }

  if (asts.length === 1) {
    return formatedASTs[0];
  }

  const singleAST = {};

  const formatForAtleastOne = () => {
    asts.forEach(ast => {
      Object.keys(ast).forEach(selector => {
        if (!singleAST[selector]) {
          singleAST[selector] = [];
        }

        ast[selector].forEach(prop => {
          singleAST[selector].push(prop);
        });
      });
    });
  };

  const formatForAll = () => {
    const firstAST = asts.shift();

    Object.keys(firstAST).forEach(selector => {
      const allHaveSelector = asts.every(singleAst => singleAst[selector]);

      if (allHaveSelector) {
        const properties = firstAST[selector];

        properties.forEach(propertie => {
          if (asts.every(singleAst => singleAst[selector].includes(propertie))) {
            if (!singleAST[selector]) {
              singleAST[selector] = [];
            }

            singleAST[selector].push(propertie);
          }
        });
      }
    });
  };

  if (mode === MODES.ATLEAST_ONE) {
    formatForAtleastOne();
  } else {
    formatForAll();
  }

  return singleAST;
}
