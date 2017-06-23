function PathToResource(resourceName='') {
	if (resourceName) {
		return Path($.NSBundle.mainBundle.resourcePath.js+'/'+resourceName)
	} else {
		return Path($.NSBundle.mainBundle.resourcePath.js)
	}
}
