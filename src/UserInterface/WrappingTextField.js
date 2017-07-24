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
