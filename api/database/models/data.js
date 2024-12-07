const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    uid: String, // unique id 
    current: Object, // stores current activity details
    recent: Object, // stores most recent or last activity details 
});

module.exports = mongoose.model('data', schema);

/* Current Activity Details Structure

    current: {
        file: {
            name: string,
            extension: string,
            language: string,
            lines: number,
            position: {
                line: number,
                column: number
            },
            size: string,
        },
        workspace: {
            name: string,
            path: string
        },
        debugger: boolean,
        errors: number,
    }

*/

/* Most Recent Activity Details Structure

    recent: {
        at: "Time Stamp",
        file: {
            name: string,
            extension: string,
            language: string,
            lines: number,
            position: {
                line: number,
                column: number
            },
            size: string,
        },
        workspace: {
            name: string,
            path: string,
        },
        debuggng: boolean,
        errors: number,
    }

*/