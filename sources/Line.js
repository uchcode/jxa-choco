function Line(fun = ()=>{}) {
	let r = $.NSMakeRect(0, 0, 0, 0)
	let b = $.NSBox.alloc.initWithFrame(r)
	b.boxType = $.NSBoxSeparator
	fun(b)
	return b
}
