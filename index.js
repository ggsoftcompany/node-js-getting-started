const express = require('express')
const redis = require('redis')
const path = require('path')
const PORT = process.env.PORT || 5000

async function init(){
    const redisClient = redis.createClient({
        url: 'rediss://:GRIkw3TjFIrAKlqwSBntPOENpMaBUtyF3AzCaABKcpE=@ryder-whiplash.redis.cache.windows.net:6380',
    });

    await redisClient.connect();
    redisClient.on('connect', function() {
        console.log('Redis client connected');
    });
    redisClient.on('error',
        function (err) {
            console.log('Something went wrong ' + err);
        });

    express()
        .use(express.static(path.join(__dirname, 'public')))
        .set('views', path.join(__dirname, 'views'))
        .set('view engine', 'ejs')
        .get('/', async (req, res) => {
            //  await redisClient.set('key1', 'pepito');
            const value = await redisClient.get('key1');
            res.render('pages/index', {data: {name: value}});
        })
        .listen(PORT, () => console.log(`Listening on ${ PORT }`))
}

init().then(r => {});
