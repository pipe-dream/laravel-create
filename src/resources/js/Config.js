import LaravelFileFactory from 'laravel-file-factory'

let defaultSettings = {
    FileFactory: LaravelFileFactory,
    isSandboxed: true,
    reverseHistory: true,
}

export default {
    ... defaultSettings,
    ... __ENV__
}