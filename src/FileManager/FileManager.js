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
