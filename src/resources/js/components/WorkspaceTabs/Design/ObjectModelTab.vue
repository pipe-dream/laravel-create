<template>
    <div class="flex max-w-3xl mx-auto px-8 bg-white pt-8">
        <div class="flex-1 mr-2">           
            <div class="flex h-8 bg-blue text-white border text-center justify-center items-center text-sm">sketch</div>
            <code-editor
                class="w-full bg-grey-lightest rounded p-2 text-sm border" 
                v-model="objectModelNotes"
                lang="json"
                :placeholder="placeholder"
            ></code-editor>
            <div class="mt-1">
                <button @click="addUserSystem()" :class="buttonStyle">+ user system</button>
                <button @click="replaceWithSampleApp()" :class="buttonStyle">sample app</button>
                <button @click="replaceWithHelpApp()" :class="buttonStyle">help</button>
            </div>             

        </div>
        <div class="flex-1 ml-2">
            <div class="flex h-8 bg-grey-lighter border text-center justify-center items-center text-sm">schema</div>
            <code-editor
                class="w-full bg-grey-lightest rounded p-2 text-sm border" 
                v-model="schema"
                lang="json"
            ></code-editor>
            <div class="mt-1">
                <button :class="buttonStyle">+ some action</button>
            </div>                        
        </div>
    </div>  
</template>

<script>

    import Config from '../../../Config'

    export default {
        data() {
            return {
                buttonStyle: "ml-2 text-xs border p-1 rounded shadow bg-white text-black px-2",
                // How to make a multiline placeholder?
                placeholder: "Start typing here. Click the buttons below to get some help on the syntax. "
            }
        },

        computed: {
            objectModelNotes: {
                get() {
                    return this.$store.state.objectModelNotes            
                },

                set(value) {
                    this.$store.dispatch('setObjectModelNotes', value)
                }
            },

            schema: {
                get() {
                    return JSON.stringify(this.$store.state.schema, null, 4)
                },

                set(value) {
                    try {
                        let data = JSON.parse(value)
                        this.$store.dispatch('setSchema', data)
                    } catch(SyntaxError) {
                        // await fix by user
                    }
                }
            }
                                
        },

        methods: {
            addUserSystem() {
                this.$store.dispatch('setObjectModelNotes', 
                    this.objectModelNotes + Config.FileFactory.userSystemSketch()
                )
            },

            replaceWithSampleApp() {
                this.$store.dispatch('setObjectModelNotes', 
                    Config.FileFactory.sampleApp()
                )
            },
            
            replaceWithHelpApp() {
                this.$store.dispatch('setObjectModelNotes', 
                    Config.FileFactory.helpApp()
                )
            },            
        }
    }
</script>