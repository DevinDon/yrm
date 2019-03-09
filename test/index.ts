import { execSync } from 'child_process';

const active = execSync('yarn get registry').toString();
console.log(active.trim());
