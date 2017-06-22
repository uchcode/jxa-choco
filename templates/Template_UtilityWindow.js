ObjC.import('Cocoa')

Choco.registerUtilityWindowSubclass({
	name: 'AppWindow',
	properties: {
	},
	methods: {
		initialize() {
			this.title = 'window_title'
			this.setFrame($.NSMakeRect(0, 0, 480, 270))
			this.center
			//$.NSWindow.removeFrameUsingName('AppWindow')
			//this.setFrameAutosaveName('AppWindow')
		},
	},
})

window = $.AppWindow.alloc.init
window.makeKeyAndOrderFront($())
$.NSApp.activateIgnoringOtherApps(true)
