ObjC.import('Cocoa')

window = Choco.ShoeboxWindow({
	properties: {
	},
	methods: {
		initialize() {
			this.title = 'window_title'
			//this.setFrame($.NSMakeRect(0, 0, 480, 270))
			//this.center
			//$.NSWindow.removeFrameUsingName('AppWindow')
			//this.setFrameAutosaveName('AppWindow')
			this.isVisible = true
		},
	},
})

function reopen() {
	window.makeKeyAndOrderFront($())
}
