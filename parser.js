import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';

const getAbsoluteFilePath = (filePath) => {
  const fileName = filePath.split('/').at(-1);

  return resolve(cwd(), '__fixtures__/', fileName);
};

const parseFileToObj = (filePath) => {
  const absoluteFilePath = getAbsoluteFilePath(filePath);
  const fileExtension = filePath.split('/').at(-1).split('.').at(-1);

  if (fileExtension === 'json') {
    return JSON.parse(readFileSync(absoluteFilePath));
  }

  return 'unknown file extension';
};

export default parseFileToObj;

console.log(getAbsoluteFilePath('file1.json'));
