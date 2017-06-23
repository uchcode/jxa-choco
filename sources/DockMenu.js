function DockMenu(argv={}) {
	let n = 'ChocoDockMenu'
	registerSubclass({
		name: n,
		superclass: 'NSMenu',
		properties: argv.properties,
		methods: argv.methods,
	})
	return $[n].alloc.init
}
