ObjC.import('Cocoa')

Choco.registerShoeboxWindowSubclass({
	name: 'AppWindow',
	properties: {
	},
	methods: {
		initialize() {
			this.title = 'window_title'
			this.styleMask |= $.NSResizableWindowMask
			//this.setFrame($.NSMakeRect(0, 0, 480, 270))
			//this.center
			//$.NSWindow.removeFrameUsingName('AppWindow')
			this.setFrameAutosaveName('AppWindow')
			this.contentView = Choco.WebView( c => {
				let address = 'https://www.youtube.com/'
				c.loadRequest(Choco.Req(Choco.Url(address)))
			})
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
