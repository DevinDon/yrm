import { execSync } from 'child_process';

const active = execSync('npm get registry').toString();
console.log(active.trim());
