// ==UserScript==
// @name     ThreatConnect Utilities userscript
// @version  1
// @grant    none
// @match    https://*.threatconnect.com/*
// ==/UserScript==

if (window.location.pathname == "/auth/settings/user.xhtml") {
  setTimeout(function() {
    // Follow Settings link #form:tabView:j_idt213 no id :( 
    
    var groupFollows = document.getElementById("form:tabView:notificationIncidentTable_data");
    if (groupFollows) {
      var getFollows = confirm("Do you want to download the follow settings to backup file ?");
      
      if (getFollows) {
        var groups = getTableText(groupFollows);
        
        var indicatorFollows = document.getElementById("form:tabView:notificationIndicatorTable_data");
        var indicators = getTableText(indicatorFollows);
        
        var follows = groups.concat(indicators);
        return arrayToFile(follows, "TC_follows_backup.txt");
      }
    }
    
  }, 5000);
}

function getTableText(table) {
  list = [];
  for (var entry of table.children) {
  	console.log(entry.innerText);
    list.push(entry.innerText);
  }
  return list;
  
}

function arrayToFile(list, filename) {
  return fileDataDownload(list.join('\n'), filename, "text/plain");
}

function fileDataDownload(contents, name, mimeType) {
  // https://stackoverflow.com/questions/34101871/save-data-using-greasemonkey-tampermonkey-for-later-retrieval
  var a = document.createElement("a");
  
  a.href = `data:${mimeType};charset=utf-8,` + encodeURIComponent(contents);

  a.download = name;
  a.click();
}

// document.getElementById("j_idt112:modificationHostName").value = document.getElementById("j_idt112:modificationHostName").value.trim();
