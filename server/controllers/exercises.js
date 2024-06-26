import https from 'https';

export function exercises(req, res) {
    const options = {
        method: 'GET',
        hostname: 'exercisedb.p.rapidapi.com',
        port: null,
        path: '/exercises', 
        headers: {
            'x-rapidapi-key': '57e7fc9d61mshccb4c5c5118b7adp1df1fcjsn3e9cbefe01b9',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
    };

    const reqApi = https.request(options, function (resApi) {
        let chunks = [];

        resApi.on('data', function (chunk) {
            chunks.push(chunk);
        });

        resApi.on('end', function () {
            const body = Buffer.concat(chunks);
            const data = JSON.parse(body.toString());
            res.json(data); 
        });
    });

    reqApi.on('error', function (error) {
        console.error('Erro ao consumir a API exerciseDB:', error);
        res.status(500).send('Internal Server Error');
    });

    reqApi.end();
}
