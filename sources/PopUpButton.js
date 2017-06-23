function PopUpButton(fun = ()=>{}) {
	let p = $.NSPopUpButton.alloc.initWithFrame($.NSMakeRect(0, 0, 90, 26))
	fun(p)
	return p
}
