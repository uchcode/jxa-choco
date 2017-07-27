const Choco = (()=>{
    
    const Standard = (()=>{
        
        function Path2(path) {
            return Path($(path).stringByStandardizingPath.js)
        }
        
        function PathToMe() {
            let a = Application.currentApplication()
            a.includeStandardAdditions = true
            return a.pathTo(this)
        }
        
        function PathToDirectory(path) {
            return Path2(path+'/../')
        }
        
        function PathToDirectoryAtMe() {
            return Path(PathToMe()+'/../')
        }
        
        function PathToResource(resourceName='') {
            if ($.NSBundle.mainBundle.resourcePath.js=='/usr/bin') {
                if (resourceName) {
                    return Path(PathToDirectoryAtMe()+'/Resources/'+resourceName)
                } else {
                    return Path(PathToDirectoryAtMe()+'/Resources')
                }
            } else {
                if (resourceName) {
                    return Path(PathToMe()+'/Contents/Resources/'+resourceName)
                } else {
                    return Path(PathToMe()+'/Contents/Resources')
                }
            }
        }
        
        function FileUrl(path) {
            return $.NSURL.fileURLWithPath(Path2(path).toString())
        }
        
        function Url(urlstring) {
            return $.NSURL.URLWithString(urlstring)
        }
        
        function Req(url) {
            return $.NSURLRequest.requestWithURL(url)
        }
        
        function Type(obj) {
            return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
        }
        
        function StringFromObject(obj,stringify=true) {
            switch(Type(obj)) {
            case 'object':
            case 'array':
                return stringify ? JSON.stringify(obj) : obj.toString()
            case 'null':
                return 'null'
            case 'undefined':
                return 'undefined'
            default:
                return obj.toString()
            }
        }
        
        //=======
        
        function readText(path,encoding=$.NSUTF8StringEncoding) {
            let p = Path2(path).toString()
            let u = encoding
            let e = $()
            let r = $.NSString.stringWithContentsOfFileEncodingError(p, u, e)
            if (!e.isNil()) {
                let s1 = 'readText(): '
                let s2 = e.localizedDescription.js
                let s3 = e.localizedRecoverySuggestion.js || ''
                throw s1+s2+s3
            }
            return r.js
        }
        
        function writeText(contents,path,atomically=true,encoding=$.NSUTF8StringEncoding) {
            let c = $(contents)
            let p = Path2(path).toString()
            let a = atomically
            let u = encoding
            let e = $()
            let r = c.writeToFileAtomicallyEncodingError(p, a, u, e)
            if (!e.isNil()) {
                let s1 = 'writeText(): '
                let s2 = e.localizedDescription.js
                let s3 = e.localizedRecoverySuggestion.js || ''
                throw s1+s2+s3
            }
            return r
        }
        
        //=======
        
        function input(msg='',encoding=$.NSUTF8StringEncoding) {
            $.NSFileHandle.fileHandleWithStandardOutput
                .writeData($(msg).dataUsingEncoding(encoding))
            return $.NSString.alloc.initWithDataEncoding(
                $.NSFileHandle.fileHandleWithStandardInput.availableData,
                encoding
            ).js.slice(0,-1)
        }
        
        function output(obj,terminator='\n',encoding=$.NSUTF8StringEncoding) {
            let s = arguments.length ?
                        StringFromObject(obj,false) + terminator : terminator
            $.NSFileHandle.fileHandleWithStandardOutput
                .writeData($(s).dataUsingEncoding(encoding))
        }
        
        function error(obj,terminator='\n',encoding=$.NSUTF8StringEncoding) {
            let s = arguments.length ?
                        StringFromObject(obj,false) + terminator : terminator
            $.NSFileHandle.fileHandleWithStandardError
                .writeData($(s).dataUsingEncoding(encoding))
        }
        
        function getpass(msg='Password:') {
            ObjC.import('unistd')
            return $.getpass(msg)
        }
        
        function gets(msg='',encoding=$.NSUTF8StringEncoding) {
            return input(msg,encoding)
        }
        
        function puts(obj,terminator='\n',encoding=$.NSUTF8StringEncoding) {
            output(arguments.length?obj:'', terminator, encoding)
        }
        
        function print(obj,terminator='\n',encoding=$.NSUTF8StringEncoding) {
            output(arguments.length?obj:'', terminator, encoding)
        }
        
        function p(obj,terminator='\n',encoding=$.NSUTF8StringEncoding) {
            let s = arguments.length ?
                        StringFromObject(obj,true) + terminator : terminator
            $.NSFileHandle.fileHandleWithStandardOutput
                .writeData($(s).dataUsingEncoding(encoding))
        }
        
        function nslog(obj) {
            let s = arguments.length ? StringFromObject(obj,true) : '\n'
            $.NSLog(s)
        }
        
        //=======
        
        function exit(n=0) {
            ObjC.import('stdlib')
            return $.exit(n)
        }
        
        function testUTItype(path,type) {
            let p = Path2(path).toString()
            let u = $.NSURL.alloc.initFileURLWithPath(p)
            let t = $()
            let k = $.NSURLTypeIdentifierKey
            let e = $()
            u.getResourceValueForKeyError(t,k,e)
            if (!e.isNil()) {
                let s1 = 'testUTItype(): '
                let s2 = e.localizedDescription.js
                let s3 = e.localizedRecoverySuggestion.js || ''
                throw s1+s2+s3
            }
            ObjC.import('Cocoa')
            let w = $.NSWorkspace.sharedWorkspace
            return w.typeConformsToType(t,type)
        }
        
        //=======
        
        return {
            Path2: Path2,
            PathToMe: PathToMe,
            PathToDirectory: PathToDirectory,
            PathToDirectoryAtMe: PathToDirectoryAtMe,
            PathToResource: PathToResource,
            FileUrl: FileUrl,
            Url: Url,
            Req: Req,
            Type: Type,
            StringFromObject: StringFromObject,
            readText: readText,
            writeText: writeText,
            input: input,
            output: output,
            error: error,
            getpass: getpass,
            gets: gets,
            puts: puts,
            print: print,
            p:p,
            nslog: nslog,
            exit: exit,
            testUTItype: testUTItype,
        }
        
    })();
    
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
    
    const FileManager = (()=>{
        
        class NSFileManager {
            
            constructor(fileManager=$.NSFileManager.defaultManager) {
                this.fm = fileManager
                
                this.pwd = this.pwd.bind(this)
                this.cd = this.cd.bind(this)
                this.getWorkFolderPath = this.getWorkFolderPath.bind(this)
                this.changeWorkFolder = this.changeWorkFolder.bind(this)
                
                this.mkfile = this.mkfile.bind(this)
                this.mkdir = this.mkdir.bind(this)
                this.makeFile = this.makeFile.bind(this)
                this.makeFolder = this.makeFolder.bind(this)
                
                this.rm = this.rm.bind(this)
                this.mv = this.mv.bind(this)
                this.cp = this.cp.bind(this)
                this.link = this.link.bind(this)
                this.ln = this.ln.bind(this)
                this.readlink = this.readlink.bind(this)
                this.remove = this.remove.bind(this)
                this.move = this.move.bind(this)
                this.copy = this.copy.bind(this)
                this.makeLink = this.makeLink.bind(this)
                this.makeSymbolicLink = this.makeSymbolicLink.bind(this)
                this.readSymbolicLink = this.readSymbolicLink.bind(this)
                
                this.paths = this.paths.bind(this)
                this.subpaths = this.subpaths.bind(this)
                this.files = this.files.bind(this)
                this.folders = this.folders.bind(this)
                
                this.chmod = this.chmod.bind(this)
                this.chown = this.chown.bind(this)
                this.chgrp = this.chgrp.bind(this)
                
                this.attributes = this.attributes.bind(this)
                this.isDir = this.isDir.bind(this)
                this.isFile = this.isFile.bind(this)
                this.isSymbolicLink = this.isSymbolicLink.bind(this)
                this.isExists = this.isExists.bind(this)
                this.isReadable = this.isReadable.bind(this)
                this.isWritable = this.isWritable.bind(this)
                this.isDeletable = this.isDeletable.bind(this)
                this.isExecutable = this.isExecutable.bind(this)
            }
            
            pwd() {
                return this.fm.currentDirectoryPath.js
            }
            
            cd(path='~') {
                if (path==='') path = '.'
                let p = Standard.Path2(path).toString()
                let r = this.fm
                        .changeCurrentDirectoryPath(p)
                if (!r) {
                    throw `cd(): No such file or directory: "${path}"`
                }
                return r
            }
            
            getWorkFolderPath() {
                return this.pwd()
            }
            
            changeWorkFolder(path='~') {
                return this.cd(path)
            }
            
            mkfile(path) {
                let p = Standard.Path2(path).toString()
                if (this.fm.fileExistsAtPath(p)) {
                    throw `mkfile(): Path is exists: "${path}"`
                }
                let c = $.NSData.data //zero data
                let a = $()
                let r = this.fm
                        .createFileAtPathContentsAttributes(p, c, a)
                if (!r) {
                    throw `mkfile(): Create file failed: "${path}"`
                }
                return r
            }
            
            mkdir(path, createIntermediatesFlag=1) {
                let p = Standard.Path2(path).toString()
                let i = createIntermediatesFlag ? 1 : 0
                let a = $()
                let e = $()
                let r = this.fm
                        .createDirectoryAtPathWithIntermediateDirectoriesAttributesError(p, i, a, e)
                if (!e.isNil()) {
                    let s1 = 'mkdir(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return r
            }
            
            makeFile(path) {
                return this.mkfile(path)
            }
            
            makeFolder(path) {
                return this.mkdir(path)
            }
            
            rm(path) {
                let p = Standard.Path2(path).toString()
                let e = $()
                let r = this.fm
                        .removeItemAtPathError(p, e)
                if (!e.isNil()) {
                    let s1 = 'rm(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return r
            }
            
            mv(at, to) {
                let a = Standard.Path2(at).toString()
                let t = Standard.Path2(to).toString()
                let e = $()
                let r = this.fm
                        .moveItemAtPathToPathError(a, t, e)
                if (!e.isNil()) {
                    let s1 = 'mv(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return r
            }
            
            cp(at, to) {
                let a = Standard.Path2(at).toString()
                let t = Standard.Path2(to).toString()
                let e = $()
                let r = this.fm
                        .copyItemAtPathToPathError(a, t, e)
                if (!e.isNil()) {
                    let s1 = 'cp(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return r
            }
            
            link(at, to) {
                let a = Standard.Path2(at).toString()
                let t = Standard.Path2(to).toString()
                let e = $()
                let r = this.fm
                    .linkItemAtPathToPathError(a, t, e)
                if (!e.isNil()) {
                    let s1 = 'link(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return r
            }
            
            ln(at, to) {
                let a = Standard.Path2(to).toString()
                let w = Standard.Path2(at).toString()
                let e = $()
                let r = this.fm
                        .createSymbolicLinkAtPathWithDestinationPathError(a, w, e)
                if (!e.isNil()) {
                    let s1 = 'ln(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return r
            }
            
            readlink(path) {
                let p = Standard.Path2(path).toString()
                let e = $()
                let r = this.fm
                        .destinationOfSymbolicLinkAtPathError(p, e)
                if (!e.isNil()) {
                    let s1 = 'readlink(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return r.isNil() ? '' : r.js
            }
            
            remove(path) {
                return this.rm(path)
            }
            
            move(at, to) {
                return this.mv(at, to)
            }
            
            copy(at, to) {
                return this.copy(at, to)
            }
            
            makeLink(at, to) {
                return this.link(at, to)
            }
            
            makeSymbolicLink(at, to) {
                return this.ln(at, to)
            }
            
            readSymbolicLink(path) {
                return this.readlink(path)
            }
            
            paths(path) {
                let p = Standard.Path2(path).toString()
                let e = $()
                let c = this.fm.contentsOfDirectoryAtPathError(p,e)
                if (!e.isNil()) {
                    let s1 = 'paths(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return ObjC.deepUnwrap(c)
            }
            
            subpaths(path) {
                let p = Standard.Path2(path).toString()
                let e = $()
                let c = this.fm.subpathsOfDirectoryAtPathError(p,e)
                if (!e.isNil()) {
                    let s1 = 'subpaths(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return ObjC.deepUnwrap(c)
            }
            
            files(path) {
                return this.paths(path)
                   .filter(e=>!/^\./.test(e))
                   .filter(e=>this
                       .attributes(`${Standard.Path2(path).toString()}/${e}`)
                       .objectForKey($.NSFileType).js!=$.NSFileTypeDirectory.js)
            }
            
            folders(path) {
                return this.paths(path)
                   .filter(e=>!/^\./.test(e))
                   .filter(e=>this
                       .attributes(`${Standard.Path2(path).toString()}/${e}`)
                       .objectForKey($.NSFileType).js==$.NSFileTypeDirectory.js)
            }
            
            chmod(value, path) {
                let a = $({NSFilePosixPermissions:value})
                let p = Standard.Path2(path).toString()
                let e = $()
                let r = this.fm
                        .setAttributesOfItemAtPathError(a, p, e)
                if (!e.isNil()) {
                    let s1 = 'chmod(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return r
            }
            
            chown(user, path) {
                let u = user.split(':')
                let d = {NSFileOwnerAccountName:u[0]}
                if (u[1]) d.NSFileGroupOwnerAccountName = u[1]
                let a = $(d)
                let p = Standard.Path2(path).toString()
                let e = $()
                let r = this.fm
                        .setAttributesOfItemAtPathError(a, p, e)
                if (!e.isNil()) {
                    let s1 = 'chown(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return r
            }
            
            chgrp(group, path) {
                let a = $({NSFileGroupOwnerAccountName:group})
                let p = Standard.Path2(path).toString()
                let e = $()
                let r = this.fm
                        .setAttributesOfItemAtPathError(a, p, e)
                if (!e.isNil()) {
                    let s1 = 'chgrp(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return r
            }
            
            attributes(path) {
                let p = Standard.Path2(path).toString()
                let e = $()
                let a = this.fm
                        .attributesOfItemAtPathError(p, e)
                if (!e.isNil()) {
                    let s1 = 'attributes(): '
                    let s2 = e.localizedDescription.js
                    let s3 = e.localizedRecoverySuggestion.js || ''
                    throw s1+s2+s3
                }
                return a
            }
            
            isDir(path) {
                return this.attributes(path)
                        .objectForKey($.NSFileType).js === $.NSFileTypeDirectory.js
            }
            
            isFile(path) {
                return !(this.attributes(path)
                        .objectForKey($.NSFileType).js === $.NSFileTypeDirectory.js)
            }
            
            isSymbolicLink(path) {
                return this.attributes(path)
                        .objectForKey($.NSFileType).js === $.NSFileTypeSymbolicLink.js
            }
            
            isExists(path) {
                return this.fm
                        .fileExistsAtPath(Standard.Path2(path).toString())
            }
            
            isReadable(path) {
                return this.fm
                        .isReadableFileAtPath(Standard.Path2(path).toString())
            }
            
            isWritable(path) {
                return this.fm
                        .isWritableFileAtPath(Standard.Path2(path).toString())
            }
            
            isDeletable(path) {
                return this.fm
                        .isDeletableFileAtPath(Standard.Path2(path).toString())
            }
            
            isExecutable(path) {
                return this.fm
                        .isExecutableFileAtPath(Standard.Path2(path).toString())
            }
            
            newInstance() {
                return new NSFileManager($.NSFileManager.new)
            }
            
            makeFinderItem(path) {
                let Finder = Application('Finder')
                let folderList = path.toString().replace(/^[^¥/]*[¥/]+/,'').split('/')
                let finderItem = undefined
                for (let i=0; i<folderList.length; i++) {
                    if (i==0) {
                        if (folderList[i]=='Volumes') {
                            i++
                            finderItem = Finder.disks.byName(folderList[i])
                        } else {
                            finderItem = Finder.startupDisk.folders.byName(folderList[i])
                        }
                    } else {
                        if (!folderList[i]=='') {
                            finderItem = finderItem.items.byName(folderList[i])
                        }
                    }
                }
                if (!Finder.exists(finderItem)) {
                    throw `makeFinderItem(): No such file or directory : path: ${path}`
                }
                return finderItem
            }
            
            pathOfFinderItem(item) {
                return item.url().replace(/^file:\/\//,'')
            }
            
        }
        
        return new NSFileManager()
        
    })();
    
    const UserInterface = (()=>{
        
        function Button(fun = ()=>{}) {
            let r = $.NSMakeRect(0, 0, 90, 26)
            let b = $.NSButton.alloc.initWithFrame(r)
            b.bezelStyle = $.NSRoundedBezelStyle
            fun(b)
            return b
        }
        
        function CheckBoxButton(fun = ()=>{}) {
            let r = $.NSMakeRect(0, 0, 26, 26)
            let b = $.NSButton.alloc.initWithFrame(r)
            b.buttonType = $.NSSwitchButton
            fun(b)
            return b
        }
        
        function DockMenu(argv={}) {
            if (!argv.name) argv.name = 'ChocoDockMenu'
            return StatusItemMenu(argv)
        }
        
        function GraphicalDatePicker(fun = ()=>{}) {
            let r = $.NSMakeRect(0, 0, 26, 26)
            let p = $.NSDatePicker.alloc.initWithFrame(r)
            p.drawsBackground = true
            p.datePickerElements = $.NSYearMonthDayDatePickerElementFlag
            p.datePickerStyle = $.NSClockAndCalendarDatePickerStyle
            p.dateValue = $.NSDate.date
            fun(p)
            return p
        }
        
        function Label(fun = ()=>{}) {
            let r = $.NSMakeRect(0, 0, 200, 22)
            let t = $.NSTextField.alloc.initWithFrame(r)
            t.drawsBackground = false
            t.bordered = false
            t.editable = false
            t.selectable = true
            fun(t)
            return t
        }
        
        function Line(fun = ()=>{}) {
            let r = $.NSMakeRect(0, 0, 0, 0)
            let b = $.NSBox.alloc.initWithFrame(r)
            b.boxType = $.NSBoxSeparator
            fun(b)
            return b
        }
        
        function Menu(fun = ()=>{}) {
            let m = $.NSMenu.alloc.init
            fun(m)
            return m
        }
        
        function MenuItem(fun = ()=>{}) {
            let i = $.NSMenuItem.alloc.init
            fun(i)
            return i
        }
        
        function MenuSeparator() {
            return $.NSMenuItem.separatorItem
        }
        
        function PopUpButton(fun = ()=>{}) {
            let p = $.NSPopUpButton.alloc.initWithFrame($.NSMakeRect(0, 0, 90, 26))
            fun(p)
            return p
        }
        
        function RadioButton(fun = ()=>{}) {
            let r = $.NSMakeRect(0, 0, 26, 26)
            let b = $.NSButton.alloc.initWithFrame(r)
            b.buttonType = $.NSRadioButton
            fun(b)
            return b
        }
        
        function Rect(x, y, w, h) {
            return $.NSMakeRect(x, y, w, h)
        }
        
        function RightTextAlignment() {
            return $.NSRightTextAlignment
        }
        
        function ShoeboxWindow(argv={}) {
            let n = argv.name ? argv.name : 'ChocoShoeboxWindow'
            registerShoeboxWindowSubclass({
                name: n,
                protocols: argv.protocols,
                properties: argv.properties,
                methods: argv.methods,
            })
            return $[n].alloc.init
        }
        
        function Sound(path, fun=()=>{}) {
            let s = $.NSSound.alloc.initWithContentsOfFileByReference(path, true)
            fun(s)
            return s
        }
        
        function StatusItem(fun = ()=>{}) {
            let i = $.NSStatusBar.systemStatusBar.statusItemWithLength($.NSVariableStatusItemLength)
            fun(i)
            return i
        }
        
        function StatusItemMenu(argv={}) {
            let n = argv.name ? argv.name : 'ChocoStatusItemMenu'
            registerSubclass({
                name: n,
                superclass: 'NSMenu',
                protocols: argv.protocols,
                properties: argv.properties,
                methods: argv.methods,
            })
            return $[n].alloc.init
        }
        
        function TextDatePicker(fun = ()=>{}) {
            let r = $.NSMakeRect(0, 0, 26, 26)
            let p = $.NSDatePicker.alloc.initWithFrame(r)
            p.drawsBackground = true
            p.datePickerElements = $.NSYearMonthDayDatePickerElementFlag
            p.datePickerStyle = $.NSTextFieldAndStepperDatePickerStyle
            p.dateValue = $.NSDate.date
            fun(p)
            return p
        }
        
        function TextField(fun = ()=>{}) {
            let r = $.NSMakeRect(0, 0, 200, 22)
            let t = $.NSTextField.alloc.initWithFrame(r)
            fun(t)
            return t
        }
        
        function UtilityWindow(argv={}) {
            let n = argv.name ? argv.name : 'ChocoUtilityWindow'
            registerUtilityWindowSubclass({
                name: n,
                protocols: argv.protocols,
                properties: argv.properties,
                methods: argv.methods,
            })
            return $[n].alloc.init
        }
        
        function View(fun = ()=>{}) {
            let v = $.NSView.alloc.initWithFrame($.NSMakeRect(0, 0, 0, 0))
            fun(v)
            return v
        }
        
        function WebView(fun = ()=>{}) {
            ObjC.import('WebKit')
            let r = $.NSZeroRect
            let c = $.WKWebViewConfiguration.alloc.init
            let w = $.WKWebView.alloc.initWithFrameConfiguration(r, c)
            fun(w)
            return w
        }
        
        function WrappingTextField(fun = ()=>{}) {
            registerControlTextEditingDelegateSubclass()
            let r = $.NSMakeRect(0, 0, 26, 26)
            let t = $.NSTextField.alloc.initWithFrame(r)
            t.delegate = $.ChocoControlTextEditingDelegate.alloc.init
            t.cell.wraps = true
            t.cell.lineBreakMode = $.NSLineBreakByWordWrapping
            t.cell.usesSingleLineMode = false
            fun(t)
            return t
        }
        
        function registerControlTextEditingDelegateSubclass() {
            if (!$.ChocoControlTextEditingDelegate) ObjC.registerSubclass({
                name: 'ChocoControlTextEditingDelegate',
                protocols: ['NSControlTextEditingDelegate'],
                methods: {
                    'control:textView:doCommandBySelector:': function(control, textView, commandSelector) {
                        let result = false
                        if (commandSelector == 'insertNewline:') {
                            textView.insertNewlineIgnoringFieldEditor(this)
                            return true
                        }
                        if (commandSelector == 'insertTab:') {
                            textView.insertTabIgnoringFieldEditor(this)
                            return true
                        }
                        return result
                    },
                },
            })
        }
        
        function registerShoeboxWindowSubclass(argv={}) {
            if (!argv.methods) argv.methods = {}
            if (!argv.methods.init) argv.methods.init = function() {
                let _this = ObjC.super(this).initWithContentRectStyleMaskBackingDefer(
                    $.NSMakeRect(200, 240, 480, 270),
                    $.NSTitledWindowMask | $.NSClosableWindowMask | $.NSMiniaturizableWindowMask,
                    $.NSBackingStoreBuffered,
                    false
                )
                if (_this != undefined) {
                    _this.identifier = 'AppWindow'
                    _this.oneShot = true
                    _this.releasedWhenClosed = false
                    if (_this.initialize) _this.initialize($())
                }
                return _this
            }
            if (!argv.methods['setFrame:']) argv.methods['setFrame:'] = {
                types: ['void', ['NSRect']],
                implementation: function(rect) {
                    this.setFrameDisplayAnimate(rect, true, true)
                }
            }
            registerSubclass({
                name: argv.name,
                superclass: 'NSWindow',
                protocols: argv.protocols,
                properties: argv.properties,
                methods: argv.methods,
            })
        }
        
        function registerSubclass(argv={}) {
            let methods = {}
            for (let i in argv.methods) {
                if (Object.prototype.toString.call(argv.methods[i]).slice(8,-1).toLowerCase() === 'function') {
                    if (i === 'init') {
                        methods[i] = argv.methods[i]
                    } else {
                        methods[i+':'] = {
                            types: ['void', ['id']],
                            implementation: argv.methods[i],
                        }
                    }
                } else {
                    methods[i] = argv.methods[i]
                }
            }
            if (!methods.init) methods.init = function() {
                let _this = ObjC.super(this).init
                if (_this != undefined) {
                    if (_this.initialize) _this.initialize($())
                }
                return _this
            }
            let para = {}
            para.name = argv.name
            if (argv.superclass) para.superclass = argv.superclass
            if (argv.protocols)  para.protocols  = argv.protocols
            if (argv.properties) para.properties = argv.properties
            para.methods = methods
            ObjC.registerSubclass(para)
        }
        
        function registerUtilityWindowSubclass(argv={}) {
            registerWindowDelegateSubclass()
            if (!argv.methods) argv.methods = {}
            if (!argv.methods.init) argv.methods.init = function() {
                let _this = ObjC.super(this).initWithContentRectStyleMaskBackingDefer(
                    $.NSMakeRect(200, 240, 480, 270),
                    $.NSTitledWindowMask | $.NSClosableWindowMask | $.NSMiniaturizableWindowMask,
                    $.NSBackingStoreBuffered,
                    false
                )
                if (_this != undefined) {
                    _this.identifier = 'AppWindow'
                    _this.oneShot = true
                    _this.delegate = $.ChocoWindowDelegate.alloc.init
                    if (_this.initialize) _this.initialize($())
                }
                return _this
            }
            if (!argv.methods['setFrame:']) argv.methods['setFrame:'] = {
                types: ['void', ['NSRect']],
                implementation: function(rect) {
                    this.setFrameDisplayAnimate(rect, true, true)
                }
            }
            registerSubclass({
                name: argv.name,
                superclass: 'NSWindow',
                protocols: argv.protocols,
                properties: argv.properties,
                methods: argv.methods,
            })
        }
        
        function registerWindowDelegateSubclass() {
            if (!$.ChocoWindowDelegate) ObjC.registerSubclass({
                name:'ChocoWindowDelegate',
                protocols: ['NSWindowDelegate'],
                methods: {
                    'windowWillClose:'(notification) {
                        try { if (quit()==false) return } catch(e) {}
                        $.NSApplication.sharedApplication.terminate($())
                    }
                }
            })
        }
        
        return {
            Button: Button,
            CheckBoxButton: CheckBoxButton,
            DockMenu: DockMenu,
            GraphicalDatePicker: GraphicalDatePicker,
            Label: Label,
            Line: Line,
            Menu: Menu,
            MenuItem: MenuItem,
            MenuSeparator: MenuSeparator,
            PopUpButton: PopUpButton,
            RadioButton: RadioButton,
            Rect: Rect,
            RightTextAlignment: RightTextAlignment,
            ShoeboxWindow: ShoeboxWindow,
            Sound: Sound,
            StatusItem: StatusItem,
            StatusItemMenu: StatusItemMenu,
            TextDatePicker: TextDatePicker,
            TextField: TextField,
            UtilityWindow: UtilityWindow,
            View: View,
            WebView: WebView,
            WrappingTextField: WrappingTextField,
            registerControlTextEditingDelegateSubclass: registerControlTextEditingDelegateSubclass,
            registerShoeboxWindowSubclass: registerShoeboxWindowSubclass,
            registerSubclass: registerSubclass,
            registerUtilityWindowSubclass: registerUtilityWindowSubclass,
            registerWindowDelegateSubclass: registerWindowDelegateSubclass,
        }
        
    })();
    
    return {
        Standard: Standard,
        FileManager: FileManager,
        Process: Process,
        UserInterface: UserInterface,
    }
    
})();



