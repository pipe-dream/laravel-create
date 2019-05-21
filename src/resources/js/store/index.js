import Vue from 'vue'
import Vuex from 'vuex'
import Parser from '../objectModel/SketchParser'
import ObjectModelCollection from '../objectModel/ObjectModelCollection'
import ObjectModelEntityFactory from '../objectModel/ObjectModelEntityFactory'
import Config from '../Config'
const mergeJSON = require('deepmerge')

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
    state: {
        // Keep track of active tabs in each section
        navigation: {
            showSplash: true,
            workspace: "Design",
            design: "Object model",
            template: "",
            review: "",
        },

        availablePipes: Config.FileFactory.pipes(),

        selectedPipes: Config.FileFactory.pipes().map(pipe => pipe.name),

        selectedFiles: {},

        sketch: "",

        reviewFiles: [],

        builtFiles: [],        

        templates: {},

        schema: {},

        preferences: Config.FileFactory.defaultPreferences(),
    },
    mutations: {
        navigate(state, {namespace, tab}) {
            state.navigation[namespace] = tab
        },

        setSketch(state, content) {
            state.sketch = content
        },

        setSchema(state, content) {
            state.schema = content
        },        

        setReviewFiles(state, files) {
            state.reviewFiles = files
            
            // set newly created files to selected
            files.filter(file => state.selectedFiles[file.path] === undefined )
                .forEach(file => {
                    state.selectedFiles[file.path] = true
            })
            
        },

        setReviewFile(state, file) {
            state.reviewFiles = state.reviewFiles.map(original => {
                return original.path == file.path ? file : original
            })
        },
        
        setTemplates(state, templates) {
            state.templates = templates
        },        

        setTemplate(state, file) {
            state.templates[file.name] = file.content
        },        

        setPreferences(state, preferences) {
            state.preferences = preferences
        },

        setBuiltFiles(state, files) {
            state.builtFiles = files
        },
        
        toggleSelectedPipe(state, name) {
            if(state.selectedPipes.includes(name)) {
                state.selectedPipes = state.selectedPipes.filter(pipe => pipe != name)
                return
            }

            state.selectedPipes = [
                ...state.selectedPipes,
                name
            ]
        },

        toggleSelectedFile(state, path) {
            state.selectedFiles[path] = !state.selectedFiles[path]
        }
    },
    actions: {
        navigate(context, payload) {
            context.commit('navigate', payload)
        },

        setSketch(context, sketch) {
            context.commit('setSketch', sketch)
            context.dispatch('compileSchema', sketch)
        },

        setSchema(context, schema) {
            context.commit('setSchema', schema)
            context.dispatch('compileFiles', schema)
            context.dispatch('setPreferences', schema)
        },  
        
        setPreferences(context, schema) {
            context.commit('setPreferences',
                mergeJSON(
                    context.state.preferences,
                    schema
                )
            )            
        },          
        
        compileFiles(context, schema) {
            // Make deep copy of schema to detach any previous bindings
            schema = JSON.parse(JSON.stringify(schema))

            let files = Config.FileFactory.from(
                ObjectModelCollection.fromSchema(schema)                   
            ).withPipes(
                context.state.availablePipes.filter(pipe => {
                    return context.state.selectedPipes.includes(pipe.name)
                })
            ).calculateFiles()

            context.commit('setReviewFiles', files)
        },
        
        compileSchema(context, sketch) {
            let schema = ObjectModelCollection.fromEntities(
                ObjectModelEntityFactory.fromSegments(
                    Parser.parse(sketch).segment()
                )
            ).serializeSchema()

            context.dispatch('setSchema', schema)
        },

        setTemplates(context) {
            fetch('/skeleton/api/templates').then(result => result.json()).then(templates => 
                context.commit('setTemplates', templates)
            )            
        },        

        setTemplate(context, file) {
            context.commit('setTemplate', file)
            context.dispatch('compileFiles', context.state.schema)
        },

        setReviewFile(context, file) {
            context.commit('setReviewFile', file)
            // set flag for modification
        },
        
        setBuiltFiles(context, files) {
            context.commit('setBuiltFiles', files)
        },
        
        toggleSelectedPipe(context, name) {
            context.commit('toggleSelectedPipe', name)
            context.dispatch('compileFiles', context.state.schema)
        },

        toggleSelectedFile(context, path) {
            context.commit('toggleSelectedFile', path)
        },        
    },
    getters: {
        templates: state => state.templates,
        preferences: state => state.preferences,
    },    
})