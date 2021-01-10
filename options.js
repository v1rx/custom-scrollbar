document.querySelectorAll('input[type="color"], input[type="text"]').forEach((e) =>
{
	var key = e.getAttribute('name');

	chrome.storage.sync.get([key], (result) =>
	{
		e.value = (result[key] ? result[key] : '#ffffff');
	});
});

document.querySelector('input[name="save"]').addEventListener('click', (e) =>
{
	var sets = {};

	document.querySelectorAll('input[type="color"], input[type="text"]').forEach((e) =>
	{
		var key = e.getAttribute('name');
		sets[key] = e.value;
	});

	chrome.storage.sync.set(sets, (e) =>
	{
		console.log('Saved');
	});
});