const util = require('util');
const exec = util.promisify(require('child_process').exec);
const crypto = require("node:crypto");

async function gitAdd() {
    try {
        const { stdout, stderr } = await exec("git add .");
        if (stderr) {
            console.log(`stderr -- ${stderr}`);
        }
        console.log(`stdout -- ${stdout}`);
    } catch (error) {
        console.log(`error -- ${error}`);
    }
}

async function gitStatus() {
    try {
        const { stdout, stderr } = await exec("git status");
        if (stderr) {
            console.log(`stderr -- ${stderr}`);
        }
        console.log(`stdout -- ${stdout}`);
    } catch (error) {
        console.log(`error -- ${error}`);
    }
}

async function gitCommit() {
    const RandomString = crypto.randomBytes(16).toString('hex');
    try {
        const { stdout, stderr } = await exec(`git commit -m "${RandomString}"`);
        if (stderr) {
            console.log(`stderr -- ${stderr}`);
        }
        console.log(`stdout -- ${stdout}`);
    } catch (error) {
        console.log(`error -- ${error}`);
    }
}

async function gitPush() {
    try {
        const { stdout, stderr } = await exec("git push");
        if (stderr) {
            console.log(`stderr -- ${stderr}`);
        }
        console.log(`stdout -- ${stdout}`);
    } catch (error) {
        console.log(`error -- ${error}`);
    }
}

module.exports = {
    gitAdd,
    gitCommit,
    gitStatus,
    gitPush
};
