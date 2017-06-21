ObjC.import('Cocoa')

Choco.registerShoeboxWindowSubclass({
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

function run(argv) {
	window = $.AppWindow.alloc.init
	window.makeKeyAndOrderFront($())
}

function reopen() {
	window.makeKeyAndOrderFront($())
}
