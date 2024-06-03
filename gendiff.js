#!/usr/bin/env node
import { Command } from 'commander';
// eslint-disable-next-line import/no-extraneous-dependencies
import genDiff from './src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);

    console.log(result);
  });

program.parse();
