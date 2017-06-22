ObjC.import('Cocoa')

Choco.registerShoeboxWindowSubclass({
	name: 'AppWindow',
	properties: {
	},
	methods: {
		initialize() {
			this.title = 'window_title'
			//this.setFrame($.NSMakeRect(0, 0, 480, 270))
			//this.center
			//$.NSWindow.removeFrameUsingName('AppWindow')
			//this.setFrameAutosaveName('AppWindow')
		},
	},
})

function run(argv) {
	window = $.AppWindow.alloc.init
	window.makeKeyAndOrderFront($())
	$.NSApp.activateIgnoringOtherApps(true)
}

function reopen() {
	window.makeKeyAndOrderFront($())
}
