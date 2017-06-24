function MenuItem(fun = ()=>{}) {
	let i = $.NSMenuItem.alloc.init
	fun(i)
	return i
}
