/**
* Created by magefox on 17-10-13.
*/
<template>
    <div class="login-container">
        <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <h3 class="title">系统登录</h3>

            <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="user" />
        </span>
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="邮箱" />
            </el-form-item>

            <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="password" />
        </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                          placeholder="密码" />
                <span class='show-pwd' @click='showPwd'><icon-svg icon-class="eye" /></span>
            </el-form-item>

            <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>

            <div class='tips'>账号:admin 密码随便填</div>
            <div class='tips'>账号:editor  密码随便填</div>

            <el-button class='thirdparty-button' type="primary" @click='showDialog=true'>打开第三方登录</el-button>
        </el-form>

        <el-dialog title="第三方验证" :visible.sync="showDialog">
            本地不能模拟，请结合自己业务进行模拟！！！<br/><br/><br/>
            邮箱登录成功,请选择第三方验证<br/>
            <social-sign />
        </el-dialog>

    </div>
</template>
<script>
    import router from "../../router/index.js"
    import ElForm from "element-ui/packages/form/src/form";
    import ElInput from "element-ui/packages/input/src/input";
       export default{
        props: [],
        components: {
            ElInput,
            ElForm},
           data() {
               const validateUsername = (rule, value, callback) => {
                   if (!isvalidUsername(value)) {
                       callback(new Error('请输入正确的用户名'))
                   } else {
                       callback()
                   }
               }
               const validatePassword = (rule, value, callback) => {
                   if (value.length < 6) {
                       callback(new Error('密码不能小于6位'))
                   } else {
                       callback()
                   }
               }
               return {
                   loginForm: {
                       username: 'admin',
                       password: '1111111'
                   },
                   loginRules: {
                       username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                       password: [{ required: true, trigger: 'blur', validator: validatePassword }]
                   },
                   pwdType: 'password',
                   loading: false,
                   showDialog: false
               }
           },
        methods: {
            switchChoose:function (link) {
              router.push(link)
            },
        },
        created: function () {
        }
    }

</script>
<style>
.sidebar {
    position: fixed;
    width: 300px;
    height: 100vh;
    box-shadow: 3px 5px 5px 1px;
}
.pagearea{
margin-left: 320px;
height:100vh;
    width: 83vw;
overflow: auto;
}
</style>