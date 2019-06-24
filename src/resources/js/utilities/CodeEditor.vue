<!--
    vue2-ace-editor (https://github.com/chairuosen/vue2-ace-editor)
    uses brace. There is a bug not allowing php highlighting ( and 50+ issues and unanswered PR:s at brace...) 
    To temporary solve this BraceWithBugFix.js is introduced. 
    Its a copy of brace/index.js with this fix:
    https://github.com/thlorenz/brace/issues/55
-->

<style>
    .ace_gutter-cell {
        background: white;
    }

    .ace_gutter-layer {
        background: white;
        border-right: 1px solid #F1F5F8;
    }
</style>


<script>

var ace = require('./BraceWithBugFix');

module.exports = {
    render: function (h) {
        var height = this.height ? this.px(this.height) : '100%'
        var width = this.width ? this.px(this.width) : '100%'
        return h('div',{
            attrs: {
                style: "height: " + height  + '; width: ' + width,
            }
        })
    },
    props:{
        value:{
            type:String,
            required:true
        },
        lang:String,
        theme:String,
        height:true,
        width:true,
        options:Object,
        placeholder: {
            type: String,
            default: ""
        },
        showGutter: {
            type: Boolean,
            default: false
        },        
    },
    data: function () {
        return {
            editor:null,
            contentBackup:""
        }
    },
    methods: {
        px:function (n) {
            if( /^\d*$/.test(n) ){
                return n+"px";
            }
            return n;
        },

        updatePlaceholder: (editor) => {
            var shouldShow = !editor.session.getValue().length;
            var node = editor.renderer.emptyMessageNode;
            if (!shouldShow && node) {
                editor.renderer.scroller.removeChild(editor.renderer.emptyMessageNode);
                editor.renderer.emptyMessageNode = null;
            } else if (shouldShow && !node) {
                node = editor.renderer.emptyMessageNode = document.createElement("div");
                // How to make a multiline placeholder?
                node.textContent = editor.placeholder
                node.className = "ace_invisible ace_emptyMessage"
                node.style.padding = "0 9px 0 9px"
                editor.renderer.scroller.appendChild(node);
            }
        }
    },
    watch:{
        value:function (val) {
            if(this.contentBackup !== val){
                this.editor.session.setValue(val,1);
                this.contentBackup = val;
            }
        },
        theme:function (newTheme) {
            this.editor.setTheme('ace/theme/'+newTheme);
        },
        lang:function (newLang) {
            this.editor.getSession().setMode('ace/mode/'+newLang);
        },
        options:function(newOption){
            this.editor.setOptions(newOption);
        },
        height:function(){
            this.$nextTick(function(){
                this.editor.resize()
            })
        },
        width:function(){
            this.$nextTick(function(){
                this.editor.resize()
            })
        }
    },
    beforeDestroy: function() {
        this.editor.destroy();
        this.editor.container.remove();
    },
    mounted: function () {
        var vm = this;
        var lang = this.lang||'text';
        var theme = this.theme||'chrome';

        require('brace/ext/emmet');
        require('brace/theme/chrome')
        require('brace/ext/language_tools') //language extension prerequsite...        
        require('brace/mode/' + lang)    
        var editor = vm.editor = ace.edit(this.$el);
        editor.placeholder = this.placeholder

        this.$emit('init',editor);                
        
        editor.$blockScrolling = Infinity;
        //editor.setOption("enableEmmet", true);
        editor.getSession().setMode('ace/mode/'+lang);
        editor.setTheme('ace/theme/'+theme);
        editor.setValue(this.value,1);
        this.contentBackup = this.value;

        editor.on('change',() => {
            var content = editor.getValue();
            vm.$emit('input',content);
            vm.contentBackup = content;
            this.updatePlaceholder(editor)
        });

        setTimeout(this.updatePlaceholder(editor), 100);

        editor.setOptions({
            minLines: 20,
            maxLines: 1000,  
            showLineNumbers: false,
            showGutter: this.showGutter,
            highlightActiveLine: false,   
            //inline: true,
            showPrintMargin: false,
            ...(vm.options ? vm.options : {})
        });
    }
}

</script>