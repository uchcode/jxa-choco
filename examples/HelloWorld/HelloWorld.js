ObjC.import('Cocoa')

Choco.registerUtilityWindowSubclass({
	name: 'AppWindow',
	properties: {
	},
	methods: {
		initialize() {
			this.setFrame($.NSMakeRect(0, 0, 250, 120))
			this.center
			this.title = 'Hello World'
			this.contentView.addSubview( Choco.Button( c => {
				c.title = 'Hello!'
				c.frame = Choco.Rect(10, 10, 110, 80)
				c.bezelStyle = c.style || $.NSRegularSquareBezelStyle
				c.sound = $.NSSound.alloc.initWithContentsOfFileByReference('/System/Library/Sounds/Tink.aiff', true)
				c.target = this
				c.action = 'sayHello:'
			}))
			this.contentView.addSubview( Choco.Button( c => {
				c.title = 'Goodbye!'
				c.frame = Choco.Rect(130, 10, 110, 80)
				c.bezelStyle = c.style || $.NSRegularSquareBezelStyle
				c.sound = $.NSSound.alloc.initWithContentsOfFileByReference('/System/Library/Sounds/Basso.aiff', true)
				c.target = $.NSApp
				c.action = 'terminate:'
			}))
		},
		sayHello(sender) {
			$.NSLog('hello')
		},
	},
})

window = $.AppWindow.alloc.init
window.makeKeyAndOrderFront($())
