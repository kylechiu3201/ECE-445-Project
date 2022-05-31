var serverhost = 'http://localhost:3000/';

chrome.runtime.onInstalled.addListener(() => {
    //chrome.storage.sync.set({currentURL});
    console.log("Started");
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab != undefined) {
        let url = tab.url;
        console.log(url);

        let myURL = url.replaceAll("/", "forward_slaaash");
        let myURL2 = myURL.replaceAll("?", "qwestun_murk")

        var url2 = serverhost + 'update/' + myURL2 ;

        console.log(url2);

        try{
            fetch(url2)
            .then(response => {
                if(!response.ok) {
                    console.log('Data sent - Network response NOT OK');
                }else{
                    console.log('Data sent - Network response OK');
                }
            })
        }
        catch(err){
            console.log("server not up!")
        }
    }
});

chrome.tabs.onActivated.addListener(function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let url = tabs[0].url;
        console.log(url)

        let myURL = url.replaceAll("/", "forward_slaaash");
        let myURL2 = myURL.replaceAll("?", "qwestun_murk")

        var url2 = serverhost + 'update/' + myURL2 ;

        console.log(url2);

        try{
            fetch(url2)
            .then(response => {
                if(!response.ok) {
                    console.log('Data sent - Network response NOT OK');
                }else{
                    console.log('Data sent - Network response OK');
                }
            })
        }
        catch(err){
            console.log("server not connecteDDDD")
        }
   
     });
});
