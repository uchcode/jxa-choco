function globalize(scope) {
	if (scope['globalize']) throw `globalize is exist, abort.`
	Object.keys(global.Choco).forEach( i => {
		if (i === 'globalize') return
		if (scope[i]) throw `${i} is exist, abort.`
		scope[i] = global.Choco[i]
	})
}
