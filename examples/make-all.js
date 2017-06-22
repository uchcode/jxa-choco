#!/usr/bin/osascript -l JavaScript

function run(argv) {
    ObjC.import('stdlib')
    let targets = ['FirstChoco', 'HelloWorld', 'CurrencyConverter', 'WebWidget', 'PHPWebserver']
    switch (argv[0]) {
    case 'clean':
        for (let t of targets) { clean(t) }
        break
    default:
        for (let t of targets) { build(t) }
        break
    }
    $.exit(0)
}

function build(target) {
    let script = `
        if [ -e "${target}" ]; then
            pushd "${target}" > /dev/null
            osascript make.js
            popd > /dev/null
            echo 1
        else
            echo ""
        fi
    `
    if (!doShell(script)) {
        throw `file not found: "${target}/make.js"`
    }
}

function clean(target) {
    let script = `
        if [ -e "${target}" ]; then
            pushd "${target}" > /dev/null
            osascript make.js clean
            popd > /dev/null
            echo 1
        else
            echo ""
        fi
    `
    if (!doShell(script)) {
        throw `file not found: "${target}/make.js"`
    }
}

function doShell(s) {
    let a = Application.currentApplication()
    a.includeStandardAdditions = true
    return a.doShellScript(s, {alteringLineEndings:false}).trim()
}
