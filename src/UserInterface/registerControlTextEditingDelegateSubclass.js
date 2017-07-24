function registerControlTextEditingDelegateSubclass() {
    if (!$.ChocoControlTextEditingDelegate) ObjC.registerSubclass({
        name: 'ChocoControlTextEditingDelegate',
        protocols: ['NSControlTextEditingDelegate'],
        methods: {
            'control:textView:doCommandBySelector:': function(control, textView, commandSelector) {
                let result = false
                if (commandSelector == 'insertNewline:') {
                    textView.insertNewlineIgnoringFieldEditor(this)
                    return true
                }
                if (commandSelector == 'insertTab:') {
                    textView.insertTabIgnoringFieldEditor(this)
                    return true
                }
                return result
            },
        },
    })
}
