function Menu(fun = ()=>{}) {
	let m = $.NSMenu.alloc.init
	fun(m)
	return m
}
