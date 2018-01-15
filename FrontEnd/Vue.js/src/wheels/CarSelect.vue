/**
* Created by magefox on 17-10-16.
*/
<template>
    <div>
      <div class="car-select">
     <div class="car-select-left">
        <ul>
          <li v-for="item,index in letterlist" class="select-letters" @click.stop="setRightScoll(item)">
            <span class="select-letters-inner">
              {{item}}
            </span>
          </li>
        </ul>
     </div>
     <div class="car-select-right">
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
    props: ['NameList','searchText'],
    components: {},
    data: function () {
      return {
        /*首字母存储数组*/
        letterlist: [],
        /*车牌首个汉字存储数组*/
        firstBrandNameLetter:[],
        firstJump:0,

      }
    },
    watch:{
      searchText(curVal){
        let FirstJump
        /*英文首字符判断*/
        this.brandList.forEach((item,index) => {
          if (item.FirstLetter === curVal.toUpperCase()) {
            if(!FirstJump){
              FirstJump=index
            }
            document.querySelector('.car-select-right').scrollTop = 32*(FirstJump)
          }
        })
        /*中文首字符判断*/
        this.firstBrandNameLetter.forEach((item,index)=>{
            if (curVal[0] === item){
              if(!FirstJump){
                FirstJump=index
              }
              document.querySelector('.car-select-right').scrollTop = 32*(FirstJump)
            }
        })
        /*中文全称判断*/
        this.brandList.forEach((item,index) => {
          if (item.AutoBrandName === curVal) {
            FirstJump=index
            document.querySelector('.car-select-right').scrollTop = 32*(FirstJump)
          }
        })
       this.firstJump=FirstJump
      }
    },
    methods: {
      formatBrand (data) {
        let arr = [],
          prevLetter = '',
          itemList;
        data.forEach(item => {
          if( prevLetter!== item.FirstLetter ){
            prevLetter = item.FirstLetter;
            itemList && arr.push(itemList);
            itemList = {FirstLetter:item.FirstLetter,itemList:[]};
          }
          itemList.itemList.push(item);
        });
        arr.push(itemList);
        arr.forEach(item=>{
            this.letterlist.push(item.FirstLetter)
        })
        arr.forEach(item=>{
          item.itemList.forEach((brand)=>{
            this.firstBrandNameLetter.push(brand.AutoBrandName[0])
        })
        })

      },
      setRightScoll: function (sortitem) {
        console.log(this.brandList)
        let FirstJump
        /*document.querySelector('.car-select-right').scrollTop +=32*/
        this.brandList.forEach((item,index) => {
          if (item.FirstLetter === sortitem) {
            if(!FirstJump){
              FirstJump=index
            }
            document.querySelector('.car-select-right').scrollTop = 32*(FirstJump)
        }})
        /*  if (item.FirstLetter == String.fromCharCode(65 + sortnum)) {
            if(!FirstJump){
              FirstJump=index
              console.log(index)
            }
            document.querySelector('.car-select-right').scrollTop = 32*(FirstJump)
          }
        })*/
      },
      setBrandValue:function (item) {
        let name = item.AutoBrandName
        let ID = item.AutoBrandID
        this.$emit('callback' , name , ID)
      }
    },
    created: function () {
      this.formatBrand(this.brandList)
    }
  }
</script>
<style>

.car-select{
  z-index: 1000;
  box-sizing: border-box;
  margin-left:109px;
  position: absolute;
  width: 210px;
  height: 575px;
  box-shadow:0 1px 5px 0 rgba(0,0,0,0.80);
}
/*左边部分*/
  .car-select-left{
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
.car-select-right{
  height: 558px;
  overflow-y: auto;
  overflow-x:hidden;
  display: block;
  font-size: 14px;
  color: #333;

}
.car-select-right .select-brands{
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  display: block;
  padding: 0 0 0 10px;
  font-size: 14px;
  background-color: #f7f7f7;

}
.car-select-right .select-brands:hover{
  cursor: pointer;
  color: #ff4f53;
  background: #f7f7f7;
  text-decoration: none;
}
.car-select-right .selected{
  cursor: pointer;
  color: #ff4f53;
  background: #f7f7f7;
  text-decoration: none;
}

</style>
