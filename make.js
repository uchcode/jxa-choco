#!/usr/bin/osascript -l JavaScript

function read(path) {
    return $.NSString.stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, $()).js
}

function write(contents, path) {
    $(contents).writeToFileAtomicallyEncodingError(path, true, $.NSUTF8StringEncoding, $())
}

function doShell(s) {
    let a = Application.currentApplication()
    a.includeStandardAdditions = true
    return a.doShellScript(s,{alteringLineEndings:false}).trim()
}

const A = ['registerSubclass']
const B = ['Rect', 'Url', 'Req']
const C = ['Path2', 'PathToResource', 'PathToMe']
const D = ['Sound', 'Button', 'CheckBoxButton', 'RadioButton', 'PopUpButton', 'TextField', 'Label', 'RightTextAlignment', 'WrappingTextField', 'TextDatePicker', 'GraphicalDatePicker', 'Line', 'View', 'WebView', 'Menu', 'MenuItem', 'MenuSeparator', 'StatusItem']
const E = ['registerWindowDelegateSubclass', 'registerControlTextEditingDelegateSubclass', 'registerUtilityWindowSubclass', 'registerShoeboxWindowSubclass']
const F = ['UtilityWindow', 'ShoeboxWindow', 'StatusItemMenu', 'DockMenu'] 
const G = ['doShell', 'globalize']
const functions = A.concat(B).concat(C).concat(D).concat(E).concat(F).concat(G)

function run(argv) {
    switch (argv[0]) {
    case 'clean':
        doShell(`rm -rf ./Choco.js`)
        break
    case 'build':
    default:
        var source = read(`./sources/src-head.js`) + '\n'
        for (let f of functions) {
            source += read(`./sources/${f}.js`) + `global.Choco.${f} = ${f}\n\n`
        }
        source += read(`./sources/src-tail.js`)
        write(source, './Choco.js')
        break
    }
}
