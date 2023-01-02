var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

const port = 3001;
const host = 'localhost'

http.createServer((req, res) => {
  console.log("Server iniciado")
  let url = req.url
  console.log(url)

  if(url === '/'){
    const index = fs.readFileSync('./index.html', 'utf-8')
    res.writeHead(200, {'Content-type': 'text/html'})
    res.end(index)
    return
  }
  

  if(req.url === '/api'){
    res.writeHead(200, {'Content-type': 'text/json'});
    res.end(JSON.stringify(beatles))
    return;
  }

  let name = url
                .split('/')
                .pop()
                .replace('%20', ' ')

  console.log(name)

  if(url.includes('/api') && name){
    const beatle = beatles.filter(n => n.name === name)
    
    if(!beatle.length) return res.writeHead(404).end("Beatle no encontrado")

    res.writeHead(200, {'Content-type': 'text/json'})
    res.end(JSON.stringify(beatle))
    return
    
  }

  let nameBeatles = url.split('/').pop().replace('%20', ' ')

  console.log(nameBeatles)

  if(url.includes('/') && nameBeatles){
    const searchBeatle = beatles.filter(b => b.name === nameBeatles);
    console.log(searchBeatle)
    let html = fs.readFileSync('./beatle.html', 'utf-8');
    html = html.replace('{name}', searchBeatle[0].name);
    html = html.replace('{birthday}', searchBeatle[0].birthdate)
    html = html.replace('{image}', searchBeatle[0].profilePic)
    
    res.writeHead(200, {'Content-type': 'text/html'})
    res.end(html)
    return
  }

  
  res.writeHead(200, {'Content-type': 'text/json'})
  res.end(JSON.stringify({error: 'Pagina no encontrada'}))
  


}).listen(port, host)
