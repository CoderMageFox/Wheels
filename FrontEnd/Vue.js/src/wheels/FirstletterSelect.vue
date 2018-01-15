/**
* Created by magefox on 17-10-23.
*/
<template>
    <div>
        <input @input="getdata">
        <div class="name-select">
            <div class="name-select-left">
                <ul>
                    <li v-for="item,index in letterlist" class="select-letters" @click.stop="setRightScoll(item)">
            <span class="select-letters-inner">
              {{item}}
            </span>
                    </li>
                </ul>
            </div>
            <div class="name-select-right">
                <dl>
                    <dd v-for="item,index in brandList" class="select-brands" :class="[(index===firstJump)?'selected':'select-brands' ]" @click="setBrandValue(item)" >
                        {{item.ViewAutoBrandName}}
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['searchText'],
        components: {},
        data: function () {
            return {
                /*接口请求得到的数据*/

                /*首字母存储数组*/
                letterlist: [],

            }
        },
        methods: {
            getdata:function () {
                this.FetchData("/namelist")
            },
        },
        created: function () {
        }

    }
</script>
<style>

    .name-select{
        z-index: 1000;
        box-sizing: border-box;
        position: absolute;
        width: 210px;
        height: 575px;
        box-shadow:0 1px 5px 0 rgba(0,0,0,0.80);
    }
    /*左边部分*/
    .name-select-left{
        display:flex;
        flex-direction: column;
        height: 558px;
        width: 40px;
        float: left;
        border-right: 1px solid #d9d9d9;
        background-color: #f9f9f9;
        padding: 8px 0;
        text-align: center;
        font-size: 13px;
    }
    .select-letters{
        border-right: 1px solid #d9d9d9;
        font-size: 13px;
        height:5px;
        width: 40px;
    }
    .select-letters-inner{
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        display: block;
        margin: 2px auto;
        border-radius: 2px;
    }

    .select-letters-inner:hover{
        color: white;
        cursor: pointer;
        background-color: red;
    }

    /*右边部分*/
    .name-select-right{
        height: 558px;
        overflow-y: auto;
        overflow-x:hidden;
        display: block;
        font-size: 14px;
        color: #333;

    }
    .name-select-right .select-brands{
        height: 32px;
        line-height: 32px;
        overflow: hidden;
        display: block;
        padding: 0 0 0 10px;
        font-size: 14px;
        background-color: #f7f7f7;

    }
    .name-select-right .select-brands:hover{
        cursor: pointer;
        color: #ff4f53;
        background: #f7f7f7;
        text-decoration: none;
    }
    .name-select-right .selected{
        cursor: pointer;
        color: #ff4f53;
        background: #f7f7f7;
        text-decoration: none;
    }

</style>
