const data = {
	'track-width' : {
		value : '10px',
		css : {
			'::-webkit-scrollbar' : 'width'
		}
	},
	'track-color' : {
		value : '#ff0000',
		css : {
			'::-webkit-scrollbar-track' : 'background'
		}
	},
	'thumb-color' : {
		value : '#0000ff',
		css : {
			'::-webkit-scrollbar-thumb' : 'background'
		}
	},
	'hover-color' : {
		value : '#00ff00',
		css : {
			'::-webkit-scrollbar-thumb:hover' : 'background'
		}
	}
}

var getStored = () =>
{
	Object.keys(data).forEach((key) =>
	{
		chrome.storage.sync.get([key], (result) =>
		{
			data[key].value = (result[key] ? result[key] : data[key].value);
		});
	});
};

var injectStyle = (tabId, style) =>
{
	return chrome.tabs.insertCSS(tabId,
	{
		code: style
	});
};

chrome.tabs.onUpdated.addListener((tabId , info , tab) =>
{
	if(!tab.url || !tab.url.startsWith('http'))
	{
		return;
	}

	if(info.status === 'complete')
	{
		injectStyle(tabId, Object.keys(data).map((name) =>
		{
			return Object.keys(data[name].css).map((key) => 
			{
				return `${key}{${data[name].css[key]}:${data[name].value}!important;}`
			}).join('');
		}).join(''));
	}
});

chrome.storage.onChanged.addListener(() =>
{
	getStored();
});

chrome.runtime.onInstalled.addListener(() =>
{
	var sets = {};

	Object.keys(data).forEach((key) =>
	{
		sets[key] = data[key].value;
	});

	chrome.storage.sync.set(sets, (e) =>
	{
		console.log('Initialized.');
	});
});