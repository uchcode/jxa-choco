function StatusItemMenu(argv={}) {
	let n = argv.name ? argv.name : 'ChocoStatusItemMenu'
	registerSubclass({
		name: n,
		superclass: 'NSMenu',
		protocols: argv.protocols,
		properties: argv.properties,
		methods: argv.methods,
	})
	return $[n].alloc.init
}
