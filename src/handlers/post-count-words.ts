import {vocabularySet} from "../vocabulary/vocabulary";

export const postCountWordsHandler = async (event: LambdaEventI): Promise<LambdaResponseI> => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid HTTP method. Only POST is allowed.' }),
        };
    }

    console.info('received:', event);
    const text = event.body;
    const wordArray = text.split(/\s+|\p{P}/u).filter(word => word.length > 0);

    const wordTypeCount: WordTypeCountI = Object.keys(vocabularySet).reduce((acc, type) => {
        acc[type] = 0;

        wordArray.forEach(word => {
            if (vocabularySet[type].has(word.toLowerCase())) {
                acc[type]++;
            }
        });

        return acc;
    }, {} as WordTypeCountI);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(wordTypeCount),
    };
};