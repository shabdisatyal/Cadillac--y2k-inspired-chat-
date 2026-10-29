// Make a websocket setup. 

// Why ? 
//For HTTP request you need to keep on asking for updates, too many requests. We want a open pipeline of connection

// Make sure you have websockets downloaded in your system


import { WebSocketServer } from "ws"; 

const wss= new WebSocketServer({port: 8080});

const client = new Set();

wss.on('connection',/* function {}*/ (ws)=> {
    client.add(ws);
    console.log('Client connection established. Total clients =  ${client.size}');

    ws.on('message', /*function 2*/ (data) => {
        const message = data.toString();

        //now we send that message to everyone except the one who sent 

        for (const person of client) {
            if ( person != ws && person.readyState ===1 ) {
                person.send(message);
            }

        }
 })

    ws.on('close', ()=> {


        client.delete(ws); 
        console.log('Client got disconnected. Remaining : ${client.size}');

        
    });




}); 


console.log ('Websocket server is running on ITTTTT wtv'); 