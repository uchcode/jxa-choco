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
			this.title = 'Web Widget'
			this.styleMask = $.NSTitledWindowMask
			this.setFrame( Choco.Rect(0, 0, 300, 320) )
			this.center
			this.contentView.addSubview( Choco.WebView( c => {
				let address = 'http://book.mynavi.jp/wd/widget/300x250.html'
				c.frame = Choco.Rect(0, 50, 300, 250)
				c.loadRequest(Choco.Req(Choco.Url(address)))
			}))
			this.contentView.addSubview( Choco.Button( c => {
				this.ok = c
				c.frame = Choco.Rect(200, 10, 90, 26)
				c.title = 'OK'
				c.terget = $.NSApp
				c.action = 'terminate:'
			}))
			this.defaultButtonCell = this.ok.cell
		},
	},
})

window = $.AppWindow.alloc.init
window.makeKeyAndOrderFront(window)
$.NSApp.activateIgnoringOtherApps(true)
