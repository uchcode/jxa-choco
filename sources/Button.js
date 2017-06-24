function Button(fun = ()=>{}) {
	let r = $.NSMakeRect(0, 0, 90, 26)
	let b = $.NSButton.alloc.initWithFrame(r)
	b.bezelStyle = $.NSRoundedBezelStyle
	fun(b)
	return b
}
