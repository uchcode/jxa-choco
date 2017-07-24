function Path2(path) {
    return Path($(path).stringByStandardizingPath.js)
}

function PathToMe() {
    let a = Application.currentApplication()
    a.includeStandardAdditions = true
    return Path(a.pathTo(this).toString())
}

function PathToDirectory(path) {
    return Path2(path+'/../')
}

function PathToDirectoryAtMe() {
    return Path2(PathToMe()+'/../')
}

function PathToResource(resourceName='') {
    if ($.NSBundle.mainBundle.resourcePath.js=='/usr/bin') {
        if (resourceName) {
            return Path2(PathToDirectoryAtMe().toString()+'/'+resourceName)
        } else {
            return Path2(PathToDirectoryAtMe().toString())
        }
    } else {
        if (resourceName) {
            return Path2(PathToMe().toString()+'/Contents/Resources/'+resourceName)
        } else {
            return Path2(PathToMe().toString()+'/Contents/Resources')
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
