interface WordTypeCountI {
    [key: string]: number;
}

interface LambdaEventI {
    httpMethod: string;
    body: string;
}

interface LambdaResponseI {
    statusCode: number;
    headers?: { [key: string]: string };
    body: string;
}

interface VocabularyI {
    [key: string]: string[];
}

interface VocabularySetI {
    [key: string]: Set<string>;
}