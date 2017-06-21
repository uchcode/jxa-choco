ObjC.import('Cocoa')

Applet = Application.currentApplication()
Applet.includeStandardAdditions = true

$.NSApp.dockMenu = Choco.DockMenu({
	methods: {
		initialize() {
			this.addItem( Choco.MenuItem( c => {
				c.title = 'Message'
				c.target = this
				c.action = 'displayMessage:'
			}))
			this.addItem( Choco.MenuSeparator() )
			this.addItem( Choco.MenuItem( c => {
				c.title = 'Quit'
				c.target = $.NSApp
				c.action = 'terminate:'
			}))
		},
		displayMessage() {
			Applet.activate()
			Applet.displayAlert('hello')
		},
	},
})
