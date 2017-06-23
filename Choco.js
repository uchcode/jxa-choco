((global)=>{
	
	ObjC.import('Cocoa')
	
	global.Choco = {}
	
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
	global.Choco.registerSubclass = registerSubclass
	
	function Rect(x, y, w, h) {
		return $.NSMakeRect(x, y, w, h)
	}
	global.Choco.Rect = Rect
	
	function Url(str) {
		return $.NSURL.URLWithString(str)
	}
	global.Choco.Url = Url
	
	function Req(url) {
		return $.NSURLRequest.requestWithURL(url)
	}
	global.Choco.Req = Req
	
	function Sound(path, fun=()=>{}) {
		let s = $.NSSound.alloc.initWithContentsOfFileByReference(path, true)
		fun(s)
		return s
	}
	global.Choco.Sound = Sound
	
	function Button(fun = ()=>{}) {
		let r = $.NSMakeRect(0, 0, 90, 26)
		let b = $.NSButton.alloc.initWithFrame(r)
		b.bezelStyle = $.NSRoundedBezelStyle
		fun(b)
		return b
	}
	global.Choco.Button = Button
	
	function CheckBoxButton(fun = ()=>{}) {
		let r = $.NSMakeRect(0, 0, 26, 26)
		let b = $.NSButton.alloc.initWithFrame(r)
		b.buttonType = $.NSSwitchButton
		fun(b)
		return b
	}
	global.Choco.CheckBoxButton = CheckBoxButton
	
	function RadioButton(fun = ()=>{}) {
		let r = $.NSMakeRect(0, 0, 26, 26)
		let b = $.NSButton.alloc.initWithFrame(r)
		b.buttonType = $.NSRadioButton
		fun(b)
		return b
	}
	global.Choco.RadioButton = RadioButton
	
	function PopUpButton(fun = ()=>{}) {
		let p = $.NSPopUpButton.alloc.initWithFrame($.NSMakeRect(0, 0, 90, 26))
		fun(p)
		return p
	}
	global.Choco.PopUpButton = PopUpButton
	
	function TextField(fun = ()=>{}) {
		let r = $.NSMakeRect(0, 0, 200, 22)
		let t = $.NSTextField.alloc.initWithFrame(r)
		fun(t)
		return t
	}
	global.Choco.TextField = TextField
	
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
	global.Choco.Label = Label
	
	function RightTextAlignment() {
		return $.NSRightTextAlignment
	}
	global.Choco.RightTextAlignment = RightTextAlignment
	
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
	global.Choco.WrappingTextField = WrappingTextField
	
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
	global.Choco.TextDatePicker = TextDatePicker
	
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
	global.Choco.GraphicalDatePicker = GraphicalDatePicker
	
	function Line(fun = ()=>{}) {
		let r = $.NSMakeRect(0, 0, 0, 0)
		let b = $.NSBox.alloc.initWithFrame(r)
		b.boxType = $.NSBoxSeparator
		fun(b)
		return b
	}
	global.Choco.Line = Line
	
	function View(fun = ()=>{}) {
		let v = $.NSView.alloc.initWithFrame($.NSMakeRect(0, 0, 0, 0))
		fun(v)
		return v
	}
	global.Choco.View = View
	
	function WebView(fun = ()=>{}) {
		ObjC.import('WebKit')
		let r = $.NSZeroRect
		let c = $.WKWebViewConfiguration.alloc.init
		let w = $.WKWebView.alloc.initWithFrameConfiguration(r, c)
		fun(w)
		return w
	}
	global.Choco.WebView = WebView
	
	function Menu(fun = ()=>{}) {
		let m = $.NSMenu.alloc.init
		fun(m)
		return m
	}
	global.Choco.Menu = Menu
	
	function MenuItem(fun = ()=>{}) {
		let i = $.NSMenuItem.alloc.init
		fun(i)
		return i
	}
	global.Choco.MenuItem = MenuItem
	
	function MenuSeparator() {
		return $.NSMenuItem.separatorItem
	}
	global.Choco.MenuSeparator = MenuSeparator
	
	function StatusItem(fun = ()=>{}) {
		let i = $.NSStatusBar.systemStatusBar.statusItemWithLength($.NSVariableStatusItemLength)
		fun(i)
		return i
	}
	global.Choco.StatusItem = StatusItem
	
	function StatusItemMenu(argv={}) {
		let n = 'ChocoStatusItemMenu'
		registerSubclass({
			name: n,
			superclass: 'NSMenu',
			properties: argv.properties,
			methods: argv.methods,
		})
		return $[n].alloc.init
	}
	global.Choco.StatusItemMenu = StatusItemMenu
	
	function DockMenu(argv={}) {
		let n = 'ChocoDockMenu'
		registerSubclass({
			name: n,
			superclass: 'NSMenu',
			properties: argv.properties,
			methods: argv.methods,
		})
		return $[n].alloc.init
	}
	global.Choco.DockMenu = DockMenu
	
	function PathToResource(resourceName='') {
		if (resourceName) {
			return Path($.NSBundle.mainBundle.resourcePath.js+'/'+resourceName)
		} else {
			return Path($.NSBundle.mainBundle.resourcePath.js)
		}
	}
	global.Choco.PathToResource = PathToResource
	
	function PathToMe() {
		return Path($(PathToResource().toString()+'/../../').stringByStandardizingPath.js)
	}
	global.Choco.PathToMe = PathToMe
	
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
	global.Choco.registerWindowDelegateSubclass = registerWindowDelegateSubclass
	
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
	global.Choco.registerControlTextEditingDelegateSubclass = registerControlTextEditingDelegateSubclass
	
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
	global.Choco.registerUtilityWindowSubclass = registerUtilityWindowSubclass
	
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
	global.Choco.registerShoeboxWindowSubclass = registerShoeboxWindowSubclass
	
	function doShell(script, opt={}) {
		let a = Application.currentApplication()
		a.includeStandardAdditions = true
		return a.doShellScript(script, {
			administratorPrivileges: !!opt.withPrompt,
			withPrompt: opt.withPrompt ? opt.withPrompt : '',
			alteringLineEndings: opt.alteringLineEndings ? opt.alteringLineEndings : false
		}).trim()
	}
	global.Choco.doShell = doShell
	
	function globalize(scope) {
		if (scope['globalize']) throw `globalize is exist, abort.`
		Object.keys(global.Choco).forEach( i => {
			if (i === 'globalize') return
			if (scope[i]) throw `${i} is exist, abort.`
			scope[i] = global.Choco[i]
		})
	}
	global.Choco.globalize = globalize
	
})(this);
