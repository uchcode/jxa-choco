ObjC.import('Cocoa')

Choco.registerUtilityWindowSubclass({
	name: 'AppWindow',
	properties: {
	},
	methods: {
		initialize() {
			this.title = 'Hello World'
			this.setFrame($.NSMakeRect(0, 0, 250, 120))
			this.center
			this.contentView.addSubview( Choco.Button( c => {
				c.title = 'Hello!'
				c.frame = Choco.Rect(10, 10, 110, 80)
				c.bezelStyle = c.style || $.NSRegularSquareBezelStyle
				c.sound = Choco.Sound('/System/Library/Sounds/Tink.aiff')
				c.target = this
				c.action = 'sayHello:'
			}))
			this.contentView.addSubview( Choco.Button( c => {
				c.title = 'Goodbye!'
				c.frame = Choco.Rect(130, 10, 110, 80)
				c.bezelStyle = c.style || $.NSRegularSquareBezelStyle
				c.sound = Choco.Sound('/System/Library/Sounds/Basso.aiff')
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
