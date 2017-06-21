ObjC.import('Cocoa')

Applet = Application.currentApplication()
Applet.includeStandardAdditions = true

Choco.registerUtilityWindowSubclass({
	name: 'AppWindow',
	properties: {
		ok: 'id',
	},
	methods: {
		initialize() {
			this.setFrame( Choco.Rect(0, 0, 480, 270) )
			this.styleMask = $.NSTitledWindowMask
			this.contentView.addSubview( Choco.Button( c => {
				this.ok = c
				c.frame = Choco.Rect(380, 10, 90, 26)
				c.title = 'OK'
				c.target = this
				c.action = 'execute:'
			}))
			this.contentView.addSubview( Choco.Button( c => {
				c.frame = Choco.Rect(290, 10, 90, 26)
				c.title = 'Cancel'
				c.keyEquivalent = '\u{1b}'
				c.terget = $.NSApp
				c.action = 'terminate:'
			}))
			this.defaultButtonCell = this.ok.cell
		},
		execute(sender) {
			Applet.displayAlert('not implement yat.')
		},
	},
})

window = $.AppWindow.alloc.init
$.NSApp.runModalForWindow(window)
