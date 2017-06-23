ObjC.import('Cocoa')

Choco.registerUtilityWindowSubclass({
	name: 'AppWindow',
	properties: {
		rate: 'id',
		dollers: 'id',
		total: 'id',
		calc: 'id',
	},
	methods: {
		initialize() {
			this.title = 'Currency Converter'
			this.setFrame(Choco.Rect(0, 0, 400, 180))
			this.center
			this.setFrameAutosaveName('AppWindow')
			this.contentView.addSubview( Choco.Label( c => {
				c.frame = Choco.Rect(10, 110, 160, 26)
				c.stringValue = 'Exchange Rate per $1:'
				c.alignment = Choco.RightTextAlignment()
			}))
			this.contentView.addSubview( Choco.Label( c => {
				c.frame = Choco.Rect(10, 80, 160, 26)
				c.stringValue = 'Dollers to Convert:'
				c.alignment = Choco.RightTextAlignment()
			}))
			this.contentView.addSubview( Choco.Label( c => {
				c.frame = Choco.Rect(10, 50, 160, 26)
				c.stringValue = 'Amount in Other Currency:'
				c.alignment = Choco.RightTextAlignment()
			}))
			this.contentView.addSubview( Choco.TextField( c => {
				this.rate = c
				c.frame = Choco.Rect(180, 116, 200, 22)
			}))
			this.contentView.addSubview( Choco.TextField( c => {
				this.dollers = c
				c.frame = Choco.Rect(180, 86, 200, 22)
			}))
			this.contentView.addSubview( Choco.TextField( c => {
				this.total = c
				c.frame = Choco.Rect(180, 56, 200, 22)
				c.editable = false
				c.selectable = true
			}))
			this.contentView.addSubview( Choco.Line( c => {
				c.frame = Choco.Rect(10, 50, 380, 1)
			}))
			this.contentView.addSubview( Choco.Button( c => {
				this.calc = c
				c.frame = Choco.Rect(300, 10, 90, 26)
				c.title = 'Convert'
				c.target = this
				c.action = 'convert:'
			}))
			this.defaultButtonCell = this.calc.cell
			//
			this.rate.floatValue = 111
			this.dollers.floatValue = 1
			this.convert($())
		},
		convert(sender) {
			this.total.floatValue = this.rate.floatValue * this.dollers.floatValue
		}
	},
})

window = $.AppWindow.alloc.init
window.makeKeyAndOrderFront(window)
$.NSApp.activateIgnoringOtherApps(true)
