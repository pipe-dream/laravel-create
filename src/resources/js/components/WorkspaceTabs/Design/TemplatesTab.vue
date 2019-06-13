<template>
    <div class="flex flex-col max-w-3xl mx-auto px-8 bg-white pt-4">
        <HintBox :message="hintMessage"></HintBox>
        <div class="flex w-full">
            <div class="flex flex-1 text-sm">
                <div class="flex flex-col bg-white text-xs border">
                    <div v-for="file in templates"
                        :key="file.name"
                        :class="listingStyleFor(file)"
                        @click="tab = file.name; $store.dispatch('navigate', {namespace: 'template', tab})"
                    >
                        {{ file.name }}
                    </div>
                </div>
                <div class="flex flex-col flex-1 bg-white ml-2 border p-2">
                    <code-editor
                        class="w-full bg-white rounded text-sm" 
                        v-model="activeFileContent"
                        lang="php"
                    ></code-editor>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
    export default {
        data() {
            return {
                hintMessage: "Here you can modify the templates used to create your files."
            }
        },

        computed: {
            templates() {
                return Object.keys(this.$store.state.templates).map(key => {
                    return {
                        name: key,
                        content: this.$store.state.templates[key]
                    }
                })
            },

            activeFileContent: {
                get() {
                    let activeFile = this.templates.find(
                        file => this.isActiveFile(file)
                    )

                    if(!activeFile) {
                        activeFile = this.templates[0]
                        this.$store.dispatch('navigate', {
                            namespace: 'template', 
                            tab: activeFile.name
                        })
                    }

                    return activeFile ? activeFile.content : ""
                },

                set(content) {
                    if(!this.activeFile()) return;
                    this.$store.dispatch('setTemplate', {
                        name: this.activeFile().name,
                        content: content
                    })
                }
            }            
        },

        methods: {
            activeFile() {
                return this.templates.find(
                    file => this.isActiveFile(file)
                )
            },

            isActiveFile(file) {
                return file.name == this.$store.state.navigation.template
            },

            listingStyleFor(file) {
                let common = 'px-2 py-2 flex hover:bg-grey-lighter '
                let passive = 'bg-white'
                let active = 'bg-blue text-white hover:bg-blue'
                return this.isActiveFile(file) ? common + active : common + passive
            }
        }        

        
    }
</script>