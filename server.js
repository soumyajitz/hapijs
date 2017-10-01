const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route([{
        method: 'GET',
        path: '/en',
        handler: function(request, reply) {
            reply('Hello');
        }
    },
    {
        method: 'GET',
        path: '/cn',
        handler: function(request, reply) {
            reply('Hello China');
        }
    }
]);

server.register({
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*'
            }
        }]
    }
    },(err) => {
    if(err) 
        throw err;

    server.start((err) => {
        if(err) {
            throw err;
        }
        console.log("Server running at:", server.info.uri);
    });
});