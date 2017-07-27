function registerWindowDelegateSubclass() {
    if (!$.ChocoWindowDelegate) ObjC.registerSubclass({
        name:'ChocoWindowDelegate',
        protocols: ['NSWindowDelegate'],
        methods: {
            'windowWillClose:'(notification) {
                try { if (quit()==false) return } catch(e) {}
                $.NSApplication.sharedApplication.terminate($())
            }
        }
    })
}
