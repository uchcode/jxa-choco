function registerSubclass(argv={}) {
    let methods = {}
    for (let i in argv.methods) {
        if (Object.prototype.toString.call(argv.methods[i]).slice(8,-1).toLowerCase() === 'function') {
            if (i === 'init') {
                methods[i] = argv.methods[i]
            } else {
                methods[i+':'] = {
                    types: ['void', ['id']],
                    implementation: argv.methods[i],
                }
            }
        } else {
            methods[i] = argv.methods[i]
        }
    }
    if (!methods.init) methods.init = function() {
        let _this = ObjC.super(this).init
        if (_this != undefined) {
            if (_this.initialize) _this.initialize($())
        }
        return _this
    }
    let para = {}
    para.name = argv.name
    if (argv.superclass) para.superclass = argv.superclass
    if (argv.protocols)  para.protocols  = argv.protocols
    if (argv.properties) para.properties = argv.properties
    para.methods = methods
    ObjC.registerSubclass(para)
}
