function ShoeboxWindow(argv={}) {
    let n = argv.name ? argv.name : 'ChocoShoeboxWindow'
    registerShoeboxWindowSubclass({
        name: n,
        protocols: argv.protocols,
        properties: argv.properties,
        methods: argv.methods,
    })
    return $[n].alloc.init
}
