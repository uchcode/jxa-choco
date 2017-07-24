function WebView(fun = ()=>{}) {
    ObjC.import('WebKit')
    let r = $.NSZeroRect
    let c = $.WKWebViewConfiguration.alloc.init
    let w = $.WKWebView.alloc.initWithFrameConfiguration(r, c)
    fun(w)
    return w
}
