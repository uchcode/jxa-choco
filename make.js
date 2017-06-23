#!/usr/bin/osascript -l JavaScript

const functions = ['registerSubclass', 'Rect', 'Url', 'Req', 'Sound', 'Button', 'CheckBoxButton', 'RadioButton', 'PopUpButton', 'TextField', 'Label', 'RightTextAlignment', 'WrappingTextField', 'TextDatePicker', 'GraphicalDatePicker', 'Line', 'View', 'WebView', 'Menu', 'MenuItem', 'MenuSeparator', 'StatusItem', 'StatusItemMenu', 'DockMenu', 'Path2', 'PathToResource', 'PathToMe', 'registerWindowDelegateSubclass', 'registerControlTextEditingDelegateSubclass', 'registerUtilityWindowSubclass', 'registerShoeboxWindowSubclass', 'doShell', 'globalize']

function read(path) {
    return $.NSString.stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, $()).js
}

function write(contents, path) {
    $(contents).writeToFileAtomicallyEncodingError(path, true, $.NSUTF8StringEncoding, $())
}

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
