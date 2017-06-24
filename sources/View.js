function View(fun = ()=>{}) {
	let v = $.NSView.alloc.initWithFrame($.NSMakeRect(0, 0, 0, 0))
	fun(v)
	return v
}
