function StatusItemMenu(argv={}) {
	let n = 'ChocoStatusItemMenu'
	registerSubclass({
		name: n,
		superclass: 'NSMenu',
		properties: argv.properties,
		methods: argv.methods,
	})
	return $[n].alloc.init
}
