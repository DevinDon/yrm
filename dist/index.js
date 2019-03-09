#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const child_process_1 = require("child_process");
const REGISTRY = {
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
commander_1.default
    .version('0.1.0')
    .option('--hello', 'Hello, world!');
commander_1.default
    .command('list')
    .alias('ls')
    .description('list all registry')
    .action(() => {
    const active = child_process_1.execSync('yarn get registry').toString().trim();
    for (const key in REGISTRY) {
        if (REGISTRY.hasOwnProperty(key)) {
            const r = REGISTRY[key];
            console.log(`${active === r.registry ? '*' : ' '} ${key}\t${r.registry}`);
        }
    }
});
commander_1.default
    .command('use <registry>')
    .description('use special registry')
    .action(registry => {
    if (REGISTRY.hasOwnProperty(registry)) {
        const result = child_process_1.execSync(`yarn set registry ${REGISTRY[registry].registry}`).toString().trim();
        console.log(`Registry has been set: ${registry}`);
    }
    else {
        console.error(`No such registry: ${registry}`);
    }
});
commander_1.default
    .on('command:*', () => {
    console.error(`No such command, see -h.`);
})
    .parse(process.argv);
