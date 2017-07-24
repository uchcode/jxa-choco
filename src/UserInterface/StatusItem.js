function StatusItem(fun = ()=>{}) {
    let i = $.NSStatusBar.systemStatusBar.statusItemWithLength($.NSVariableStatusItemLength)
    fun(i)
    return i
}
