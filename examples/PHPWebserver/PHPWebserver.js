ObjC.import('Cocoa')

Applet = Application.currentApplication()
Applet.includeStandardAdditions = true

const RESOURCE = resourcePath()
const DIR  = `${RESOURCE}/public_html/`
const LOG  = `${RESOURCE}/webserver.log`

const HOST = 'localhost'
const PORT = '8080'
const ADDR = `${HOST}:${PORT}`
const URL  = `http://${ADDR}`

const SCPT_PID   = `ps aux | grep '[p]hp -S ${ADDR}\' | awk '{print $2}'`
const SCPT_START = `cd "${DIR}"; php -S ${ADDR} 1>> "${LOG}" 2>&1 &`
const SCPT_STOP  = `${SCPT_PID} | xargs kill && echo \`date\` php server is stopped >> ${LOG}`

$.NSApp.dockMenu = Choco.DockMenu({
	methods: {
		initialize() {
			this.addItem( Choco.MenuItem( c => {
				c.title = 'Home'
				c.target = this
				c.action = 'home:'
			}))
			this.addItem( Choco.MenuSeparator() )
			this.addItem( Choco.MenuItem( c => {
				c.title = 'Status'
				c.target = this
				c.action = 'status:'
			}))
			this.addItem( Choco.MenuSeparator() )
			this.addItem( Choco.MenuItem( c => {
				c.title = 'Start'
				c.target = this
				c.action = 'start:'
			}))
			this.addItem( Choco.MenuItem( c => {
				c.title = 'Stop'
				c.target = this
				c.action = 'stop:'
			}))
			this.addItem( Choco.MenuItem( c => {
				c.title = 'Restart'
				c.target = this
				c.action = 'restart:'
			}))
			this.addItem( Choco.MenuSeparator() )
			this.addItem( Choco.MenuItem( c => {
				c.title = 'public_html'
				c.target = this
				c.action = 'public_html:'
			}))
		},
		home(sender) {
			doShell(`open "${URL}"`)
		},
		status(sender) {
			let pid = doShell(SCPT_PID)
			if (pid) {
				var msg = 'status: running...: server pid: '+pid
			} else {
				var msg = 'status: stop.'
			}
			Applet.activate()
			Applet.displayAlert(msg)
			$.NSLog(msg)
		},
		start(sender) {
			if (!doShell(SCPT_PID)) {
				doShell(SCPT_START)
			}
			delay(1)
			this.status(sender)
		},
		stop(sender) {
			doShell(SCPT_STOP)
			delay(1)
			this.status(sender)
		},
		restart(sender) {
			doShell(SCPT_STOP)
			delay(1)
			doShell(SCPT_START)
			this.status(sender)
		},
		public_html(sender) {
			doShell(`open "${DIR}"`)
		},
	},
})

function run(argv) {
	doShell(SCPT_START)
	delay(1)
	doShell(`open "${URL}/info.php"`)
	doShell(`open "${LOG}"`)
}

function quit() {
	doShell(SCPT_STOP)
	return true
}

function doShell(s) {
	return Applet.doShellScript(s, {alteringLineEndings:false}).trim()
}

function resourcePath() {
	var r = $.NSBundle.mainBundle.resourcePath.js
	if (r == '/usr/bin') {
		r = $(Applet.pathTo(this).toString())
				.stringByDeletingLastPathComponent
				.stringByDeletingLastPathComponent
				.js
	}
	return r
}