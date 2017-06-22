#!/usr/bin/osascript -l JavaScript

function run(argv) {
    ObjC.import('stdlib')
    let targets = ['WebWidget']
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
        if [ -e "${target}.js" ]; then
            {
                mkdir -p ./dist/
                cat ../../Choco.js
                echo ""
                echo "//====================="
                echo ""
                cat "${target}.js"
            } | osacompile -l JavaScript -s -o "./dist/${target}.app" &&
            cp -f ./Info.plist ./dist/${target}.app/Contents/Info.plist
            echo 1
        else
            echo ""
        fi
    `
    if (!doShell(script)) {
        throw `file not found: ${target}.js`
    }
}

function clean(target) {
    doShell(`rm -rf ./dist/`)
}

function doShell(s) {
    let a = Application.currentApplication()
    a.includeStandardAdditions = true
    return a.doShellScript(s, {alteringLineEndings:false}).trim()
}
