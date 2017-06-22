ObjC.import('Cocoa')

Applet = Application.currentApplication()
Applet.includeStandardAdditions = true

Choco.StatusItem( c => {
	c.title = '❤️'
	c.menu = Choco.StatusItemMenu({
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
			displayMessage(sender) {
				Applet.activate()
				Applet.displayAlert('I ❤️ JXA')
			},
		},
	})
})
