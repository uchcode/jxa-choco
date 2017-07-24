on fread(theFile)
	return read theFile as «class utf8»
end fread

on fwrite(theText, theFile)
	write theText to theFile as «class utf8»
end fwrite

on fappend(theText, theFile)
	write theText to theFile as «class utf8» starting at eof
end fappend

on fclose(thePath)
	try
		close access thePath
	on error c number n
		if n ≠ -38 then
			error c number n
		end if
	end try
end fclose
