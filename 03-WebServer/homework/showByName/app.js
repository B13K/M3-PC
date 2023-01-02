var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor

http.createServer((req,res) => {

    const name = req.url.slice(1)
    console.log(name)
    const files = fs.readdirSync('./images');
    console.log(files)
    for(const file of files){
        if(file.includes(name)){   
            let ruta = `./images/${name}_doge.jpg`
            console.log(ruta)
            let img = fs.readFileSync(ruta)
            console.log(img)
            res.writeHead(200,{'Content-type': 'image/jpg'})
            res.end(img)
        }
    }


}).listen(3001, 'localhost')