import fg from 'fast-glob'
const FULL_PATH = './src/db/models/*.js';
const RELATIVE_PATH = './models/';
const output: { [index: string]: any } = {};
const files: string[] = fg.sync([FULL_PATH], { dot: true, objectMode: false, ignore: ['./src/db/models/index.js'] })

files.forEach((file: string) => {
    const filename: string = file.split('/').pop()?.replace('.js', '') || '';
    if (filename) {
        output[filename] = require(RELATIVE_PATH + filename);
    }
});

export default output;