function UtilityWindow(argv={}) {
	let n = argv.name ? argv.name : 'ChocoUtilityWindow'
	registerUtilityWindowSubclass({
		name: n,
		protocols: argv.protocols,
		properties: argv.properties,
		methods: argv.methods,
	})
	return $[n].alloc.init
}
