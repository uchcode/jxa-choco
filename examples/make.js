#!/usr/bin/osascript -l JavaScript
ObjC.import('stdlib')

Applet = Application.currentApplication()
Applet.includeStandardAdditions = true

function run(argv) {
    let targets = ['Example_Choco_StatuBarMenu', 'HelloWorld', 'CurrencyConverter']
    let otherTargets = ['Example_Pure_StatuBarMenu']
    if (argv[0]==='clean') {
        for (let t of targets) { clean(t) }
        for (let t of otherTargets) { clean(t) }
    } else {
        for (let t of targets) { build(t) }
        for (let t of otherTargets) { build(t) }
    }
    $.exit(0)
}

function build(target) {
let cmd = `
if [ -e "${target}.js" ]; then
    {
        cat ../Choco.js
        echo ""
        echo "//====================="
        echo ""
        cat "${target}.js"
    } | osacompile -l JavaScript -s -o "${target}.app" &&
    echo 1
else
    echo ""
fi
`
    
    if (! Applet.doShellScript(cmd.trim()) ) {
        throw `file not found: ${target}.js`
    }
}

function clean(target) {
    Applet.doShellScript(`rm -rf "${target}.app"`)
}
