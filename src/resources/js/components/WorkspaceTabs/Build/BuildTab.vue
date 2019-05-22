<template>
    <div class="flex flex-col max-w-md mx-auto px-8 bg-white pt-4 h-full">        
        <img v-if="!this.results.length" src="/img/build.gif">

        <div class="flex flex-col mt-8 text-center" v-if="this.results.length">
            <div class="mx-auto my-4 font-semibold p-4 bg-white text-blue text-xs border rounded border-blue shadow">
                Success! The following files were injected
            </div>            
            <notification-card v-for="result in results" v-bind:key="result"
                :type="'info'"
                :message="result"
            ></notification-card>       
        </div>

        <button class="mt-4" @click="build()"
            :class="buttonStyle()"
        >{{buildLabel()}}</button>        
    </div>  
</template>

<script>
    import Config from '../../../Config.js'

    export default {
        data() {
            return {
                message: false
            }
        },


        methods: {
            build() {

                (async () => {
                    const rawResponse = await fetch('/skeleton/api/build', {
                        method: 'POST',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            reviewFiles: this.$store.state.reviewFiles.filter(file => {
                                return this.$store.state.selectedFiles[file.path]
                            }),
                            isSandboxed: Config.isSandboxed,
                            reverseHistory: Config.reverseHistory
                        })
                    });
                    const content = await rawResponse.json();

                    this.message = content.message
                    this.results = this.$store.state.reviewFiles.filter(file => {
                        return this.$store.state.selectedFiles[file.path]
                    }).map(file => file.path)
                })();
            },
            
            buildLabel() {
                return this.results.length ? "Clean & Rebuild!" : "Build!"
            },

            buttonStyle() {
                return 'bg-blue text-white border bg-white py-4 px-8 rounded'
            }
        },

        computed: {
            results: {
                get() {
                    return this.$store.state.builtFiles.sortByPath()
                },

                set(value) {
                    this.$store.dispatch('setBuiltFiles', 
                        JSON.parse(JSON.stringify(value))
                    )
                }
            }
        },

        mounted() {
            //
        }
    }
</script>