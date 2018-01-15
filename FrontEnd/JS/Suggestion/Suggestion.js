class Suggestion {
    constructor(options) {
        this.options = options
        this.$input = $(options.input)
        this.$input.wrap('<div class="suggestion"></div>')
        this.$wrapper = this.$input.parent();
        this.$ol = $('<ol></ol>');
        this.$input.after(this.$ol)
        this.$loading = $('<div class="suggestion-loading")</div>')
        this.$loading.html(this.options.loadingTemplate)
        this.$ol.after(this.$loading)
        this.bindEvents()
    }

    bindEvents() {
        this.$input.on('input', (e) => {
            let timerId
            if (timerId){
                window.clearTimeout(timerId)
            }
            timerId = setTimeout(() => {
                this.$wrapper.removeClass('suggestion-loading')
                this.options.search(e.currentTarget.value, (array) => {
                    this.$ol.empty()
                    array.forEach((text) => {
                        this.$ol.append($('<li></li>').text(text))
                    })

                },1000)
                timerId=undefined
            })
        })
    }
}

var s = new Suggestion({
    input: 'input',
    search: function (text, callback) {
        if(text === '0'){
            return callback([])
        }
        let array = []
        for (let i = 0; i < 5; i++) {
            var n = parseInt(Math.random() * 100, 10);
            array.push(text + n)
        }
        setTimeout(() => callback(array), 200)
    },
    loadingTemplate: '加载中',
    emptyTemplate:'找不到啊找不到'
});