class Sticky{
    constructor(selector,n){
        this.elements=$(selector);
        this.offset=n || 0;
        this.addPlaceholder();
        this.cacheOffsets();
        this.listenToScroll();
    }
    addPlaceholder(){
        this.elements.each((index,element)=>{
            $(element).wrap('<div class="stickyPlaceholder"></div>')
            $(element).parent().height($(element).height())
        })
    }
    cacheOffsets(){
        this.offsets=[];
        this.elements.each((index,element)=>{
            this.offsets[index]=$(element).offset()
        })
    }
    listenToScroll(){
        $(window).on('scroll',()=>{
            var scrollY=window.scrollY;
            this.elements.each((index,element)=>{
                var $element=$(element);
                if (scrollY + this.offset > this.offsets[index].top){
                        $element.addClass('sticky')
                }else {
                    $element.removeClass('sticky')
                }
            })
        })
    }
}

//调用
// new Sticky('#topbar');
// new Sticky('button',60);

// var buttonOffset=$('button').offset();
// $(window).on('scroll',function () {
//    var scrollY=window.scrollY;
//     if(scrollY>0){
//        $('#topbar').addClass('Sticky')
//     }else
//         $('#topbar').removeClass('Sticky');
//     if(scrollY +60 >buttonOffset.top){
//        $('button').addClass('Sticky')
//     }else {
//        $('button').removeClass('Sticky')
//     }
// });