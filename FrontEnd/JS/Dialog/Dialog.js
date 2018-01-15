class Dialog {
    constructor(options) {
        this.options = options;
        this.init()
    }

    init() {
        let {title, content, buttons} = this.options;
        let $buttons = buttons.map((buttonOption) => {
            let $b = $('<button></button>')
            $b.text(buttonOption.text)
            $b.on('click', buttonOption.action)
            return $b
        })
        var template = `
        <div class="dialog">
        <div class="dialog-wrapper">
        <header class="dialog-header">${title}</header>
        <main class="dialog-main">${content}</main>
        <footer class="dialog-footer"></footer>
        </div>
        </div>
        `
        var $dialog = $(template);
        $dialog.find('footer').append($buttons);
        $dialog.addClass(this.options.className);
        this.$dialog = $dialog
    }

    open() {
        this.$dialog.appendTo('body')
    }

    close() {
        this.$dialog.detach()
    }

}

x.onclick = function () {
    var dialog = new Dialog({
        title: '标题',
        content: '<b>欢迎</b>',
        className:'user-class',
        buttons: [{
            text: '确定',
            action: function () {
                setTimeout(() => {
                    dialog.close()
                })
            }

        }, {
            text: '取消',
            action: function () {
                dialog.close()
            }

        }]

    })
    dialog.open()
};
