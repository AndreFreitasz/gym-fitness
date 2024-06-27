import https from 'https';
import path from 'path';

const fetchJson = (options) => new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', (e) => reject(e));
    req.end();
});

const exercisesByBodyPart = async (bodyPart, baseOptions) => {
    const encodedBodyPart = encodeURIComponent(bodyPart);
    const exercisesOptions = {
        ...baseOptions,
        path: `/exercises/bodyPart/${encodedBodyPart}?limit=20`
    };
    return await fetchJson(exercisesOptions);
};

export const exercises = async (req, res) => {
    try {
        const bodyPartsOptions = {
            method: 'GET',
            hostname: 'exercisedb.p.rapidapi.com',
            path: '/exercises/bodyPartList',
            headers: {
                'x-rapidapi-key': '57e7fc9d61mshccb4c5c5118b7adp1df1fcjsn3e9cbefe01b9',
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
        };
        const bodyParts = await fetchJson(bodyPartsOptions);
        const results = {};

        for (const bodyPart of bodyParts) {
            const exercises = await exercisesByBodyPart(bodyPart, bodyPartsOptions);
            results[bodyPart] = { exercises };
        }

        res.json(results);
    } catch (error) {
        res.status(500).json({ 
            message: "Erro ao processar a requisição.",
            error: error.message
        });
    }
};