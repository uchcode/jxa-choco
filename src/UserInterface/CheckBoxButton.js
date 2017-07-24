function CheckBoxButton(fun = ()=>{}) {
    let r = $.NSMakeRect(0, 0, 26, 26)
    let b = $.NSButton.alloc.initWithFrame(r)
    b.buttonType = $.NSSwitchButton
    fun(b)
    return b
}
