function doShell(script, opt={}) {
	return Applet.doShellScript(script, {
		administratorPrivileges: !!opt.withPrompt,
		withPrompt: opt.withPrompt ? opt.withPrompt : '',
		alteringLineEndings: opt.alteringLineEndings ? opt.alteringLineEndings : false
	}).trim()
}
