#!/usr/bin/env node
import { Command } from 'commander';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

import parseFileToObj from './parser.js';

const program = new Command();

const genDiff = (dataFile1, dataFile2) => {
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

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const dataFile1 = parseFileToObj(filepath1);
    const dataFile2 = parseFileToObj(filepath2);

    const result = genDiff(dataFile1, dataFile2);

    console.log(result);
  });

program.parse();
