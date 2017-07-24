function Sound(path, fun=()=>{}) {
    let s = $.NSSound.alloc.initWithContentsOfFileByReference(path, true)
    fun(s)
    return s
}
