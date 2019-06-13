import LaravelFileFactory from './fileFactories/Laravel/FileFactory'

let defaultSettings = {
    FileFactory: LaravelFileFactory,
    isSandboxed: true,
    reverseHistory: true,
}

export default {
    ... defaultSettings,
    ... __ENV__
}

