
import defaultSchema from './preferences/defaultSchema'
import userSystemSketch from './sketches/userSystemSketch'
import sampleAppSketch from './sketches/sampleAppSketch'
import helpSketch from './sketches/helpSketch'
import collect from 'collect.js'
const pipes = require.context('./pipes', false, /\.js$/);

export default class FileFactory {
    constructor(objectModelCollection) {
        this.omc = objectModelCollection
    }

    static pipes() {
        return pipes.keys().filter(key => !key.includes('BasePipe')).map(key => pipes(key).default)

        // return [
        //     pipes("./UserPipe.js").default,
        //     pipes("./ModelPipe.js").default,
        //     pipes("./MigrationPipe.js").default,
        //     pipes("./ControllerPipe.js").default,
        //     pipes("./APIControllerPipe.js").default,
        //     pipes("./SeederPipe.js").default,            
        //     pipes("./FactoryPipe.js").default,                        
        //     pipes("./APIRoutesPipe.js").default,            
        // ]
    }

    static defaultSchema() {
        return defaultSchema;
    }

    static userSystemSketch() {
        return userSystemSketch;
    }
    
    static sampleApp() {
        return sampleAppSketch;
    }
    
    static helpApp() {
        return helpSketch;
    }    

    static from(objectModelCollection) {
        return new this(objectModelCollection)
    }

    withPipes(pipes) {
        this.pipes = pipes
        return this
    }

    calculateFiles() {
        return collect(this.pipes.map(pipe => {
            return pipe.with(this.omc).calculateFiles(this.omc)
        }).reduce((pipeFileList, allFiles) => {
            return allFiles.concat(pipeFileList)
        }, [])).sortBy('path').toArray();
    }
}