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
