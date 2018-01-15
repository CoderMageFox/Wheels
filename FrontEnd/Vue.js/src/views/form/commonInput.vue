/**
* Created by magefox on 17-11-15.
*/
<template>
    <div>
         <h1>CommonInput</h1>
        <p>封装了常用的输入校验的input框.</p>
        <ol>
            <li><span>输入类型:文本(不包含符号)</span>
                <span>&lt;commonInput type="text"&gt;</span>
                <commonInput type="text"></commonInput>
            </li>
            <li>输入类型:数字
                <span>&lt;commonInput type="count"&gt;</span>
                <commonInput type="count"></commonInput>
            </li>
            <li><span>输入类型:身份证(不包含符号)</span>
                此输入框会对输入的15/18位身份证格式进行简单校验,仅供参考.
                需要在该输入框内使用@inputCallback取得验证结果回调.
                <span>&lt;commonInput type="idcard"&gt;</span>
                <span>{{message||'无回调'}}</span>
                <commonInput type="idcard" @inputCallback="idcardCallback(message)"></commonInput>
            </li>
            <li>


            </li>
        </ol>



    </div>

</template>

<script>
    import commonInput from "../../wheels/commonInput.vue"
    export default{
        props: [],
        components: {commonInput},
        data: function () {
            return {

            }
        },
        methods: {
            idcardCallback:function (message) {
                console.log(message)
            }

        },
        created: function () {
        }

    }
</script>