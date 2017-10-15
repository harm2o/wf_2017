<script>
	$(function() {
		$.getJSON('http://barcampdeland.org/_/data/speakers.json', function(data) {
		    var template = $('#speakers-template').html();
		    var info = Mustache.to_html(template, data);
		    $('#talktitles').html(info);
		});
	});
</script>