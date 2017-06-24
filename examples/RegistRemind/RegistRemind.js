ObjC.import('Cocoa')

Applet = Application.currentApplication()
Applet.includeStandardAdditions = true

window = Choco.UtilityWindow({
	properties: {
		remind: 'id',
		details: 'id',
		isRemindMeDate: 'id',
		remindMeDate: 'id',
		priority: 'id',
		cancel: 'id',
		ok: 'id',
	},
	methods: {
		initialize() {
			this.title = 'Regist Remind'
			this.setFrame( Choco.Rect(0, 0, 480, 230) )
			this.styleMask = $.NSTitledWindowMask
			this.contentView.addSubview( Choco.TextField( c => {
				this.remind = c
				c.frame = Choco.Rect(20, 170, 440, 22)
				c.placeholderString = 'Remind'
			}))
			this.contentView.addSubview( Choco.WrappingTextField( c => {
				this.details = c
				c.frame = Choco.Rect(20, 86, 440, 72)
				c.placeholderString = 'memo'
			}))
			this.contentView.addSubview( Choco.CheckBoxButton( c => {
				this.isRemindMeDate = c
				c.frame = Choco.Rect(20, 50, 22, 26)
				c.toolTip = 'Remind me date'
				c.target = this
				c.action = 'toggleRemindMeDate:'
			}))
			this.contentView.addSubview( Choco.TextDatePicker( c => {
				this.remindMeDate = c
				c.frame = Choco.Rect(42, 52, 99, 27)
				c.toolTip = 'Remind me date'
			}))
			this.contentView.addSubview( Choco.PopUpButton( c => {
				this.priority = c
				c.frame = Choco.Rect(150, 50, 90, 26)
				c.toolTip = 'Riminder Priority'
				c.addItemWithTitle('none')
				c.menu.addItem($.NSMenuItem.separatorItem)
				c.addItemWithTitle('Low')
				c.addItemWithTitle('Middle')
				c.addItemWithTitle('Hight')
			}))
			this.contentView.addSubview( Choco.Button( c => {
				this.ok = c
				c.frame = Choco.Rect(380, 10, 90, 26)
				c.title = 'OK'
				c.target = this
				c.action = 'execute:'
			}))
			this.contentView.addSubview( Choco.Button( c => {
				c.frame = Choco.Rect(290, 10, 90, 26)
				c.title = 'Cancel'
				c.keyEquivalent = '\u{1b}'
				c.terget = $.NSApp
				c.action = 'terminate:'
			}))
			this.defaultButtonCell = this.ok.cell
			this.toggleRemindMeDate(this)
		},
		toggleRemindMeDate(sender) {
			if (this.isRemindMeDate.integerValue == 1) {
				this.remindMeDate.enabled = true
				this.remindMeDate.textColor = $.NSColor.blackColor
			} else {
				this.remindMeDate.enabled = false
				this.remindMeDate.textColor = $.NSColor.disabledControlTextColor
			}
		},
		execute(sender) {
			if (!this.remind.stringValue.js) {
				return Applet.displayAlert('Remind is required.')
			}
			$.NSLog('values %@', {
				remind: this.remind.stringValue.js,
				details: this.details.stringValue.js,
				isRemindMeDate: this.isRemindMeDate.integerValue,
				remindMeDate: this.remindMeDate.dateValue.js,
				priority: this.priority.indexOfSelectedItem,
			})
			let ret = Applet.displayAlert('Please look at the Consle.app', {
				message: 'No implement yat',
				buttons:['open Consle.app', 'OK']
			})
			if (ret.buttonReturned != 'OK') {
				Applet.doShellScript(`open -a "Console"`)
			}
			$.NSApp.terminate($(this))
		},
	},
})

$.NSApp.activateIgnoringOtherApps(true)
$.NSApp.runModalForWindow(window)
