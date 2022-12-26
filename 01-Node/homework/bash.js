const commands = require('./commands/index.js')
const cmd = 'pwd';

//output un prompt

process.stdout.write('prompt > ');

// El evento stdin 'data' se diapara cuando el user escribe una linea

// process.stdin.on('data', function(data) {
//     var cmd = data.toString().trim(); // remueve la nueva linea
//     process.stdout.write('You typed: ' + cmd);
//     process.stdout.write('\nprompt > ');
// });

// process.stdin.on('data', function(data) {
//     var cmd = data.toString().trim(); // remueve la nueva linea
//     if(cmd === 'date') {
//         process.stdout.write(Date());
//     }
//     if(cmd === 'pwd') {
//         process.stdout.write(process.cwd())
//     }
//     process.stdout.write('\nprompt > ');
// });

function print(input){
    process.stdout.write(input + '\n')
    process.stdout.write('prompt > ')
}

process.stdin.on('data', function(data){
    let cmd = data.toString().trim().split(' ');
    let arg = cmd.shift();
    
    commands[arg] ? commands[arg](cmd, print) : print("command invalid")
})

