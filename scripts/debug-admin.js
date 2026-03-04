const { exec } = require('child_process');
const fs = require('fs');

console.log('Running create-admin.js...');
const child = exec('node scripts/create-admin.js', { cwd: process.cwd() });

let output = '';

child.stdout.on('data', (data) => {
    output += `STDOUT: ${data}\n`;
});

child.stderr.on('data', (data) => {
    output += `STDERR: ${data}\n`;
});

child.on('close', (code) => {
    output += `EXIT CODE: ${code}`;
    fs.writeFileSync('admin-debug.log', output);
    console.log('Finished. Check admin-debug.log');
});
