$ = require 'jquery'
do fill = (item = 'This is your Beautiful world') ->
		$('.tagline').append "#{item}"
fill
