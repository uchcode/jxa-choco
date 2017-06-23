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
