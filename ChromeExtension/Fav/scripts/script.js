let tabSaveAndClose = document.querySelector("#saveAndClose");
let tabTabsSaved = document.querySelector("#tabsSaved");

let btnCancel = document.querySelector("#btnCancel");
let btnSave = document.querySelector("#btnSave");

let cnttBody = document.querySelector("#content");

let pnlSaveAndClose  = document.querySelector("#panelSaveAndClose");
let pnlSaved  = document.querySelector("#panelSaved");

tabSaveAndClose.addEventListener('click', showSaveAndClose);
tabTabsSaved.addEventListener('click', showSavedTabs);

btnCancel.addEventListener('click', closeThisWindow);
btnSave.addEventListener('click', saveAndCloseAllTabs);



// var formTitle = document.querySelector("#form-title");
// var formCategory = document.querySelector("#form-category");
// var formAnnotations = document.querySelector("#form-annotations");
// var formButton = document.querySelector("#form-submit");
//
// formButton.addEventListener('click', saveFav);
// var urlCurrent = "";
// var urlIconCurrent = "";

// window.onload = function () {
    // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    //     // chrome.tabs.query({}, tabs => {
    //     let title = tabs[0].title;
    //     urlCurrent = tabs[0].url;
    //     urlIconCurrent = tabs[0].favIconUrl;
    //     formTitle.setAttribute("value", title);
    //     // console.log(title);
    //     // console.log(tabs);
    // });
    // getFavs();
// }

function showSaveAndClose() {
    tabTabsSaved.classList.remove('active');
    this.classList.add('active');
    pnlSaved.style.display = "none";
    pnlSaveAndClose.style.display = "block"
    cnttBody.style.width = "315px";
    cnttBody.style.height = "230px";
}

function showSavedTabs() {
    tabSaveAndClose.classList.remove('active');
    this.classList.add('active');
    pnlSaved.style.display = "block";
    pnlSaveAndClose.style.display = "none"
    cnttBody.style.width = "550px";
    cnttBody.style.height = "500px";
}



function saveAndCloseAllTabs() {
    var allTabs = getAllTabs();

    // console.log(allTabs);

    allTabs.forEach(function(tab) {
        console.log(tab.title);
    });
    console.log("-------------------------------");
    // allTabs.groups.forEach(function(group) {
    //     console.log(group.title);
    // });



    //  var dict = {};
    //  dict = {
    //     "title": formTitle.value,
    //     "category": formCategory.value,
    //     "annotations": formAnnotations.value,
    //     "url": urlCurrent,
    //     "icon": urlIconCurrent
    // }
    // var newJson = JSON.stringify(dict);
    //
    // chrome.storage.sync.get("STORAGE_KEY", function (result) {
    //     if (result['STORAGE_KEY'] != undefined) {
    //         newJson = result['STORAGE_KEY']+"#;#"+newJson;
    //     }
    //     chrome.storage.sync.set({"STORAGE_KEY": newJson}, function() {
    //         alert("Salvo com sucesso!");
    //         getFavs();
    //         showSearchPage();
    //     })
    // });

}

function getFavs() {
    var divCategoryContainer = document.querySelector("#category-container");
    chrome.storage.sync.get("STORAGE_KEY", function (result) {
        divCategoryContainer.innerHTML = result["STORAGE_KEY"];
        console.log(result);
    });
}

function closeThisWindow() {
    window.close();
}

async function getAllTabs() {
    var tabs = await chrome.tabs.query({});
    var objTabInfo = {};

    tabs.forEach(function (tab) {
        objTabInfo = {
            "id": tab.id,
            "active": tab.active,
            "favIconUrl": tab.favIconUrl,
            "pinned": tab.pinned,
            "select": tab.selected,
            "status": tab.status,
            "title": tab.title,
            "url": tab.url,
            "groupId": tab.groupId
        };
    });

    return objTabInfo;
}

async function getAllTabsTest() {
    var tabs = await chrome.tabs.query({});
    var arrGroups = [];
    console.log('----------------------');
    tabs.forEach(function (tab) {
        console.log('Active...: '+tab.active);
        console.log('FavIcon..: '+tab.favIconUrl);
        console.log('GroupId..: '+tab.groupId);

        if (tab.groupId > 0 && arrGroups.indexOf(tab.groupId) < 0) {
            arrGroups.push(tab.groupId);
        }

        console.log('Id.......: '+tab.id);
        console.log('Pinned...: '+tab.pinned);
        console.log('Select...: '+tab.selected);
        console.log('Status...: '+tab.status);
        console.log('Title....: '+tab.title);
        console.log('Url......: '+tab.url);

        console.log('----------------------');
    });

    for (i = 0; i < arrGroups.length; i++) {
        let group = chrome.tabGroups.get(arrGroups[i]).then(function(resp) {
            console.log('++++++++');
            console.log('Collapsed....;'+resp.collapsed);
            console.log('Color........;'+resp.color);
            console.log('Id...........;'+resp.id);
            console.log('Title........;'+resp.title);
            console.log('++++++++');
        });
    }
}

/**
 *
 * async function getAllTabs() {
 *     var tabs = await chrome.tabs.query({});
 *     var arrGroups = [];
 *     var objTabInfo = {};
 *     var objGroups = {};
 *
 *     tabs.forEach(function (tab) {
 *         objTabInfo = {
 *             "id": tab.id,
 *             "active": tab.active,
 *             "favIconUrl": tab.favIconUrl,
 *             "pinned": tab.pinned,
 *             "select": tab.selected,
 *             "status": tab.status,
 *             "title": tab.title,
 *             "url": tab.url,
 *             "groupId": tab.groupId
 *         };
 *
 *         if (tab.groupId > 0 && arrGroups.indexOf(tab.groupId) < 0) {
 *             arrGroups.push(tab.groupId);
 *         }
 *
 *     });
 *
 *     for (i = 0; i < arrGroups.length; i++) {
 *         let group = chrome.tabGroups.get(arrGroups[i]).then(function(resp) {
 *             objGroups = {
 *                 "collapsed": resp.collapsed,
 *                 "color": resp.color,
 *                 "id": resp.id,
 *                 "title": resp.title
 *             };
 *         });
 *     }
 *
 *     return {"tabs": objTabInfo, "groups": objGroups}
 * }
 */