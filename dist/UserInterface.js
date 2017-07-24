const UserInterface = (()=>{
    
    function Button(fun = ()=>{}) {
        let r = $.NSMakeRect(0, 0, 90, 26)
        let b = $.NSButton.alloc.initWithFrame(r)
        b.bezelStyle = $.NSRoundedBezelStyle
        fun(b)
        return b
    }
    
    function CheckBoxButton(fun = ()=>{}) {
        let r = $.NSMakeRect(0, 0, 26, 26)
        let b = $.NSButton.alloc.initWithFrame(r)
        b.buttonType = $.NSSwitchButton
        fun(b)
        return b
    }
    
    function DockMenu(argv={}) {
        if (!argv.name) argv.name = 'ChocoDockMenu'
        return StatusItemMenu(argv)
    }
    
    function GraphicalDatePicker(fun = ()=>{}) {
        let r = $.NSMakeRect(0, 0, 26, 26)
        let p = $.NSDatePicker.alloc.initWithFrame(r)
        p.drawsBackground = true
        p.datePickerElements = $.NSYearMonthDayDatePickerElementFlag
        p.datePickerStyle = $.NSClockAndCalendarDatePickerStyle
        p.dateValue = $.NSDate.date
        fun(p)
        return p
    }
    
    function Label(fun = ()=>{}) {
        let r = $.NSMakeRect(0, 0, 200, 22)
        let t = $.NSTextField.alloc.initWithFrame(r)
        t.drawsBackground = false
        t.bordered = false
        t.editable = false
        t.selectable = true
        fun(t)
        return t
    }
    
    function Line(fun = ()=>{}) {
        let r = $.NSMakeRect(0, 0, 0, 0)
        let b = $.NSBox.alloc.initWithFrame(r)
        b.boxType = $.NSBoxSeparator
        fun(b)
        return b
    }
    
    function Menu(fun = ()=>{}) {
        let m = $.NSMenu.alloc.init
        fun(m)
        return m
    }
    
    function MenuItem(fun = ()=>{}) {
        let i = $.NSMenuItem.alloc.init
        fun(i)
        return i
    }
    
    function MenuSeparator() {
        return $.NSMenuItem.separatorItem
    }
    
    function PopUpButton(fun = ()=>{}) {
        let p = $.NSPopUpButton.alloc.initWithFrame($.NSMakeRect(0, 0, 90, 26))
        fun(p)
        return p
    }
    
    function RadioButton(fun = ()=>{}) {
        let r = $.NSMakeRect(0, 0, 26, 26)
        let b = $.NSButton.alloc.initWithFrame(r)
        b.buttonType = $.NSRadioButton
        fun(b)
        return b
    }
    
    function Rect(x, y, w, h) {
        return $.NSMakeRect(x, y, w, h)
    }
    
    function RightTextAlignment() {
        return $.NSRightTextAlignment
    }
    
    function ShoeboxWindow(argv={}) {
        let n = argv.name ? argv.name : 'ChocoShoeboxWindow'
        registerShoeboxWindowSubclass({
            name: n,
            protocols: argv.protocols,
            properties: argv.properties,
            methods: argv.methods,
        })
        return $[n].alloc.init
    }
    
    function Sound(path, fun=()=>{}) {
        let s = $.NSSound.alloc.initWithContentsOfFileByReference(path, true)
        fun(s)
        return s
    }
    
    function StatusItem(fun = ()=>{}) {
        let i = $.NSStatusBar.systemStatusBar.statusItemWithLength($.NSVariableStatusItemLength)
        fun(i)
        return i
    }
    
    function StatusItemMenu(argv={}) {
        let n = argv.name ? argv.name : 'ChocoStatusItemMenu'
        registerSubclass({
            name: n,
            superclass: 'NSMenu',
            protocols: argv.protocols,
            properties: argv.properties,
            methods: argv.methods,
        })
        return $[n].alloc.init
    }
    
    function TextDatePicker(fun = ()=>{}) {
        let r = $.NSMakeRect(0, 0, 26, 26)
        let p = $.NSDatePicker.alloc.initWithFrame(r)
        p.drawsBackground = true
        p.datePickerElements = $.NSYearMonthDayDatePickerElementFlag
        p.datePickerStyle = $.NSTextFieldAndStepperDatePickerStyle
        p.dateValue = $.NSDate.date
        fun(p)
        return p
    }
    
    function TextField(fun = ()=>{}) {
        let r = $.NSMakeRect(0, 0, 200, 22)
        let t = $.NSTextField.alloc.initWithFrame(r)
        fun(t)
        return t
    }
    
    function UtilityWindow(argv={}) {
        let n = argv.name ? argv.name : 'ChocoUtilityWindow'
        registerUtilityWindowSubclass({
            name: n,
            protocols: argv.protocols,
            properties: argv.properties,
            methods: argv.methods,
        })
        return $[n].alloc.init
    }
    
    function View(fun = ()=>{}) {
        let v = $.NSView.alloc.initWithFrame($.NSMakeRect(0, 0, 0, 0))
        fun(v)
        return v
    }
    
    function WebView(fun = ()=>{}) {
        ObjC.import('WebKit')
        let r = $.NSZeroRect
        let c = $.WKWebViewConfiguration.alloc.init
        let w = $.WKWebView.alloc.initWithFrameConfiguration(r, c)
        fun(w)
        return w
    }
    
    function WrappingTextField(fun = ()=>{}) {
        registerControlTextEditingDelegateSubclass()
        let r = $.NSMakeRect(0, 0, 26, 26)
        let t = $.NSTextField.alloc.initWithFrame(r)
        t.delegate = $.ChocoControlTextEditingDelegate.alloc.init
        t.cell.wraps = true
        t.cell.lineBreakMode = $.NSLineBreakByWordWrapping
        t.cell.usesSingleLineMode = false
        fun(t)
        return t
    }
    
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
    
    function registerShoeboxWindowSubclass(argv={}) {
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
                _this.releasedWhenClosed = false
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
    
    function registerSubclass(argv={}) {
        let methods = {}
        for (let i in argv.methods) {
            if (Object.prototype.toString.call(argv.methods[i]).slice(8,-1).toLowerCase() === 'function') {
                if (i === 'init') {
                    methods[i] = argv.methods[i]
                } else {
                    methods[i+':'] = {
                        types: ['void', ['id']],
                        implementation: argv.methods[i],
                    }
                }
            } else {
                methods[i] = argv.methods[i]
            }
        }
        if (!methods.init) methods.init = function() {
            let _this = ObjC.super(this).init
            if (_this != undefined) {
                if (_this.initialize) _this.initialize($())
            }
            return _this
        }
        let para = {}
        para.name = argv.name
        if (argv.superclass) para.superclass = argv.superclass
        if (argv.protocols)  para.protocols  = argv.protocols
        if (argv.properties) para.properties = argv.properties
        para.methods = methods
        ObjC.registerSubclass(para)
    }
    
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
    
    return {
        Button: Button,
        CheckBoxButton: CheckBoxButton,
        DockMenu: DockMenu,
        GraphicalDatePicker: GraphicalDatePicker,
        Label: Label,
        Line: Line,
        Menu: Menu,
        MenuItem: MenuItem,
        MenuSeparator: MenuSeparator,
        PopUpButton: PopUpButton,
        RadioButton: RadioButton,
        Rect: Rect,
        RightTextAlignment: RightTextAlignment,
        ShoeboxWindow: ShoeboxWindow,
        Sound: Sound,
        StatusItem: StatusItem,
        StatusItemMenu: StatusItemMenu,
        TextDatePicker: TextDatePicker,
        TextField: TextField,
        UtilityWindow: UtilityWindow,
        View: View,
        WebView: WebView,
        WrappingTextField: WrappingTextField,
        registerControlTextEditingDelegateSubclass: registerControlTextEditingDelegateSubclass,
        registerShoeboxWindowSubclass: registerShoeboxWindowSubclass,
        registerSubclass: registerSubclass,
        registerUtilityWindowSubclass: registerUtilityWindowSubclass,
        registerWindowDelegateSubclass: registerWindowDelegateSubclass,
    }
    
})();
