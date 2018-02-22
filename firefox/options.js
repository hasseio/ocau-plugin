function saveOptions(e) {
  	browser.storage.local.set({
    	hideAvatars: document.querySelector("#hideAvatars").checked,
    	autoExpand: document.querySelector("#autoExpand").checked,
    	hideLike: document.querySelector("#hideLike").checked
  	});

  	e.preventDefault();
}

function restoreOption(name) {
  	var item = browser.storage.local.get(name);
  	item.then((res) => {
  	    //console.log('restoreOption', name, JSON.stringify(res));
    	document.querySelector("#"+name).checked = res[name];
  	});
}

function restoreOptions() {
    restoreOption('hideAvatars');
    restoreOption('autoExpand');
    restoreOption('hideLike');
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
