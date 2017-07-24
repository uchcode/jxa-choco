function registerUtilityWindowSubclass(argv={}) {
    registerWindowDelegateSubclass()
    if (!argv.methods) argv.methods = {}
    if (!argv.methods.init) argv.methods.init = function() {
        let _this = ObjC.super(this).initWithContentRectStyleMaskBackingDefer(
            $.NSMakeRect(200, 240, 480, 270),
            $.NSTitledWindowMask | $.NSClosableWindowMask | $.NSMiniaturizableWindowMask,
            $.NSBackingStoreBuffered,
            false
        )
        if (_this != undefined) {
            _this.identifier = 'AppWindow'
            _this.oneShot = true
            _this.delegate = $.ChocoWindowDelegate.alloc.init
            if (_this.initialize) _this.initialize($())
        }
        return _this
    }
    if (!argv.methods['setFrame:']) argv.methods['setFrame:'] = {
        types: ['void', ['NSRect']],
        implementation: function(rect) {
            this.setFrameDisplayAnimate(rect, true, true)
        }
    }
    registerSubclass({
        name: argv.name,
        superclass: 'NSWindow',
        protocols: argv.protocols,
        properties: argv.properties,
        methods: argv.methods,
    })
}
