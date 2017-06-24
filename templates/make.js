#!/usr/bin/osascript -l JavaScript

function run(argv) {
    ObjC.import('stdlib')
    let targets = ['Template_CustomDialog', 'Template_UtilityWindow', 'Template_ShoeboxWindow', 'Template_StatuBarMenu', 'Template_DockMenu', 'Template_WebViewWindow']
    let tpath = "/Library/Application Support/Script Editor/Templates/Choco Templates/"
    switch (argv[0]) {
    case 'open':
        doShell(`open "/Library/Application Support/Script Editor/Templates/"`)
        break
    case 'uninstall':
        doShell(`sudo rm -rf "${tpath}"`)
        break
    case 'install':
        for (let t of targets) { build(t) }
        doShell(`sudo mv ./dist/ "${tpath}"`)
        break
    case 'reinstall':
        doShell(`sudo rm -rf "${tpath}"`)
        for (let t of targets) { build(t) }
        doShell(`sudo mv ./dist/ "${tpath}"`)
        break
    case 'clean':
        doShell(`rm -rf ./dist/`)
        break
    case 'build':
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
                cat ../Choco.js
                echo ""
                echo "//====================="
                echo ""
                cat "${target}.js"
            } | osacompile -l JavaScript -s -o "./dist/${target}.app" &&
            echo 1
        else
            echo ""
        fi
    `
    if (!doShell(script)) {
        throw `file not found: ${target}.js`
    }
}

function doShell(s) {
    let a = Application.currentApplication()
    a.includeStandardAdditions = true
    return a.doShellScript(s, {alteringLineEndings:false}).trim()
}
