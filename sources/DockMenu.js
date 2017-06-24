function DockMenu(argv={}) {
	if (!argv.name) argv.name = 'ChocoDockMenu'
	return StatusItemMenu(argv)
}
