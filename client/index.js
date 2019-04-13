const program = require('commander');

const url='http://172.17.0.1' //change this with your docker ip-address
const put_url=url+':3000/put'
const get_url=url+':3000/get'
const watch_url=url+':8000'
var request = require('request');

program
  .version('0.0.1')
  .description('key value system');

program
  .command('put <key> <value>')
  .alias('p')
  .description('Put key value')
  .action((key,value) => {

    body={'body':{
      'key':key,'value':value
    }}

    request.post(
    put_url,
    { json: { key: key,value:value } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
    );
  });

program
  .command('get <key>')
  .alias('g')
  .description('Get key')
  .action((key) => {
    request.post(
    get_url,
    { json: { key: key} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
    );
  });

program
  .command('watch')
  .alias('g')
  .description('watch for changes')
  .action((key) => {

    const io = require('socket.io-client')(watch_url)

    socket = io.connect(url, {port: 8000, transports: ["websocket"]});

    io.on('connect',()=>{
      console.log('Connected to server to watch for changes')

      io.on('change',(msg)=>{
        console.log(msg)

      })
    })


  });



program.parse(process.argv);
