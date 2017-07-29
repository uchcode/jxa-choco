const app = Application.currentApplication()
app.includeStandardAdditions = true

function sh(script, opt={}) {
    return app.doShellScript(script, {
        administratorPrivileges: !!opt.withPrompt,
        withPrompt: opt.withPrompt || '',
        alteringLineEndings: opt.alteringLineEndings || false
    }).replace(/\n$/,'')
}

function shell(script, opt={}) {
    try { return sh(script,opt) } catch(e) {
        return ''
    }
}

function test(arg) {
    try { return !!sh(`test ${arg}`) } catch(e) {
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
