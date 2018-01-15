/**
* Created by magefox on 17-11-15.
*/
<template>
    <div>
        <input v-model="val" :value="val" type="text" :placeholder="placeholder" :class="StyleClass" @change="ifChange($event)" @input="ifInput($event)">
    </div>
</template>

<script>
    export default{
        props:['maxlength','value','placeholder','type','disabled'],
        components: {},
        data: function () {
            return {
                val:this.value || this.value===0?this.value:'',
                Type:(this.type || 'text').toLowerCase(),
                StyleClass:'',
                Maxlength: this.maxlength || 10,
                message:'',
                placeholdertext:'',
            }
        },
        watch:{
            value:function(prev,now){
                if( this.value != this.formatVal(this.val) ){
                    this.val = this.value;
                }
            }
        },
        methods: {
            ifInput:function (event) {
                console.log(this.val)
                switch(this.Type){
                    case 'count':
                        this.val = this.intInputCheck(event.target.value);
                        break;
                    case 'idcard':
                        this.IDRegCheck(event.target.value);
                        break;
                    case 'text':
                        this.val = this.TextInputCheck(event.target.value);
                        break;
                    case 'phone':
                        this.val = this.PhoneInputCheck(event.target.value);
                        break;

                }
                this.$emit('input',this.val);
                this.$emit('inputCallback',event,this.val,this.message);
            },
            ifChange:function () {
                this.$emit('change',event,this.val);
            },
            /*check函数部分*/
            /*数字类型检测*/
            intInputCheck:function(value){
                return String(value).replace(/[^0-9]/ig,'');
            },
            /*身份证类型检测*/
            IDRegCheck:function (value) {
                const IDReg= /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (~~value.length===15 || ~~value.length===18){
                    this.message=IDReg.test(value)===true?"身份证校验通过":"身份证校验未通过,请修改或继续输入"
                }
            },
            /*文本类型检测*/
            TextInputCheck:function(value){
                return value.replace(/[^\u4e00-\uFAD90-9A-Za-z]/ig,'')
            },
            /*电话类型检测*/

        },
        created: function () {
        }

    }
</script>