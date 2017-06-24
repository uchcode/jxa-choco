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

statusItem = $.NSStatusBar.systemStatusBar.statusItemWithLength($.NSVariableStatusItemLength)
statusItem.title = '❤️'
statusItem.menu = $.NSMenu.alloc.init

messageItem = $.NSMenuItem.alloc.init
messageItem.title = 'Message'
messageItem.target = action
messageItem.action = 'displayMessage:'
statusItem.menu.addItem(messageItem)

submenuItem = $.NSMenuItem.alloc.init
submenuItem.title = 'Submenu'
submenuItem.submenu = $.NSMenu.alloc.init
statusItem.menu.addItem(submenuItem)

message2Item = $.NSMenuItem.alloc.init
message2Item.title = 'Message'
message2Item.target = action
message2Item.action = 'displayMessage:'
submenuItem.submenu.addItem(message2Item)

statusItem.menu.addItem($.NSMenuItem.separatorItem)

quitItem = $.NSMenuItem.alloc.init
quitItem.title = 'Quit'
quitItem.target = $.NSApp
quitItem.action = 'terminate:'
statusItem.menu.addItem(quitItem)
