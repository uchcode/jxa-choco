#!/usr/bin/osascript
ObjC.import('stdlib')

function run(argv) {
    cd($.NSProcessInfo.processInfo.arguments.objectAtIndex(1)
        .stringByDeletingLastPathComponent.js)
    try {
        if (!argv[0]) throw new Error()
        eval(`${argv[0]}`)
    } catch(e) {
        usage()
        $.exit(1)
    }
    eval(`${argv[0]}()`)
    $.exit(0)
}

function usage() {
    let cmd = $.NSProcessInfo.processInfo.arguments
                .objectAtIndex(1).lastPathComponent.js
    console.log('Usage:')
    console.log(`  ${cmd} Standard`)
    console.log(`  ${cmd} Process`)
    console.log(`  ${cmd} FileManager`)
    console.log(`  ${cmd} UserInterface`)
    console.log(`  ${cmd} Choco`)
    console.log(`  ${cmd} ScriptLibrary`)
    console.log(`  ${cmd} clean`)
}

function clean() {
    rm('./dist/Standard.js')
    rm('./dist/Process.js')
    rm('./dist/FileManager.js')
    rm('./dist/UserInterface.js')
    rm('./dist/Choco.js')
    rm('./dist/FileHandle.scpt')
    rm('./dist/LineByLine.scpt')
    rm('./dist/z.scpt')
}

function Standard() {
    mkdir('dist')
    cd('./src/Standard/')
    let c = []
    c.push(read('Standard-head.js'))
    c.push(read('Standard.js',1))
    c.push(read('Standard-tail.js'))
    cd('../../')
    write(c.join('\n'),'./dist/Standard.js')
}

function Process() {
    mkdir('dist')
    cd('./src/Process/')
    let c = []
    c.push(read('Process-head.js'))
    c.push(read('Process.js',1))
    c.push(read('Process-tail.js'))
    cd('../../')
    write(c.join('\n'),'./dist/Process.js')
}

function FileManager() {
    mkdir('dist')
    cd('./src/FileManager/')
    let c = []
    c.push(read('FileManager-head.js'))
    c.push(read('FileManager.js',1))
    c.push(read('FileManager-tail.js'))
    cd('../../')
    write(c.join('\n'),'./dist/FileManager.js')
}

function UserInterface() {
    mkdir('dist')
    cd('./src/UserInterface/')
    let ls = shell(`ls *.js`).split('\n')
    let c = ['const UserInterface = (()=>{\n    ']
    for (let e of ls) {
        c.push(read(e,1))
    }
    let tail  = '    return {' + '\n'
        for (let e of ls) {
        let n = e.replace(/\.js$/,'')
        tail += `        ${n}: ${n},`  + '\n'
        }
        tail += '    }' + '\n'
        tail += '    '  + '\n'
        tail += '})();' + '\n'
    c.push(tail)
    cd('../../')
    write(c.join('\n'),'./dist/UserInterface.js')
}

function Choco() {
    mkdir('dist')
    Standard()
    Process()
    FileManager()
    UserInterface()
    cd('./dist/')
    let c = []
    c.push(read('../src/Choco/head.js',0))
    c.push(read('Standard.js',1))
    c.push(read('Process.js',1))
    c.push(read('FileManager.js',1))
    c.push(read('UserInterface.js',1))
    c.push(read('../src/Choco/tail.js',0))
    write(c.join('\n'),'Choco.js')
}

function ScriptLibrary() {
    mkdir('dist')
    cd('./src/ScriptLibrary/')
    shell(`osacompile -o ../../dist/FileHandle.scpt FileHandle.applescript`)
    shell(`osacompile -o ../../dist/LineByLine.scpt LineByLine.applescript`)
    shell(`osacompile -o ../../dist/z.scpt z.applescript`)
}

//===

function cd(path='~') {
    if (path==='') path = '.'
    let p = $(path).stringByStandardizingPath.js
    let r = $.NSFileManager.defaultManager.changeCurrentDirectoryPath(p)
    if (!r) {
        throw new Error(`cd(): No such file or directory: "${path}"`)
    }
    return r
}

function read(path, indentLevel=0) {
    let i = ''; while(indentLevel-- > 0){i+='    '}
    return $.NSString
        .stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, $()).js
        .split('\n').map(s=>i+s).join('\n')
}

function write(contents, path) {
    $(contents).writeToFileAtomicallyEncodingError(path, true, $.NSUTF8StringEncoding, $())
}

function rm(path) {
    let p = $(path).stringByStandardizingPath.js
    let e = $()
    let r = $.NSFileManager.defaultManager.removeItemAtPathError(p, e)
//     if (!e.isNil()) {
//         let s1 = 'rm(): '
//         let s2 = e.localizedDescription.js
//         let s3 = e.localizedRecoverySuggestion.js ? e.localizedRecoverySuggestion.js : ''
//         throw new Error(s1+s2+s3)
//     }
    return r
}

function mkdir(path, createIntermediatesFlag=1) {
    let p = $(path).stringByStandardizingPath.js
    let i = createIntermediatesFlag ? 1 : 0
    let a = $()
    let e = $()
    let r = $.NSFileManager.defaultManager
            .createDirectoryAtPathWithIntermediateDirectoriesAttributesError(p, i, a, e)
//     if (!e.isNil()) {
//         let s1 = 'mkdir(): '
//         let s2 = e.localizedDescription.js
//         let s3 = e.localizedRecoverySuggestion.js || ''
//         throw s1+s2+s3
//     }
    return r
}

function shell(script, opt={}) {
    const app = Application.currentApplication()
    app.includeStandardAdditions = true
    return app.doShellScript(script, {
        administratorPrivileges: !!opt.withPrompt,
        withPrompt: opt.withPrompt || '',
        alteringLineEndings: opt.alteringLineEndings || false
    }).replace(/\n$/,'')
}
