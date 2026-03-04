const { exec } = require('child_process');
const fs = require('fs');

console.log('Running prisma generate...');
const child = exec('npx prisma generate', { cwd: process.cwd() });

let output = '';

child.stdout.on('data', (data) => {
    output += `STDOUT: ${data}\n`;
});

child.stderr.on('data', (data) => {
    output += `STDERR: ${data}\n`;
});

child.on('close', (code) => {
    output += `EXIT CODE: ${code}`;
    fs.writeFileSync('prisma-debug.log', output);
    console.log('Finished. Check prisma-debug.log');
});
