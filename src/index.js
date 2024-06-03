import _ from 'lodash';
import parseFileToObj from '../parser.js';

const genDiff = (filepath1, filepath2) => {
  const dataFile1 = parseFileToObj(filepath1);
  const dataFile2 = parseFileToObj(filepath2);

  const keysFile1 = Object.keys(dataFile1);
  const keysFile2 = Object.keys(dataFile2);

  const allKeys = _.union(keysFile1, keysFile2);
  const sortUniqKeys = _.uniq(allKeys).sort();

  const result = sortUniqKeys.reduce((acc, currentKey) => {
    let newAcc = acc;

    if (Object.hasOwn(dataFile1, currentKey) && Object.hasOwn(dataFile2, currentKey)) {
      if (dataFile1[currentKey] === dataFile2[currentKey]) {
        newAcc += `  ${currentKey}: ${dataFile1[currentKey]}\n`;

        return newAcc;
      }
      newAcc += `- ${currentKey}: ${dataFile1[currentKey]}\n`;
      newAcc += `+ ${currentKey}: ${dataFile2[currentKey]}\n`;

      return newAcc;
    }

    if (Object.hasOwn(dataFile2, currentKey)) {
      newAcc += `+ ${currentKey}: ${dataFile2[currentKey]}\n`;

      return newAcc;
    }

    newAcc += `- ${currentKey}: ${dataFile1[currentKey]}\n`;

    return newAcc;
  }, '');

  return `{\n${result}}`;
};

export default genDiff;
