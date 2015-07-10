chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.url.length >=5 && details.url.substring(0,5)==="https") {
			details.url = 'http'+ details.url.substring(5);
		};
		return {redirectUrl: details.url.replace(/googleapis/,"useso")};
	},
	{
		//http & https  ["<all_urls>"]
		urls: ["*://ajax.googleapis.com/ajax/libs/*","*://fonts.googleapis.com/css?*"],
		types: ["script","stylesheet"]
	},
	["blocking"]
);
chrome.webRequest.onBeforeSendHeaders.addListener(
	function(details) {
    	for (var i = 0; i < details.requestHeaders.length; ++i) {
      		if (details.requestHeaders[i].name === 'Referer') {        
        		return {};
      		}
    	}
    	details.requestHeaders.push({"name":"Referer","value":"GoogleapisResRedirector"});
    	return {requestHeaders: details.requestHeaders};
	},
	{
  		urls: ["http://ajax.useso.com/ajax/libs/*","http://fonts.useso.com/css?*"],
  		types: ["script","stylesheet"]
	},
	["blocking", "requestHeaders"]
);