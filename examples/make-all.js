#!/usr/bin/osascript -l JavaScript
ObjC.import('stdlib')

Applet = Application.currentApplication()
Applet.includeStandardAdditions = true

function run(argv) {
    let targets = ['First_Choco', 'HelloWorld', 'CurrencyConverter']
    if (argv[0]==='clean') {
        for (let t of targets) { clean(t) }
    } else {
        for (let t of targets) { build(t) }
    }
    $.exit(0)
}

function build(target) {
let cmd = `
if [ -e "${target}" ]; then
    pushd "${target}" > /dev/null
    osascript make.js
    popd > /dev/null
    echo 1
else
    echo ""
fi
`
    let ret = Applet.doShellScript(cmd.trim())
    if (!ret) {
        throw `file not found: "${target}/make.js"`
    }
}

function clean(target) {
let cmd = `
if [ -e "${target}" ]; then
    pushd "${target}" > /dev/null
    osascript make.js clean
    popd > /dev/null
    echo 1
else
    echo ""
fi
`
    let ret = Applet.doShellScript(cmd.trim())
    if (!ret) {
        throw `file not found: "${target}/make.js"`
    }
}
