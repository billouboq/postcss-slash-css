import fs from "fs";

export function getContent(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, file) => {
      if (err) {
        reject(err);
      } else {
        resolve(file);
      }
    });
  })
}