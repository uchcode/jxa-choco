function TextField(fun = ()=>{}) {
	let r = $.NSMakeRect(0, 0, 200, 22)
	let t = $.NSTextField.alloc.initWithFrame(r)
	fun(t)
	return t
}
