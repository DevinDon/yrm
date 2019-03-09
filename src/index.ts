#!/usr/bin/env node
import program from 'commander';
import { execSync } from 'child_process';

interface Register {
  [index: string]: {
    home: string;
    registry: string;
  };
}

const REGISTRY: Register = {
  yarn: {
    home: 'https://registry.yarnpkg.com',
    registry: 'https://registry.yarnpkg.com/'
  },
  cnpm: {
    home: 'http://cnpmjs.org',
    registry: 'http://r.cnpmjs.org/'
  },
  taobao: {
    home: 'https://npm.taobao.org',
    registry: 'https://registry.npm.taobao.org/'
  }
};

program
  .version('0.1.0')
  .option('--hello', 'Hello, world!');

program
  .command('list')
  .alias('ls')
  .description('list all registry')
  .action(() => {
    const active = execSync('yarn get registry').toString().trim();
    for (const key in REGISTRY) {
      if (REGISTRY.hasOwnProperty(key)) {
        const r = REGISTRY[key];
        console.log(`${active === r.registry ? '*' : ' '} ${key}\t${r.registry}`);
      }
    }
  });

program
  .command('use <registry>')
  .description('use special registry')
  .action(registry => {
    if (REGISTRY.hasOwnProperty(registry)) {
      const result = execSync(`yarn set registry ${REGISTRY[registry].registry}`).toString().trim();
      console.log(`Registry has been set: ${registry}`);
    } else {
      console.error(`No such registry: ${registry}`);
    }
  });

program
  .on('command:*', () => {
    console.error(`No such command, see -h.`);
  })
  .parse(process.argv);
