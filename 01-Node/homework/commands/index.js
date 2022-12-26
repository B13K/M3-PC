const fs = require('fs')
const request = require('request')

function ls(args, print){
    fs.readdir('.', function(err, files) {
       err
        ? console.log(err) : print(files.join('\n'))
    })
}

function echo(args, print){
    print(args.join(' '))
}

function pwd(args, print){
    print(__dirname.split('\\').at(-1))
}

function date(args, print){
    print(Date())
}

function head(args, print){
    fs.readFile(args[0], 'utf-8', (err, data) => {
        err
            ? print(err)
            : print(data.split('\n').splice(0,5).join('\n'))
    })
}
function tail(args, print) {
    fs.readFile(args[0], 'utf-8', (err, data) => {
        err 
            ? print(err)
            : print(data.split('\n').slice(-5).join('\n'))
    })
}

function curl(args, print){
    request(args[0], (err, data) => {
        console.log(data)
    })
}

module.exports = {
    ls,
    echo,
    pwd,
    date,
    head,
    tail,
    curl

}