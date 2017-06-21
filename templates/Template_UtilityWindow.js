ObjC.import('Cocoa')

Choco.registerUtilityWindowSubclass({
	name: 'AppWindow',
	properties: {
	},
	methods: {
		initialize() {
			this.setFrame($.NSMakeRect(0, 0, 480, 270))
			this.center
			this.title = 'window_title'
			//$.NSWindow.removeFrameUsingName('AppWindow')
			//this.setFrameAutosaveName('AppWindow')
		},
	},
})

window = $.AppWindow.alloc.init
window.makeKeyAndOrderFront($())
