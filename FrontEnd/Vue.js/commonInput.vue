<template lang="pug">
    input(v-model="val",type="text",:class="StyleClass",:disabled="disabled?true:false",:maxlength="Maxlength",:placeholder="placeholder || ''",@change="iChange($event)",@input="iInput($event)",@focus="iFocus($event)",@blur="iBlur($event)",@keyup.enter="keyUpEnter($event)",@paste="iPaste")
</template>
<script>
  export default{
      props:['maxlength','value','placeholder','type','disabled'],
      data:function(){
          return {
            val:this.value || this.value===0?this.value:'',
            Type:(this.type || 'text').toLowerCase(),
            StyleClass:'',
            Maxlength: this.maxlength || 10
            /*
            * count
            * amount
            * text
            * */

          }
      },
      watch:{
          value:function(prev,now){
            if( this.value != this.formatVal(this.val) ){
                this.val = this.value;
            }
          }
      },
      methods:{
          formatVal:function (val) {
            switch (this.Type){
              case 'count':
              case 'amount':
                val = val===''?'':Number(val);
                break;
              case 'subamount':
              case 'subcount':
                val = val==='-'?0:val===''?'':Number(val);
                break;
              case 'english':
              case 'chinese':
              case 'plate':
              case 'phone':
              default:
                break;
            }
            return val;
          },

          iChange:function(event){
              this.$emit('change',event,this.val);
          },
          iInput:function(event){
              switch (this.Type){
                  case 'count':
                      this.val = this.intInputCheck(event.target.value);
                      break;
                  case 'amount':
                      this.val =  this.dbInputCheck(event.target.value);
                      break;
                  case 'subamount':
                      this.val = this.dbInputCheck2(event.target.value);
                      break;
                  case 'subcount':
                      break;
                  case 'english':
                      this.val = this.englishInputCheck(event.target.value);
                      break;
                  case 'chinese':
                      this.val = this.chineseInputCheck(event.target.value);
                      break;
                  case 'plate':
                      this.val = this.plateInputCheck(event.target.value)
                      break;
                  case 'phone':
                      this.val = this.intInputCheck(event.target.value);
                      break;
                  default:
                      break;
              }
              //console.log(this.val)
              this.$emit('input',this.formatVal(this.val));
              this.$emit('inputCallback',event,this.formatVal(this.val));
          },
          iFocus:function(event){
              switch (this.Type){
                  case 'count':
                  case 'amount':
                  case 'subamount':
                  case 'subcount':
                    this.numberFocus('','val');
                    break;
                  case 'english':

                    break;
                  case 'plate':

                    break;
                  default:
                    break;
              }
              this.$emit('focus',event,this.formatVal(this.val));
          },
          iBlur:function(event){
              switch (this.Type){
                  case 'count':
                  case 'amount':
                  case 'subamount':
                  case 'subcount':
                    this.numberBlur('','val');
                    break;
                  case 'english':

                    break;
                  case 'plate':

                    break;
                  default:
                    break;
              }
              this.$emit('blur',event,this.formatVal(this.val));
          },

          iPaste:function(event){
            this.$emit('paste',event);
          },

          fetchClass:function(){
              switch (this.Type){
                case 'count':
                case 'amount':
                case 'subamount':
                case 'subcount':
                    this.StyleClass = 'number';
                  break;
                case 'english':

                  break;
                case 'plate':
                  this.Maxlength = 6;
                  break;
                case 'phone':
                  this.Maxlength = 11;
                  break;
                default:
                  break;
              }
          },

          keyUpEnter:function(event){
              this.$emit('enter',event,this.val);
          },


          englishInputCheck:function(value){
              return value.replace(/[^a-z0-9]/ig,'');
          },


          dbInputCheck:function(value){
              var i = 0;
              value = String(value).replace(/[^0-9.]/ig,'');
              value = value.replace(/(\.)/g,function($0){
                return i++?'':$0;
              });
              return value;
          },

          dbInputCheck2:function(value){
              if(value=='-'){
                throw new Error();
              }
              if( value && String(value)[0]=='-' ){
                value = this.dbInputCheck(value);
                return value?value*-1:value;
              }
              return this.dbInputCheck(value);
          },

          intInputCheck:function(value){
            return String(value).replace(/[^0-9]/ig,'');
          },

          plateInputCheck:function(value){
              //this.val = e.target.value;
              return this.englishInputCheck(value).toUpperCase().substr(0,6);
          },
          chineseInputCheck:function(value){
              return value.replace(/[^\u4e00-\uFAD90-9A-Za-z]/ig,'')
          }
      },
      created:function(){
          this.val = this.value || '';
          this.fetchClass();
      }
  }
</script>
