const util=require('util')
const exec=util.promisify(require('child_process').exec)
const crypto = require("node:crypto")

/*
  git add .
  git status
  git commit -m "Random id"
  git push
*/

function callBackFn(error,stdout,stderr){
    if(error){
        console.log(`error -- ${error}`)
    }
    if(stderr){
        console.log(`stderr -- ${stderr}`)
    }
    console.log(`stdout -- ${stdout}`)
}

async function gitAdd(){
    exec("git add .",(error,stdout,stderr)=>{
        callBackFn(error,stdout,stderr)
    })
}

async function gitStatus(){
    exec("git status",(error,stdout,stderr)=>{
        callBackFn(error,stdout,stderr)
    })
}
async function gitCommit(){
    const RandomString = crypto.randomBytes(16).toString('hex')
    exec(`git commit -m ${RandomString}`,(error,stdout,stderr)=>{
        callBackFn(error,stdout,stderr)
    })
}
async function gitPush(){
    exec("git push -u origin main",(error,stdout,stderr)=>{
        callBackFn(error,stdout,stderr)
    })
}
module.exports = {
    gitAdd,
    gitCommit,
    gitStatus,
    gitPush
} 