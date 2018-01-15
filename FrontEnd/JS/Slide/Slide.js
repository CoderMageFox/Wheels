class Slide {
    constructor(options) {
        this.options = options
        this.$element = $(this.options.element)
        this.$element.addClass('Slides')
        this.timer=undefined;
        this.$ol = this.$element.children('ol')
        const firstImg=this.$ol.children('li:first-child').clone()
        const lastImg=this.$ol.children('li:last-child').clone()
        this.$ol.append(firstImg);
        this.$ol.prepend(lastImg);
        this.$items = this.$ol.children('li')
        this.width = this.$ol.children('li').width()
        this.$element.width(this.width)
        this.$prev = $('<button class="slides-prev">上一张</button>').on('click',()=>{
            this.prev()
        })
        this.$element.append(this.$prev)
        this.$next = $('<button class="slides-next">下一张</button>').on('click',()=>{
            this.next()
        })
        this.$element.append(this.$next)
        this.current = 0;
        this.go(0)
        if(this.options.autoPlay){
            this.play()
            this.$element.on('mouseenter',()=>{
                this.stop();
            }).on('mouseleave',()=>{
                this.play()
            })
        }




    }
    gotoTrans(target){
        this.$ol.css({
            transform: `translateX(${-target * this.width }px`})
    }
    go(index) {
        if (index > this.$items.length-1) {
            this.$ol.css({
                transition: `none`})
            this.gotoTrans(1)
            index=1;
        } else if (index < 1) {
            this.$ol.css({
                transition: `none`})
            this.gotoTrans(this.$items.length-1)
            index = this.$items.length - 2
            /*实际长度为原length+2*/
        }else
        {
            this.gotoTrans(index)
            this.$ol.css({
                transition: ` all 1s`})


        }
        this.current = index
    }

    next() {
        this.go(this.current + 1)
    }

    prev() {
        this.go(this.current - 1)
    }
    play(){
        this.timer=setInterval(()=>{
            this.go(this.current+1)
        },2000)
    }
    stop(){
        window.clearInterval(this.timer)
    }
}

var slide = new Slide({
    element: '.slides',
    autoPlay: true,
    controls: false,
    pager: false
});