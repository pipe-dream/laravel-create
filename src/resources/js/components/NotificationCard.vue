<template>
    <div :class="style()">
        <i class="fas fa-check-square mr-2"></i>
        {{ message }}
    </div>
</template>

<script>
export default {
    props: ['type', 'message'],
    
    methods: {
        styles() {
            return {
                warning: "bg-yellow-dark text-white",
                info: "bg-blue-light text-white",
                success: "bg-green-light text-white",
            }
        },

        style() {
            let defaultStyle = "info"
            let commonStyle = "flex p-1 justify-center items-center text-center rounded text-xs font-semibold mb-2"
            return [
                commonStyle,
                this.styles()[this.type ? this.type : defaultStyle]
            ].join(" ")
        }
    }
}
</script>