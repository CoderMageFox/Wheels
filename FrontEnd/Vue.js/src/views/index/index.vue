/**
* Created by magefox on 17-10-13.
*/
<template>
    <div >
        <el-menu default-active="100" class="sidebar" theme="dark">
            <el-menu-item index="100" route="false" :disabled=false>
                Welcome
            </el-menu-item>
            <el-menu-item-group  v-for="items in  IndexMenu" :title="items.title">
                <el-menu-item v-for="components in items" v-if="components.index" :index="components.index">
                    <div @click="switchChoose(components.index)"><i class="el-icon-message"></i>{{components.msg}}</div>
                </el-menu-item>
            </el-menu-item-group>
        </el-menu>

        <router-view class="pagearea"></router-view>
    </div>
</template>
<script>
    import router from "../../router/index.js"
       export default{
        props: [],
        components: {},
        data: function () {
            return {
                IndexMenu:{
                    Basic:{
                        title: "Basic 基础",
                    },
                    Form:{
                        title:"Form 表单",
                            1:{
                                index: "commoninput",
                                msg: "带校验功能的Input/CommonInput",
                            },
                            2:{
                                index: "firstletterselect",
                                msg: "首字母检索选择组件/FirstletterSelect"
                            },
                            3:{
                            index: "uploader",
                            msg: "上传组件/uploader"
                            },

                    },
                    Notice:{
                        title:"Notice 通知",


                    },
                    Navigation:{
                        title:"Navigation 导航",
                        1:{
                            index: "navigation",
                            msg: "Tabs"
                        },

                    },
                    Others:{
                        title:"Others 其他",
                        1:{
                            index: "others",
                            msg: "日历/calendar"
                        },

                    },
                },
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