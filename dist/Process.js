const Process = (()=>{
    
    const app = Application.currentApplication()
    app.includeStandardAdditions = true
    
    function shell(script, opt={}) {
        return app.doShellScript(script, {
            administratorPrivileges: !!opt.withPrompt,
            withPrompt: opt.withPrompt || '',
            alteringLineEndings: opt.alteringLineEndings || false
        }).replace(/\n$/,'')
    }
    
    function sh(script, opt={}) {
        try { return shell(script,opt) } catch(e) {
            return ''
        }
    }
    
    function test(arg) {
        try { return !!shell(`test ${arg}`) } catch(e) {
            return false
        }
    }
    
    function doProcess(path, args=[]) {
        let o = $.NSPipe.new
        let e = $.NSPipe.new
        let t = $.NSTask.new
        t.standardOutput = o
        t.standardError = e
        t.launchPath = path
        t.arguments = args
        t.launch
        t.waitUntilExit
        $.NSFileHandle.fileHandleWithStandardOutput
                      .writeData(o.fileHandleForReading.readDataToEndOfFile)
        $.NSFileHandle.fileHandleWithStandardError
                      .writeData(e.fileHandleForReading.readDataToEndOfFile)
        return t.terminationStatus
    }
    
    function doSh(script) {
        return doProcess('/bin/sh',['-c',script])
    }
    
    function doBash(script) {
        return doProcess('/bin/bash',['-l','-c',script])
    }
    
    return {
        shell: shell,
        sh: sh,
        test: test,
        doProcess: doProcess,
        doSh: doSh,
        doBash: doBash,
    }
    
})();
