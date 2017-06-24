ObjC.import('Cocoa')

Applet = Application.currentApplication()
Applet.includeStandardAdditions = true

const HOME_URL = 'https://www.youtube.com'

Choco.registerShoeboxWindowSubclass({
	name: 'WebViewWindow',
	properties: {
	},
	methods: {
		initialize() {
			this.title = 'YouTube'
			this.styleMask |= $.NSResizableWindowMask
			this.setFrameAutosaveName('WebViewWindow')
			this.contentView = Choco.WebView( c => {
				let u = $.NSUserDefaults.standardUserDefaults.stringForKey('url').js
				let a = u ? u : HOME_URL
				c.loadRequest(Choco.Req(Choco.Url(a)))
			})
		},
	},
})

_ = Choco.StatusItem( c => {
	c.title = '📺'
	c.menu = Choco.StatusItemMenu({
		properties: {
			window: 'id',
		},
		methods: {
			initialize() {
				this.addItem( Choco.MenuItem( c => {
					c.title = 'Show Window'
					c.target = this
					c.action = 'showWindow:'
				}))
				this.addItem( Choco.MenuSeparator() )
				this.addItem( Choco.MenuItem( c => {
					c.title = 'Home'
					c.target = this
					c.action = 'home:'
				}))
				this.addItem( Choco.MenuItem( c => {
					c.title = 'Reload'
					c.target = this
					c.action = 'reload:'
				}))
				this.addItem( Choco.MenuItem( c => {
					c.title = 'Edit'
					c.target = this
					c.action = 'edit:'
				}))
				this.addItem( Choco.MenuSeparator() )
				this.addItem( Choco.MenuItem( c => {
					c.title = 'Quit'
					c.target = this
					c.action = 'quit:'
				}))
				this.window = $.WebViewWindow.alloc.init
				this.showWindow($(this))
			},
			showWindow(sender) {
				Applet.activate()
				this.window.makeKeyAndOrderFront(this.window)
			},
			home(sender) {
				this.window.contentView.loadRequest(Choco.Req(Choco.Url(HOME_URL)))
				this.showWindow(sender)
			},
			reload(sender) {
				this.window.contentView.reloadFromOrigin
				this.showWindow(sender)
			},
			edit(sender) {
				let p = Choco.PathToMe()
				Choco.doShell(`open -a "Script Editor" "${p}"`)
				this.quit(sender)
			},
			quit(sender) {
				let u = this.window.contentView.URL.absoluteString
				$.NSUserDefaults.standardUserDefaults.setObjectForKey(u,'url')
				$.NSApp.terminate(sender)
			},
		},
	})
})
