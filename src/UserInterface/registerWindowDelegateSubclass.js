function registerWindowDelegateSubclass() {
    if (!$.ChocoWindowDelegate) ObjC.registerSubclass({
        name:'ChocoWindowDelegate',
        protocols: ['NSWindowDelegate'],
        methods: {
            'windowWillClose:'(notification) {
                $.NSApplication.sharedApplication.terminate($())
            }
        }
    })
}
