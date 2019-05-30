<template>
<div class="list-reset flex bg-black p-4">
    <div class="flex flex-1">
        <div class="flex items-center flex-no-shrink text-white mr-2"
            @click="$store.dispatch('navigate', {namespace: 'showSplash', tab: true})"
        >
            <!-- modified from: https://fontawesome.com/icons/ring?style=solid thanks! -->
            <img src="/vendor/ajthinking/skeleton/img/logo.svg" width="28" height="28" viewBox="0 0 54 54">
            <a title="github" href="https://github.com/ajthinking" target="_blank" class="hover:text-blue-darker no-underline text-white">
                <span class="font-semibold text-xl tracking-tight ml-2">Pipe Dream</span>
            </a>
        </div>    
        <div class="flex mr-2 items-center">
            <a class="text-sm text-white hover:text-blue-darker no-underline" href="https://github.com/laravel/laravel" target="_blank">/ laravel</a>
        </div>
    </div>
</div>
</template>

<script>
    import Config from '../Config'

    export default {
        data() {
            return {
                appName: Config.appName
            }
        }
    }
</script>
