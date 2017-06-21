ObjC.import('Cocoa')

Applet = Application.currentApplication()
Applet.includeStandardAdditions = true

ObjC.registerSubclass({
	name: 'AppletAction',
	methods: {
		'displayMessage:': {
			types: ['void', ['id']],
			implementation: function(sender) {
				Applet.activate()
				Applet.displayAlert('I ❤️ JXA')
			},
		},
	},
})

action = $.AppletAction.alloc.init

messageItem = $.NSMenuItem.alloc.init
messageItem.title = 'Message'
messageItem.target = action
messageItem.action = 'displayMessage:'

quitItem = $.NSMenuItem.alloc.init
quitItem.title = 'Quit'
quitItem.target = $.NSApp
quitItem.action = 'terminate:'

statusItem = $.NSStatusBar.systemStatusBar.statusItemWithLength($.NSVariableStatusItemLength)
statusItem.title = '❤️'
statusItem.menu = $.NSMenu.alloc.init
statusItem.menu.addItem(messageItem)
statusItem.menu.addItem($.NSMenuItem.separatorItem)
statusItem.menu.addItem(quitItem)
