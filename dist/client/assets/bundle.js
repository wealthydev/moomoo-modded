/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Ensure a minimal `process` shim exists before loading modules that depend on it.
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function ensureProcessShim() {
  var globalObject = typeof globalThis !== "undefined" ? globalThis : window;
  var proc = globalObject.process || {};
  if (_typeof(proc.env) !== "object" || proc.env === null) proc.env = {};
  if (!Array.isArray(proc.argv)) proc.argv = [];
  proc.browser = true;
  proc.title = "browser";
  if (typeof proc.nextTick !== "function") {
    proc.nextTick = function (fn) {
      return setTimeout(fn, 0);
    };
  }
  globalObject.process = proc;
})();
window.loadedScript = true;
var isProd = location.hostname !== "127.0.0.1" && !location.hostname.startsWith("192.168.");

//require("./libs/modernizr.js");

var io = __webpack_require__(1);
var UTILS = __webpack_require__(2);
var animText = __webpack_require__(3);
var config = __webpack_require__(4);
var GameObject = __webpack_require__(6);
var items = __webpack_require__(7);
var ObjectManager = __webpack_require__(8);
var Player = __webpack_require__(9);
var store = __webpack_require__(16);
var Projectile = __webpack_require__(17);
var ProjectileManager = __webpack_require__(18);
var textManager = new animText.TextManager();
var ServerManagerPolyfill = __webpack_require__(19);
var serverManager = new ServerManagerPolyfill("moomoo.io", 3000, config.maxPlayers, 5, false);
serverManager.debugLog = false;
var connected = false;
var startedConnecting = false;
function connectSocketIfReady() {
  if (!didLoad) return;
  startedConnecting = true;

  //connectSocket();
}
function connectSocket() {
  serverManager.start(function (address, port, gameIndex) {
    var protocol = isProd ? "wss" : "ws";
    var wsAddress = protocol + "://" + address + ":" + 8008 + "/?gameIndex=" + gameIndex;
    io.connect(wsAddress, function (error) {
      pingSocket();
      setInterval(function () {
        return pingSocket();
      }, 2500);
      if (error) {
        disconnect(error);
      } else {
        connected = true;
        startGame();
      }
    }, {
      "id": setInitData,
      "d": disconnect,
      "1": setupGame,
      "2": addPlayer,
      "4": removePlayer,
      "33": updatePlayers,
      "5": updateLeaderboard,
      "6": loadGameObject,
      "a": loadAI,
      "aa": animateAI,
      "7": gatherAnimation,
      "8": wiggleGameObject,
      "sp": shootTurret,
      "9": updatePlayerValue,
      "h": updateHealth,
      "11": killPlayer,
      "12": killObject,
      "13": killObjects,
      "14": updateItemCounts,
      "15": updateAge,
      "16": updateUpgrades,
      "17": updateItems,
      "18": addProjectile,
      "19": remProjectile,
      "20": serverShutdownNotice,
      "ac": addAlliance,
      "ad": deleteAlliance,
      "an": allianceNotification,
      "st": setPlayerTeam,
      "sa": setAlliancePlayers,
      "us": updateStoreItems,
      "ch": receiveChat,
      "mm": updateMinimap,
      "t": showText,
      "p": pingMap,
      "pp": pingSocketResponse
    });
    setupServerStatus();
    setTimeout(function () {
      return updateServerList();
    }, 3 * 1000);
  }, function (error) {
    console.error("Server manager error:", error);
    alert("Error:\n" + error);
    disconnect("disconnected");
  });
}
function socketReady() {
  return io.connected;
}
function joinParty() {
  var currentKey = serverBrowser.value;
  var key = prompt("party key", currentKey);
  if (key) {
    window.onbeforeunload = undefined; // Don't ask to leave
    window.location.href = "/?server=" + key;
  }
}
var mathPI = Math.PI;
var mathPI2 = mathPI * 2;
Math.lerpAngle = function (value1, value2, amount) {
  var difference = Math.abs(value2 - value1);
  if (difference > mathPI) {
    if (value1 > value2) {
      value2 += mathPI2;
    } else {
      value1 += mathPI2;
    }
  }
  var value = value2 + (value1 - value2) * amount;
  if (value >= 0 && value <= mathPI2) return value;
  return value % mathPI2;
};
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  if (r < 0) r = 0;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};
var canStore;
if (typeof Storage !== "undefined") {
  canStore = true;
}
function saveVal(name, val) {
  if (canStore) localStorage.setItem(name, val);
}
function getSavedVal(name) {
  if (canStore) return localStorage.getItem(name);
  return null;
}
if (!getSavedVal("consent")) consentBlock.style.display = "block";
window.checkTerms = function (yes) {
  if (yes) {
    consentBlock.style.display = "none";
    saveVal("consent", 1);
  } else $("#consentShake").effect("shake");
};
var moofoll = getSavedVal("moofoll");
function follmoo() {
  if (!moofoll) {
    moofoll = true;
    saveVal("moofoll", 1);
  }
}
var useNativeResolution;
var showPing;
var pixelDensity = 1;
var delta, now, lastSent;
var lastUpdate = Date.now();
var keys, attackState;
var ais = [];
var players = [];
var alliances = [];
var gameObjects = [];
var projectiles = [];
var projectileManager = new ProjectileManager(Projectile, projectiles, players, ais, objectManager, items, config, UTILS);
var AiManager = __webpack_require__(20);
var AI = __webpack_require__(21);
var aiManager = new AiManager(ais, AI, players, items, null, config, UTILS);
var player, playerSID, tmpObj;
var waterMult = 1;
var waterPlus = 0;
var mouseX = 0;
var mouseY = 0;
var controllingTouch = {
  id: -1,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0
};
var attackingTouch = {
  id: -1,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0
};
var camX, camY;
var tmpDir;
var skinColor = 0;
var maxScreenWidth = config.maxScreenWidth;
var maxScreenHeight = config.maxScreenHeight;
var screenWidth, screenHeight;
var inGame = false;
var mainMenu = document.getElementById("mainMenu");
var enterGameButton = document.getElementById("enterGame");
var promoImageButton = document.getElementById("promoImg");
var partyButton = document.getElementById("partyButton");
var joinPartyButton = document.getElementById("joinPartyButton");
var settingsButton = document.getElementById("settingsButton");
var settingsButtonTitle = settingsButton.getElementsByTagName("span")[0];
var allianceButton = document.getElementById("allianceButton");
var storeButton = document.getElementById("storeButton");
var chatButton = document.getElementById("chatButton");
var gameCanvas = document.getElementById("gameCanvas");
var mainContext = gameCanvas.getContext("2d");
var serverBrowser = document.getElementById("serverBrowser");
var nativeResolutionCheckbox = document.getElementById("nativeResolution");
var showPingCheckbox = document.getElementById("showPing");
var pingDisplay = document.getElementById("pingDisplay");
var shutdownDisplay = document.getElementById("shutdownDisplay");
var menuCardHolder = document.getElementById("menuCardHolder");
var guideCard = document.getElementById("guideCard");
var loadingText = document.getElementById("loadingText");
var gameUI = document.getElementById("gameUI");
var actionBar = document.getElementById("actionBar");
var scoreDisplay = document.getElementById("scoreDisplay");
var foodDisplay = document.getElementById("foodDisplay");
var woodDisplay = document.getElementById("woodDisplay");
var stoneDisplay = document.getElementById("stoneDisplay");
var killCounter = document.getElementById("killCounter");
var leaderboardData = document.getElementById("leaderboardData");
var nameInput = document.getElementById("nameInput");
var itemInfoHolder = document.getElementById("itemInfoHolder");
var ageText = document.getElementById("ageText");
var ageBarBody = document.getElementById("ageBarBody");
var upgradeHolder = document.getElementById("upgradeHolder");
var upgradeCounter = document.getElementById("upgradeCounter");
var allianceMenu = document.getElementById("allianceMenu");
var allianceHolder = document.getElementById("allianceHolder");
var allianceManager = document.getElementById("allianceManager");
var mapDisplay = document.getElementById("mapDisplay");
var diedText = document.getElementById("diedText");
var skinColorHolder = document.getElementById("skinColorHolder");
var mapContext = mapDisplay.getContext("2d");
mapDisplay.width = 300;
mapDisplay.height = 300;
var storeMenu = document.getElementById("storeMenu");
var storeHolder = document.getElementById("storeHolder");
var noticationDisplay = document.getElementById("noticationDisplay");
var hats = store.hats;
var accessories = store.accessories;
var objectManager = new ObjectManager(GameObject, gameObjects, UTILS, config);
var outlineColor = "#525252";
var darkOutlineColor = "#3d3f42";
var outlineWidth = 5.5;
function setInitData(data) {
  alliances = data.teams;
}
var featuredYoutuber = document.getElementById('featuredYoutube');
var youtuberList = [{
  name: "Corrupt X",
  link: "https://www.youtube.com/channel/UC0UH2LfQvBSeH24bmtbmITw"
}, {
  name: "Tweak Big",
  link: "https://www.youtube.com/channel/UCbwvzJ38AndDTkoX8sD9YOw"
}, {
  name: "Arena Closer",
  link: "https://www.youtube.com/channel/UCazucVSJqW-kiHMIhQhD-QQ"
}, {
  name: "Godenot",
  link: "https://www.youtube.com/user/SirGodenot"
}, {
  name: "RajNoobTV",
  link: "https://www.youtube.com/channel/UCVLo9brXBWrCttMaGzvm0-Q"
}, {
  name: "TomNotTom",
  link: "https://www.youtube.com/channel/UC7z97RgHFJRcv2niXgArBDw"
}, {
  name: "Nation",
  link: "https://www.youtube.com/channel/UCSl-MBn3qzjrIvLNESQRk-g"
}, {
  name: "Pidyohago",
  link: "https://www.youtube.com/channel/UC04p8Mg8nDaDx04A9is2B8Q"
}, {
  name: "Enigma",
  link: "https://www.youtube.com/channel/UC5HhLbs3sReHo8Bb9NDdFrg"
}, {
  name: "Bauer",
  link: "https://www.youtube.com/channel/UCwU2TbJx3xTSlPqg-Ix3R1g"
}, {
  name: "iStealth",
  link: "https://www.youtube.com/channel/UCGrvlEOsQFViZbyFDE6t69A"
}, {
  name: "SICKmania",
  link: "https://www.youtube.com/channel/UCvVI98ezn4TpX5wDMZjMa3g"
}, {
  name: "LightThief",
  link: "https://www.youtube.com/channel/UCj6C_tiDeATiKd3GX127XoQ"
}, {
  name: "Fortish",
  link: "https://www.youtube.com/channel/UCou6CLU-szZA3Tb340TB9_Q"
}, {
  name: "巧克力",
  link: "https://www.youtube.com/channel/UCgL6J6oL8F69vm-GcPScmwg"
}, {
  name: "i Febag",
  link: "https://www.youtube.com/channel/UCiU6WZwiKbsnt5xmwr0OFbg"
}, {
  name: "GoneGaming",
  link: "https://www.youtube.com/channel/UCOcQthRanYcwYY0XVyVeK0g"
}];
var tmpYoutuber = youtuberList[UTILS.randInt(0, youtuberList.length - 1)];
featuredYoutuber.innerHTML = "<a target='_blank' class='ytLink' href='" + tmpYoutuber.link + "'><i class='material-icons' style='vertical-align: top;'>&#xE064;</i> " + tmpYoutuber.name + "</a>";
var inWindow = true;
var didLoad = false;
window.onblur = function () {
  inWindow = false;
};
window.onfocus = function () {
  inWindow = true;
  if (player && player.alive) {
    resetMoveDir();
  }
};
window.onload = function () {
  didLoad = true;
  connectSocketIfReady();
};
gameCanvas.oncontextmenu = function () {
  return false;
};
function disconnect(reason) {
  connected = false;
  io.close();
  showLoadingText(reason);
}
function showLoadingText(text) {
  mainMenu.style.display = "block";
  gameUI.style.display = "none";
  menuCardHolder.style.display = "none";
  diedText.style.display = "none";
  loadingText.style.display = "block";
  loadingText.innerHTML = text + "<a href='javascript:window.location.href=window.location.href' class='ytLink'>reload</a>";
}
function bindEvents() {
  UTILS.hookTouchEvents(enterGameButton);
  enterGameButton.addEventListener("click", function () {
    enterGame();
  });
  promoImageButton.onclick = UTILS.checkTrusted(function () {
    openLink('https://krunker.io/?play=SquidGame_KB');
  });
  UTILS.hookTouchEvents(promoImageButton);
  joinPartyButton.onclick = UTILS.checkTrusted(function () {
    setTimeout(function () {
      joinParty();
    }, 10);
  });
  UTILS.hookTouchEvents(joinPartyButton);
  settingsButton.onclick = UTILS.checkTrusted(function () {
    toggleSettings();
  });
  UTILS.hookTouchEvents(settingsButton);
  allianceButton.onclick = UTILS.checkTrusted(function () {
    toggleAllianceMenu();
  });
  UTILS.hookTouchEvents(allianceButton);
  storeButton.onclick = UTILS.checkTrusted(function () {
    toggleStoreMenu();
  });
  UTILS.hookTouchEvents(storeButton);
  chatButton.onclick = UTILS.checkTrusted(function () {
    toggleChat();
  });
  UTILS.hookTouchEvents(chatButton);
  mapDisplay.onclick = UTILS.checkTrusted(function () {
    sendMapPing();
  });
  UTILS.hookTouchEvents(mapDisplay);
}
var gamesPerServer = 1;
function setupServerStatus() {
  var tmpHTML = "<select>";
  var overallTotal = 0;
  var regionCounter = 0;
  for (var region in serverManager.servers) {
    var serverList = serverManager.servers[region];
    var totalPlayers = 0;
    for (var i = 0; i < serverList.length; i++) {
      for (var j = 0; j < serverList[i].games.length; j++) {
        totalPlayers += serverList[i].games[j].playerCount;
      }
    }
    overallTotal += totalPlayers;
    var regionInfo = serverManager.regionInfo[region] || {
      name: serverManager.stripRegion(region)
    };
    var regionName = regionInfo.name;
    tmpHTML += "<option disabled>" + regionName + " - " + totalPlayers + " players</option>";
    for (var serverIndex = 0; serverIndex < serverList.length; serverIndex++) {
      var server = serverList[serverIndex];
      for (var gameIndex = 0; gameIndex < server.games.length; gameIndex++) {
        var game = server.games[gameIndex];
        var adjustedIndex = server.index * gamesPerServer + gameIndex + 1;
        var isSelected = serverManager.server && serverManager.server.region === server.region && serverManager.server.index === server.index && serverManager.gameIndex == gameIndex;
        var serverLabel = regionName + " " + adjustedIndex + " [" + Math.min(game.playerCount, config.maxPlayers) + "/" + config.maxPlayers + "]";
        var serverID = serverManager.stripRegion(region) + ":" + serverIndex + ":" + gameIndex;
        if (isSelected) partyButton.getElementsByTagName("span")[0].innerText = serverID;
        var selected = isSelected ? "selected" : "";
        tmpHTML += "<option value='" + serverID + "' " + selected + ">" + serverLabel + "</option>";
      }
    }
    tmpHTML += "<option disabled></option>";
    regionCounter++;
  }
  tmpHTML += "<option disabled>All Servers - " + overallTotal + " players</option>";
  tmpHTML += "</select>";
  serverBrowser.innerHTML = tmpHTML;
  var altServerText;
  var altServerURL;
  if (location.hostname == "sandbox.moomoo.io") {
    altServerText = "Back to MooMoo";
    altServerURL = "//moomoo.io/";
  } else {
    altServerText = "Try the sandbox";
    altServerURL = "//sandbox.moomoo.io/";
  }
  document.getElementById("altServer").innerHTML = "<a href='" + altServerURL + "'>" + altServerText + "<i class='material-icons' style='font-size:10px;vertical-align:middle'>arrow_forward_ios</i></a>";
}
function updateServerList() {
  if (typeof serverManager.getServerSnapshot === "function") {
    var snapshot = serverManager.getServerSnapshot();
    serverManager.processServers(snapshot.servers);
    setupServerStatus();
    return;
  }
  var xmlhttp = new XMLHttpRequest();
  var url = "/serverData";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var payload = JSON.parse(this.responseText);
        serverManager.processServers(payload.servers);
        setupServerStatus();
      } else {
        console.error("Failed to load server data with status code:", this.status);
      }
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
serverBrowser.addEventListener("change", UTILS.checkTrusted(function (e) {
  if (e.target.tagName === "SELECT") {
    var parts = e.target.value.split(":");
    serverManager.switchServer(parts[0], parts[1], parts[2]);
  }
}));
function showItemInfo(item, isWeapon, isStoreItem) {
  if (player && item) {
    UTILS.removeAllChildren(itemInfoHolder);
    itemInfoHolder.classList.add("visible");
    UTILS.generateElement({
      id: "itemInfoName",
      text: UTILS.capitalizeFirst(item.name),
      parent: itemInfoHolder
    });
    UTILS.generateElement({
      id: "itemInfoDesc",
      text: item.desc,
      parent: itemInfoHolder
    });
    if (isStoreItem) {} else if (isWeapon) {
      UTILS.generateElement({
        "class": "itemInfoReq",
        text: !item.type ? "primary" : "secondary",
        parent: itemInfoHolder
      });
    } else {
      for (var i = 0; i < item.req.length; i += 2) {
        UTILS.generateElement({
          "class": "itemInfoReq",
          html: item.req[i] + "<span class='itemInfoReqVal'> x" + item.req[i + 1] + "</span>",
          parent: itemInfoHolder
        });
      }
      if (item.group.limit) {
        UTILS.generateElement({
          "class": "itemInfoLmt",
          text: (player.itemCounts[item.group.id] || 0) + "/" + item.group.limit,
          parent: itemInfoHolder
        });
      }
    }
  } else {
    itemInfoHolder.classList.remove("visible");
  }
}
var allianceNotifications = [];
var alliancePlayers = [];
function allianceNotification(sid, name) {
  allianceNotifications.push({
    sid: sid,
    name: name
  });
  updateNotifications();
}
function updateNotifications() {
  if (allianceNotifications[0]) {
    var tmpN = allianceNotifications[0];
    UTILS.removeAllChildren(noticationDisplay);
    noticationDisplay.style.display = "block";
    UTILS.generateElement({
      "class": "notificationText",
      text: tmpN.name,
      parent: noticationDisplay
    });
    UTILS.generateElement({
      "class": "notifButton",
      html: "<i class='material-icons' style='font-size:28px;color:#cc5151;'>&#xE14C;</i>",
      parent: noticationDisplay,
      onclick: function onclick() {
        aJoinReq(0);
      },
      hookTouch: true
    });
    UTILS.generateElement({
      "class": "notifButton",
      html: "<i class='material-icons' style='font-size:28px;color:#8ecc51;'>&#xE876;</i>",
      parent: noticationDisplay,
      onclick: function onclick() {
        aJoinReq(1);
      },
      hookTouch: true
    });
  } else {
    noticationDisplay.style.display = "none";
  }
}
function addAlliance(data) {
  alliances.push(data);
  if (allianceMenu.style.display == "block") showAllianceMenu();
}
function setPlayerTeam(team, isOwner) {
  if (player) {
    player.team = team;
    player.isOwner = isOwner;
    if (allianceMenu.style.display == "block") showAllianceMenu();
  }
}
function setAlliancePlayers(data) {
  alliancePlayers = data;
  if (allianceMenu.style.display == "block") showAllianceMenu();
}
function deleteAlliance(sid) {
  for (var i = alliances.length - 1; i >= 0; i--) {
    if (alliances[i].sid == sid) alliances.splice(i, 1);
  }
  if (allianceMenu.style.display == "block") showAllianceMenu();
}
function toggleAllianceMenu() {
  resetMoveDir();
  if (allianceMenu.style.display != "block") {
    showAllianceMenu();
  } else {
    allianceMenu.style.display = "none";
  }
}
function showAllianceMenu() {
  if (player && player.alive) {
    closeChat();
    storeMenu.style.display = "none";
    allianceMenu.style.display = "block";
    UTILS.removeAllChildren(allianceHolder);
    if (player.team) {
      for (var i = 0; i < alliancePlayers.length; i += 2) {
        (function (i) {
          var tmp = UTILS.generateElement({
            "class": "allianceItem",
            style: "color:" + (alliancePlayers[i] == player.sid ? "#fff" : "rgba(255,255,255,0.6)"),
            text: alliancePlayers[i + 1],
            parent: allianceHolder
          });
          if (player.isOwner && alliancePlayers[i] != player.sid) {
            UTILS.generateElement({
              "class": "joinAlBtn",
              text: "Kick",
              onclick: function onclick() {
                kickFromClan(alliancePlayers[i]);
              },
              hookTouch: true,
              parent: tmp
            });
          }
        })(i);
      }
    } else {
      if (alliances.length) {
        for (var i = 0; i < alliances.length; ++i) {
          (function (i) {
            var tmp = UTILS.generateElement({
              "class": "allianceItem",
              style: "color:" + (alliances[i].sid == player.team ? "#fff" : "rgba(255,255,255,0.6)"),
              text: alliances[i].sid,
              parent: allianceHolder
            });
            UTILS.generateElement({
              "class": "joinAlBtn",
              text: "Join",
              onclick: function onclick() {
                sendJoin(i);
              },
              hookTouch: true,
              parent: tmp
            });
          })(i);
        }
      } else {
        UTILS.generateElement({
          "class": "allianceItem",
          text: "No Tribes Yet",
          parent: allianceHolder
        });
      }
    }
    UTILS.removeAllChildren(allianceManager);
    if (player.team) {
      UTILS.generateElement({
        "class": "allianceButtonM",
        style: "width: 360px",
        text: player.isOwner ? "Delete Tribe" : "Leave Tribe",
        onclick: function onclick() {
          leaveAlliance();
        },
        hookTouch: true,
        parent: allianceManager
      });
    } else {
      UTILS.generateElement({
        tag: "input",
        type: "text",
        id: "allianceInput",
        maxLength: 7,
        placeholder: "unique name",
        ontouchstart: function ontouchstart(ev) {
          ev.preventDefault();
          var newValue = prompt("unique name", ev.currentTarget.value);
          ev.currentTarget.value = newValue.slice(0, 7);
        },
        parent: allianceManager
      });
      UTILS.generateElement({
        tag: "div",
        "class": "allianceButtonM",
        style: "width: 140px;",
        text: "Create",
        onclick: function onclick() {
          createAlliance();
        },
        hookTouch: true,
        parent: allianceManager
      });
    }
  }
}
function aJoinReq(join) {
  io.send("11", allianceNotifications[0].sid, join);
  allianceNotifications.splice(0, 1);
  updateNotifications();
}
function kickFromClan(sid) {
  io.send("12", sid);
}
function sendJoin(index) {
  io.send("10", alliances[index].sid);
}
function createAlliance() {
  io.send("8", document.getElementById("allianceInput").value);
}
function leaveAlliance() {
  allianceNotifications = [];
  updateNotifications();
  io.send("9");
}
var lastDeath;
var minimapData;
var mapMarker;
var mapPings = [];
var tmpPing;
function MapPing() {
  this.init = function (x, y) {
    this.scale = 0;
    this.x = x;
    this.y = y;
    this.active = true;
  };
  this.update = function (ctxt, delta) {
    if (this.active) {
      this.scale += 0.05 * delta;
      if (this.scale >= config.mapPingScale) {
        this.active = false;
      } else {
        ctxt.globalAlpha = 1 - Math.max(0, this.scale / config.mapPingScale);
        ctxt.beginPath();
        ctxt.arc(this.x / config.mapScale * mapDisplay.width, this.y / config.mapScale * mapDisplay.width, this.scale, 0, 2 * Math.PI);
        ctxt.stroke();
      }
    }
  };
}
function pingMap(x, y) {
  for (var i = 0; i < mapPings.length; ++i) {
    if (!mapPings[i].active) {
      tmpPing = mapPings[i];
      break;
    }
  }
  if (!tmpPing) {
    tmpPing = new MapPing();
    mapPings.push(tmpPing);
  }
  tmpPing.init(x, y);
}
function updateMapMarker() {
  if (!mapMarker) mapMarker = {};
  mapMarker.x = player.x;
  mapMarker.y = player.y;
}
function updateMinimap(data) {
  minimapData = data;
}
function renderMinimap(delta) {
  if (player && player.alive) {
    mapContext.clearRect(0, 0, mapDisplay.width, mapDisplay.height);
    mapContext.strokeStyle = "#fff";
    mapContext.lineWidth = 4;
    for (var i = 0; i < mapPings.length; ++i) {
      tmpPing = mapPings[i];
      tmpPing.update(mapContext, delta);
    }
    mapContext.globalAlpha = 1;
    mapContext.fillStyle = "#fff";
    renderCircle(player.x / config.mapScale * mapDisplay.width, player.y / config.mapScale * mapDisplay.height, 7, mapContext, true);
    mapContext.fillStyle = "rgba(255,255,255,0.35)";
    if (player.team && minimapData) {
      for (var i = 0; i < minimapData.length;) {
        renderCircle(minimapData[i] / config.mapScale * mapDisplay.width, minimapData[i + 1] / config.mapScale * mapDisplay.height, 7, mapContext, true);
        i += 2;
      }
    }
    if (lastDeath) {
      mapContext.fillStyle = "#fc5553";
      mapContext.font = "34px Hammersmith One";
      mapContext.textBaseline = "middle";
      mapContext.textAlign = "center";
      mapContext.fillText("x", lastDeath.x / config.mapScale * mapDisplay.width, lastDeath.y / config.mapScale * mapDisplay.height);
    }
    if (mapMarker) {
      mapContext.fillStyle = "#fff";
      mapContext.font = "34px Hammersmith One";
      mapContext.textBaseline = "middle";
      mapContext.textAlign = "center";
      mapContext.fillText("x", mapMarker.x / config.mapScale * mapDisplay.width, mapMarker.y / config.mapScale * mapDisplay.height);
    }
  }
}
var currentStoreIndex = 0;
function changeStoreIndex(index) {
  if (currentStoreIndex != index) {
    currentStoreIndex = index;
    generateStoreList();
  }
}
function toggleStoreMenu() {
  if (storeMenu.style.display != "block") {
    storeMenu.style.display = "block";
    allianceMenu.style.display = "none";
    closeChat();
    generateStoreList();
  } else {
    storeMenu.style.display = "none";
  }
}
function updateStoreItems(type, id, index) {
  if (index) {
    if (!type) player.tails[id] = 1;else player.tailIndex = id;
  } else {
    if (!type) player.skins[id] = 1;else player.skinIndex = id;
  }
  if (storeMenu.style.display == "block") generateStoreList();
}
function generateStoreList() {
  if (player) {
    UTILS.removeAllChildren(storeHolder);
    var index = currentStoreIndex;
    var tmpArray = index ? accessories : hats;
    for (var i = 0; i < tmpArray.length; ++i) {
      if (!tmpArray[i].dontSell) {
        (function (i) {
          var tmp = UTILS.generateElement({
            id: "storeDisplay" + i,
            "class": "storeItem",
            onmouseout: function onmouseout() {
              showItemInfo();
            },
            onmouseover: function onmouseover() {
              showItemInfo(tmpArray[i], false, true);
            },
            parent: storeHolder
          });
          UTILS.hookTouchEvents(tmp, true);
          UTILS.generateElement({
            tag: "img",
            "class": "hatPreview",
            src: "../img/" + (index ? "accessories/access_" : "hats/hat_") + tmpArray[i].id + (tmpArray[i].topSprite ? "_p" : "") + ".png",
            parent: tmp
          });
          UTILS.generateElement({
            tag: "span",
            text: tmpArray[i].name,
            parent: tmp
          });
          if (index ? !player.tails[tmpArray[i].id] : !player.skins[tmpArray[i].id]) {
            UTILS.generateElement({
              "class": "joinAlBtn",
              style: "margin-top: 5px",
              text: "Buy",
              onclick: function onclick() {
                storeBuy(tmpArray[i].id, index);
              },
              hookTouch: true,
              parent: tmp
            });
            UTILS.generateElement({
              tag: "span",
              "class": "itemPrice",
              text: tmpArray[i].price,
              parent: tmp
            });
          } else if ((index ? player.tailIndex : player.skinIndex) == tmpArray[i].id) {
            UTILS.generateElement({
              "class": "joinAlBtn",
              style: "margin-top: 5px",
              text: "Unequip",
              onclick: function onclick() {
                storeEquip(0, index);
              },
              hookTouch: true,
              parent: tmp
            });
          } else {
            UTILS.generateElement({
              "class": "joinAlBtn",
              style: "margin-top: 5px",
              text: "Equip",
              onclick: function onclick() {
                storeEquip(tmpArray[i].id, index);
              },
              hookTouch: true,
              parent: tmp
            });
          }
        })(i);
      }
    }
  }
}
function storeEquip(id, index) {
  io.send("13c", 0, id, index);
}
function storeBuy(id, index) {
  io.send("13c", 1, id, index);
}
function hideAllWindows() {
  storeMenu.style.display = "none";
  allianceMenu.style.display = "none";
  closeChat();
}
function prepareUI() {
  var savedNativeValue = getSavedVal("native_resolution");
  if (!savedNativeValue) {
    setUseNativeResolution(typeof cordova !== "undefined"); // Only default to native if on mobile
  } else {
    setUseNativeResolution(savedNativeValue == "true");
  }
  showPing = getSavedVal("show_ping") == "true";
  pingDisplay.hidden = !showPing;
  setInterval(function () {
    if (window.cordova) {
      document.getElementById("downloadButtonContainer").classList.add("cordova");
      document.getElementById("mobileDownloadButtonContainer").classList.add("cordova");
    }
  }, 1000);
  updateSkinColorPicker();
  UTILS.removeAllChildren(actionBar);
  for (var i = 0; i < items.weapons.length + items.list.length; ++i) {
    (function (i) {
      UTILS.generateElement({
        id: "actionBarItem" + i,
        "class": "actionBarItem",
        style: "display:none",
        onmouseout: function onmouseout() {
          showItemInfo();
        },
        parent: actionBar
      });
    })(i);
  }
  for (var i = 0; i < items.list.length + items.weapons.length; ++i) {
    (function (i) {
      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = tmpCanvas.height = 66;
      var tmpContext = tmpCanvas.getContext('2d');
      tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2);
      tmpContext.imageSmoothingEnabled = false;
      tmpContext.webkitImageSmoothingEnabled = false;
      tmpContext.mozImageSmoothingEnabled = false;
      if (items.weapons[i]) {
        tmpContext.rotate(Math.PI / 4 + Math.PI);
        var tmpSprite = new Image();
        toolSprites[items.weapons[i].src] = tmpSprite;
        tmpSprite.onload = function () {
          this.isLoaded = true;
          var tmpPad = 1 / (this.height / this.width);
          var tmpMlt = items.weapons[i].iPad || 1;
          tmpContext.drawImage(this, -(tmpCanvas.width * tmpMlt * config.iconPad * tmpPad) / 2, -(tmpCanvas.height * tmpMlt * config.iconPad) / 2, tmpCanvas.width * tmpMlt * tmpPad * config.iconPad, tmpCanvas.height * tmpMlt * config.iconPad);
          tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)";
          tmpContext.globalCompositeOperation = "source-atop";
          tmpContext.fillRect(-tmpCanvas.width / 2, -tmpCanvas.height / 2, tmpCanvas.width, tmpCanvas.height);
          document.getElementById('actionBarItem' + i).style.backgroundImage = "url(" + tmpCanvas.toDataURL() + ")";
        };
        tmpSprite.src = ".././img/weapons/" + items.weapons[i].src + ".png";
        var tmpUnit = document.getElementById('actionBarItem' + i);
        tmpUnit.onmouseover = UTILS.checkTrusted(function () {
          showItemInfo(items.weapons[i], true);
        });
        tmpUnit.onclick = UTILS.checkTrusted(function () {
          selectToBuild(i, true);
        });
        UTILS.hookTouchEvents(tmpUnit);
      } else {
        var tmpSprite = getItemSprite(items.list[i - items.weapons.length], true);
        var tmpScale = Math.min(tmpCanvas.width - config.iconPadding, tmpSprite.width);
        tmpContext.globalAlpha = 1;
        tmpContext.drawImage(tmpSprite, -tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale);
        tmpContext.fillStyle = "rgba(0, 0, 70, 0.1)";
        tmpContext.globalCompositeOperation = "source-atop";
        tmpContext.fillRect(-tmpScale / 2, -tmpScale / 2, tmpScale, tmpScale);
        document.getElementById('actionBarItem' + i).style.backgroundImage = "url(" + tmpCanvas.toDataURL() + ")";
        var tmpUnit = document.getElementById('actionBarItem' + i);
        tmpUnit.onmouseover = UTILS.checkTrusted(function () {
          showItemInfo(items.list[i - items.weapons.length]);
        });
        tmpUnit.onclick = UTILS.checkTrusted(function () {
          selectToBuild(i - items.weapons.length);
        });
        UTILS.hookTouchEvents(tmpUnit);
      }
    })(i);
  }
  nameInput.ontouchstart = UTILS.checkTrusted(function (e) {
    e.preventDefault();
    var newValue = prompt("enter name", e.currentTarget.value);
    e.currentTarget.value = newValue.slice(0, 15);
  });
  nativeResolutionCheckbox.checked = useNativeResolution;
  nativeResolutionCheckbox.onchange = UTILS.checkTrusted(function (e) {
    setUseNativeResolution(e.target.checked);
  });
  showPingCheckbox.checked = showPing;
  showPingCheckbox.onchange = UTILS.checkTrusted(function (e) {
    showPing = showPingCheckbox.checked;
    pingDisplay.hidden = !showPing;
    saveVal("show_ping", showPing ? "true" : "false");
  });
}
function updateItems(data, wpn) {
  if (data) {
    if (wpn) player.weapons = data;else player.items = data;
  }
  for (var i = 0; i < items.list.length; ++i) {
    var tmpI = items.weapons.length + i;
    document.getElementById("actionBarItem" + tmpI).style.display = player.items.indexOf(items.list[i].id) >= 0 ? "inline-block" : "none";
  }
  for (var i = 0; i < items.weapons.length; ++i) {
    document.getElementById("actionBarItem" + i).style.display = player.weapons[items.weapons[i].type] == items.weapons[i].id ? "inline-block" : "none";
  }
}
function setUseNativeResolution(useNative) {
  useNativeResolution = useNative;
  pixelDensity = useNative ? window.devicePixelRatio || 1 : 1;
  nativeResolutionCheckbox.checked = useNative;
  saveVal("native_resolution", useNative.toString());
  resize();
}
function updateGuide() {
  if (usingTouch) {
    guideCard.classList.add("touch");
  } else {
    guideCard.classList.remove("touch");
  }
}
function toggleSettings() {
  if (guideCard.classList.contains("showing")) {
    guideCard.classList.remove("showing");
    settingsButtonTitle.innerText = "Settings";
  } else {
    guideCard.classList.add("showing");
    settingsButtonTitle.innerText = "Close";
  }
}
function updateSkinColorPicker() {
  var tmpHTML = "";
  for (var i = 0; i < config.skinColors.length; ++i) {
    if (i == skinColor) {
      tmpHTML += "<div class='skinColorItem activeSkin' style='background-color:" + config.skinColors[i] + "' onclick='selectSkinColor(" + i + ")'></div>";
    } else {
      tmpHTML += "<div class='skinColorItem' style='background-color:" + config.skinColors[i] + "' onclick='selectSkinColor(" + i + ")'></div>";
    }
  }
  skinColorHolder.innerHTML = tmpHTML;
}
function selectSkinColor(index) {
  skinColor = index;
  updateSkinColorPicker();
}
var chatBox = document.getElementById("chatBox");
var chatHolder = document.getElementById("chatHolder");
function toggleChat() {
  if (!usingTouch) {
    if (chatHolder.style.display == "block") {
      if (chatBox.value) {
        sendChat(chatBox.value);
      }
      closeChat();
    } else {
      storeMenu.style.display = "none";
      allianceMenu.style.display = "none";
      chatHolder.style.display = "block";
      chatBox.focus();
      resetMoveDir();
    }
  } else {
    setTimeout(function () {
      // Timeout lets the `hookTouchEvents` function exit
      var chatMessage = prompt("chat message");
      if (chatMessage) {
        sendChat(chatMessage);
      }
    }, 1);
  }
  chatBox.value = "";
}
function sendChat(message) {
  io.send("ch", message.slice(0, 30));
}
function closeChat() {
  chatBox.value = "";
  chatHolder.style.display = "none";
}
var profanityList = ["cunt", "whore", "fuck", "shit", "faggot", "nigger", "nigga", "dick", "vagina", "minge", "cock", "rape", "cum", "sex", "tits", "penis", "clit", "pussy", "meatcurtain", "jizz", "prune", "douche", "wanker", "damn", "bitch", "dick", "fag", "bastard"];
function checkProfanityString(text) {
  var tmpString;
  for (var i = 0; i < profanityList.length; ++i) {
    if (text.indexOf(profanityList[i]) > -1) {
      tmpString = "";
      for (var y = 0; y < profanityList[i].length; ++y) {
        tmpString += tmpString.length ? "o" : "M";
      }
      var re = new RegExp(profanityList[i], 'g');
      text = text.replace(re, tmpString);
    }
  }
  return text;
}
function receiveChat(sid, message) {
  var tmpPlayer = findPlayerBySID(sid);
  if (tmpPlayer) {
    tmpPlayer.chatMessage = checkProfanityString(message);
    tmpPlayer.chatCountdown = config.chatCountdown;
  }
}
window.addEventListener('resize', UTILS.checkTrusted(resize));
function resize() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  var scaleFillNative = Math.max(screenWidth / maxScreenWidth, screenHeight / maxScreenHeight) * pixelDensity;
  gameCanvas.width = screenWidth * pixelDensity;
  gameCanvas.height = screenHeight * pixelDensity;
  gameCanvas.style.width = screenWidth + "px";
  gameCanvas.style.height = screenHeight + "px";
  mainContext.setTransform(scaleFillNative, 0, 0, scaleFillNative, (screenWidth * pixelDensity - maxScreenWidth * scaleFillNative) / 2, (screenHeight * pixelDensity - maxScreenHeight * scaleFillNative) / 2);
}
resize();
var usingTouch;
setUsingTouch(false);
function setUsingTouch(using) {
  usingTouch = using;
  updateGuide();
}
window.setUsingTouch = setUsingTouch;
gameCanvas.addEventListener('touchmove', UTILS.checkTrusted(touchMove), false);
function touchMove(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  setUsingTouch(true);
  for (var i = 0; i < ev.changedTouches.length; i++) {
    var t = ev.changedTouches[i];
    if (t.identifier == controllingTouch.id) {
      controllingTouch.currentX = t.pageX;
      controllingTouch.currentY = t.pageY;
      sendMoveDir();
    } else if (t.identifier == attackingTouch.id) {
      attackingTouch.currentX = t.pageX;
      attackingTouch.currentY = t.pageY;
      attackState = 1;
    }
  }
}
gameCanvas.addEventListener('touchstart', UTILS.checkTrusted(touchStart), false);
function touchStart(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  setUsingTouch(true);
  for (var i = 0; i < ev.changedTouches.length; i++) {
    var t = ev.changedTouches[i];
    if (t.pageX < document.body.scrollWidth / 2 && controllingTouch.id == -1) {
      controllingTouch.id = t.identifier;
      controllingTouch.startX = controllingTouch.currentX = t.pageX;
      controllingTouch.startY = controllingTouch.currentY = t.pageY;
      sendMoveDir();
    } else if (t.pageX > document.body.scrollWidth / 2 && attackingTouch.id == -1) {
      attackingTouch.id = t.identifier;
      attackingTouch.startX = attackingTouch.currentX = t.pageX;
      attackingTouch.startY = attackingTouch.currentY = t.pageY;
      if (player.buildIndex < 0) {
        attackState = 1;
        sendAtckState();
      }
    }
  }
}
gameCanvas.addEventListener('touchend', UTILS.checkTrusted(touchEnd), false);
gameCanvas.addEventListener('touchcancel', UTILS.checkTrusted(touchEnd), false);
gameCanvas.addEventListener('touchleave', UTILS.checkTrusted(touchEnd), false);
function touchEnd(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  setUsingTouch(true);
  for (var i = 0; i < ev.changedTouches.length; i++) {
    var t = ev.changedTouches[i];
    if (t.identifier == controllingTouch.id) {
      controllingTouch.id = -1;
      sendMoveDir();
    } else if (t.identifier == attackingTouch.id) {
      attackingTouch.id = -1;
      if (player.buildIndex >= 0) {
        attackState = 1;
        sendAtckState();
      }
      attackState = 0;
      sendAtckState();
    }
  }
}
gameCanvas.addEventListener('mousemove', gameInput, false);
function gameInput(e) {
  e.preventDefault();
  e.stopPropagation();
  setUsingTouch(false);
  mouseX = e.clientX;
  mouseY = e.clientY;
}
gameCanvas.addEventListener('mousedown', mouseDown, false);
function mouseDown(e) {
  setUsingTouch(false);
  if (attackState != 1) {
    attackState = 1;
    sendAtckState();
  }
}
gameCanvas.addEventListener('mouseup', mouseUp, false);
function mouseUp(e) {
  setUsingTouch(false);
  if (attackState != 0) {
    attackState = 0;
    sendAtckState();
  }
}
function getMoveDir() {
  var dx = 0;
  var dy = 0;
  if (controllingTouch.id != -1) {
    dx += controllingTouch.currentX - controllingTouch.startX;
    dy += controllingTouch.currentY - controllingTouch.startY;
  } else {
    for (var key in moveKeys) {
      var tmpDir = moveKeys[key];
      dx += !!keys[key] * tmpDir[0];
      dy += !!keys[key] * tmpDir[1];
    }
  }
  return dx == 0 && dy == 0 ? undefined : UTILS.fixTo(Math.atan2(dy, dx), 2);
}
var lastDir;
function getAttackDir() {
  if (!player) return 0;
  if (attackingTouch.id != -1) {
    lastDir = Math.atan2(attackingTouch.currentY - attackingTouch.startY, attackingTouch.currentX - attackingTouch.startX);
  } else if (!player.lockDir && !usingTouch) {
    lastDir = Math.atan2(mouseY - screenHeight / 2, mouseX - screenWidth / 2);
  }
  return UTILS.fixTo(lastDir || 0, 2);
}
var keys = {};
var moveKeys = {
  87: [0, -1],
  38: [0, -1],
  83: [0, 1],
  40: [0, 1],
  65: [-1, 0],
  37: [-1, 0],
  68: [1, 0],
  39: [1, 0]
};
function resetMoveDir() {
  keys = {};
  io.send("rmd");
}
function keysActive() {
  return allianceMenu.style.display != "block" && chatHolder.style.display != "block";
}
function keyDown(event) {
  var keyNum = event.which || event.keyCode || 0;
  if (keyNum == 27) {
    hideAllWindows();
  } else if (player && player.alive && keysActive()) {
    if (!keys[keyNum]) {
      keys[keyNum] = 1;
      if (keyNum == 69) {
        sendAutoGather();
      } else if (keyNum == 67) {
        updateMapMarker();
      } else if (keyNum == 88) {
        sendLockDir();
      } else if (player.weapons[keyNum - 49] != undefined) {
        selectToBuild(player.weapons[keyNum - 49], true);
      } else if (player.items[keyNum - 49 - player.weapons.length] != undefined) {
        selectToBuild(player.items[keyNum - 49 - player.weapons.length]);
      } else if (keyNum == 81) {
        selectToBuild(player.items[0]);
      } else if (keyNum == 82) {
        sendMapPing();
      } else if (moveKeys[keyNum]) {
        sendMoveDir();
      } else if (keyNum == 32) {
        attackState = 1;
        sendAtckState();
      }
    }
  }
}
window.addEventListener('keydown', UTILS.checkTrusted(keyDown));
function keyUp(event) {
  if (player && player.alive) {
    var keyNum = event.which || event.keyCode || 0;
    if (keyNum == 13) {
      toggleChat();
    } else if (keysActive()) {
      if (keys[keyNum]) {
        keys[keyNum] = 0;
        if (moveKeys[keyNum]) {
          sendMoveDir();
        } else if (keyNum == 32) {
          attackState = 0;
          sendAtckState();
        }
      }
    }
  }
}
window.addEventListener('keyup', UTILS.checkTrusted(keyUp));
function sendAtckState() {
  if (player && player.alive) {
    io.send("c", attackState, player.buildIndex >= 0 ? getAttackDir() : null);
  }
}
var lastMoveDir = undefined;
function sendMoveDir() {
  var newMoveDir = getMoveDir();
  if (lastMoveDir == undefined || newMoveDir == undefined || Math.abs(newMoveDir - lastMoveDir) > 0.3) {
    io.send("33", newMoveDir);
    lastMoveDir = newMoveDir;
  }
}
function sendLockDir() {
  player.lockDir = player.lockDir ? 0 : 1;
  io.send("7", 0);
}
function sendMapPing() {
  io.send("14", 1);
}
function sendAutoGather() {
  io.send("7", 1);
}
function selectToBuild(index, wpn) {
  io.send("5", index, wpn);
}
function enterGame() {
  saveVal("moo_name", nameInput.value);
  if (!inGame && socketReady()) {
    inGame = true;
    showLoadingText("Loading...");
    io.send("sp", {
      name: nameInput.value,
      moofoll: moofoll,
      skin: skinColor
    });
  }
}
var firstSetup = true;
function setupGame(yourSID) {
  loadingText.style.display = "none";
  menuCardHolder.style.display = "block";
  mainMenu.style.display = "none";
  keys = {};
  playerSID = yourSID;
  attackState = 0;
  inGame = true;
  if (firstSetup) {
    firstSetup = false;
    gameObjects.length = 0;
  }
}
function showText(x, y, value, type) {
  textManager.showText(x, y, 50, 0.18, 500, Math.abs(value), value >= 0 ? "#fff" : "#8ecc51");
}
var deathTextScale = 99999;
function killPlayer() {
  inGame = false;
  try {
    factorem.refreshAds([2], true);
  } catch (e) {}
  ;
  gameUI.style.display = "none";
  hideAllWindows();
  lastDeath = {
    x: player.x,
    y: player.y
  };
  loadingText.style.display = "none";
  diedText.style.display = "block";
  diedText.style.fontSize = "0px";
  deathTextScale = 0;
  setTimeout(function () {
    menuCardHolder.style.display = "block";
    mainMenu.style.display = "block";
    diedText.style.display = "none";
  }, config.deathFadeout);
  updateServerList();
}
function killObjects(sid) {
  if (player) objectManager.removeAllItems(sid);
}
function killObject(sid) {
  objectManager.disableBySid(sid);
}
function updateStatusDisplay() {
  scoreDisplay.innerText = player.points;
  foodDisplay.innerText = player.food;
  ;
  woodDisplay.innerText = player.wood;
  stoneDisplay.innerText = player.stone;
  killCounter.innerText = player.kills;
}
var iconSprites = {};
var icons = ["crown", "skull"];
function loadIcons() {
  for (var i = 0; i < icons.length; ++i) {
    var tmpSprite = new Image();
    tmpSprite.onload = function () {
      this.isLoaded = true;
    };
    tmpSprite.src = ".././img/icons/" + icons[i] + ".png";
    iconSprites[icons[i]] = tmpSprite;
  }
}
var tmpList = [];
function updateUpgrades(points, age) {
  player.upgradePoints = points;
  player.upgrAge = age;
  if (points > 0) {
    tmpList.length = 0;
    UTILS.removeAllChildren(upgradeHolder);
    for (var i = 0; i < items.weapons.length; ++i) {
      if (items.weapons[i].age == age && (items.weapons[i].pre == undefined || player.weapons.indexOf(items.weapons[i].pre) >= 0)) {
        var e = UTILS.generateElement({
          id: "upgradeItem" + i,
          "class": "actionBarItem",
          onmouseout: function onmouseout() {
            showItemInfo();
          },
          parent: upgradeHolder
        });
        e.style.backgroundImage = document.getElementById("actionBarItem" + i).style.backgroundImage;
        tmpList.push(i);
      }
    }
    for (var i = 0; i < items.list.length; ++i) {
      if (items.list[i].age == age && (items.list[i].pre == undefined || player.items.indexOf(items.list[i].pre) >= 0)) {
        var tmpI = items.weapons.length + i;
        var e = UTILS.generateElement({
          id: "upgradeItem" + tmpI,
          "class": "actionBarItem",
          onmouseout: function onmouseout() {
            showItemInfo();
          },
          parent: upgradeHolder
        });
        e.style.backgroundImage = document.getElementById("actionBarItem" + tmpI).style.backgroundImage;
        tmpList.push(tmpI);
      }
    }
    for (var i = 0; i < tmpList.length; i++) {
      (function (i) {
        var tmpItem = document.getElementById('upgradeItem' + i);
        tmpItem.onmouseover = function () {
          if (items.weapons[i]) {
            showItemInfo(items.weapons[i], true);
          } else {
            showItemInfo(items.list[i - items.weapons.length]);
          }
        };
        tmpItem.onclick = UTILS.checkTrusted(function () {
          io.send("6", i);
          console.log("Sent upgrade for item index: " + i);
        });
        UTILS.hookTouchEvents(tmpItem);
      })(tmpList[i]);
    }
    if (tmpList.length) {
      upgradeHolder.style.display = "block";
      upgradeCounter.style.display = "block";
      upgradeCounter.innerHTML = "SELECT ITEMS (" + points + ")";
    } else {
      upgradeHolder.style.display = "none";
      upgradeCounter.style.display = "none";
      showItemInfo();
    }
  } else {
    upgradeHolder.style.display = "none";
    upgradeCounter.style.display = "none";
    showItemInfo();
  }
}
function updateAge(xp, mxp, age) {
  if (xp != undefined) player.XP = xp;
  if (mxp != undefined) player.maxXP = mxp;
  if (age != undefined) player.age = age;
  if (age == config.maxAge) {
    ageText.innerHTML = "MAX AGE";
    ageBarBody.style.width = "100%";
  } else {
    ageText.innerHTML = "AGE " + player.age;
    ageBarBody.style.width = player.XP / player.maxXP * 100 + "%";
  }
}
function updateLeaderboard(data) {
  UTILS.removeAllChildren(leaderboardData);
  var tmpC = 1;
  for (var i = 0; i < data.length; i += 3) {
    (function (i) {
      UTILS.generateElement({
        "class": "leaderHolder",
        parent: leaderboardData,
        children: [UTILS.generateElement({
          "class": "leaderboardItem",
          style: "color:" + (data[i] == playerSID ? "#fff" : "rgba(255,255,255,0.6)"),
          text: tmpC + ". " + (data[i + 1] != "" ? data[i + 1] : "unknown")
        }), UTILS.generateElement({
          "class": "leaderScore",
          text: UTILS.kFormat(data[i + 2]) || "0"
        })]
      });
    })(i);
    tmpC++;
  }
}
function updateGame() {
  if (true) {
    if (player) {
      if (!lastSent || now - lastSent >= 1000 / config.clientSendRate) {
        lastSent = now;
        io.send("2", getAttackDir());
      }
    }
    if (deathTextScale < 120) {
      deathTextScale += 0.1 * delta;
      diedText.style.fontSize = Math.min(Math.round(deathTextScale), 120) + "px";
    }
    if (player) {
      var tmpDist = UTILS.getDistance(camX, camY, player.x, player.y);
      var tmpDir = UTILS.getDirection(player.x, player.y, camX, camY);
      var camSpd = Math.min(tmpDist * 0.01 * delta, tmpDist);
      if (tmpDist > 0.05) {
        camX += camSpd * Math.cos(tmpDir);
        camY += camSpd * Math.sin(tmpDir);
      } else {
        camX = player.x;
        camY = player.y;
      }
    } else {
      camX = config.mapScale / 2;
      camY = config.mapScale / 2;
    }
    var lastTime = now - 1000 / config.serverUpdateRate;
    var tmpDiff;
    for (var i = 0; i < players.length + ais.length; ++i) {
      tmpObj = players[i] || ais[i - players.length];
      if (tmpObj && tmpObj.visible) {
        if (tmpObj.forcePos) {
          tmpObj.x = tmpObj.x2;
          tmpObj.y = tmpObj.y2;
          tmpObj.dir = tmpObj.d2;
        } else {
          var total = tmpObj.t2 - tmpObj.t1;
          var fraction = lastTime - tmpObj.t1;
          var ratio = fraction / total;
          var rate = 170;
          tmpObj.dt += delta;
          var tmpRate = Math.min(1.7, tmpObj.dt / rate);
          var tmpDiff = tmpObj.x2 - tmpObj.x1;
          tmpObj.x = tmpObj.x1 + tmpDiff * tmpRate;
          tmpDiff = tmpObj.y2 - tmpObj.y1;
          tmpObj.y = tmpObj.y1 + tmpDiff * tmpRate;
          tmpObj.dir = Math.lerpAngle(tmpObj.d2, tmpObj.d1, Math.min(1.2, ratio));
        }
      }
    }
    var xOffset = camX - maxScreenWidth / 2;
    var yOffset = camY - maxScreenHeight / 2;
    if (config.snowBiomeTop - yOffset <= 0 && config.mapScale - config.snowBiomeTop - yOffset >= maxScreenHeight) {
      mainContext.fillStyle = "#b6db66";
      mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
    } else if (config.mapScale - config.snowBiomeTop - yOffset <= 0) {
      mainContext.fillStyle = "#dbc666";
      mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
    } else if (config.snowBiomeTop - yOffset >= maxScreenHeight) {
      mainContext.fillStyle = "#fff";
      mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
    } else if (config.snowBiomeTop - yOffset >= 0) {
      mainContext.fillStyle = "#fff";
      mainContext.fillRect(0, 0, maxScreenWidth, config.snowBiomeTop - yOffset);
      mainContext.fillStyle = "#b6db66";
      mainContext.fillRect(0, config.snowBiomeTop - yOffset, maxScreenWidth, maxScreenHeight - (config.snowBiomeTop - yOffset));
    } else {
      mainContext.fillStyle = "#b6db66";
      mainContext.fillRect(0, 0, maxScreenWidth, config.mapScale - config.snowBiomeTop - yOffset);
      mainContext.fillStyle = "#dbc666";
      mainContext.fillRect(0, config.mapScale - config.snowBiomeTop - yOffset, maxScreenWidth, maxScreenHeight - (config.mapScale - config.snowBiomeTop - yOffset));
    }
    if (!firstSetup) {
      waterMult += waterPlus * config.waveSpeed * delta;
      if (waterMult >= config.waveMax) {
        waterMult = config.waveMax;
        waterPlus = -1;
      } else if (waterMult <= 1) {
        waterMult = waterPlus = 1;
      }
      mainContext.globalAlpha = 1;
      mainContext.fillStyle = "#dbc666";
      renderWaterBodies(xOffset, yOffset, mainContext, config.riverPadding);
      mainContext.fillStyle = "#91b2db";
      renderWaterBodies(xOffset, yOffset, mainContext, (waterMult - 1) * 250);
    }
    mainContext.lineWidth = 4;
    mainContext.strokeStyle = "#000";
    mainContext.globalAlpha = 0.06;
    mainContext.beginPath();
    for (var x = -camX; x < maxScreenWidth; x += maxScreenHeight / 18) {
      if (x > 0) {
        mainContext.moveTo(x, 0);
        mainContext.lineTo(x, maxScreenHeight);
      }
    }
    for (var y = -camY; y < maxScreenHeight; y += maxScreenHeight / 18) {
      if (x > 0) {
        mainContext.moveTo(0, y);
        mainContext.lineTo(maxScreenWidth, y);
      }
    }
    mainContext.stroke();
    mainContext.globalAlpha = 1;
    mainContext.strokeStyle = outlineColor;
    renderGameObjects(-1, xOffset, yOffset);
    mainContext.globalAlpha = 1;
    mainContext.lineWidth = outlineWidth;
    renderProjectiles(0, xOffset, yOffset);
    renderPlayers(xOffset, yOffset, 0);
    mainContext.globalAlpha = 1;
    for (var i = 0; i < ais.length; ++i) {
      tmpObj = ais[i];
      if (tmpObj.active && tmpObj.visible) {
        tmpObj.animate(delta);
        mainContext.save();
        mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
        mainContext.rotate(tmpObj.dir + tmpObj.dirPlus - Math.PI / 2);
        renderAI(tmpObj, mainContext);
        mainContext.restore();
      }
    }
    renderGameObjects(0, xOffset, yOffset);
    renderProjectiles(1, xOffset, yOffset);
    renderGameObjects(1, xOffset, yOffset);
    renderPlayers(xOffset, yOffset, 1);
    renderGameObjects(2, xOffset, yOffset);
    renderGameObjects(3, xOffset, yOffset);
    mainContext.fillStyle = "#000";
    mainContext.globalAlpha = 0.09;
    if (xOffset <= 0) {
      mainContext.fillRect(0, 0, -xOffset, maxScreenHeight);
    }
    if (config.mapScale - xOffset <= maxScreenWidth) {
      var tmpY = Math.max(0, -yOffset);
      mainContext.fillRect(config.mapScale - xOffset, tmpY, maxScreenWidth - (config.mapScale - xOffset), maxScreenHeight - tmpY);
    }
    if (yOffset <= 0) {
      mainContext.fillRect(-xOffset, 0, maxScreenWidth + xOffset, -yOffset);
    }
    if (config.mapScale - yOffset <= maxScreenHeight) {
      var tmpX = Math.max(0, -xOffset);
      var tmpMin = 0;
      if (config.mapScale - xOffset <= maxScreenWidth) tmpMin = maxScreenWidth - (config.mapScale - xOffset);
      mainContext.fillRect(tmpX, config.mapScale - yOffset, maxScreenWidth - tmpX - tmpMin, maxScreenHeight - (config.mapScale - yOffset));
    }
    mainContext.globalAlpha = 1;
    mainContext.fillStyle = "rgba(0, 0, 70, 0.35)";
    mainContext.fillRect(0, 0, maxScreenWidth, maxScreenHeight);
    mainContext.strokeStyle = darkOutlineColor;
    for (var i = 0; i < players.length + ais.length; ++i) {
      tmpObj = players[i] || ais[i - players.length];
      if (tmpObj.visible && !tmpObj.name.includes("B2ot")) {
        if (tmpObj.skinIndex != 10 || tmpObj == player || tmpObj.team && tmpObj.team == player.team) {
          var tmpText = (tmpObj.team ? "[" + tmpObj.team + "] " : "") + (tmpObj.name || "");
          if (tmpText != "") {
            mainContext.font = (tmpObj.nameScale || 30) + "px Hammersmith One";
            mainContext.fillStyle = "#fff";
            mainContext.textBaseline = "middle";
            mainContext.textAlign = "center";
            mainContext.lineWidth = tmpObj.nameScale ? 11 : 8;
            mainContext.lineJoin = "round";
            mainContext.strokeText(tmpText, tmpObj.x - xOffset, tmpObj.y - yOffset - tmpObj.scale - config.nameY);
            mainContext.fillText(tmpText, tmpObj.x - xOffset, tmpObj.y - yOffset - tmpObj.scale - config.nameY);
            if (tmpObj.isLeader && iconSprites["crown"].isLoaded) {
              var tmpS = config.crownIconScale;
              var tmpX = tmpObj.x - xOffset - tmpS / 2 - mainContext.measureText(tmpText).width / 2 - config.crownPad;
              mainContext.drawImage(iconSprites["crown"], tmpX, tmpObj.y - yOffset - tmpObj.scale - config.nameY - tmpS / 2 - 5, tmpS, tmpS);
            }
            if (tmpObj.iconIndex == 1 && iconSprites["skull"].isLoaded) {
              var tmpS = config.crownIconScale;
              var tmpX = tmpObj.x - xOffset - tmpS / 2 + mainContext.measureText(tmpText).width / 2 + config.crownPad;
              mainContext.drawImage(iconSprites["skull"], tmpX, tmpObj.y - yOffset - tmpObj.scale - config.nameY - tmpS / 2 - 5, tmpS, tmpS);
            }
          }
          if (tmpObj.health > 0) {
            mainContext.fillStyle = darkOutlineColor;
            mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth - config.healthBarPad, tmpObj.y - yOffset + tmpObj.scale + config.nameY, config.healthBarWidth * 2 + config.healthBarPad * 2, 17, 8);
            mainContext.fill();
            mainContext.fillStyle = tmpObj == player || tmpObj.team && tmpObj.team == player.team ? "#8ecc51" : "#cc5151";
            mainContext.roundRect(tmpObj.x - xOffset - config.healthBarWidth, tmpObj.y - yOffset + tmpObj.scale + config.nameY + config.healthBarPad, config.healthBarWidth * 2 * (tmpObj.health / tmpObj.maxHealth), 17 - config.healthBarPad * 2, 7);
            mainContext.fill();
          }
        }
      }
    }
    textManager.update(delta, mainContext, xOffset, yOffset);
    for (var i = 0; i < players.length; ++i) {
      tmpObj = players[i];
      if (tmpObj.visible && tmpObj.chatCountdown > 0) {
        tmpObj.chatCountdown -= delta;
        if (tmpObj.chatCountdown <= 0) tmpObj.chatCountdown = 0;
        mainContext.font = "32px Hammersmith One";
        var tmpSize = mainContext.measureText(tmpObj.chatMessage);
        mainContext.textBaseline = "middle";
        mainContext.textAlign = "center";
        var tmpX = tmpObj.x - xOffset;
        var tmpY = tmpObj.y - tmpObj.scale - yOffset - 90;
        var tmpH = 47;
        var tmpW = tmpSize.width + 17;
        mainContext.fillStyle = "rgba(0,0,0,0.2)";
        mainContext.roundRect(tmpX - tmpW / 2, tmpY - tmpH / 2, tmpW, tmpH, 6);
        mainContext.fill();
        mainContext.fillStyle = "#fff";
        mainContext.fillText(tmpObj.chatMessage, tmpX, tmpY);
      }
    }
  }
  renderMinimap(delta);
  if (controllingTouch.id !== -1) {
    renderControl(controllingTouch.startX, controllingTouch.startY, controllingTouch.currentX, controllingTouch.currentY);
  }
  if (attackingTouch.id !== -1) {
    renderControl(attackingTouch.startX, attackingTouch.startY, attackingTouch.currentX, attackingTouch.currentY);
  }
}
function renderControl(startX, startY, currentX, currentY) {
  mainContext.save();
  mainContext.setTransform(1, 0, 0, 1, 0, 0);
  mainContext.scale(pixelDensity, pixelDensity);
  var controlRadius = 50;
  mainContext.beginPath();
  mainContext.arc(startX, startY, controlRadius, 0, Math.PI * 2, false);
  mainContext.closePath();
  mainContext.fillStyle = "rgba(255, 255, 255, 0.3)";
  mainContext.fill();
  var controlRadius = 50;
  var offsetX = currentX - startX;
  var offsetY = currentY - startY;
  var mag = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
  var divisor = mag > controlRadius ? mag / controlRadius : 1;
  offsetX /= divisor;
  offsetY /= divisor;
  mainContext.beginPath();
  mainContext.arc(startX + offsetX, startY + offsetY, controlRadius * 0.5, 0, Math.PI * 2, false);
  mainContext.closePath();
  mainContext.fillStyle = "white";
  mainContext.fill();
  mainContext.restore();
}
function renderProjectiles(layer, xOffset, yOffset) {
  for (var i = 0; i < projectiles.length; ++i) {
    tmpObj = projectiles[i];
    if (tmpObj.active && tmpObj.layer == layer) {
      tmpObj.update(delta);
      if (tmpObj.active && isOnScreen(tmpObj.x - xOffset, tmpObj.y - yOffset, tmpObj.scale)) {
        mainContext.save();
        mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
        mainContext.rotate(tmpObj.dir);
        renderProjectile(0, 0, tmpObj, mainContext, 1);
        mainContext.restore();
      }
    }
  }
}
var projectileSprites = {};
function renderProjectile(x, y, obj, ctxt, debug) {
  if (obj.src) {
    var tmpSrc = items.projectiles[obj.indx].src;
    var tmpSprite = projectileSprites[tmpSrc];
    if (!tmpSprite) {
      tmpSprite = new Image();
      tmpSprite.onload = function () {
        this.isLoaded = true;
      };
      tmpSprite.src = ".././img/weapons/" + tmpSrc + ".png";
      projectileSprites[tmpSrc] = tmpSprite;
    }
    if (tmpSprite.isLoaded) ctxt.drawImage(tmpSprite, x - obj.scale / 2, y - obj.scale / 2, obj.scale, obj.scale);
  } else if (obj.indx == 1) {
    ctxt.fillStyle = "#939393";
    renderCircle(x, y, obj.scale, ctxt);
  }
}
function renderWaterBodies(xOffset, yOffset, ctxt, padding) {
  var tmpW = config.riverWidth + padding;
  var tmpY = config.mapScale / 2 - yOffset - tmpW / 2;
  if (tmpY < maxScreenHeight && tmpY + tmpW > 0) {
    ctxt.fillRect(0, tmpY, maxScreenWidth, tmpW);
  }
}
function renderGameObjects(layer, xOffset, yOffset) {
  var tmpSprite, tmpX, tmpY;
  for (var i = 0; i < gameObjects.length; ++i) {
    tmpObj = gameObjects[i];
    if (tmpObj.active) {
      tmpX = tmpObj.x + tmpObj.xWiggle - xOffset;
      tmpY = tmpObj.y + tmpObj.yWiggle - yOffset;
      if (layer == 0) {
        tmpObj.update(delta);
      }
      if (tmpObj.layer == layer && isOnScreen(tmpX, tmpY, tmpObj.scale + (tmpObj.blocker || 0))) {
        mainContext.globalAlpha = tmpObj.hideFromEnemy ? 0.6 : 1;
        if (tmpObj.isItem) {
          tmpSprite = getItemSprite(tmpObj);
          mainContext.save();
          mainContext.translate(tmpX, tmpY);
          mainContext.rotate(tmpObj.dir);
          mainContext.drawImage(tmpSprite, -(tmpSprite.width / 2), -(tmpSprite.height / 2));
          if (tmpObj.blocker) {
            mainContext.strokeStyle = "#db6e6e";
            mainContext.globalAlpha = 0.3;
            mainContext.lineWidth = 6;
            renderCircle(0, 0, tmpObj.blocker, mainContext, false, true);
          }
          mainContext.restore();
        } else {
          tmpSprite = getResSprite(tmpObj);
          mainContext.drawImage(tmpSprite, tmpX - tmpSprite.width / 2, tmpY - tmpSprite.height / 2);
        }
      }
    }
  }
}
function gatherAnimation(sid, didHit, index) {
  tmpObj = findPlayerBySID(sid);
  if (tmpObj) tmpObj.startAnim(didHit, index);
}
function renderPlayers(xOffset, yOffset, zIndex) {
  mainContext.globalAlpha = 1;
  for (var i = 0; i < players.length; ++i) {
    tmpObj = players[i];
    if (tmpObj.zIndex == zIndex) {
      tmpObj.animate(delta);
      if (tmpObj.visible) {
        tmpObj.skinRot += 0.002 * delta;
        tmpDir = (tmpObj == player ? getAttackDir() : tmpObj.dir) + tmpObj.dirPlus;
        mainContext.save();
        mainContext.translate(tmpObj.x - xOffset, tmpObj.y - yOffset);
        mainContext.rotate(tmpDir);
        renderPlayer(tmpObj, mainContext);
        mainContext.restore();
      }
    }
  }
}
function renderPlayer(obj, ctxt) {
  ctxt = ctxt || mainContext;
  ctxt.lineWidth = outlineWidth;
  ctxt.lineJoin = "miter";
  var handAngle = Math.PI / 4 * (items.weapons[obj.weaponIndex].armS || 1);
  var oHandAngle = obj.buildIndex < 0 ? items.weapons[obj.weaponIndex].hndS || 1 : 1;
  var oHandDist = obj.buildIndex < 0 ? items.weapons[obj.weaponIndex].hndD || 1 : 1;
  if (obj.tailIndex > 0) {
    renderTail(obj.tailIndex, ctxt, obj);
  }
  if (obj.buildIndex < 0 && !items.weapons[obj.weaponIndex].aboveHand) {
    renderTool(items.weapons[obj.weaponIndex], config.weaponVariants[obj.weaponVariant].src, obj.scale, 0, ctxt);
    if (items.weapons[obj.weaponIndex].projectile != undefined && !items.weapons[obj.weaponIndex].hideProjectile) {
      renderProjectile(obj.scale, 0, items.projectiles[items.weapons[obj.weaponIndex].projectile], mainContext);
    }
  }
  ctxt.fillStyle = config.skinColors[obj.skinColor];
  renderCircle(obj.scale * Math.cos(handAngle), obj.scale * Math.sin(handAngle), 14);
  renderCircle(obj.scale * oHandDist * Math.cos(-handAngle * oHandAngle), obj.scale * oHandDist * Math.sin(-handAngle * oHandAngle), 14);
  if (obj.buildIndex < 0 && items.weapons[obj.weaponIndex].aboveHand) {
    renderTool(items.weapons[obj.weaponIndex], config.weaponVariants[obj.weaponVariant].src, obj.scale, 0, ctxt);
    if (items.weapons[obj.weaponIndex].projectile != undefined && !items.weapons[obj.weaponIndex].hideProjectile) {
      renderProjectile(obj.scale, 0, items.projectiles[items.weapons[obj.weaponIndex].projectile], mainContext);
    }
  }
  if (obj.buildIndex >= 0) {
    var tmpSprite = getItemSprite(items.list[obj.buildIndex]);
    ctxt.drawImage(tmpSprite, obj.scale - items.list[obj.buildIndex].holdOffset, -tmpSprite.width / 2);
  }
  renderCircle(0, 0, obj.scale, ctxt);
  if (obj.skinIndex > 0) {
    ctxt.rotate(Math.PI / 2);
    renderSkin(obj.skinIndex, ctxt, null, obj);
  }
}
var skinSprites = {};
var skinPointers = {};
var tmpSkin;
function renderSkin(index, ctxt, parentSkin, owner) {
  tmpSkin = skinSprites[index];
  if (!tmpSkin) {
    var tmpImage = new Image();
    tmpImage.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    tmpImage.src = ".././img/hats/hat_" + index + ".png";
    skinSprites[index] = tmpImage;
    tmpSkin = tmpImage;
  }
  var tmpObj = parentSkin || skinPointers[index];
  if (!tmpObj) {
    for (var i = 0; i < hats.length; ++i) {
      if (hats[i].id == index) {
        tmpObj = hats[i];
        break;
      }
    }
    skinPointers[index] = tmpObj;
  }
  if (tmpSkin.isLoaded) ctxt.drawImage(tmpSkin, -tmpObj.scale / 2, -tmpObj.scale / 2, tmpObj.scale, tmpObj.scale);
  if (!parentSkin && tmpObj.topSprite) {
    ctxt.save();
    ctxt.rotate(owner.skinRot);
    renderSkin(index + "_top", ctxt, tmpObj, owner);
    ctxt.restore();
  }
}
var accessSprites = {};
var accessPointers = {};
function renderTail(index, ctxt, owner) {
  tmpSkin = accessSprites[index];
  if (!tmpSkin) {
    var tmpImage = new Image();
    tmpImage.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    tmpImage.src = ".././img/accessories/access_" + index + ".png";
    accessSprites[index] = tmpImage;
    tmpSkin = tmpImage;
  }
  var tmpObj = accessPointers[index];
  if (!tmpObj) {
    for (var i = 0; i < accessories.length; ++i) {
      if (accessories[i].id == index) {
        tmpObj = accessories[i];
        break;
      }
    }
    accessPointers[index] = tmpObj;
  }
  if (tmpSkin.isLoaded) {
    ctxt.save();
    ctxt.translate(-20 - (tmpObj.xOff || 0), 0);
    if (tmpObj.spin) ctxt.rotate(owner.skinRot);
    ctxt.drawImage(tmpSkin, -(tmpObj.scale / 2), -(tmpObj.scale / 2), tmpObj.scale, tmpObj.scale);
    ctxt.restore();
  }
}
var toolSprites = {};
function renderTool(obj, variant, x, y, ctxt) {
  var tmpSrc = obj.src + (variant || "");
  var tmpSprite = toolSprites[tmpSrc];
  if (!tmpSprite) {
    tmpSprite = new Image();
    tmpSprite.onload = function () {
      this.isLoaded = true;
    };
    tmpSprite.src = ".././img/weapons/" + tmpSrc + ".png";
    toolSprites[tmpSrc] = tmpSprite;
  }
  if (tmpSprite.isLoaded) ctxt.drawImage(tmpSprite, x + obj.xOff - obj.length / 2, y + obj.yOff - obj.width / 2, obj.length, obj.width);
}
var gameObjectSprites = {};
function getResSprite(obj) {
  var biomeID = obj.y >= config.mapScale - config.snowBiomeTop ? 2 : obj.y <= config.snowBiomeTop ? 1 : 0;
  var tmpIndex = obj.type + "_" + obj.scale + "_" + biomeID;
  var tmpSprite = gameObjectSprites[tmpIndex];
  if (!tmpSprite) {
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = tmpCanvas.height = obj.scale * 2.1 + outlineWidth;
    var tmpContext = tmpCanvas.getContext('2d');
    tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2);
    tmpContext.rotate(UTILS.randFloat(0, Math.PI));
    tmpContext.strokeStyle = outlineColor;
    tmpContext.lineWidth = outlineWidth;
    if (obj.type == 0) {
      var tmpScale;
      for (var i = 0; i < 2; ++i) {
        tmpScale = tmpObj.scale * (!i ? 1 : 0.5);
        renderStar(tmpContext, 7, tmpScale, tmpScale * 0.7);
        tmpContext.fillStyle = !biomeID ? !i ? "#9ebf57" : "#b4db62" : !i ? "#e3f1f4" : "#fff";
        tmpContext.fill();
        if (!i) tmpContext.stroke();
      }
    } else if (obj.type == 1) {
      if (biomeID == 2) {
        tmpContext.fillStyle = "#606060";
        renderStar(tmpContext, 6, obj.scale * 0.3, obj.scale * 0.71);
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = "#89a54c";
        renderCircle(0, 0, obj.scale * 0.55, tmpContext);
        tmpContext.fillStyle = "#a5c65b";
        renderCircle(0, 0, obj.scale * 0.3, tmpContext, true);
      } else {
        renderBlob(tmpContext, 6, tmpObj.scale, tmpObj.scale * 0.7);
        tmpContext.fillStyle = biomeID ? "#e3f1f4" : "#89a54c";
        tmpContext.fill();
        tmpContext.stroke();
        tmpContext.fillStyle = biomeID ? "#6a64af" : "#c15555";
        var tmpRange;
        var berries = 4;
        var rotVal = mathPI2 / berries;
        for (var i = 0; i < berries; ++i) {
          tmpRange = UTILS.randInt(tmpObj.scale / 3.5, tmpObj.scale / 2.3);
          renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(10, 12), tmpContext);
        }
      }
    } else if (obj.type == 2 || obj.type == 3) {
      tmpContext.fillStyle = obj.type == 2 ? biomeID == 2 ? "#938d77" : "#939393" : "#e0c655";
      renderStar(tmpContext, 3, obj.scale, obj.scale);
      tmpContext.fill();
      tmpContext.stroke();
      tmpContext.fillStyle = obj.type == 2 ? biomeID == 2 ? "#b2ab90" : "#bcbcbc" : "#ebdca3";
      renderStar(tmpContext, 3, obj.scale * 0.55, obj.scale * 0.65);
      tmpContext.fill();
    }
    tmpSprite = tmpCanvas;
    gameObjectSprites[tmpIndex] = tmpSprite;
  }
  return tmpSprite;
}
var itemSprites = [];
function getItemSprite(obj, asIcon) {
  var tmpSprite = itemSprites[obj.id];
  if (!tmpSprite || asIcon) {
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = tmpCanvas.height = obj.scale * 2.5 + outlineWidth + (items.list[obj.id].spritePadding || 0);
    var tmpContext = tmpCanvas.getContext('2d');
    tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2);
    tmpContext.rotate(asIcon ? 0 : Math.PI / 2);
    tmpContext.strokeStyle = outlineColor;
    tmpContext.lineWidth = outlineWidth * (asIcon ? tmpCanvas.width / 81 : 1);
    if (obj.name == "apple") {
      tmpContext.fillStyle = "#c15555";
      renderCircle(0, 0, obj.scale, tmpContext);
      tmpContext.fillStyle = "#89a54c";
      var leafDir = -(Math.PI / 2);
      renderLeaf(obj.scale * Math.cos(leafDir), obj.scale * Math.sin(leafDir), 25, leafDir + Math.PI / 2, tmpContext);
    } else if (obj.name == "cookie") {
      tmpContext.fillStyle = "#cca861";
      renderCircle(0, 0, obj.scale, tmpContext);
      tmpContext.fillStyle = "#937c4b";
      var chips = 4;
      var rotVal = mathPI2 / chips;
      var tmpRange;
      for (var i = 0; i < chips; ++i) {
        tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7);
        renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(4, 5), tmpContext, true);
      }
    } else if (obj.name == "cheese") {
      tmpContext.fillStyle = "#f4f3ac";
      renderCircle(0, 0, obj.scale, tmpContext);
      tmpContext.fillStyle = "#c3c28b";
      var chips = 4;
      var rotVal = mathPI2 / chips;
      var tmpRange;
      for (var i = 0; i < chips; ++i) {
        tmpRange = UTILS.randInt(obj.scale / 2.5, obj.scale / 1.7);
        renderCircle(tmpRange * Math.cos(rotVal * i), tmpRange * Math.sin(rotVal * i), UTILS.randInt(4, 5), tmpContext, true);
      }
    } else if (obj.name == "wood wall" || obj.name == "stone wall" || obj.name == "castle wall") {
      tmpContext.fillStyle = obj.name == "castle wall" ? "#83898e" : obj.name == "wood wall" ? "#a5974c" : "#939393";
      var sides = obj.name == "castle wall" ? 4 : 3;
      renderStar(tmpContext, sides, obj.scale * 1.1, obj.scale * 1.1);
      tmpContext.fill();
      tmpContext.stroke();
      tmpContext.fillStyle = obj.name == "castle wall" ? "#9da4aa" : obj.name == "wood wall" ? "#c9b758" : "#bcbcbc";
      renderStar(tmpContext, sides, obj.scale * 0.65, obj.scale * 0.65);
      tmpContext.fill();
    } else if (obj.name == "spikes" || obj.name == "greater spikes" || obj.name == "poison spikes" || obj.name == "spinning spikes") {
      tmpContext.fillStyle = obj.name == "poison spikes" ? "#7b935d" : "#939393";
      var tmpScale = obj.scale * 0.6;
      renderStar(tmpContext, obj.name == "spikes" ? 5 : 6, obj.scale, tmpScale);
      tmpContext.fill();
      tmpContext.stroke();
      tmpContext.fillStyle = "#a5974c";
      renderCircle(0, 0, tmpScale, tmpContext);
      tmpContext.fillStyle = "#c9b758";
      renderCircle(0, 0, tmpScale / 2, tmpContext, true);
    } else if (obj.name == "windmill" || obj.name == "faster windmill" || obj.name == "power mill") {
      tmpContext.fillStyle = "#a5974c";
      renderCircle(0, 0, obj.scale, tmpContext);
      tmpContext.fillStyle = "#c9b758";
      renderRectCircle(0, 0, obj.scale * 1.5, 29, 4, tmpContext);
      tmpContext.fillStyle = "#a5974c";
      renderCircle(0, 0, obj.scale * 0.5, tmpContext);
    } else if (obj.name == "mine") {
      tmpContext.fillStyle = "#939393";
      renderStar(tmpContext, 3, obj.scale, obj.scale);
      tmpContext.fill();
      tmpContext.stroke();
      tmpContext.fillStyle = "#bcbcbc";
      renderStar(tmpContext, 3, obj.scale * 0.55, obj.scale * 0.65);
      tmpContext.fill();
    } else if (obj.name == "sapling") {
      for (var i = 0; i < 2; ++i) {
        var tmpScale = obj.scale * (!i ? 1 : 0.5);
        renderStar(tmpContext, 7, tmpScale, tmpScale * 0.7);
        tmpContext.fillStyle = !i ? "#9ebf57" : "#b4db62";
        tmpContext.fill();
        if (!i) tmpContext.stroke();
      }
    } else if (obj.name == "pit trap") {
      tmpContext.fillStyle = "#a5974c";
      renderStar(tmpContext, 3, obj.scale * 1.1, obj.scale * 1.1);
      tmpContext.fill();
      tmpContext.stroke();
      tmpContext.fillStyle = outlineColor;
      renderStar(tmpContext, 3, obj.scale * 0.65, obj.scale * 0.65);
      tmpContext.fill();
    } else if (obj.name == "boost pad") {
      tmpContext.fillStyle = "#7e7f82";
      renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
      tmpContext.fill();
      tmpContext.stroke();
      tmpContext.fillStyle = "#dbd97d";
      renderTriangle(obj.scale * 1, tmpContext);
    } else if (obj.name == "turret") {
      tmpContext.fillStyle = "#a5974c";
      renderCircle(0, 0, obj.scale, tmpContext);
      tmpContext.fill();
      tmpContext.stroke();
      tmpContext.fillStyle = "#939393";
      var tmpLen = 50;
      renderRect(0, -tmpLen / 2, obj.scale * 0.9, tmpLen, tmpContext);
      renderCircle(0, 0, obj.scale * 0.6, tmpContext);
      tmpContext.fill();
      tmpContext.stroke();
    } else if (obj.name == "platform") {
      tmpContext.fillStyle = "#cebd5f";
      var tmpCount = 4;
      var tmpS = obj.scale * 2;
      var tmpW = tmpS / tmpCount;
      var tmpX = -(obj.scale / 2);
      for (var i = 0; i < tmpCount; ++i) {
        renderRect(tmpX - tmpW / 2, 0, tmpW, obj.scale * 2, tmpContext);
        tmpContext.fill();
        tmpContext.stroke();
        tmpX += tmpS / tmpCount;
      }
    } else if (obj.name == "healing pad") {
      tmpContext.fillStyle = "#7e7f82";
      renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
      tmpContext.fill();
      tmpContext.stroke();
      tmpContext.fillStyle = "#db6e6e";
      renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
    } else if (obj.name == "spawn pad") {
      tmpContext.fillStyle = "#7e7f82";
      renderRect(0, 0, obj.scale * 2, obj.scale * 2, tmpContext);
      tmpContext.fill();
      tmpContext.stroke();
      tmpContext.fillStyle = "#71aad6";
      renderCircle(0, 0, obj.scale * 0.6, tmpContext);
    } else if (obj.name == "blocker") {
      tmpContext.fillStyle = "#7e7f82";
      renderCircle(0, 0, obj.scale, tmpContext);
      tmpContext.fill();
      tmpContext.stroke();
      tmpContext.rotate(Math.PI / 4);
      tmpContext.fillStyle = "#db6e6e";
      renderRectCircle(0, 0, obj.scale * 0.65, 20, 4, tmpContext, true);
    } else if (obj.name == "teleporter") {
      tmpContext.fillStyle = "#7e7f82";
      renderCircle(0, 0, obj.scale, tmpContext);
      tmpContext.fill();
      tmpContext.stroke();
      tmpContext.rotate(Math.PI / 4);
      tmpContext.fillStyle = "#d76edb";
      renderCircle(0, 0, obj.scale * 0.5, tmpContext, true);
    }
    tmpSprite = tmpCanvas;
    if (!asIcon) itemSprites[obj.id] = tmpSprite;
  }
  return tmpSprite;
}
function renderLeaf(x, y, l, r, ctxt) {
  var endX = x + l * Math.cos(r);
  var endY = y + l * Math.sin(r);
  var width = l * 0.4;
  ctxt.moveTo(x, y);
  ctxt.beginPath();
  ctxt.quadraticCurveTo((x + endX) / 2 + width * Math.cos(r + Math.PI / 2), (y + endY) / 2 + width * Math.sin(r + Math.PI / 2), endX, endY);
  ctxt.quadraticCurveTo((x + endX) / 2 - width * Math.cos(r + Math.PI / 2), (y + endY) / 2 - width * Math.sin(r + Math.PI / 2), x, y);
  ctxt.closePath();
  ctxt.fill();
  ctxt.stroke();
}
function renderCircle(x, y, scale, tmpContext, dontStroke, dontFill) {
  tmpContext = tmpContext || mainContext;
  tmpContext.beginPath();
  tmpContext.arc(x, y, scale, 0, 2 * Math.PI);
  if (!dontFill) tmpContext.fill();
  if (!dontStroke) tmpContext.stroke();
}
function renderStar(ctxt, spikes, outer, inner) {
  var rot = Math.PI / 2 * 3;
  var x, y;
  var step = Math.PI / spikes;
  ctxt.beginPath();
  ctxt.moveTo(0, -outer);
  for (var i = 0; i < spikes; i++) {
    x = Math.cos(rot) * outer;
    y = Math.sin(rot) * outer;
    ctxt.lineTo(x, y);
    rot += step;
    x = Math.cos(rot) * inner;
    y = Math.sin(rot) * inner;
    ctxt.lineTo(x, y);
    rot += step;
  }
  ctxt.lineTo(0, -outer);
  ctxt.closePath();
}
function renderRect(x, y, w, h, ctxt, stroke) {
  ctxt.fillRect(x - w / 2, y - h / 2, w, h);
  if (!stroke) ctxt.strokeRect(x - w / 2, y - h / 2, w, h);
}
function renderRectCircle(x, y, s, sw, seg, ctxt, stroke) {
  ctxt.save();
  ctxt.translate(x, y);
  seg = Math.ceil(seg / 2);
  for (var i = 0; i < seg; i++) {
    renderRect(0, 0, s * 2, sw, ctxt, stroke);
    ctxt.rotate(Math.PI / seg);
  }
  ctxt.restore();
}
function renderBlob(ctxt, spikes, outer, inner) {
  var rot = Math.PI / 2 * 3;
  var step = Math.PI / spikes;
  var tmpOuter;
  ctxt.beginPath();
  ctxt.moveTo(0, -inner);
  for (var i = 0; i < spikes; i++) {
    tmpOuter = UTILS.randInt(outer + 0.9, outer * 1.2);
    ctxt.quadraticCurveTo(Math.cos(rot + step) * tmpOuter, Math.sin(rot + step) * tmpOuter, Math.cos(rot + step * 2) * inner, Math.sin(rot + step * 2) * inner);
    rot += step * 2;
  }
  ctxt.lineTo(0, -inner);
  ctxt.closePath();
}
function renderTriangle(s, ctx) {
  ctx = ctx || mainContext;
  var h = s * (Math.sqrt(3) / 2);
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.lineTo(-s / 2, h / 2);
  ctx.lineTo(s / 2, h / 2);
  ctx.lineTo(0, -h / 2);
  ctx.fill();
  ctx.closePath();
}
function prepareMenuBackground() {
  var tmpMid = config.mapScale / 2;
  objectManager.add(0, tmpMid, tmpMid + 200, 0, config.treeScales[3], 0);
  objectManager.add(1, tmpMid, tmpMid - 480, 0, config.treeScales[3], 0);
  objectManager.add(2, tmpMid + 300, tmpMid + 450, 0, config.treeScales[3], 0);
  objectManager.add(3, tmpMid - 950, tmpMid - 130, 0, config.treeScales[2], 0);
  objectManager.add(4, tmpMid - 750, tmpMid - 400, 0, config.treeScales[3], 0);
  objectManager.add(5, tmpMid - 700, tmpMid + 400, 0, config.treeScales[2], 0);
  objectManager.add(6, tmpMid + 800, tmpMid - 200, 0, config.treeScales[3], 0);
  objectManager.add(7, tmpMid - 260, tmpMid + 340, 0, config.bushScales[3], 1);
  objectManager.add(8, tmpMid + 760, tmpMid + 310, 0, config.bushScales[3], 1);
  objectManager.add(9, tmpMid - 800, tmpMid + 100, 0, config.bushScales[3], 1);
  objectManager.add(10, tmpMid - 800, tmpMid + 300, 0, items.list[4].scale, items.list[4].id, items.list[10]);
  objectManager.add(11, tmpMid + 650, tmpMid - 390, 0, items.list[4].scale, items.list[4].id, items.list[10]);
  objectManager.add(12, tmpMid - 400, tmpMid - 450, 0, config.rockScales[2], 2);
}
function loadGameObject(data) {
  for (var i = 0; i < data.length;) {
    objectManager.add(data[i], data[i + 1], data[i + 2], data[i + 3], data[i + 4], data[i + 5], items.list[data[i + 6]], true, data[i + 7] >= 0 ? {
      sid: data[i + 7]
    } : null);
    i += 8;
  }
}
function wiggleGameObject(dir, sid) {
  tmpObj = findObjectBySid(sid);
  if (tmpObj) {
    tmpObj.xWiggle += config.gatherWiggle * Math.cos(dir);
    tmpObj.yWiggle += config.gatherWiggle * Math.sin(dir);
  }
}
function shootTurret(sid, dir) {
  tmpObj = findObjectBySid(sid);
  if (tmpObj) {
    tmpObj.dir = dir;
    tmpObj.xWiggle += config.gatherWiggle * Math.cos(dir + Math.PI);
    tmpObj.yWiggle += config.gatherWiggle * Math.sin(dir + Math.PI);
  }
}
function addProjectile(x, y, dir, range, speed, indx, layer, sid) {
  if (inWindow) {
    projectileManager.addProjectile(x, y, dir, range, speed, indx, null, null, layer).sid = sid;
  }
}
function remProjectile(sid, range) {
  for (var i = 0; i < projectiles.length; ++i) {
    if (projectiles[i].sid == sid) {
      projectiles[i].range = range;
    }
  }
}
function animateAI(sid) {
  tmpObj = findAIBySID(sid);
  if (tmpObj) tmpObj.startAnim();
}
function loadAI(data) {
  for (var i = 0; i < ais.length; ++i) {
    ais[i].forcePos = !ais[i].visible;
    ais[i].visible = false;
  }
  if (data) {
    var tmpTime = Date.now();
    for (var i = 0; i < data.length;) {
      tmpObj = findAIBySID(data[i]);
      if (tmpObj) {
        tmpObj.index = data[i + 1];
        tmpObj.t1 = tmpObj.t2 === undefined ? tmpTime : tmpObj.t2;
        tmpObj.t2 = tmpTime;
        tmpObj.x1 = tmpObj.x;
        tmpObj.y1 = tmpObj.y;
        tmpObj.x2 = data[i + 2];
        tmpObj.y2 = data[i + 3];
        tmpObj.d1 = tmpObj.d2 === undefined ? data[i + 4] : tmpObj.d2;
        tmpObj.d2 = data[i + 4];
        tmpObj.health = data[i + 5];
        tmpObj.dt = 0;
        tmpObj.visible = true;
      } else {
        tmpObj = aiManager.spawn(data[i + 2], data[i + 3], data[i + 4], data[i + 1]);
        tmpObj.x2 = tmpObj.x;
        tmpObj.y2 = tmpObj.y;
        tmpObj.d2 = tmpObj.dir;
        tmpObj.health = data[i + 5];
        if (!aiManager.aiTypes[data[i + 1]].name) tmpObj.name = config.cowNames[data[i + 6]];
        tmpObj.forcePos = true;
        tmpObj.sid = data[i];
        tmpObj.visible = true;
      }
      i += 7;
    }
  }
}
var aiSprites = {};
function renderAI(obj, ctxt) {
  var tmpIndx = obj.index;
  var tmpSprite = aiSprites[tmpIndx];
  if (!tmpSprite) {
    var tmpImg = new Image();
    tmpImg.onload = function () {
      this.isLoaded = true;
      this.onload = null;
    };
    tmpImg.src = ".././img/animals/" + obj.src + ".png";
    tmpSprite = tmpImg;
    aiSprites[tmpIndx] = tmpSprite;
  }
  if (tmpSprite.isLoaded) {
    var tmpScale = obj.scale * 1.2 * (obj.spriteMlt || 1);
    ctxt.drawImage(tmpSprite, -tmpScale, -tmpScale, tmpScale * 2, tmpScale * 2);
  }
}
function isOnScreen(x, y, s) {
  return x + s >= 0 && x - s <= maxScreenWidth && y + s >= 0 && y - s <= maxScreenHeight;
}
function addPlayer(data, isYou) {
  var tmpPlayer = findPlayerByID(data[0]);
  if (!tmpPlayer) {
    tmpPlayer = new Player(data[0], data[1], config, UTILS, projectileManager, objectManager, players, ais, items, hats, accessories);
    players.push(tmpPlayer);
  }
  tmpPlayer.spawn(isYou ? moofoll : null);
  tmpPlayer.visible = false;
  tmpPlayer.x2 = undefined;
  tmpPlayer.y2 = undefined;
  tmpPlayer.setData(data);
  if (isYou) {
    player = tmpPlayer;
    camX = player.x;
    camY = player.y;
    updateItems();
    updateStatusDisplay();
    updateAge();
    updateUpgrades(0);
    gameUI.style.display = "block";
  }
}
function removePlayer(id) {
  for (var i = 0; i < players.length; i++) {
    if (players[i].id == id) {
      players.splice(i, 1);
      break;
    }
  }
}
function updateItemCounts(index, value) {
  if (player) {
    player.itemCounts[index] = value;
  }
}
function updatePlayerValue(index, value, updateView) {
  if (player) {
    player[index] = value;
    if (updateView) updateStatusDisplay();
  }
}
function updateHealth(sid, value) {
  tmpObj = findPlayerBySID(sid);
  if (tmpObj) {
    tmpObj.health = value;
  }
}
function updatePlayers(data) {
  var tmpTime = Date.now();
  for (var i = 0; i < players.length; ++i) {
    players[i].forcePos = !players[i].visible;
    players[i].visible = false;
  }
  for (var i = 0; i < data.length;) {
    tmpObj = findPlayerBySID(data[i]);
    if (tmpObj) {
      tmpObj.t1 = tmpObj.t2 === undefined ? tmpTime : tmpObj.t2;
      tmpObj.t2 = tmpTime;
      tmpObj.x1 = tmpObj.x;
      tmpObj.y1 = tmpObj.y;
      tmpObj.x2 = data[i + 1];
      tmpObj.y2 = data[i + 2];
      tmpObj.d1 = tmpObj.d2 === undefined ? data[i + 3] : tmpObj.d2;
      tmpObj.d2 = data[i + 3];
      tmpObj.dt = 0;
      tmpObj.buildIndex = data[i + 4];
      tmpObj.weaponIndex = data[i + 5];
      tmpObj.weaponVariant = data[i + 6];
      tmpObj.team = data[i + 7];
      tmpObj.isLeader = data[i + 8];
      tmpObj.skinIndex = data[i + 9];
      tmpObj.tailIndex = data[i + 10];
      tmpObj.iconIndex = data[i + 11];
      tmpObj.zIndex = data[i + 12];
      tmpObj.visible = true;
    }
    i += 13;
  }
}
function findPlayerByID(id) {
  for (var i = 0; i < players.length; ++i) {
    if (players[i].id == id) {
      return players[i];
    }
  }
  return null;
}
function findPlayerBySID(sid) {
  for (var i = 0; i < players.length; ++i) {
    if (players[i].sid == sid) {
      return players[i];
    }
  }
  return null;
}
function findAIBySID(sid) {
  for (var i = 0; i < ais.length; ++i) {
    if (ais[i].sid == sid) {
      return ais[i];
    }
  }
  return null;
}
function findObjectBySid(sid) {
  for (var i = 0; i < gameObjects.length; ++i) {
    if (gameObjects[i].sid == sid) {
      return gameObjects[i];
    }
  }
  return null;
}
var lastPing = -1;
function pingSocketResponse() {
  var pingTime = Date.now() - lastPing;
  window.pingTime = pingTime;
  pingDisplay.innerText = "Ping: " + pingTime + " ms";
}
function pingSocket() {
  lastPing = Date.now();
  io.send("pp");
}
function serverShutdownNotice(countdown) {
  if (countdown < 0) return;
  var minutes = Math.floor(countdown / 60);
  var seconds = countdown % 60;
  seconds = ("0" + seconds).slice(-2);
  shutdownDisplay.innerText = "Server restarting in " + minutes + ":" + seconds;
  shutdownDisplay.hidden = false;
}
window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();
function doUpdate() {
  now = Date.now();
  delta = now - lastUpdate;
  lastUpdate = now;
  updateGame();
  requestAnimFrame(doUpdate);
}
function startGame() {
  bindEvents();
  loadIcons();
  loadingText.style.display = "none";
  menuCardHolder.style.display = "block";
  nameInput.value = getSavedVal("moo_name") || "";
  prepareUI();
}
prepareMenuBackground();
doUpdate();
function openLink(link) {
  window.open(link, "_blank");
}
window.openLink = openLink;
window.aJoinReq = aJoinReq;
window.follmoo = follmoo;
window.kickFromClan = kickFromClan;
window.sendJoin = sendJoin;
window.leaveAlliance = leaveAlliance;
window.createAlliance = createAlliance;
window.storeBuy = storeBuy;
window.storeEquip = storeEquip;
window.showItemInfo = showItemInfo;
window.selectSkinColor = selectSkinColor;
window.changeStoreIndex = changeStoreIndex;
window.config = config;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  socket: null,
  connected: false,
  socketId: -1,
  connect: function connect(address, callback, events) {
    if (this.socket) return;
    var _this = this;
    try {
      var socketError = false;
      var socketAddress = address;
      this.socket = new WebSocket(socketAddress);
      this.socket.onmessage = function (message) {
        var parsed = JSON.parse(message.data);
        var type = parsed[0];
        var data = parsed[1];
        if (type == "io-init") {
          _this.socketId = data[0];
        } else {
          // console.log(type, ...data)
          events[type].apply(undefined, data);
        }
      };
      this.socket.onopen = function () {
        _this.connected = true;
        callback();
      };
      this.socket.onclose = function (event) {
        _this.connected = false;
        if (event.code == 4001) {
          callback("Invalid Connection");
        } else if (!socketError) {
          callback("disconnected");
        }
      };
      this.socket.onerror = function (error) {
        if (this.socket && this.socket.readyState != WebSocket.OPEN) {
          socketError = true;
          console.error("Socket error", arguments);
          callback("Socket error");
        }
      };
    } catch (e) {
      console.warn("Socket connection error:", e);
      callback(e);
    }
  },
  send: function send(type) {
    var data = Array.prototype.slice.call(arguments, 1);
    var msg = JSON.stringify([type, data]);
    this.socket && this.socket.send(msg);
  },
  socketReady: function socketReady() {
    return this.socket && this.connected;
  },
  close: function close() {
    this.socket && this.socket.close();
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var mathABS = Math.abs;
var mathCOS = Math.cos;
var mathSIN = Math.sin;
var mathPOW = Math.pow;
var mathSQRT = Math.sqrt;
var mathABS = Math.abs;
var mathATAN2 = Math.atan2;
var mathPI = Math.PI;
module.exports.randInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
module.exports.randFloat = function (min, max) {
  return Math.random() * (max - min + 1) + min;
};
module.exports.lerp = function (value1, value2, amount) {
  return value1 + (value2 - value1) * amount;
};
module.exports.decel = function (val, cel) {
  if (val > 0) val = Math.max(0, val - cel);else if (val < 0) val = Math.min(0, val + cel);
  return val;
};
module.exports.getDistance = function (x1, y1, x2, y2) {
  return mathSQRT((x2 -= x1) * x2 + (y2 -= y1) * y2);
};
module.exports.getDirection = function (x1, y1, x2, y2) {
  return mathATAN2(y1 - y2, x1 - x2);
};
module.exports.getAngleDist = function (a, b) {
  var p = mathABS(b - a) % (mathPI * 2);
  return p > mathPI ? mathPI * 2 - p : p;
};
module.exports.isNumber = function (n) {
  return typeof n == "number" && !isNaN(n) && isFinite(n);
};
module.exports.isString = function (s) {
  return s && typeof s == "string";
};
module.exports.kFormat = function (num) {
  return num > 99999 ? (num / 1000000).toFixed(1) + 'k' : num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
};
module.exports.capitalizeFirst = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
module.exports.fixTo = function (n, v) {
  return parseFloat(n.toFixed(v));
};
module.exports.sortByPoints = function (a, b) {
  return parseFloat(b.points) - parseFloat(a.points);
};
module.exports.lineInRect = function (recX, recY, recX2, recY2, x1, y1, x2, y2) {
  var minX = x1;
  var maxX = x2;
  if (x1 > x2) {
    minX = x2;
    maxX = x1;
  }
  if (maxX > recX2) maxX = recX2;
  if (minX < recX) minX = recX;
  if (minX > maxX) return false;
  var minY = y1;
  var maxY = y2;
  var dx = x2 - x1;
  if (Math.abs(dx) > 0.0000001) {
    var a = (y2 - y1) / dx;
    var b = y1 - a * x1;
    minY = a * minX + b;
    maxY = a * maxX + b;
  }
  if (minY > maxY) {
    var tmp = maxY;
    maxY = minY;
    minY = tmp;
  }
  if (maxY > recY2) maxY = recY2;
  if (minY < recY) minY = recY;
  if (minY > maxY) return false;
  return true;
};
module.exports.containsPoint = function (element, x, y) {
  var bounds = element.getBoundingClientRect();
  var left = bounds.left + window.scrollX;
  var top = bounds.top + window.scrollY;
  var width = bounds.width;
  var height = bounds.height;
  var insideHorizontal = x > left && x < left + width;
  var insideVertical = y > top && y < top + height;
  return insideHorizontal && insideVertical;
};
module.exports.mousifyTouchEvent = function (event) {
  var touch = event.changedTouches[0];
  event.screenX = touch.screenX;
  event.screenY = touch.screenY;
  event.clientX = touch.clientX;
  event.clientY = touch.clientY;
  event.pageX = touch.pageX;
  event.pageY = touch.pageY;
};
module.exports.hookTouchEvents = function (element, skipPrevent) {
  var preventDefault = !skipPrevent;
  var isHovering = false;
  var passive = false;
  element.addEventListener("touchstart", module.exports.checkTrusted(touchStart), passive);
  element.addEventListener("touchmove", module.exports.checkTrusted(touchMove), passive);
  element.addEventListener("touchend", module.exports.checkTrusted(touchEnd), passive);
  element.addEventListener("touchcancel", module.exports.checkTrusted(touchEnd), passive);
  element.addEventListener("touchleave", module.exports.checkTrusted(touchEnd), passive);
  function touchStart(e) {
    module.exports.mousifyTouchEvent(e);
    window.setUsingTouch(true);
    if (preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (element.onmouseover) element.onmouseover(e);
    isHovering = true;
  }
  function touchMove(e) {
    module.exports.mousifyTouchEvent(e);
    window.setUsingTouch(true);
    if (preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (module.exports.containsPoint(element, e.pageX, e.pageY)) {
      if (!isHovering) {
        if (element.onmouseover) element.onmouseover(e);
        isHovering = true;
      }
    } else {
      if (isHovering) {
        if (element.onmouseout) element.onmouseout(e);
        isHovering = false;
      }
    }
  }
  function touchEnd(e) {
    module.exports.mousifyTouchEvent(e);
    window.setUsingTouch(true);
    if (preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isHovering) {
      if (element.onclick) element.onclick(e);
      if (element.onmouseout) element.onmouseout(e);
      isHovering = false;
    }
  }
};
module.exports.removeAllChildren = function (element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
};
module.exports.generateElement = function (config) {
  var element = document.createElement(config.tag || "div");
  function bind(configValue, elementValue) {
    if (config[configValue]) element[elementValue] = config[configValue];
  }
  bind("text", "textContent");
  bind("html", "innerHTML");
  bind("class", "className");
  for (var key in config) {
    switch (key) {
      case "tag":
      case "text":
      case "html":
      case "class":
      case "style":
      case "hookTouch":
      case "parent":
      case "children":
        continue;
      default:
        break;
    }
    element[key] = config[key];
  }
  if (element.onclick) element.onclick = module.exports.checkTrusted(element.onclick);
  if (element.onmouseover) element.onmouseover = module.exports.checkTrusted(element.onmouseover);
  if (element.onmouseout) element.onmouseout = module.exports.checkTrusted(element.onmouseout);
  if (config.style) {
    element.style.cssText = config.style;
  }
  if (config.hookTouch) {
    module.exports.hookTouchEvents(element);
  }
  if (config.parent) {
    config.parent.appendChild(element);
  }
  if (config.children) {
    for (var i = 0; i < config.children.length; i++) {
      element.appendChild(config.children[i]);
    }
  }
  return element;
};
module.exports.eventIsTrusted = function (ev) {
  if (ev && typeof ev.isTrusted == "boolean") {
    return ev.isTrusted;
  } else {
    return true;
  }
};
module.exports.checkTrusted = function (callback) {
  return function (ev) {
    if (ev && ev instanceof Event && module.exports.eventIsTrusted(ev)) {
      callback(ev);
    } else {}
  };
};
module.exports.randomString = function (length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
module.exports.countInArray = function (array, val) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === val) count++;
  }
  return count;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports.AnimText = function () {
  this.init = function (x, y, scale, speed, life, text, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.scale = scale;
    this.startScale = this.scale;
    this.maxScale = scale * 1.5;
    this.scaleSpeed = 0.7;
    this.speed = speed;
    this.life = life;
    this.text = text;
  };
  this.update = function (delta) {
    if (this.life) {
      this.life -= delta;
      this.y -= this.speed * delta;
      this.scale += this.scaleSpeed * delta;
      if (this.scale >= this.maxScale) {
        this.scale = this.maxScale;
        this.scaleSpeed *= -1;
      } else if (this.scale <= this.startScale) {
        this.scale = this.startScale;
        this.scaleSpeed = 0;
      }
      if (this.life <= 0) {
        this.life = 0;
      }
    }
  };
  this.render = function (ctxt, xOff, yOff) {
    ctxt.fillStyle = this.color;
    ctxt.font = this.scale + "px Hammersmith One";
    ctxt.fillText(this.text, this.x - xOff, this.y - yOff);
  };
};
module.exports.TextManager = function () {
  this.texts = [];
  this.update = function (delta, ctxt, xOff, yOff) {
    ctxt.textBaseline = "middle";
    ctxt.textAlign = "center";
    for (var i = 0; i < this.texts.length; ++i) {
      if (this.texts[i].life) {
        this.texts[i].update(delta);
        this.texts[i].render(ctxt, xOff, yOff);
      }
    }
  };
  this.showText = function (x, y, scale, speed, life, text, color) {
    var tmpText;
    for (var i = 0; i < this.texts.length; ++i) {
      if (!this.texts[i].life) {
        tmpText = this.texts[i];
        break;
      }
    }
    if (!tmpText) {
      tmpText = new module.exports.AnimText();
      this.texts.push(tmpText);
    }
    tmpText.init(x, y, scale, speed, life, text, color);
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// RENDER:
module.exports.maxScreenWidth = 1920;
module.exports.maxScreenHeight = 1080;

// SERVER:
module.exports.serverUpdateRate = 9;
module.exports.maxPlayers = process && process.argv.indexOf("--largeserver") != -1 ? 80 : 40;
module.exports.maxPlayersHard = module.exports.maxPlayers + 10;
module.exports.collisionDepth = 6;
module.exports.minimapRate = 3000;

// COLLISIONS:
module.exports.colGrid = 10;

// CLIENT:
module.exports.clientSendRate = 5;

// UI:
module.exports.healthBarWidth = 50;
module.exports.healthBarPad = 4.5;
module.exports.iconPadding = 15;
module.exports.iconPad = 0.9;
module.exports.deathFadeout = 3000;
module.exports.crownIconScale = 60;
module.exports.crownPad = 35;

// CHAT:
module.exports.chatCountdown = 3000;
module.exports.chatCooldown = 500;

// SANDBOX:
module.exports.inSandbox = process && process.env.VULTR_SCHEME === "mm_exp";
;

// PLAYER:
module.exports.maxAge = 100;
module.exports.gatherAngle = Math.PI / 2.6;
module.exports.gatherWiggle = 10;
module.exports.hitReturnRatio = 0.25;
module.exports.hitAngle = Math.PI / 2;
module.exports.playerScale = 35;
module.exports.playerSpeed = 0.0016;
module.exports.playerDecel = 0.993;
module.exports.nameY = 34;

// CUSTOMIZATION:
module.exports.skinColors = ["#bf8f54", "#cbb091", "#896c4b", "#fadadc", "#ececec", "#c37373", "#4c4c4c", "#ecaff7", "#738cc3", "#8bc373"];

// ANIMALS:
module.exports.animalCount = 7;
module.exports.aiTurnRandom = 0.06;
module.exports.cowNames = ["Sid", "Steph", "Bmoe", "Romn", "Jononthecool", "Fiona", "Vince", "Nathan", "Nick", "Flappy", "Ronald", "Otis", "Pepe", "Mc Donald", "Theo", "Fabz", "Oliver", "Jeff", "Jimmy", "Helena", "Reaper", "Ben", "Alan", "Naomi", "XYZ", "Clever", "Jeremy", "Mike", "Destined", "Stallion", "Allison", "Meaty", "Sophia", "Vaja", "Joey", "Pendy", "Murdoch", "Theo", "Jared", "July", "Sonia", "Mel", "Dexter", "Quinn", "Milky"];

// WEAPONS:
module.exports.shieldAngle = Math.PI / 3;
module.exports.weaponVariants = [{
  id: 0,
  src: "",
  xp: 0,
  val: 1
}, {
  id: 1,
  src: "_g",
  xp: 3000,
  val: 1.1
}, {
  id: 2,
  src: "_d",
  xp: 7000,
  val: 1.18
}, {
  id: 3,
  src: "_r",
  poison: true,
  xp: 12000,
  val: 1.18
}];
module.exports.fetchVariant = function (player) {
  var tmpXP = player.weaponXP[player.weaponIndex] || 0;
  for (var i = module.exports.weaponVariants.length - 1; i >= 0; --i) {
    if (tmpXP >= module.exports.weaponVariants[i].xp) return module.exports.weaponVariants[i];
  }
};

// NATURE:
module.exports.resourceTypes = ["wood", "food", "stone", "points"];
module.exports.areaCount = 7;
module.exports.treesPerArea = 9;
module.exports.bushesPerArea = 3;
module.exports.totalRocks = 32;
module.exports.goldOres = 7;
module.exports.riverWidth =
//72;
module.exports.riverPadding = 11;
module.exports.waterCurrent = 0.0011;
module.exports.waveSpeed = 0.0001;
module.exports.waveMax = 1.3;
module.exports.treeScales = [150, 160, 165, 175];
module.exports.bushScales = [80, 85, 95];
module.exports.rockScales = [80, 85, 90];

// BIOME DATA:
module.exports.snowBiomeTop = 0; //240;
module.exports.snowSpeed = 0.75;

// DATA:
module.exports.maxNameLength = 15;

// MAP:
module.exports.mapScale = 1440 * 2;
module.exports.mapPingScale = 40;
module.exports.mapPingTime = 2200;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (sid) {
  this.sid = sid;
  this.init = function (x, y, dir, scale, type, data, owner) {
    data = data || {};
    this.sentTo = {};
    this.gridLocations = [];
    this.active = true;
    this.doUpdate = data.doUpdate;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.xWiggle = 0;
    this.yWiggle = 0;
    this.scale = scale;
    this.type = type;
    this.id = data.id;
    this.owner = owner;
    this.name = data.name;
    this.isItem = this.id != undefined;
    this.group = data.group;
    this.health = data.health;
    this.layer = 2;
    if (this.group != undefined) {
      this.layer = this.group.layer;
    } else if (this.type == 0) {
      this.layer = 3;
    } else if (this.type == 2) {
      this.layer = 0;
    } else if (this.type == 4) {
      this.layer = -1;
    }
    this.colDiv = data.colDiv || 1;
    this.blocker = data.blocker;
    this.ignoreCollision = data.ignoreCollision;
    this.dontGather = data.dontGather;
    this.hideFromEnemy = data.hideFromEnemy;
    this.friction = data.friction;
    this.projDmg = data.projDmg;
    this.dmg = data.dmg;
    this.pDmg = data.pDmg;
    this.pps = data.pps;
    this.zIndex = data.zIndex || 0;
    this.turnSpeed = data.turnSpeed;
    this.req = data.req;
    this.trap = data.trap;
    this.healCol = data.healCol;
    this.teleport = data.teleport;
    this.boostSpeed = data.boostSpeed;
    this.projectile = data.projectile;
    this.shootRange = data.shootRange;
    this.shootRate = data.shootRate;
    this.shootCount = this.shootRate;
    this.spawnPoint = data.spawnPoint;
  };
  this.changeHealth = function (amount, doer) {
    this.health += amount;
    return this.health <= 0;
  };
  this.getScale = function (sM, ig) {
    sM = sM || 1;
    return this.scale * (this.isItem || this.type == 2 || this.type == 3 || this.type == 4 ? 1 : 0.6 * sM) * (ig ? 1 : this.colDiv);
  };
  this.visibleToPlayer = function (player) {
    return !this.hideFromEnemy || this.owner && (this.owner == player || this.owner.team && player.team == this.owner.team);
  };
  this.update = function (delta) {
    if (this.active) {
      if (this.xWiggle) {
        this.xWiggle *= Math.pow(0.99, delta);
      }
      if (this.yWiggle) {
        this.yWiggle *= Math.pow(0.99, delta);
      }
      if (this.turnSpeed) {
        this.dir += this.turnSpeed * delta;
      }
    }
  };
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports.groups = [{
  id: 0,
  name: "food",
  layer: 0
}, {
  id: 1,
  name: "walls",
  place: true,
  limit: 30,
  layer: 0
}, {
  id: 2,
  name: "spikes",
  place: true,
  limit: 15,
  layer: 0
}, {
  id: 3,
  name: "mill",
  place: true,
  limit: 7,
  layer: 1
}, {
  id: 4,
  name: "mine",
  place: true,
  limit: 1,
  layer: 0
}, {
  id: 5,
  name: "trap",
  place: true,
  limit: 6,
  layer: -1
}, {
  id: 6,
  name: "booster",
  place: true,
  limit: 12,
  layer: -1
}, {
  id: 7,
  name: "turret",
  place: true,
  limit: 2,
  layer: 1
}, {
  id: 8,
  name: "watchtower",
  place: true,
  limit: 12,
  layer: 1
}, {
  id: 9,
  name: "buff",
  place: true,
  limit: 4,
  layer: -1
}, {
  id: 10,
  name: "spawn",
  place: true,
  limit: 1,
  layer: -1
}, {
  id: 11,
  name: "sapling",
  place: true,
  limit: 2,
  layer: 0
}, {
  id: 12,
  name: "blocker",
  place: true,
  limit: 3,
  layer: -1
}, {
  id: 13,
  name: "teleporter",
  place: true,
  limit: 2,
  layer: -1
}];
exports.projectiles = [{
  indx: 0,
  layer: 0,
  src: "arrow_1",
  dmg: 25,
  speed: 1.6,
  scale: 103,
  range: 1000
}, {
  indx: 1,
  layer: 1,
  dmg: 25,
  scale: 20
}, {
  indx: 0,
  layer: 0,
  src: "arrow_1",
  dmg: 35,
  speed: 2.5,
  scale: 103,
  range: 1200
}, {
  indx: 0,
  layer: 0,
  src: "arrow_1",
  dmg: 30,
  speed: 2,
  scale: 103,
  range: 1200
}, {
  indx: 1,
  layer: 1,
  src: "bullet_1",
  dmg: 16,
  speed: 1.3,
  scale: 160,
  range: 300
}, {
  indx: 0,
  layer: 0,
  src: "bullet_1",
  dmg: 50,
  speed: 3.6,
  scale: 160,
  range: 1400
}];
exports.weapons = [{
  id: 0,
  type: 0,
  name: "tool hammer",
  desc: "tool for gathering all resources",
  src: "hammer_1",
  length: 140,
  width: 140,
  xOff: -3,
  yOff: 18,
  dmg: 25,
  range: 65,
  gather: 1,
  speed: 300
}, {
  id: 1,
  type: 0,
  age: 2,
  name: "hand axe",
  desc: "gathers resources at a higher rate",
  src: "axe_1",
  length: 140,
  width: 140,
  xOff: 3,
  yOff: 24,
  dmg: 30,
  spdMult: 1,
  range: 70,
  gather: 2,
  speed: 400
}, {
  id: 2,
  type: 0,
  age: 8,
  pre: 1,
  name: "great axe",
  desc: "deal more damage and gather more resources",
  src: "great_axe_1",
  length: 140,
  width: 140,
  xOff: -8,
  yOff: 25,
  dmg: 35,
  spdMult: 1,
  range: 75,
  gather: 4,
  speed: 400
}, {
  id: 3,
  type: 0,
  age: 2,
  name: "short sword",
  desc: "increased attack power but slower move speed",
  src: "sword_1",
  iPad: 1.3,
  length: 130,
  width: 210,
  xOff: -8,
  yOff: 46,
  dmg: 35,
  spdMult: 0.85,
  range: 110,
  gather: 1,
  speed: 300
}, {
  id: 4,
  type: 0,
  age: 8,
  pre: 3,
  name: "katana",
  desc: "greater range and damage",
  src: "samurai_1",
  iPad: 1.3,
  length: 130,
  width: 210,
  xOff: -8,
  yOff: 59,
  dmg: 40,
  spdMult: 0.8,
  range: 118,
  gather: 1,
  speed: 300
}, {
  id: 5,
  type: 0,
  age: 2,
  name: "polearm",
  desc: "long range melee weapon",
  src: "spear_1",
  iPad: 1.3,
  length: 130,
  width: 210,
  xOff: -8,
  yOff: 53,
  dmg: 45,
  knock: 0.2,
  spdMult: 0.82,
  range: 142,
  gather: 1,
  speed: 700
}, {
  id: 6,
  type: 0,
  age: 2,
  name: "bat",
  desc: "fast long range melee weapon",
  src: "bat_1",
  iPad: 1.3,
  length: 110,
  width: 180,
  xOff: -8,
  yOff: 53,
  dmg: 20,
  knock: 0.7,
  range: 110,
  gather: 1,
  speed: 300
}, {
  id: 7,
  type: 0,
  age: 2,
  name: "daggers",
  desc: "really fast short range weapon",
  src: "dagger_1",
  iPad: 0.8,
  length: 110,
  width: 110,
  xOff: 18,
  yOff: 0,
  dmg: 20,
  knock: 0.1,
  range: 65,
  gather: 1,
  hitSlow: 0.1,
  spdMult: 1.13,
  speed: 100
}, {
  id: 8,
  type: 0,
  age: 2,
  name: "stick",
  desc: "great for gathering but very weak",
  src: "stick_1",
  length: 140,
  width: 140,
  xOff: 3,
  yOff: 24,
  dmg: 1,
  spdMult: 1,
  range: 70,
  gather: 7,
  speed: 400
}, {
  id: 9,
  type: 1,
  age: 6,
  name: "hunting bow",
  desc: "bow used for ranged combat and hunting",
  src: "bow_1",
  req: ["wood", 4],
  length: 120,
  width: 120,
  xOff: -6,
  yOff: 0,
  projectile: 0,
  spdMult: 0.75,
  speed: 600
}, {
  id: 10,
  type: 1,
  age: 6,
  name: "great hammer",
  desc: "hammer used for destroying structures",
  src: "great_hammer_1",
  length: 140,
  width: 140,
  xOff: -9,
  yOff: 25,
  dmg: 10,
  spdMult: 0.88,
  range: 75,
  sDmg: 7.5,
  gather: 1,
  speed: 400
}, {
  id: 11,
  type: 1,
  age: 6,
  name: "wooden shield",
  desc: "blocks projectiles and reduces melee damage",
  src: "shield_1",
  length: 120,
  width: 120,
  shield: 0.2,
  xOff: 6,
  yOff: 0,
  spdMult: 0.7
}, {
  id: 12,
  type: 1,
  age: 8,
  pre: 9,
  name: "crossbow",
  desc: "deals more damage and has greater range",
  src: "crossbow_1",
  req: ["wood", 5],
  aboveHand: true,
  armS: 0.75,
  length: 120,
  width: 120,
  xOff: -4,
  yOff: 0,
  projectile: 2,
  spdMult: 0.7,
  speed: 700
}, {
  id: 13,
  type: 1,
  age: 9,
  pre: 12,
  name: "repeater crossbow",
  desc: "high firerate crossbow with reduced damage",
  src: "crossbow_2",
  req: ["wood", 10],
  aboveHand: true,
  armS: 0.75,
  length: 120,
  width: 120,
  xOff: -4,
  yOff: 0,
  projectile: 3,
  spdMult: 0.7,
  speed: 230
}, {
  id: 14,
  type: 1,
  age: 6,
  name: "mc grabby",
  desc: "steals resources from enemies",
  src: "grab_1",
  length: 130,
  width: 210,
  xOff: -8,
  yOff: 53,
  dmg: 0,
  steal: 250,
  knock: 0.2,
  spdMult: 1.05,
  range: 125,
  gather: 0,
  speed: 700
}, {
  id: 15,
  type: 1,
  age: 9,
  pre: 12,
  name: "musket",
  desc: "slow firerate but high damage and range",
  src: "musket_1",
  req: ["stone", 10],
  aboveHand: true,
  rec: 0.35,
  armS: 0.6,
  hndS: 0.3,
  hndD: 1.6,
  length: 205,
  width: 205,
  xOff: 25,
  yOff: 0,
  projectile: 5,
  hideProjectile: true,
  spdMult: 0.6,
  speed: 1500
}, {
  id: 16,
  type: 1,
  age: 9,
  pre: 12,
  name: "shotgun",
  desc: "low range but high damage",
  src: "shotgun_1",
  req: ["stone", 10],
  aboveHand: true,
  rec: 0.7,
  armS: 0.6,
  hndS: 0.3,
  hndD: 1.6,
  length: 205,
  width: 205,
  xOff: 25,
  yOff: 0,
  projectile: 4,
  //hideProjectile: true,
  spdMult: 0.6,
  speed: 1700
}];
module.exports.list = [{
  group: module.exports.groups[0],
  name: "apple",
  desc: "restores 20 health when consumed",
  req: ["food", 10],
  consume: function consume(doer) {
    return doer.changeHealth(20, doer);
  },
  scale: 22,
  holdOffset: 15
}, {
  age: 3,
  group: module.exports.groups[0],
  name: "cookie",
  desc: "restores 40 health when consumed",
  req: ["food", 15],
  consume: function consume(doer) {
    return doer.changeHealth(40, doer);
  },
  scale: 27,
  holdOffset: 15
}, {
  age: 7,
  group: module.exports.groups[0],
  name: "cheese",
  desc: "restores 30 health and another 50 over 5 seconds",
  req: ["food", 25],
  consume: function consume(doer) {
    if (doer.changeHealth(30, doer) || doer.health < 100) {
      doer.dmgOverTime.dmg = -10;
      doer.dmgOverTime.doer = doer;
      doer.dmgOverTime.time = 5;
      return true;
    }
    return false;
  },
  scale: 27,
  holdOffset: 15
}, {
  group: module.exports.groups[1],
  name: "wood wall",
  desc: "provides protection for your village",
  req: ["wood", 10],
  projDmg: true,
  health: 380,
  scale: 50,
  holdOffset: 20,
  placeOffset: -5
}, {
  age: 3,
  group: module.exports.groups[1],
  name: "stone wall",
  desc: "provides improved protection for your village",
  req: ["stone", 25],
  health: 900,
  scale: 50,
  holdOffset: 20,
  placeOffset: -5
}, {
  age: 7,
  pre: 1,
  group: module.exports.groups[1],
  name: "castle wall",
  desc: "provides powerful protection for your village",
  req: ["stone", 35],
  health: 1500,
  scale: 52,
  holdOffset: 20,
  placeOffset: -5
}, {
  group: module.exports.groups[2],
  name: "spikes",
  desc: "damages enemies when they touch them",
  req: ["wood", 20, "stone", 5],
  health: 400,
  dmg: 20,
  scale: 49,
  spritePadding: -23,
  holdOffset: 8,
  placeOffset: -5
}, {
  age: 5,
  group: module.exports.groups[2],
  name: "greater spikes",
  desc: "damages enemies when they touch them",
  req: ["wood", 30, "stone", 10],
  health: 500,
  dmg: 35,
  scale: 52,
  spritePadding: -23,
  holdOffset: 8,
  placeOffset: -5
}, {
  age: 9,
  pre: 1,
  group: module.exports.groups[2],
  name: "poison spikes",
  desc: "poisons enemies when they touch them",
  req: ["wood", 35, "stone", 15],
  health: 600,
  dmg: 30,
  pDmg: 5,
  scale: 52,
  spritePadding: -23,
  holdOffset: 8,
  placeOffset: -5
}, {
  age: 9,
  pre: 2,
  group: module.exports.groups[2],
  name: "spinning spikes",
  desc: "damages enemies when they touch them",
  req: ["wood", 30, "stone", 20],
  health: 500,
  dmg: 45,
  turnSpeed: 0.003,
  scale: 52,
  spritePadding: -23,
  holdOffset: 8,
  placeOffset: -5
}, {
  group: module.exports.groups[3],
  name: "windmill",
  desc: "generates gold over time",
  req: ["wood", 50, "stone", 10],
  health: 400,
  pps: 1,
  turnSpeed: 0.0016,
  spritePadding: 25,
  iconLineMult: 12,
  scale: 45,
  holdOffset: 20,
  placeOffset: 5
}, {
  age: 5,
  pre: 1,
  group: module.exports.groups[3],
  name: "faster windmill",
  desc: "generates more gold over time",
  req: ["wood", 60, "stone", 20],
  health: 500,
  pps: 1.5,
  turnSpeed: 0.0025,
  spritePadding: 25,
  iconLineMult: 12,
  scale: 47,
  holdOffset: 20,
  placeOffset: 5
}, {
  age: 8,
  pre: 1,
  group: module.exports.groups[3],
  name: "power mill",
  desc: "generates more gold over time",
  req: ["wood", 100, "stone", 50],
  health: 800,
  pps: 2,
  turnSpeed: 0.005,
  spritePadding: 25,
  iconLineMult: 12,
  scale: 47,
  holdOffset: 20,
  placeOffset: 5
}, {
  age: 5,
  group: module.exports.groups[4],
  type: 2,
  name: "mine",
  desc: "allows you to mine stone",
  req: ["wood", 20, "stone", 100],
  iconLineMult: 12,
  scale: 65,
  holdOffset: 20,
  placeOffset: 0
}, {
  age: 5,
  group: module.exports.groups[11],
  type: 0,
  name: "sapling",
  desc: "allows you to farm wood",
  req: ["wood", 150],
  iconLineMult: 12,
  colDiv: 0.5,
  scale: 110,
  holdOffset: 50,
  placeOffset: -15
}, {
  age: 4,
  group: module.exports.groups[5],
  name: "pit trap",
  desc: "pit that traps enemies if they walk over it",
  req: ["wood", 30, "stone", 30],
  trap: true,
  ignoreCollision: true,
  hideFromEnemy: true,
  health: 500,
  colDiv: 0.2,
  scale: 50,
  holdOffset: 20,
  placeOffset: -5
}, {
  age: 4,
  group: module.exports.groups[6],
  name: "boost pad",
  desc: "provides boost when stepped on",
  req: ["stone", 20, "wood", 5],
  ignoreCollision: true,
  boostSpeed: 1.5,
  health: 150,
  colDiv: 0.7,
  scale: 45,
  holdOffset: 20,
  placeOffset: -5
}, {
  age: 7,
  group: module.exports.groups[7],
  doUpdate: true,
  name: "turret",
  desc: "defensive structure that shoots at enemies",
  req: ["wood", 200, "stone", 150],
  health: 800,
  projectile: 1,
  shootRange: 700,
  shootRate: 2200,
  scale: 43,
  holdOffset: 20,
  placeOffset: -5
}, {
  age: 7,
  group: module.exports.groups[8],
  name: "platform",
  desc: "platform to shoot over walls and cross over water",
  req: ["wood", 20],
  ignoreCollision: true,
  zIndex: 1,
  health: 300,
  scale: 43,
  holdOffset: 20,
  placeOffset: -5
}, {
  age: 7,
  group: module.exports.groups[9],
  name: "healing pad",
  desc: "standing on it will slowly heal you",
  req: ["wood", 30, "food", 10],
  ignoreCollision: true,
  healCol: 15,
  health: 400,
  colDiv: 0.7,
  scale: 45,
  holdOffset: 20,
  placeOffset: -5
}, {
  age: 9,
  group: module.exports.groups[10],
  name: "spawn pad",
  desc: "you will spawn here when you die but it will dissapear",
  req: ["wood", 100, "stone", 100],
  health: 400,
  ignoreCollision: true,
  spawnPoint: true,
  scale: 45,
  holdOffset: 20,
  placeOffset: -5
}, {
  age: 7,
  group: module.exports.groups[12],
  name: "blocker",
  desc: "blocks building in radius",
  req: ["wood", 30, "stone", 25],
  ignoreCollision: true,
  blocker: 300,
  health: 400,
  colDiv: 0.7,
  scale: 45,
  holdOffset: 20,
  placeOffset: -5
}, {
  age: 7,
  group: module.exports.groups[13],
  name: "teleporter",
  desc: "teleports you to a random point on the map",
  req: ["wood", 60, "stone", 60],
  ignoreCollision: true,
  teleport: true,
  health: 200,
  colDiv: 0.7,
  scale: 45,
  holdOffset: 20,
  placeOffset: -5
}];
for (var i = 0; i < module.exports.list.length; ++i) {
  module.exports.list[i].id = i;
  if (module.exports.list[i].pre) module.exports.list[i].pre = i - module.exports.list[i].pre;
}
if (typeof window !== "undefined") {
  var shuffle = function shuffle(a) {
    for (var _i = a.length - 1; _i > 0; _i--) {
      var j = Math.floor(Math.random() * (_i + 1));
      var _ref = [a[j], a[_i]];
      a[_i] = _ref[0];
      a[j] = _ref[1];
    }
    return a;
  };
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var mathFloor = Math.floor;
var mathABS = Math.abs;
var mathCOS = Math.cos;
var mathSIN = Math.sin;
var mathPOW = Math.pow;
var mathSQRT = Math.sqrt;
module.exports = function (GameObject, gameObjects, UTILS, config, players, server) {
  this.objects = gameObjects;
  this.grids = {};
  this.updateObjects = [];
  var tmpX, tmpY;
  var tmpS = config.mapScale / config.colGrid;
  this.setObjectGrids = function (obj) {
    var objX = Math.min(config.mapScale, Math.max(0, obj.x));
    var objY = Math.min(config.mapScale, Math.max(0, obj.y));
    for (var x = 0; x < config.colGrid; ++x) {
      tmpX = x * tmpS;
      for (var y = 0; y < config.colGrid; ++y) {
        tmpY = y * tmpS;
        if (objX + obj.scale >= tmpX && objX - obj.scale <= tmpX + tmpS && objY + obj.scale >= tmpY && objY - obj.scale <= tmpY + tmpS) {
          if (!this.grids[x + "_" + y]) this.grids[x + "_" + y] = [];
          this.grids[x + "_" + y].push(obj);
          obj.gridLocations.push(x + "_" + y);
        }
      }
    }
  };
  this.removeObjGrid = function (obj) {
    var tmpIndx;
    for (var i = 0; i < obj.gridLocations.length; ++i) {
      tmpIndx = this.grids[obj.gridLocations[i]].indexOf(obj);
      if (tmpIndx >= 0) {
        this.grids[obj.gridLocations[i]].splice(tmpIndx, 1);
      }
    }
  };
  this.disableObj = function (obj) {
    obj.active = false;
    if (server) {
      if (obj.owner && obj.pps) obj.owner.pps -= obj.pps;
      this.removeObjGrid(obj);
      var tmpIndx = this.updateObjects.indexOf(obj);
      if (tmpIndx >= 0) {
        this.updateObjects.splice(tmpIndx, 1);
      }
    }
  };
  this.hitObj = function (tmpObj, tmpDir) {
    for (var p = 0; p < players.length; ++p) {
      if (players[p].active) {
        if (tmpObj.sentTo[players[p].id]) {
          if (!tmpObj.active) server.send(players[p].id, "12", tmpObj.sid);else if (players[p].canSee(tmpObj)) server.send(players[p].id, "8", UTILS.fixTo(tmpDir, 1), tmpObj.sid);
        }
        if (!tmpObj.active && tmpObj.owner == players[p]) players[p].changeItemCount(tmpObj.group.id, -1);
      }
    }
  };
  var tmpArray = [];
  var tmpGrid;
  this.getGridArrays = function (xPos, yPos, s) {
    tmpX = mathFloor(xPos / tmpS);
    tmpY = mathFloor(yPos / tmpS);
    tmpArray.length = 0;
    try {
      if (this.grids[tmpX + "_" + tmpY]) tmpArray.push(this.grids[tmpX + "_" + tmpY]);
      if (xPos + s >= (tmpX + 1) * tmpS) {
        // RIGHT
        tmpGrid = this.grids[tmpX + 1 + "_" + tmpY];
        if (tmpGrid) tmpArray.push(tmpGrid);
        if (tmpY && yPos - s <= tmpY * tmpS) {
          // TOP RIGHT
          tmpGrid = this.grids[tmpX + 1 + "_" + (tmpY - 1)];
          if (tmpGrid) tmpArray.push(tmpGrid);
        } else if (yPos + s >= (tmpY + 1) * tmpS) {
          // BOTTOM RIGHT
          tmpGrid = this.grids[tmpX + 1 + "_" + (tmpY + 1)];
          if (tmpGrid) tmpArray.push(tmpGrid);
        }
      }
      if (tmpX && xPos - s <= tmpX * tmpS) {
        // LEFT
        tmpGrid = this.grids[tmpX - 1 + "_" + tmpY];
        if (tmpGrid) tmpArray.push(tmpGrid);
        if (tmpY && yPos - s <= tmpY * tmpS) {
          // TOP LEFT
          tmpGrid = this.grids[tmpX - 1 + "_" + (tmpY - 1)];
          if (tmpGrid) tmpArray.push(tmpGrid);
        } else if (yPos + s >= (tmpY + 1) * tmpS) {
          // BOTTOM LEFT
          tmpGrid = this.grids[tmpX - 1 + "_" + (tmpY + 1)];
          if (tmpGrid) tmpArray.push(tmpGrid);
        }
      }
      if (yPos + s >= (tmpY + 1) * tmpS) {
        // BOTTOM
        tmpGrid = this.grids[tmpX + "_" + (tmpY + 1)];
        if (tmpGrid) tmpArray.push(tmpGrid);
      }
      if (tmpY && yPos - s <= tmpY * tmpS) {
        // TOP
        tmpGrid = this.grids[tmpX + "_" + (tmpY - 1)];
        if (tmpGrid) tmpArray.push(tmpGrid);
      }
    } catch (e) {}
    return tmpArray;
  };
  var tmpObj;
  this.add = function (sid, x, y, dir, s, type, data, setSID, owner) {
    tmpObj = null;
    for (var i = 0; i < gameObjects.length; ++i) {
      if (gameObjects[i].sid == sid) {
        tmpObj = gameObjects[i];
        break;
      }
    }
    if (!tmpObj) {
      for (var i = 0; i < gameObjects.length; ++i) {
        if (!gameObjects[i].active) {
          tmpObj = gameObjects[i];
          break;
        }
      }
    }
    if (!tmpObj) {
      tmpObj = new GameObject(sid);
      gameObjects.push(tmpObj);
    }
    if (setSID) tmpObj.sid = sid;
    tmpObj.init(x, y, dir, s, type, data, owner);
    if (server) {
      this.setObjectGrids(tmpObj);
      if (tmpObj.doUpdate) this.updateObjects.push(tmpObj);
    }
  };
  this.disableBySid = function (sid) {
    for (var i = 0; i < gameObjects.length; ++i) {
      if (gameObjects[i].sid == sid) {
        this.disableObj(gameObjects[i]);
        break;
      }
    }
  };
  this.removeAllItems = function (sid, server) {
    for (var i = 0; i < gameObjects.length; ++i) {
      if (gameObjects[i].active && gameObjects[i].owner && gameObjects[i].owner.sid == sid) {
        this.disableObj(gameObjects[i]);
      }
    }
    if (server) {
      server.broadcast("13", sid);
    }
  };
  this.fetchSpawnObj = function (sid) {
    var tmpLoc = null;
    for (var i = 0; i < gameObjects.length; ++i) {
      tmpObj = gameObjects[i];
      if (tmpObj.active && tmpObj.owner && tmpObj.owner.sid == sid && tmpObj.spawnPoint) {
        tmpLoc = [tmpObj.x, tmpObj.y];
        this.disableObj(tmpObj);
        server.broadcast("12", tmpObj.sid);
        if (tmpObj.owner) {
          tmpObj.owner.changeItemCount(tmpObj.group.id, -1);
        }
        break;
      }
    }
    return tmpLoc;
  };
  this.checkItemLocation = function (x, y, s, sM, indx, ignoreWater, placer) {
    for (var i = 0; i < gameObjects.length; ++i) {
      var blockS = gameObjects[i].blocker ? gameObjects[i].blocker : gameObjects[i].getScale(sM, gameObjects[i].isItem);
      if (gameObjects[i].active && UTILS.getDistance(x, y, gameObjects[i].x, gameObjects[i].y) < s + blockS) return false;
    }
    if (!ignoreWater && indx != 18 && y >= config.mapScale / 2 - config.riverWidth / 2 && y <= config.mapScale / 2 + config.riverWidth / 2) {
      return false;
    }
    return true;
  };
  this.addProjectile = function (x, y, dir, range, indx) {
    var tmpData = items.projectiles[indx];
    var tmpProj;
    for (var i = 0; i < projectiles.length; ++i) {
      if (!projectiles[i].active) {
        tmpProj = projectiles[i];
        break;
      }
    }
    if (!tmpProj) {
      tmpProj = new Projectile(players, UTILS);
      projectiles.push(tmpProj);
    }
    tmpProj.init(indx, x, y, dir, tmpData.speed, range, tmpData.scale);
  };
  this.checkCollision = function (player, other, delta) {
    delta = delta || 1;
    var dx = player.x - other.x;
    var dy = player.y - other.y;
    var tmpLen = player.scale + other.scale;
    if (mathABS(dx) <= tmpLen || mathABS(dy) <= tmpLen) {
      tmpLen = player.scale + (other.getScale ? other.getScale() : other.scale);
      var tmpInt = mathSQRT(dx * dx + dy * dy) - tmpLen;
      if (tmpInt <= 0) {
        if (!other.ignoreCollision) {
          var tmpDir = UTILS.getDirection(player.x, player.y, other.x, other.y);
          var tmpDist = UTILS.getDistance(player.x, player.y, other.x, other.y);
          if (other.isPlayer) {
            tmpInt = tmpInt * -1 / 2;
            player.x += tmpInt * mathCOS(tmpDir);
            player.y += tmpInt * mathSIN(tmpDir);
            other.x -= tmpInt * mathCOS(tmpDir);
            other.y -= tmpInt * mathSIN(tmpDir);
          } else {
            player.x = other.x + tmpLen * mathCOS(tmpDir);
            player.y = other.y + tmpLen * mathSIN(tmpDir);
            player.xVel *= 0.75;
            player.yVel *= 0.75;
          }
          if (other.dmg && other.owner != player && !(other.owner && other.owner.team && other.owner.team == player.team)) {
            player.changeHealth(-other.dmg, other.owner, other);
            var tmpSpd = 1.5 * (other.weightM || 1);
            player.xVel += tmpSpd * mathCOS(tmpDir);
            player.yVel += tmpSpd * mathSIN(tmpDir);
            if (other.pDmg && !(player.skin && player.skin.poisonRes)) {
              player.dmgOverTime.dmg = other.pDmg;
              player.dmgOverTime.time = 5;
              player.dmgOverTime.doer = other.owner;
            }
            if (player.colDmg && other.health) {
              if (other.changeHealth(-player.colDmg)) this.disableObj(other);
              this.hitObj(other, UTILS.getDirection(player.x, player.y, other.x, other.y));
            }
          }
        } else if (other.trap && !player.noTrap && other.owner != player && !(other.owner && other.owner.team && other.owner.team == player.team)) {
          player.lockMove = true;
          other.hideFromEnemy = false;
        } else if (other.boostSpeed) {
          player.xVel += delta * other.boostSpeed * (other.weightM || 1) * mathCOS(other.dir);
          player.yVel += delta * other.boostSpeed * (other.weightM || 1) * mathSIN(other.dir);
        } else if (other.healCol) {
          player.healCol = other.healCol;
        } else if (other.teleport) {
          player.x = UTILS.randInt(0, config.mapScale);
          player.y = UTILS.randInt(0, config.mapScale);
        }
        if (other.zIndex > player.zIndex) player.zIndex = other.zIndex;
        return true;
      }
    }
    return false;
  };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var LangFilter = __webpack_require__(10);
var langFilter = new LangFilter();
var newProfane = ['jew', 'black', 'baby', 'child', 'white', 'porn', 'pedo', 'trump', 'clinton', 'hitler', 'nazi', 'gay', 'pride', 'sex', 'pleasure', 'touch', 'poo', 'kids', 'rape', 'white power', 'nigga', 'nig nog', 'doggy', 'rapist', 'boner', 'nigger', 'nigg', 'finger', 'nogger', 'nagger', 'nig', 'fag', 'gai', 'pole', 'stripper', "penis", 'vagina', 'pussy', 'nazi', 'hitler', 'stalin', 'burn', 'chamber', 'cock', 'peen', 'dick', 'spick', 'nieger', 'die', 'satan', 'n|ig', 'nlg', 'cunt', 'c0ck', 'fag', 'lick', 'condom', 'anal', 'shit', 'phile', 'little', 'kids', 'free KR', 'tiny', 'sidney', 'ass', 'kill', '.io', '(dot)', '[dot]', 'mini', 'whiore', 'whore', 'faggot', 'github', '1337', '666', 'satan', 'senpa', 'discord', 'd1scord', 'mistik', '.io', 'senpa.io', 'sidney', 'sid', 'senpaio', 'vries', 'asa'];
langFilter.addWords.apply(langFilter, newProfane);
var mathABS = Math.abs;
var mathCOS = Math.cos;
var mathSIN = Math.sin;
var mathPOW = Math.pow;
var mathSQRT = Math.sqrt;
module.exports = function (id, sid, config, UTILS, projectileManager, objectManager, players, ais, items, hats, accessories, server, scoreCallback, iconCallback) {
  this.id = id;
  this.sid = sid;
  this.tmpScore = 0;
  this.team = null;
  this.skinIndex = 0;
  this.tailIndex = 0;
  this.hitTime = 0;
  this.tails = {};
  for (var i = 0; i < accessories.length; ++i) {
    if (accessories[i].price <= 0) this.tails[accessories[i].id] = 1;
  }
  this.skins = {};
  for (var i = 0; i < hats.length; ++i) {
    if (hats[i].price <= 0) this.skins[hats[i].id] = 1;
  }
  this.points = 0;
  this.dt = 0;
  this.hidden = false;
  this.itemCounts = {};
  this.isPlayer = true;
  this.pps = 0;
  this.moveDir = undefined;
  this.skinRot = 0;
  this.lastPing = 0;
  this.iconIndex = 0;
  this.skinColor = 0;
  this.spawn = function (moofoll) {
    this.active = true;
    this.alive = true;
    this.lockMove = false;
    this.lockDir = false;
    this.minimapCounter = 0;
    this.chatCountdown = 0;
    this.shameCount = 0;
    this.shameTimer = 0;
    this.sentTo = {};
    this.gathering = 0;
    this.autoGather = 0;
    this.animTime = 0;
    this.animSpeed = 0;
    this.mouseState = 0;
    this.buildIndex = -1;
    this.weaponIndex = 0;
    this.dmgOverTime = {};
    this.noMovTimer = 0;
    this.maxXP = 300;
    this.XP = 0;
    this.age = 1;
    this.kills = 0;
    this.upgrAge = 2;
    this.upgradePoints = 0;
    this.x = 0;
    this.y = 0;
    this.zIndex = 0;
    this.xVel = 0;
    this.yVel = 0;
    this.slowMult = 1;
    this.dir = 0;
    this.dirPlus = 0;
    this.targetDir = 0;
    this.targetAngle = 0;
    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.scale = config.playerScale;
    this.speed = config.playerSpeed;
    this.resetMoveDir();
    this.resetResources(moofoll);
    this.items = [0, 3, 6, 10];
    this.weapons = [0];
    this.shootCount = 0;
    this.weaponXP = [];
    this.reloads = {};
  };
  this.resetMoveDir = function () {
    this.moveDir = undefined;
  };
  this.resetResources = function (moofoll) {
    for (var i = 0; i < config.resourceTypes.length; ++i) {
      this[config.resourceTypes[i]] = moofoll ? 100 : 0;
    }
  };
  this.addItem = function (id) {
    var tmpItem = items.list[id];
    if (tmpItem) {
      for (var i = 0; i < this.items.length; ++i) {
        if (items.list[this.items[i]].group == tmpItem.group) {
          if (this.buildIndex == this.items[i]) this.buildIndex = id;
          this.items[i] = id;
          return true;
        }
      }
      this.items.push(id);
      return true;
    }
    return false;
  };
  this.setUserData = function (data) {
    if (data) {
      this.name = "unknown";
      var name = data.name + "";
      name = name.slice(0, config.maxNameLength);
      name = name.replace(/[^\w:\(\)\/? -]+/gmi, " "); // USE SPACE SO WE CAN CHECK PROFANITY
      name = name.replace(/[^\x00-\x7F]/g, " ");
      name = name.trim();
      var isProfane = false;
      var convertedName = name.toLowerCase().replace(/\s/g, "").replace(/1/g, "i").replace(/0/g, "o").replace(/5/g, "s");
      var _iterator = _createForOfIteratorHelper(langFilter.list),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var word = _step.value;
          if (convertedName.indexOf(word) != -1) {
            isProfane = true;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (name.length > 0 && !isProfane) {
        this.name = name;
      }
      this.skinColor = 0;
      if (config.skinColors[data.skin]) this.skinColor = data.skin;
    }
  };
  this.getData = function () {
    return [this.id, this.sid, this.name, UTILS.fixTo(this.x, 2), UTILS.fixTo(this.y, 2), UTILS.fixTo(this.dir, 3), this.health, this.maxHealth, this.scale, this.skinColor];
  };
  this.setData = function (data) {
    this.id = data[0];
    this.sid = data[1];
    this.name = data[2];
    this.x = data[3];
    this.y = data[4];
    this.dir = data[5];
    this.health = data[6];
    this.maxHealth = data[7];
    this.scale = data[8];
    this.skinColor = data[9];
  };
  var timerCount = 0;
  this.update = function (delta) {
    if (!this.alive) return;
    if (this.shameTimer > 0) {
      this.shameTimer -= delta;
      if (this.shameTimer <= 0) {
        this.shameTimer = 0;
        this.shameCount = 0;
      }
    }
    timerCount -= delta;
    if (timerCount <= 0) {
      var regenAmount = (this.skin && this.skin.healthRegen ? this.skin.healthRegen : 0) + (this.tail && this.tail.healthRegen ? this.tail.healthRegen : 0);
      if (regenAmount) {
        this.changeHealth(regenAmount, this);
      }
      if (this.dmgOverTime.dmg) {
        this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer);
        this.dmgOverTime.time -= 1;
        if (this.dmgOverTime.time <= 0) this.dmgOverTime.dmg = 0;
      }
      if (this.healCol) {
        this.changeHealth(this.healCol, this);
      }
      timerCount = 1000;
    }
    if (!this.alive) return;
    if (this.slowMult < 1) {
      this.slowMult += 0.0008 * delta;
      if (this.slowMult > 1) this.slowMult = 1;
    }
    this.noMovTimer += delta;
    if (this.xVel || this.yVel) this.noMovTimer = 0;
    if (this.lockMove) {
      this.xVel = 0;
      this.yVel = 0;
    } else {
      var spdMult = (this.buildIndex >= 0 ? 0.5 : 1) * (items.weapons[this.weaponIndex].spdMult || 1) * (this.skin ? this.skin.spdMult || 1 : 1) * (this.tail ? this.tail.spdMult || 1 : 1) * (this.y <= config.snowBiomeTop ? this.skin && this.skin.coldM ? 1 : config.snowSpeed : 1) * this.slowMult;
      if (!this.zIndex && this.y >= config.mapScale / 2 - config.riverWidth / 2 && this.y <= config.mapScale / 2 + config.riverWidth / 2) {
        if (this.skin && this.skin.watrImm) {
          spdMult *= 0.75;
          this.xVel += config.waterCurrent * 0.4 * delta;
        } else {
          spdMult *= 0.33;
          this.xVel += config.waterCurrent * delta;
        }
      }
      var xVel = this.moveDir != undefined ? mathCOS(this.moveDir) : 0;
      var yVel = this.moveDir != undefined ? mathSIN(this.moveDir) : 0;
      var length = mathSQRT(xVel * xVel + yVel * yVel);
      if (length != 0) {
        xVel /= length;
        yVel /= length;
      }
      if (xVel) this.xVel += xVel * this.speed * spdMult * delta;
      if (yVel) this.yVel += yVel * this.speed * spdMult * delta;
    }
    this.zIndex = 0;
    this.lockMove = false;
    this.healCol = 0;
    var tmpList;
    var tmpSpeed = UTILS.getDistance(0, 0, this.xVel * delta, this.yVel * delta);
    var depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)));
    var tMlt = 1 / depth;
    for (var i = 0; i < depth; ++i) {
      if (this.xVel) this.x += this.xVel * delta * tMlt;
      if (this.yVel) this.y += this.yVel * delta * tMlt;
      tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
      for (var x = 0; x < tmpList.length; ++x) {
        for (var y = 0; y < tmpList[x].length; ++y) {
          if (tmpList[x][y].active) objectManager.checkCollision(this, tmpList[x][y], tMlt);
        }
      }
    }
    var tmpIndx = players.indexOf(this);
    for (var i = tmpIndx + 1; i < players.length; ++i) {
      if (players[i] != this && players[i].alive) objectManager.checkCollision(this, players[i]);
    }
    if (this.xVel) {
      this.xVel *= mathPOW(config.playerDecel, delta);
      if (this.xVel <= 0.01 && this.xVel >= -0.01) this.xVel = 0;
    }
    if (this.yVel) {
      this.yVel *= mathPOW(config.playerDecel, delta);
      if (this.yVel <= 0.01 && this.yVel >= -0.01) this.yVel = 0;
    }
    if (this.x - this.scale < 0) {
      this.x = this.scale;
    } else if (this.x + this.scale > config.mapScale) {
      this.x = config.mapScale - this.scale;
    }
    if (this.y - this.scale < 0) {
      this.y = this.scale;
    } else if (this.y + this.scale > config.mapScale) {
      this.y = config.mapScale - this.scale;
    }
    if (this.buildIndex < 0) {
      if (this.reloads[this.weaponIndex] > 0) {
        this.reloads[this.weaponIndex] -= delta;
        this.gathering = this.mouseState;
      } else if (this.gathering || this.autoGather) {
        var worked = true;
        if (items.weapons[this.weaponIndex].gather != undefined) {
          this.gather(players);
        } else if (items.weapons[this.weaponIndex].projectile != undefined && this.hasRes(items.weapons[this.weaponIndex], this.skin ? this.skin.projCost : 0)) {
          var add_projectile = function add_projectile(dir) {
            projectileManager.addProjectile(this.x + projOffset * mathCOS(dir), this.y + projOffset * mathSIN(dir), dir, items.projectiles[tmpIndx].range * aMlt, items.projectiles[tmpIndx].speed * aMlt, tmpIndx, this, null, this.zIndex);
          };
          this.useRes(items.weapons[this.weaponIndex], this.skin ? this.skin.projCost : 0);
          this.noMovTimer = 0;
          var tmpIndx = items.weapons[this.weaponIndex].projectile;
          var projOffset = this.scale * 2;
          var aMlt = this.skin && this.skin.aMlt ? this.skin.aMlt : 1;
          if (items.weapons[this.weaponIndex].rec) {
            this.xVel -= items.weapons[this.weaponIndex].rec * mathCOS(this.dir);
            this.yVel -= items.weapons[this.weaponIndex].rec * mathSIN(this.dir);
          }
          ;
          if (this.weaponIndex === 16) {
            for (var _i = Math.PI / 8; _i >= -Math.PI / 8; _i -= Math.PI / 32) {
              add_projectile(this.dir + _i);
            }
          } else add_projectile(this.dir);
        } else {
          worked = false;
        }
        this.gathering = this.mouseState;
        if (worked) {
          this.reloads[this.weaponIndex] = items.weapons[this.weaponIndex].speed * (this.skin ? this.skin.atkSpd || 1 : 1);
        }
      }
    }
  };
  this.addWeaponXP = function (amnt) {
    if (!this.weaponXP[this.weaponIndex]) this.weaponXP[this.weaponIndex] = 0;
    this.weaponXP[this.weaponIndex] += amnt;
  };
  this.earnXP = function (amount) {
    if (this.age < config.maxAge) {
      this.XP += amount;
      if (this.XP >= this.maxXP) {
        if (this.age < config.maxAge) {
          this.age++;
          this.XP = 0;
          this.maxXP *= 1.2;
        } else {
          this.XP = this.maxXP;
        }
        this.upgradePoints++;
        server.send(this.id, "16", this.upgradePoints, this.upgrAge);
        server.send(this.id, "15", this.XP, UTILS.fixTo(this.maxXP, 1), this.age);
      } else {
        server.send(this.id, "15", this.XP);
      }
    }
  };
  this.changeHealth = function (amount, doer) {
    if (amount > 0 && this.health >= this.maxHealth) return false;
    if (amount < 0 && this.skin) amount *= this.skin.dmgMult || 1;
    if (amount < 0 && this.tail) amount *= this.tail.dmgMult || 1;
    if (amount < 0) this.hitTime = Date.now();
    this.health += amount;
    if (this.health > this.maxHealth) {
      amount -= this.health - this.maxHealth;
      this.health = this.maxHealth;
    }
    if (this.health <= 0) this.kill(doer);
    for (var i = 0; i < players.length; ++i) {
      if (this.sentTo[players[i].id]) server.send(players[i].id, "h", this.sid, Math.round(this.health));
    }
    if (doer && doer.canSee(this) && !(doer == this && amount < 0)) {
      server.send(doer.id, "t", Math.round(this.x), Math.round(this.y), Math.round(-amount), 1);
    }
    return true;
  };
  this.kill = function (doer) {
    if (doer && doer.alive) {
      doer.kills++;
      if (doer.skin && doer.skin.goldSteal) scoreCallback(doer, Math.round(this.points / 2));else scoreCallback(doer, Math.round(this.age * 100 * (doer.skin && doer.skin.kScrM ? doer.skin.kScrM : 1)));
      server.send(doer.id, "9", "kills", doer.kills, 1);
    }
    this.alive = false;
    server.send(this.id, "11");
    iconCallback();
  };
  this.addResource = function (type, amount, auto) {
    if (!auto && amount > 0) this.addWeaponXP(amount);
    if (type == 3) {
      scoreCallback(this, amount, true);
    } else {
      this[config.resourceTypes[type]] += amount;
      server.send(this.id, "9", config.resourceTypes[type], this[config.resourceTypes[type]], 1);
    }
  };
  this.changeItemCount = function (index, value) {
    this.itemCounts[index] = this.itemCounts[index] || 0;
    this.itemCounts[index] += value;
    server.send(this.id, "14", index, this.itemCounts[index]);
  };
  this.buildItem = function (item) {
    var tmpS = this.scale + item.scale + (item.placeOffset || 0);
    var tmpX = this.x + tmpS * mathCOS(this.dir);
    var tmpY = this.y + tmpS * mathSIN(this.dir);
    if (this.canBuild(item) && !(item.consume && this.skin && this.skin.noEat) && (item.consume || objectManager.checkItemLocation(tmpX, tmpY, item.scale, 0.6, item.id, false, this))) {
      var worked = false;
      if (item.consume) {
        if (this.hitTime) {
          var timeSinceHit = Date.now() - this.hitTime;
          this.hitTime = 0;
          if (timeSinceHit <= 120) {
            this.shameCount++;
            if (this.shameCount >= 8) {
              this.shameTimer = 30000;
              this.shameCount = 0;
            }
          } else {
            this.shameCount -= 2;
            if (this.shameCount <= 0) {
              this.shameCount = 0;
            }
          }
        }
        if (this.shameTimer <= 0) worked = item.consume(this);
      } else {
        worked = true;
        if (item.group.limit) {
          this.changeItemCount(item.group.id, 1);
        }
        if (item.pps) this.pps += item.pps;
        objectManager.add(objectManager.objects.length, tmpX, tmpY, this.dir, item.scale, item.type, item, false, this);
      }
      if (worked) {
        this.useRes(item);
        this.buildIndex = -1;
      }
    }
  };
  this.hasRes = function (item, mult) {
    for (var i = 0; i < item.req.length;) {
      if (this[item.req[i]] < Math.round(item.req[i + 1] * (mult || 1))) return false;
      i += 2;
    }
    return true;
  };
  this.useRes = function (item, mult) {
    if (config.inSandbox) return;
    for (var i = 0; i < item.req.length;) {
      this.addResource(config.resourceTypes.indexOf(item.req[i]), -Math.round(item.req[i + 1] * (mult || 1)));
      i += 2;
    }
  };
  this.canBuild = function (item) {
    if (config.inSandbox) return true;
    if (item.group.limit && this.itemCounts[item.group.id] >= item.group.limit) return false;
    return this.hasRes(item);
  };
  this.gather = function () {
    this.noMovTimer = 0;
    this.slowMult -= items.weapons[this.weaponIndex].hitSlow || 0.3;
    if (this.slowMult < 0) this.slowMult = 0;
    var tmpVariant = config.fetchVariant(this);
    var applyPoison = tmpVariant.poison;
    var variantDmg = tmpVariant.val;
    var hitObjs = {};
    var tmpDist, tmpDir, tmpObj, hitSomething;
    var tmpList = objectManager.getGridArrays(this.x, this.y, items.weapons[this.weaponIndex].range);
    for (var t = 0; t < tmpList.length; ++t) {
      for (var i = 0; i < tmpList[t].length; ++i) {
        tmpObj = tmpList[t][i];
        if (tmpObj.active && !tmpObj.dontGather && !hitObjs[tmpObj.sid] && tmpObj.visibleToPlayer(this)) {
          tmpDist = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y) - tmpObj.scale;
          if (tmpDist <= items.weapons[this.weaponIndex].range) {
            tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y);
            if (UTILS.getAngleDist(tmpDir, this.dir) <= config.gatherAngle) {
              hitObjs[tmpObj.sid] = 1;
              if (tmpObj.health) {
                if (tmpObj.changeHealth(-items.weapons[this.weaponIndex].dmg * variantDmg * (items.weapons[this.weaponIndex].sDmg || 1) * (this.skin && this.skin.bDmg ? this.skin.bDmg : 1), this)) {
                  for (var x = 0; x < tmpObj.req.length;) {
                    this.addResource(config.resourceTypes.indexOf(tmpObj.req[x]), tmpObj.req[x + 1]);
                    x += 2;
                  }
                  objectManager.disableObj(tmpObj);
                }
              } else {
                this.earnXP(4 * items.weapons[this.weaponIndex].gather);
                var count = items.weapons[this.weaponIndex].gather + (tmpObj.type == 3 ? 4 : 0);
                if (this.skin && this.skin.extraGold) {
                  this.addResource(3, 1);
                }
                this.addResource(tmpObj.type, count);
              }
              hitSomething = true;
              objectManager.hitObj(tmpObj, tmpDir);
            }
          }
        }
      }
    }
    for (var i = 0; i < players.length + ais.length; ++i) {
      tmpObj = players[i] || ais[i - players.length];
      if (tmpObj != this && tmpObj.alive && !(tmpObj.team && tmpObj.team == this.team)) {
        tmpDist = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y) - tmpObj.scale * 1.8;
        if (tmpDist <= items.weapons[this.weaponIndex].range) {
          tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y);
          if (UTILS.getAngleDist(tmpDir, this.dir) <= config.gatherAngle) {
            var stealCount = items.weapons[this.weaponIndex].steal;
            if (stealCount && tmpObj.addResource) {
              stealCount = Math.min(tmpObj.points || 0, stealCount);
              this.addResource(3, stealCount);
              tmpObj.addResource(3, -stealCount);
            }
            var dmgMlt = variantDmg;
            if (tmpObj.weaponIndex != undefined && items.weapons[tmpObj.weaponIndex].shield && UTILS.getAngleDist(tmpDir + Math.PI, tmpObj.dir) <= config.shieldAngle) {
              dmgMlt = items.weapons[tmpObj.weaponIndex].shield;
            }
            var dmgVal = items.weapons[this.weaponIndex].dmg * (this.skin && this.skin.dmgMultO ? this.skin.dmgMultO : 1) * (this.tail && this.tail.dmgMultO ? this.tail.dmgMultO : 1);
            var tmpSpd = 0.3 * (tmpObj.weightM || 1) + (items.weapons[this.weaponIndex].knock || 0);
            tmpObj.xVel += tmpSpd * mathCOS(tmpDir);
            tmpObj.yVel += tmpSpd * mathSIN(tmpDir);
            if (this.skin && this.skin.healD) this.changeHealth(dmgVal * dmgMlt * this.skin.healD, this);
            if (this.tail && this.tail.healD) this.changeHealth(dmgVal * dmgMlt * this.tail.healD, this);
            if (tmpObj.skin && tmpObj.skin.dmg && dmgMlt == 1) this.changeHealth(-dmgVal * tmpObj.skin.dmg, tmpObj);
            if (tmpObj.tail && tmpObj.tail.dmg && dmgMlt == 1) this.changeHealth(-dmgVal * tmpObj.tail.dmg, tmpObj);
            if (tmpObj.dmgOverTime && this.skin && this.skin.poisonDmg && !(tmpObj.skin && tmpObj.skin.poisonRes)) {
              tmpObj.dmgOverTime.dmg = this.skin.poisonDmg;
              tmpObj.dmgOverTime.time = this.skin.poisonTime || 1;
              tmpObj.dmgOverTime.doer = this;
            }
            if (tmpObj.dmgOverTime && applyPoison && !(tmpObj.skin && tmpObj.skin.poisonRes)) {
              tmpObj.dmgOverTime.dmg = 5;
              tmpObj.dmgOverTime.time = 5;
              tmpObj.dmgOverTime.doer = this;
            }
            if (tmpObj.skin && tmpObj.skin.dmgK) {
              this.xVel -= tmpObj.skin.dmgK * mathCOS(tmpDir);
              this.yVel -= tmpObj.skin.dmgK * mathSIN(tmpDir);
            }
            tmpObj.changeHealth(-dmgVal * dmgMlt, this, this);
          }
        }
      }
    }
    this.sendAnimation(hitSomething ? 1 : 0);
  };
  this.sendAnimation = function (hit) {
    for (var i = 0; i < players.length; ++i) {
      if (this.sentTo[players[i].id] && this.canSee(players[i])) {
        server.send(players[i].id, "7", this.sid, hit ? 1 : 0, this.weaponIndex);
      }
    }
  };
  var tmpRatio = 0;
  var animIndex = 0;
  this.animate = function (delta) {
    if (this.animTime > 0) {
      this.animTime -= delta;
      if (this.animTime <= 0) {
        this.animTime = 0;
        this.dirPlus = 0;
        tmpRatio = 0;
        animIndex = 0;
      } else {
        if (animIndex == 0) {
          tmpRatio += delta / (this.animSpeed * config.hitReturnRatio);
          this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.min(1, tmpRatio));
          if (tmpRatio >= 1) {
            tmpRatio = 1;
            animIndex = 1;
          }
        } else {
          tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio));
          this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.max(0, tmpRatio));
        }
      }
    }
  };
  this.startAnim = function (didHit, index) {
    this.animTime = this.animSpeed = items.weapons[index].speed;
    this.targetAngle = didHit ? -config.hitAngle : -Math.PI;
    tmpRatio = 0;
    animIndex = 0;
  };
  this.canSee = function (other) {
    if (!other) return false;
    if (other.skin && other.skin.invisTimer && other.noMovTimer >= other.skin.invisTimer) return false;
    var dx = mathABS(other.x - this.x) - other.scale;
    var dy = mathABS(other.y - this.y) - other.scale;
    return dx <= config.maxScreenWidth / 2 * 1.3 && dy <= config.maxScreenHeight / 2 * 1.3;
  };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const localList = __webpack_require__(11).words;
const baseList = __webpack_require__(12).array;

class Filter {

  /**
   * Filter constructor.
   * @constructor
   * @param {object} options - Filter instance options
   * @param {boolean} options.emptyList - Instantiate filter with no blacklist
   * @param {array} options.list - Instantiate filter with custom list
   * @param {string} options.placeHolder - Character used to replace profane words.
   * @param {string} options.regex - Regular expression used to sanitize words before comparing them to blacklist.
   * @param {string} options.replaceRegex - Regular expression used to replace profane words with placeHolder.
   * @param {string} options.splitRegex - Regular expression used to split a string into words.
   */
  constructor(options = {}) {
    Object.assign(this, {
      list: options.emptyList && [] || Array.prototype.concat.apply(localList, [baseList, options.list || []]),
      exclude: options.exclude || [],
      splitRegex: options.splitRegex || /\b/,
      placeHolder: options.placeHolder || '*',
      regex: options.regex || /[^a-zA-Z0-9|\$|\@]|\^/g,
      replaceRegex: options.replaceRegex || /\w/g
    })
  }

  /**
   * Determine if a string contains profane language.
   * @param {string} string - String to evaluate for profanity.
   */
  isProfane(string) {
    return this.list
      .filter((word) => {
        const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
        return !this.exclude.includes(word.toLowerCase()) && wordExp.test(string);
      })
      .length > 0 || false;
  }

  /**
   * Replace a word with placeHolder characters;
   * @param {string} string - String to replace.
   */
  replaceWord(string) {
    return string
      .replace(this.regex, '')
      .replace(this.replaceRegex, this.placeHolder);
  }

  /**
   * Evaluate a string for profanity and return an edited version.
   * @param {string} string - Sentence to filter.
   */
  clean(string) {
    return string.split(this.splitRegex).map((word) => {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    }).join(this.splitRegex.exec(string)[0]);
  }

  /**
   * Add word(s) to blacklist filter / remove words from whitelist filter
   * @param {...string} word - Word(s) to add to blacklist
   */
  addWords() {
    let words = Array.from(arguments);

    this.list.push(...words);

    words
      .map(word => word.toLowerCase())
      .forEach((word) => {
        if (this.exclude.includes(word)) {
          this.exclude.splice(this.exclude.indexOf(word), 1);
        }
      });
  }

  /**
   * Add words to whitelist filter
   * @param {...string} word - Word(s) to add to whitelist.
   */
  removeWords() {
    this.exclude.push(...Array.from(arguments).map(word => word.toLowerCase()));
  }
}

module.exports = Filter;

/***/ }),
/* 11 */
/***/ (function(module) {

module.exports = JSON.parse("{\"words\":[\"ahole\",\"anus\",\"ash0le\",\"ash0les\",\"asholes\",\"ass\",\"Ass Monkey\",\"Assface\",\"assh0le\",\"assh0lez\",\"asshole\",\"assholes\",\"assholz\",\"asswipe\",\"azzhole\",\"bassterds\",\"bastard\",\"bastards\",\"bastardz\",\"basterds\",\"basterdz\",\"Biatch\",\"bitch\",\"bitches\",\"Blow Job\",\"boffing\",\"butthole\",\"buttwipe\",\"c0ck\",\"c0cks\",\"c0k\",\"Carpet Muncher\",\"cawk\",\"cawks\",\"Clit\",\"cnts\",\"cntz\",\"cock\",\"cockhead\",\"cock-head\",\"cocks\",\"CockSucker\",\"cock-sucker\",\"crap\",\"cum\",\"cunt\",\"cunts\",\"cuntz\",\"dick\",\"dild0\",\"dild0s\",\"dildo\",\"dildos\",\"dilld0\",\"dilld0s\",\"dominatricks\",\"dominatrics\",\"dominatrix\",\"dyke\",\"enema\",\"f u c k\",\"f u c k e r\",\"fag\",\"fag1t\",\"faget\",\"fagg1t\",\"faggit\",\"faggot\",\"fagg0t\",\"fagit\",\"fags\",\"fagz\",\"faig\",\"faigs\",\"fart\",\"flipping the bird\",\"fuck\",\"fucker\",\"fuckin\",\"fucking\",\"fucks\",\"Fudge Packer\",\"fuk\",\"Fukah\",\"Fuken\",\"fuker\",\"Fukin\",\"Fukk\",\"Fukkah\",\"Fukken\",\"Fukker\",\"Fukkin\",\"g00k\",\"God-damned\",\"h00r\",\"h0ar\",\"h0re\",\"hells\",\"hoar\",\"hoor\",\"hoore\",\"jackoff\",\"jap\",\"japs\",\"jerk-off\",\"jisim\",\"jiss\",\"jizm\",\"jizz\",\"knob\",\"knobs\",\"knobz\",\"kunt\",\"kunts\",\"kuntz\",\"Lezzian\",\"Lipshits\",\"Lipshitz\",\"masochist\",\"masokist\",\"massterbait\",\"masstrbait\",\"masstrbate\",\"masterbaiter\",\"masterbate\",\"masterbates\",\"Motha Fucker\",\"Motha Fuker\",\"Motha Fukkah\",\"Motha Fukker\",\"Mother Fucker\",\"Mother Fukah\",\"Mother Fuker\",\"Mother Fukkah\",\"Mother Fukker\",\"mother-fucker\",\"Mutha Fucker\",\"Mutha Fukah\",\"Mutha Fuker\",\"Mutha Fukkah\",\"Mutha Fukker\",\"n1gr\",\"nastt\",\"nigger;\",\"nigur;\",\"niiger;\",\"niigr;\",\"orafis\",\"orgasim;\",\"orgasm\",\"orgasum\",\"oriface\",\"orifice\",\"orifiss\",\"packi\",\"packie\",\"packy\",\"paki\",\"pakie\",\"paky\",\"pecker\",\"peeenus\",\"peeenusss\",\"peenus\",\"peinus\",\"pen1s\",\"penas\",\"penis\",\"penis-breath\",\"penus\",\"penuus\",\"Phuc\",\"Phuck\",\"Phuk\",\"Phuker\",\"Phukker\",\"polac\",\"polack\",\"polak\",\"Poonani\",\"pr1c\",\"pr1ck\",\"pr1k\",\"pusse\",\"pussee\",\"pussy\",\"puuke\",\"puuker\",\"qweir\",\"recktum\",\"rectum\",\"retard\",\"sadist\",\"scank\",\"schlong\",\"screwing\",\"semen\",\"sex\",\"sexy\",\"Sh!t\",\"sh1t\",\"sh1ter\",\"sh1ts\",\"sh1tter\",\"sh1tz\",\"shit\",\"shits\",\"shitter\",\"Shitty\",\"Shity\",\"shitz\",\"Shyt\",\"Shyte\",\"Shytty\",\"Shyty\",\"skanck\",\"skank\",\"skankee\",\"skankey\",\"skanks\",\"Skanky\",\"slag\",\"slut\",\"sluts\",\"Slutty\",\"slutz\",\"son-of-a-bitch\",\"tit\",\"turd\",\"va1jina\",\"vag1na\",\"vagiina\",\"vagina\",\"vaj1na\",\"vajina\",\"vullva\",\"vulva\",\"w0p\",\"wh00r\",\"wh0re\",\"whore\",\"xrated\",\"xxx\",\"b!+ch\",\"bitch\",\"blowjob\",\"clit\",\"arschloch\",\"fuck\",\"shit\",\"ass\",\"asshole\",\"b!tch\",\"b17ch\",\"b1tch\",\"bastard\",\"bi+ch\",\"boiolas\",\"buceta\",\"c0ck\",\"cawk\",\"chink\",\"cipa\",\"clits\",\"cock\",\"cum\",\"cunt\",\"dildo\",\"dirsa\",\"ejakulate\",\"fatass\",\"fcuk\",\"fuk\",\"fux0r\",\"hoer\",\"hore\",\"jism\",\"kawk\",\"l3itch\",\"l3i+ch\",\"masturbate\",\"masterbat*\",\"masterbat3\",\"motherfucker\",\"s.o.b.\",\"mofo\",\"nazi\",\"nigga\",\"nigger\",\"nutsack\",\"phuck\",\"pimpis\",\"pusse\",\"pussy\",\"scrotum\",\"sh!t\",\"shemale\",\"shi+\",\"sh!+\",\"slut\",\"smut\",\"teets\",\"tits\",\"boobs\",\"b00bs\",\"teez\",\"testical\",\"testicle\",\"titt\",\"w00se\",\"jackoff\",\"wank\",\"whoar\",\"whore\",\"*damn\",\"*dyke\",\"*fuck*\",\"*shit*\",\"@$$\",\"amcik\",\"andskota\",\"arse*\",\"assrammer\",\"ayir\",\"bi7ch\",\"bitch*\",\"bollock*\",\"breasts\",\"butt-pirate\",\"cabron\",\"cazzo\",\"chraa\",\"chuj\",\"Cock*\",\"cunt*\",\"d4mn\",\"daygo\",\"dego\",\"dick*\",\"dike*\",\"dupa\",\"dziwka\",\"ejackulate\",\"Ekrem*\",\"Ekto\",\"enculer\",\"faen\",\"fag*\",\"fanculo\",\"fanny\",\"feces\",\"feg\",\"Felcher\",\"ficken\",\"fitt*\",\"Flikker\",\"foreskin\",\"Fotze\",\"Fu(*\",\"fuk*\",\"futkretzn\",\"gook\",\"guiena\",\"h0r\",\"h4x0r\",\"hell\",\"helvete\",\"hoer*\",\"honkey\",\"Huevon\",\"hui\",\"injun\",\"jizz\",\"kanker*\",\"kike\",\"klootzak\",\"kraut\",\"knulle\",\"kuk\",\"kuksuger\",\"Kurac\",\"kurwa\",\"kusi*\",\"kyrpa*\",\"lesbo\",\"mamhoon\",\"masturbat*\",\"merd*\",\"mibun\",\"monkleigh\",\"mouliewop\",\"muie\",\"mulkku\",\"muschi\",\"nazis\",\"nepesaurio\",\"nigger*\",\"orospu\",\"paska*\",\"perse\",\"picka\",\"pierdol*\",\"pillu*\",\"pimmel\",\"piss*\",\"pizda\",\"poontsee\",\"poop\",\"porn\",\"p0rn\",\"pr0n\",\"preteen\",\"pula\",\"pule\",\"puta\",\"puto\",\"qahbeh\",\"queef*\",\"rautenberg\",\"schaffer\",\"scheiss*\",\"schlampe\",\"schmuck\",\"screw\",\"sh!t*\",\"sharmuta\",\"sharmute\",\"shipal\",\"shiz\",\"skribz\",\"skurwysyn\",\"sphencter\",\"spic\",\"spierdalaj\",\"splooge\",\"suka\",\"b00b*\",\"testicle*\",\"titt*\",\"twat\",\"vittu\",\"wank*\",\"wetback*\",\"wichser\",\"wop*\",\"yed\",\"zabourah\"]}");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  object: __webpack_require__(13),
  array: __webpack_require__(14),
  regex: __webpack_require__(15)
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {"4r5e": 1, "5h1t": 1, "5hit": 1, "a55": 1, "anal": 1, "anus": 1, "ar5e": 1, "arrse": 1, "arse": 1, "ass": 1, "ass-fucker": 1, "asses": 1, "assfucker": 1, "assfukka": 1, "asshole": 1, "assholes": 1, "asswhole": 1, "a_s_s": 1, "b!tch": 1, "b00bs": 1, "b17ch": 1, "b1tch": 1, "ballbag": 1, "balls": 1, "ballsack": 1, "bastard": 1, "beastial": 1, "beastiality": 1, "bellend": 1, "bestial": 1, "bestiality": 1, "bi+ch": 1, "biatch": 1, "bitch": 1, "bitcher": 1, "bitchers": 1, "bitches": 1, "bitchin": 1, "bitching": 1, "bloody": 1, "blow job": 1, "blowjob": 1, "blowjobs": 1, "boiolas": 1, "bollock": 1, "bollok": 1, "boner": 1, "boob": 1, "boobs": 1, "booobs": 1, "boooobs": 1, "booooobs": 1, "booooooobs": 1, "breasts": 1, "buceta": 1, "bugger": 1, "bum": 1, "bunny fucker": 1, "butt": 1, "butthole": 1, "buttmuch": 1, "buttplug": 1, "c0ck": 1, "c0cksucker": 1, "carpet muncher": 1, "cawk": 1, "chink": 1, "cipa": 1, "cl1t": 1, "clit": 1, "clitoris": 1, "clits": 1, "cnut": 1, "cock": 1, "cock-sucker": 1, "cockface": 1, "cockhead": 1, "cockmunch": 1, "cockmuncher": 1, "cocks": 1, "cocksuck": 1, "cocksucked": 1, "cocksucker": 1, "cocksucking": 1, "cocksucks": 1, "cocksuka": 1, "cocksukka": 1, "cok": 1, "cokmuncher": 1, "coksucka": 1, "coon": 1, "cox": 1, "crap": 1, "cum": 1, "cummer": 1, "cumming": 1, "cums": 1, "cumshot": 1, "cunilingus": 1, "cunillingus": 1, "cunnilingus": 1, "cunt": 1, "cuntlick": 1, "cuntlicker": 1, "cuntlicking": 1, "cunts": 1, "cyalis": 1, "cyberfuc": 1, "cyberfuck": 1, "cyberfucked": 1, "cyberfucker": 1, "cyberfuckers": 1, "cyberfucking": 1, "d1ck": 1, "damn": 1, "dick": 1, "dickhead": 1, "dildo": 1, "dildos": 1, "dink": 1, "dinks": 1, "dirsa": 1, "dlck": 1, "dog-fucker": 1, "doggin": 1, "dogging": 1, "donkeyribber": 1, "doosh": 1, "duche": 1, "dyke": 1, "ejaculate": 1, "ejaculated": 1, "ejaculates": 1, "ejaculating": 1, "ejaculatings": 1, "ejaculation": 1, "ejakulate": 1, "f u c k": 1, "f u c k e r": 1, "f4nny": 1, "fag": 1, "fagging": 1, "faggitt": 1, "faggot": 1, "faggs": 1, "fagot": 1, "fagots": 1, "fags": 1, "fanny": 1, "fannyflaps": 1, "fannyfucker": 1, "fanyy": 1, "fatass": 1, "fcuk": 1, "fcuker": 1, "fcuking": 1, "feck": 1, "fecker": 1, "felching": 1, "fellate": 1, "fellatio": 1, "fingerfuck": 1, "fingerfucked": 1, "fingerfucker": 1, "fingerfuckers": 1, "fingerfucking": 1, "fingerfucks": 1, "fistfuck": 1, "fistfucked": 1, "fistfucker": 1, "fistfuckers": 1, "fistfucking": 1, "fistfuckings": 1, "fistfucks": 1, "flange": 1, "fook": 1, "fooker": 1, "fuck": 1, "fucka": 1, "fucked": 1, "fucker": 1, "fuckers": 1, "fuckhead": 1, "fuckheads": 1, "fuckin": 1, "fucking": 1, "fuckings": 1, "fuckingshitmotherfucker": 1, "fuckme": 1, "fucks": 1, "fuckwhit": 1, "fuckwit": 1, "fudge packer": 1, "fudgepacker": 1, "fuk": 1, "fuker": 1, "fukker": 1, "fukkin": 1, "fuks": 1, "fukwhit": 1, "fukwit": 1, "fux": 1, "fux0r": 1, "f_u_c_k": 1, "gangbang": 1, "gangbanged": 1, "gangbangs": 1, "gaylord": 1, "gaysex": 1, "goatse": 1, "God": 1, "god-dam": 1, "god-damned": 1, "goddamn": 1, "goddamned": 1, "hardcoresex": 1, "hell": 1, "heshe": 1, "hoar": 1, "hoare": 1, "hoer": 1, "homo": 1, "hore": 1, "horniest": 1, "horny": 1, "hotsex": 1, "jack-off": 1, "jackoff": 1, "jap": 1, "jerk-off": 1, "jism": 1, "jiz": 1, "jizm": 1, "jizz": 1, "kawk": 1, "knob": 1, "knobead": 1, "knobed": 1, "knobend": 1, "knobhead": 1, "knobjocky": 1, "knobjokey": 1, "kock": 1, "kondum": 1, "kondums": 1, "kum": 1, "kummer": 1, "kumming": 1, "kums": 1, "kunilingus": 1, "l3i+ch": 1, "l3itch": 1, "labia": 1, "lust": 1, "lusting": 1, "m0f0": 1, "m0fo": 1, "m45terbate": 1, "ma5terb8": 1, "ma5terbate": 1, "masochist": 1, "master-bate": 1, "masterb8": 1, "masterbat*": 1, "masterbat3": 1, "masterbate": 1, "masterbation": 1, "masterbations": 1, "masturbate": 1, "mo-fo": 1, "mof0": 1, "mofo": 1, "mothafuck": 1, "mothafucka": 1, "mothafuckas": 1, "mothafuckaz": 1, "mothafucked": 1, "mothafucker": 1, "mothafuckers": 1, "mothafuckin": 1, "mothafucking": 1, "mothafuckings": 1, "mothafucks": 1, "mother fucker": 1, "motherfuck": 1, "motherfucked": 1, "motherfucker": 1, "motherfuckers": 1, "motherfuckin": 1, "motherfucking": 1, "motherfuckings": 1, "motherfuckka": 1, "motherfucks": 1, "muff": 1, "mutha": 1, "muthafecker": 1, "muthafuckker": 1, "muther": 1, "mutherfucker": 1, "n1gga": 1, "n1gger": 1, "nazi": 1, "nigg3r": 1, "nigg4h": 1, "nigga": 1, "niggah": 1, "niggas": 1, "niggaz": 1, "nigger": 1, "niggers": 1, "nob": 1, "nob jokey": 1, "nobhead": 1, "nobjocky": 1, "nobjokey": 1, "numbnuts": 1, "nutsack": 1, "orgasim": 1, "orgasims": 1, "orgasm": 1, "orgasms": 1, "p0rn": 1, "pawn": 1, "pecker": 1, "penis": 1, "penisfucker": 1, "phonesex": 1, "phuck": 1, "phuk": 1, "phuked": 1, "phuking": 1, "phukked": 1, "phukking": 1, "phuks": 1, "phuq": 1, "pigfucker": 1, "pimpis": 1, "piss": 1, "pissed": 1, "pisser": 1, "pissers": 1, "pisses": 1, "pissflaps": 1, "pissin": 1, "pissing": 1, "pissoff": 1, "poop": 1, "porn": 1, "porno": 1, "pornography": 1, "pornos": 1, "prick": 1, "pricks": 1, "pron": 1, "pube": 1, "pusse": 1, "pussi": 1, "pussies": 1, "pussy": 1, "pussys": 1, "rectum": 1, "retard": 1, "rimjaw": 1, "rimming": 1, "s hit": 1, "s.o.b.": 1, "sadist": 1, "schlong": 1, "screwing": 1, "scroat": 1, "scrote": 1, "scrotum": 1, "semen": 1, "sex": 1, "sh!+": 1, "sh!t": 1, "sh1t": 1, "shag": 1, "shagger": 1, "shaggin": 1, "shagging": 1, "shemale": 1, "shi+": 1, "shit": 1, "shitdick": 1, "shite": 1, "shited": 1, "shitey": 1, "shitfuck": 1, "shitfull": 1, "shithead": 1, "shiting": 1, "shitings": 1, "shits": 1, "shitted": 1, "shitter": 1, "shitters": 1, "shitting": 1, "shittings": 1, "shitty": 1, "skank": 1, "slut": 1, "sluts": 1, "smegma": 1, "smut": 1, "snatch": 1, "son-of-a-bitch": 1, "spac": 1, "spunk": 1, "s_h_i_t": 1, "t1tt1e5": 1, "t1tties": 1, "teets": 1, "teez": 1, "testical": 1, "testicle": 1, "tit": 1, "titfuck": 1, "tits": 1, "titt": 1, "tittie5": 1, "tittiefucker": 1, "titties": 1, "tittyfuck": 1, "tittywank": 1, "titwank": 1, "tosser": 1, "turd": 1, "tw4t": 1, "twat": 1, "twathead": 1, "twatty": 1, "twunt": 1, "twunter": 1, "v14gra": 1, "v1gra": 1, "vagina": 1, "viagra": 1, "vulva": 1, "w00se": 1, "wang": 1, "wank": 1, "wanker": 1, "wanky": 1, "whoar": 1, "whore": 1, "willies": 1, "willy": 1, "xrated": 1, "xxx": 1};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = /\b(4r5e|5h1t|5hit|a55|anal|anus|ar5e|arrse|arse|ass|ass-fucker|asses|assfucker|assfukka|asshole|assholes|asswhole|a_s_s|b!tch|b00bs|b17ch|b1tch|ballbag|balls|ballsack|bastard|beastial|beastiality|bellend|bestial|bestiality|bi\+ch|biatch|bitch|bitcher|bitchers|bitches|bitchin|bitching|bloody|blow job|blowjob|blowjobs|boiolas|bollock|bollok|boner|boob|boobs|booobs|boooobs|booooobs|booooooobs|breasts|buceta|bugger|bum|bunny fucker|butt|butthole|buttmuch|buttplug|c0ck|c0cksucker|carpet muncher|cawk|chink|cipa|cl1t|clit|clitoris|clits|cnut|cock|cock-sucker|cockface|cockhead|cockmunch|cockmuncher|cocks|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|cocksuka|cocksukka|cok|cokmuncher|coksucka|coon|cox|crap|cum|cummer|cumming|cums|cumshot|cunilingus|cunillingus|cunnilingus|cunt|cuntlick|cuntlicker|cuntlicking|cunts|cyalis|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfuckers|cyberfucking|d1ck|damn|dick|dickhead|dildo|dildos|dink|dinks|dirsa|dlck|dog-fucker|doggin|dogging|donkeyribber|doosh|duche|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculatings|ejaculation|ejakulate|f u c k|f u c k e r|f4nny|fag|fagging|faggitt|faggot|faggs|fagot|fagots|fags|fanny|fannyflaps|fannyfucker|fanyy|fatass|fcuk|fcuker|fcuking|feck|fecker|felching|fellate|fellatio|fingerfuck|fingerfucked|fingerfucker|fingerfuckers|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfuckers|fistfucking|fistfuckings|fistfucks|flange|fook|fooker|fuck|fucka|fucked|fucker|fuckers|fuckhead|fuckheads|fuckin|fucking|fuckings|fuckingshitmotherfucker|fuckme|fucks|fuckwhit|fuckwit|fudge packer|fudgepacker|fuk|fuker|fukker|fukkin|fuks|fukwhit|fukwit|fux|fux0r|f_u_c_k|gangbang|gangbanged|gangbangs|gaylord|gaysex|goatse|God|god-dam|god-damned|goddamn|goddamned|hardcoresex|hell|heshe|hoar|hoare|hoer|homo|hore|horniest|horny|hotsex|jack-off|jackoff|jap|jerk-off|jism|jiz|jizm|jizz|kawk|knob|knobead|knobed|knobend|knobhead|knobjocky|knobjokey|kock|kondum|kondums|kum|kummer|kumming|kums|kunilingus|l3i\+ch|l3itch|labia|lust|lusting|m0f0|m0fo|m45terbate|ma5terb8|ma5terbate|masochist|master-bate|masterb8|masterbat*|masterbat3|masterbate|masterbation|masterbations|masturbate|mo-fo|mof0|mofo|mothafuck|mothafucka|mothafuckas|mothafuckaz|mothafucked|mothafucker|mothafuckers|mothafuckin|mothafucking|mothafuckings|mothafucks|mother fucker|motherfuck|motherfucked|motherfucker|motherfuckers|motherfuckin|motherfucking|motherfuckings|motherfuckka|motherfucks|muff|mutha|muthafecker|muthafuckker|muther|mutherfucker|n1gga|n1gger|nazi|nigg3r|nigg4h|nigga|niggah|niggas|niggaz|nigger|niggers|nob|nob jokey|nobhead|nobjocky|nobjokey|numbnuts|nutsack|orgasim|orgasims|orgasm|orgasms|p0rn|pawn|pecker|penis|penisfucker|phonesex|phuck|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pigfucker|pimpis|piss|pissed|pisser|pissers|pisses|pissflaps|pissin|pissing|pissoff|poop|porn|porno|pornography|pornos|prick|pricks|pron|pube|pusse|pussi|pussies|pussy|pussys|rectum|retard|rimjaw|rimming|s hit|s.o.b.|sadist|schlong|screwing|scroat|scrote|scrotum|semen|sex|sh!\+|sh!t|sh1t|shag|shagger|shaggin|shagging|shemale|shi\+|shit|shitdick|shite|shited|shitey|shitfuck|shitfull|shithead|shiting|shitings|shits|shitted|shitter|shitters|shitting|shittings|shitty|skank|slut|sluts|smegma|smut|snatch|son-of-a-bitch|spac|spunk|s_h_i_t|t1tt1e5|t1tties|teets|teez|testical|testicle|tit|titfuck|tits|titt|tittie5|tittiefucker|titties|tittyfuck|tittywank|titwank|tosser|turd|tw4t|twat|twathead|twatty|twunt|twunter|v14gra|v1gra|vagina|viagra|vulva|w00se|wang|wank|wanker|wanky|whoar|whore|willies|willy|xrated|xxx)\b/gi;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports.hats = [{
  id: 45,
  name: "Shame!",
  dontSell: true,
  price: 0,
  scale: 120,
  desc: "hacks are for losers"
}, {
  id: 51,
  name: "Moo Cap",
  price: 0,
  scale: 120,
  desc: "coolest mooer around"
}, {
  id: 50,
  name: "Apple Cap",
  price: 0,
  scale: 120,
  desc: "apple farms remembers"
}, {
  id: 28,
  name: "Moo Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 29,
  name: "Pig Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 30,
  name: "Fluff Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 36,
  name: "Pandou Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 37,
  name: "Bear Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 38,
  name: "Monkey Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 44,
  name: "Polar Head",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 35,
  name: "Fez Hat",
  price: 0,
  scale: 120,
  desc: "no effect"
}, {
  id: 42,
  name: "Enigma Hat",
  price: 0,
  scale: 120,
  desc: "join the enigma army"
}, {
  id: 43,
  name: "Blitz Hat",
  price: 0,
  scale: 120,
  desc: "hey everybody i'm blitz"
}, {
  id: 49,
  name: "Bob XIII Hat",
  price: 0,
  scale: 120,
  desc: "like and subscribe"
}, {
  id: 57,
  name: "Pumpkin",
  price: 50,
  scale: 120,
  desc: "Spooooky"
}, {
  id: 8,
  name: "Bummle Hat",
  price: 100,
  scale: 120,
  desc: "no effect"
}, {
  id: 2,
  name: "Straw Hat",
  price: 500,
  scale: 120,
  desc: "no effect"
}, {
  id: 15,
  name: "Winter Cap",
  price: 600,
  scale: 120,
  desc: "allows you to move at normal speed in snow",
  coldM: 1
}, {
  id: 5,
  name: "Cowboy Hat",
  price: 1000,
  scale: 120,
  desc: "no effect"
}, {
  id: 4,
  name: "Ranger Hat",
  price: 2000,
  scale: 120,
  desc: "no effect"
}, {
  id: 18,
  name: "Explorer Hat",
  price: 2000,
  scale: 120,
  desc: "no effect"
}, {
  id: 31,
  name: "Flipper Hat",
  price: 2500,
  scale: 120,
  desc: "have more control while in water",
  watrImm: true
}, {
  id: 1,
  name: "Marksman Cap",
  price: 3000,
  scale: 120,
  desc: "increases arrow speed and range",
  aMlt: 1.3
}, {
  id: 10,
  name: "Bush Gear",
  price: 3000,
  scale: 160,
  desc: "allows you to disguise yourself as a bush"
}, {
  id: 48,
  name: "Halo",
  price: 3000,
  scale: 120,
  desc: "no effect"
}, {
  id: 6,
  name: "Soldier Helmet",
  price: 4000,
  scale: 120,
  desc: "reduces damage taken but slows movement",
  spdMult: 0.94,
  dmgMult: 0.75
}, {
  id: 23,
  name: "Anti Venom Gear",
  price: 4000,
  scale: 120,
  desc: "makes you immune to poison",
  poisonRes: 1
}, {
  id: 13,
  name: "Medic Gear",
  price: 5000,
  scale: 110,
  desc: "slowly regenerates health over time",
  healthRegen: 3
}, {
  id: 9,
  name: "Miners Helmet",
  price: 5000,
  scale: 120,
  desc: "earn 1 extra gold per resource",
  extraGold: 1
}, {
  id: 32,
  name: "Musketeer Hat",
  price: 5000,
  scale: 120,
  desc: "reduces cost of projectiles",
  projCost: 0.5
}, {
  id: 7,
  name: "Bull Helmet",
  price: 6000,
  scale: 120,
  desc: "increases damage done but drains health",
  healthRegen: -5,
  dmgMultO: 1.5,
  spdMult: 0.96
}, {
  id: 22,
  name: "Emp Helmet",
  price: 6000,
  scale: 120,
  desc: "turrets won't attack but you move slower",
  antiTurret: 1,
  spdMult: 0.7
}, {
  id: 12,
  name: "Booster Hat",
  price: 6000,
  scale: 120,
  desc: "increases your movement speed",
  spdMult: 1.16
}, {
  id: 26,
  name: "Barbarian Armor",
  price: 8000,
  scale: 120,
  desc: "knocks back enemies that attack you",
  dmgK: 0.6
}, {
  id: 21,
  name: "Plague Mask",
  price: 10000,
  scale: 120,
  desc: "melee attacks deal poison damage",
  poisonDmg: 5,
  poisonTime: 6
}, {
  id: 46,
  name: "Bull Mask",
  price: 10000,
  scale: 120,
  desc: "bulls won't target you unless you attack them",
  bullRepel: 1
}, {
  id: 14,
  name: "Windmill Hat",
  topSprite: true,
  price: 10000,
  scale: 120,
  desc: "generates points while worn",
  pps: 1.5
}, {
  id: 11,
  name: "Spike Gear",
  topSprite: true,
  price: 10000,
  scale: 120,
  desc: "deal damage to players that damage you",
  dmg: 0.45
}, {
  id: 53,
  name: "Turret Gear",
  topSprite: true,
  price: 10000,
  scale: 120,
  desc: "you become a walking turret",
  turret: {
    proj: 1,
    range: 700,
    rate: 2500
  },
  spdMult: 0.7
}, {
  id: 20,
  name: "Samurai Armor",
  price: 12000,
  scale: 120,
  desc: "increased attack speed and fire rate",
  atkSpd: 0.78
}, {
  id: 58,
  name: "Dark Knight",
  price: 12000,
  scale: 120,
  desc: "restores health when you deal damage",
  healD: 0.4
}, {
  id: 27,
  name: "Scavenger Gear",
  price: 15000,
  scale: 120,
  desc: "earn double points for each kill",
  kScrM: 2
}, {
  id: 40,
  name: "Tank Gear",
  price: 15000,
  scale: 120,
  desc: "increased damage to buildings but slower movement",
  spdMult: 0.3,
  bDmg: 3.3
}, {
  id: 52,
  name: "Thief Gear",
  price: 15000,
  scale: 120,
  desc: "steal half of a players gold when you kill them",
  goldSteal: 0.5
}, {
  id: 55,
  name: "Bloodthirster",
  price: 20000,
  scale: 120,
  desc: "Restore Health when dealing damage. And increased damage",
  healD: 0.25,
  dmgMultO: 1.2
}, {
  id: 56,
  name: "Assassin Gear",
  price: 20000,
  scale: 120,
  desc: "Go invisible when not moving. Can't eat. Increased speed",
  noEat: true,
  spdMult: 1.1,
  invisTimer: 1000
}];
module.exports.accessories = [{
  id: 12,
  name: "Snowball",
  price: 1000,
  scale: 105,
  xOff: 18,
  desc: "no effect"
}, {
  id: 9,
  name: "Tree Cape",
  price: 1000,
  scale: 90,
  desc: "no effect"
}, {
  id: 10,
  name: "Stone Cape",
  price: 1000,
  scale: 90,
  desc: "no effect"
}, {
  id: 3,
  name: "Cookie Cape",
  price: 1500,
  scale: 90,
  desc: "no effect"
}, {
  id: 8,
  name: "Cow Cape",
  price: 2000,
  scale: 90,
  desc: "no effect"
}, {
  id: 11,
  name: "Monkey Tail",
  price: 2000,
  scale: 97,
  xOff: 25,
  desc: "Super speed but reduced damage",
  spdMult: 1.35,
  dmgMultO: 0.2
}, {
  id: 17,
  name: "Apple Basket",
  price: 3000,
  scale: 80,
  xOff: 12,
  desc: "slowly regenerates health over time",
  healthRegen: 1
}, {
  id: 6,
  name: "Winter Cape",
  price: 3000,
  scale: 90,
  desc: "no effect"
}, {
  id: 4,
  name: "Skull Cape",
  price: 4000,
  scale: 90,
  desc: "no effect"
}, {
  id: 5,
  name: "Dash Cape",
  price: 5000,
  scale: 90,
  desc: "no effect"
}, {
  id: 2,
  name: "Dragon Cape",
  price: 6000,
  scale: 90,
  desc: "no effect"
}, {
  id: 1,
  name: "Super Cape",
  price: 8000,
  scale: 90,
  desc: "no effect"
}, {
  id: 7,
  name: "Troll Cape",
  price: 8000,
  scale: 90,
  desc: "no effect"
}, {
  id: 14,
  name: "Thorns",
  price: 10000,
  scale: 115,
  xOff: 20,
  desc: "no effect"
}, {
  id: 15,
  name: "Blockades",
  price: 10000,
  scale: 95,
  xOff: 15,
  desc: "no effect"
}, {
  id: 20,
  name: "Devils Tail",
  price: 10000,
  scale: 95,
  xOff: 20,
  desc: "no effect"
}, {
  id: 16,
  name: "Sawblade",
  price: 12000,
  scale: 90,
  spin: true,
  xOff: 0,
  desc: "deal damage to players that damage you",
  dmg: 0.15
}, {
  id: 13,
  name: "Angel Wings",
  price: 15000,
  scale: 138,
  xOff: 22,
  desc: "slowly regenerates health over time",
  healthRegen: 3
}, {
  id: 19,
  name: "Shadow Wings",
  price: 15000,
  scale: 138,
  xOff: 22,
  desc: "increased movement speed",
  spdMult: 1.1
}, {
  id: 18,
  name: "Blood Wings",
  price: 20000,
  scale: 178,
  xOff: 26,
  desc: "restores health when you deal damage",
  healD: 0.2
}, {
  id: 21,
  name: "Corrupt X Wings",
  price: 20000,
  scale: 178,
  xOff: 26,
  desc: "deal damage to players that damage you",
  dmg: 0.25
}];

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (players, ais, objectManager, items, config, UTILS, server) {
  this.init = function (indx, x, y, dir, spd, dmg, rng, scl, owner) {
    this.active = true;
    this.indx = indx;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.skipMov = true;
    this.speed = spd;
    this.dmg = dmg;
    this.scale = scl;
    this.range = rng;
    this.owner = owner;
    if (server) this.sentTo = {};
  };
  var objectsHit = [];
  var tmpObj;
  this.update = function (delta) {
    if (this.active) {
      var tmpSpeed = this.speed * delta;
      var tmpScale;
      if (!this.skipMov) {
        this.x += tmpSpeed * Math.cos(this.dir);
        this.y += tmpSpeed * Math.sin(this.dir);
        this.range -= tmpSpeed;
        if (this.range <= 0) {
          this.x += this.range * Math.cos(this.dir);
          this.y += this.range * Math.sin(this.dir);
          tmpSpeed = 1;
          this.range = 0;
          this.active = false;
        }
      } else {
        this.skipMov = false;
      }
      if (server) {
        for (var i = 0; i < players.length; ++i) {
          if (!this.sentTo[players[i].id] && players[i].canSee(this)) {
            this.sentTo[players[i].id] = 1;
            server.send(players[i].id, "18", UTILS.fixTo(this.x, 1), UTILS.fixTo(this.y, 1), UTILS.fixTo(this.dir, 2), UTILS.fixTo(this.range, 1), this.speed, this.indx, this.layer, this.sid);
          }
        }
        objectsHit.length = 0;
        for (var i = 0; i < players.length + ais.length; ++i) {
          tmpObj = players[i] || ais[i - players.length];
          if (tmpObj.alive && tmpObj != this.owner && !(this.owner.team && tmpObj.team == this.owner.team)) {
            if (UTILS.lineInRect(tmpObj.x - tmpObj.scale, tmpObj.y - tmpObj.scale, tmpObj.x + tmpObj.scale, tmpObj.y + tmpObj.scale, this.x, this.y, this.x + tmpSpeed * Math.cos(this.dir), this.y + tmpSpeed * Math.sin(this.dir))) {
              objectsHit.push(tmpObj);
            }
          }
        }
        var tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
        for (var x = 0; x < tmpList.length; ++x) {
          for (var y = 0; y < tmpList[x].length; ++y) {
            tmpObj = tmpList[x][y];
            tmpScale = tmpObj.getScale();
            if (tmpObj.active && !(this.ignoreObj == tmpObj.sid) && this.layer <= tmpObj.layer && objectsHit.indexOf(tmpObj) < 0 && !tmpObj.ignoreCollision && UTILS.lineInRect(tmpObj.x - tmpScale, tmpObj.y - tmpScale, tmpObj.x + tmpScale, tmpObj.y + tmpScale, this.x, this.y, this.x + tmpSpeed * Math.cos(this.dir), this.y + tmpSpeed * Math.sin(this.dir))) {
              objectsHit.push(tmpObj);
            }
          }
        }
        if (objectsHit.length > 0) {
          var hitObj = null;
          var shortDist = null;
          var tmpDist = null;
          for (var i = 0; i < objectsHit.length; ++i) {
            tmpDist = UTILS.getDistance(this.x, this.y, objectsHit[i].x, objectsHit[i].y);
            if (shortDist == null || tmpDist < shortDist) {
              shortDist = tmpDist;
              hitObj = objectsHit[i];
            }
          }
          if (hitObj.isPlayer || hitObj.isAI) {
            var tmpSd = 0.3 * (hitObj.weightM || 1);
            hitObj.xVel += tmpSd * Math.cos(this.dir);
            hitObj.yVel += tmpSd * Math.sin(this.dir);
            if (hitObj.weaponIndex == undefined || !(items.weapons[hitObj.weaponIndex].shield && UTILS.getAngleDist(this.dir + Math.PI, hitObj.dir) <= config.shieldAngle)) {
              hitObj.changeHealth(-this.dmg, this.owner, this.owner);
            }
          } else {
            if (hitObj.projDmg && hitObj.health && hitObj.changeHealth(-this.dmg)) {
              objectManager.disableObj(hitObj);
            }
            for (var i = 0; i < players.length; ++i) {
              if (players[i].active) {
                if (hitObj.sentTo[players[i].id]) {
                  if (hitObj.active) {
                    if (players[i].canSee(hitObj)) server.send(players[i].id, "8", UTILS.fixTo(this.dir, 2), hitObj.sid);
                  } else {
                    server.send(players[i].id, "12", hitObj.sid);
                  }
                }
                if (!hitObj.active && hitObj.owner == players[i]) players[i].changeItemCount(hitObj.group.id, -1);
              }
            }
          }
          this.active = false;
          for (var i = 0; i < players.length; ++i) {
            if (this.sentTo[players[i].id]) server.send(players[i].id, "19", this.sid, UTILS.fixTo(shortDist, 1));
          }
        }
      }
    }
  };
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (Projectile, projectiles, players, ais, objectManager, items, config, UTILS, server) {
  this.addProjectile = function (x, y, dir, range, speed, indx, owner, ignoreObj, layer) {
    var tmpData = items.projectiles[indx];
    var tmpProj;
    for (var i = 0; i < projectiles.length; ++i) {
      if (!projectiles[i].active) {
        tmpProj = projectiles[i];
        break;
      }
    }
    if (!tmpProj) {
      tmpProj = new Projectile(players, ais, objectManager, items, config, UTILS, server);
      tmpProj.sid = projectiles.length;
      projectiles.push(tmpProj);
    }
    tmpProj.init(indx, x, y, dir, speed, tmpData.dmg, range, tmpData.scale, owner);
    tmpProj.ignoreObj = ignoreObj;
    tmpProj.layer = layer || tmpData.layer;
    tmpProj.src = tmpData.src;
    return tmpProj;
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var REGION_PREFIX = "polyfill:";
var STATIC_REGION_DEFS = [{
  key: "polyfill:frankfurt",
  slug: "frankfurt",
  name: "Frankfurt",
  latitude: 50.1109,
  longitude: 8.6821
}, {
  key: "polyfill:london",
  slug: "london",
  name: "London",
  latitude: 51.5072,
  longitude: -0.1276
}, {
  key: "polyfill:siliconvalley",
  slug: "siliconvalley",
  name: "Silicon Valley",
  latitude: 37.3875,
  longitude: -122.0575
}, {
  key: "polyfill:miami",
  slug: "miami",
  name: "Miami",
  latitude: 25.7617,
  longitude: -80.1918
}, {
  key: "polyfill:sydney",
  slug: "sydney",
  name: "Sydney",
  latitude: -33.8688,
  longitude: 151.2093
}, {
  key: "polyfill:singapore",
  slug: "singapore",
  name: "Singapore",
  latitude: 1.3521,
  longitude: 103.8198
}];
var STATIC_SERVER_DEFS = [{
  regionKey: "polyfill:frankfurt",
  code: "YZ",
  ping: 85,
  players: 0
}, {
  regionKey: "polyfill:london",
  code: "XJ",
  ping: 154,
  players: 1
}, {
  regionKey: "polyfill:siliconvalley",
  code: "AR",
  ping: 389,
  players: 0
}, {
  regionKey: "polyfill:miami",
  code: "UY",
  ping: 299,
  players: 0
}, {
  regionKey: "polyfill:sydney",
  code: "KN",
  ping: 1061,
  players: 0
}, {
  regionKey: "polyfill:singapore",
  code: "ZB",
  ping: 417,
  players: 0
}];
var STATIC_REGION_INFO = buildRegionInfo(STATIC_REGION_DEFS);
var REGION_SLUG_TO_KEY = buildSlugIndex(STATIC_REGION_DEFS);

/**
 * Tiny server manager polyfill that exposes a static list of fake servers. The
 * client code only needs a structure to render the server browser and a way to
 * initialise a connection, so we keep everything in-memory with zero network
 * calls or dynamic discovery.
 */
function ServerManagerPolyfill(baseUrl, devPort, lobbySize) {
  this.baseUrl = baseUrl;
  this.devPort = devPort;
  this.lobbySize = lobbySize || 50;
  this.debugLog = false;
  this.isPolyfill = true;
  this.servers = {};
  this.server = undefined;
  this.gameIndex = 0;
  this.callback = undefined;
  this.errorCallback = undefined;
  this.regionInfo = STATIC_REGION_INFO;
  this.regionSlugLookup = REGION_SLUG_TO_KEY;
}
ServerManagerPolyfill.prototype.start = function (callback, errorCallback) {
  this.callback = callback;
  this.errorCallback = errorCallback;
  this.servers = buildStaticServerMap(this.lobbySize);
  var regionKeys = Object.keys(this.servers);
  if (regionKeys.length === 0) {
    if (typeof this.errorCallback === "function") {
      this.errorCallback("No polyfill servers configured.");
    }
    return;
  }
  var firstRegion = regionKeys[0];
  var firstServer = this.servers[firstRegion] && this.servers[firstRegion][0];
  if (!firstServer) {
    if (typeof this.errorCallback === "function") {
      this.errorCallback("Polyfill server list is empty.");
    }
    return;
  }
  this.server = firstServer;
  this.gameIndex = 0;
  if (typeof this.callback === "function") {
    var _this = this;
    setTimeout(function () {
      _this.callback(_this.serverAddress(firstServer.ip), _this.serverPort(), _this.gameIndex);
    }, 0);
  }
};
ServerManagerPolyfill.prototype.getServerSnapshot = function () {
  return {
    servers: flattenServerMap(this.servers),
    regions: this.regionInfo
  };
};
ServerManagerPolyfill.prototype.processServers = function (serverList) {
  if (!Array.isArray(serverList)) {
    this.servers = {};
    return;
  }
  var serversByRegion = {};
  for (var i = 0; i < serverList.length; i++) {
    var normalised = normaliseServer(serverList[i], this.lobbySize);
    if (!normalised.games.length) continue;
    var regionKey = normalised.region;
    if (!serversByRegion.hasOwnProperty(regionKey)) {
      serversByRegion[regionKey] = [];
    }
    serversByRegion[regionKey].push(normalised);
  }
  for (var region in serversByRegion) {
    if (!serversByRegion.hasOwnProperty(region)) continue;
    serversByRegion[region].sort(function (a, b) {
      var aIndex = typeof a.index === "number" ? a.index : 0;
      var bIndex = typeof b.index === "number" ? b.index : 0;
      return aIndex - bIndex;
    });
  }
  this.servers = serversByRegion;
  if (this.server) {
    var replacement = findMatchingServer(this.servers, this.server);
    if (replacement) {
      this.server = replacement;
    }
  } else {
    var keys = Object.keys(this.servers);
    if (keys.length && this.servers[keys[0]].length) {
      this.server = this.servers[keys[0]][0];
    }
  }
};
ServerManagerPolyfill.prototype.serverAddress = function (ip) {
  if (ip === "127.0.0.1") {
    return window.location.hostname || "127.0.0.1";
  }
  return ip;
};
ServerManagerPolyfill.prototype.serverPort = function () {
  return this.devPort;
};
ServerManagerPolyfill.prototype.stripRegion = function (region) {
  return stripRegionKey(region);
};
ServerManagerPolyfill.prototype.generateHref = function (regionSlug, token, game, password) {
  var href = "/?server=" + regionSlug + ":" + token;
  var numericGame = parseInt(game, 10);
  if (!isNaN(numericGame) && numericGame > 0) {
    href += ":" + numericGame;
  }
  if (password) {
    href += "&password=" + encodeURIComponent(password);
  }
  return href;
};
ServerManagerPolyfill.prototype.switchServer = function (regionSlug, token, game, password) {
  var regionKey = this.regionSlugLookup[regionSlug] || REGION_PREFIX + regionSlug;
  var serverList = this.servers[regionKey] || [];
  var target = findServerByToken(serverList, token);
  if (target) {
    this.server = target;
    var numericGame = parseInt(game, 10);
    this.gameIndex = isNaN(numericGame) ? 0 : numericGame;
  }
  this.switchingServers = true;
  window.location.href = this.generateHref(regionSlug, token, this.gameIndex, password);
};
ServerManagerPolyfill.prototype.log = function () {
  if (this.debugLog) {
    return console.log.apply(console, arguments);
  } else if (console.verbose) {
    return console.verbose.apply(console, arguments);
  }
};
function buildRegionInfo(defs) {
  var info = {};
  for (var i = 0; i < defs.length; i++) {
    var def = defs[i];
    info[def.key] = {
      name: def.name,
      latitude: def.latitude,
      longitude: def.longitude,
      slug: def.slug
    };
  }
  return info;
}
function buildSlugIndex(defs) {
  var index = {};
  for (var i = 0; i < defs.length; i++) {
    index[defs[i].slug] = defs[i].key;
  }
  return index;
}
function buildStaticServerMap(maxPlayers) {
  var map = {};
  var perRegionCounts = {};
  for (var i = 0; i < STATIC_SERVER_DEFS.length; i++) {
    var def = STATIC_SERVER_DEFS[i];
    var regionKey = def.regionKey;
    if (!perRegionCounts.hasOwnProperty(regionKey)) {
      perRegionCounts[regionKey] = 0;
    }
    var index = perRegionCounts[regionKey]++;
    var regionInfo = STATIC_REGION_INFO[regionKey];
    var server = {
      region: regionKey,
      index: index,
      slug: regionInfo ? regionInfo.slug : stripRegionKey(regionKey),
      code: def.code,
      ping: def.ping,
      ip: def.ip || "127.0.0.1",
      scheme: "polyfill",
      games: [{
        playerCount: clampPlayers(def.players, maxPlayers),
        isPrivate: false
      }],
      lobbySpread: 1
    };
    if (!map.hasOwnProperty(regionKey)) {
      map[regionKey] = [];
    }
    map[regionKey].push(server);
  }
  return map;
}
function normaliseServer(server, maxPlayers) {
  var regionKey = typeof server.region === "string" ? server.region : "";
  var slug = typeof server.slug === "string" ? server.slug : stripRegionKey(regionKey);
  var code = server.code !== undefined ? String(server.code) : String(server.index || 0);
  var games = [];
  if (Array.isArray(server.games)) {
    for (var i = 0; i < server.games.length; i++) {
      var game = server.games[i];
      if (!game) continue;
      var count = clampPlayers(game.playerCount, maxPlayers);
      games.push({
        playerCount: count,
        isPrivate: !!game.isPrivate
      });
    }
  }
  return {
    region: regionKey,
    index: typeof server.index === "number" ? server.index : parseInt(server.index, 10) || 0,
    slug: slug,
    code: code,
    ping: typeof server.ping === "number" ? Math.max(0, Math.round(server.ping)) : undefined,
    ip: server.ip || "127.0.0.1",
    scheme: server.scheme || "polyfill",
    games: games,
    lobbySpread: server.lobbySpread || 1
  };
}
function clampPlayers(count, maxPlayers) {
  var numeric = typeof count === "number" ? count : parseInt(count, 10);
  if (isNaN(numeric)) numeric = 0;
  numeric = Math.max(0, numeric);
  if (typeof maxPlayers === "number" && maxPlayers >= 0) {
    numeric = Math.min(numeric, maxPlayers);
  }
  return Math.round(numeric);
}
function flattenServerMap(serverMap) {
  var list = [];
  for (var region in serverMap) {
    if (!serverMap.hasOwnProperty(region)) continue;
    var servers = serverMap[region];
    for (var i = 0; i < servers.length; i++) {
      list.push(cloneServer(servers[i]));
    }
  }
  return list;
}
function cloneServer(server) {
  return {
    region: server.region,
    index: server.index,
    slug: server.slug,
    code: server.code,
    ping: server.ping,
    ip: server.ip,
    scheme: server.scheme,
    games: server.games.map(function (game) {
      return {
        playerCount: game.playerCount,
        isPrivate: game.isPrivate
      };
    }),
    lobbySpread: server.lobbySpread
  };
}
function findMatchingServer(serversByRegion, previousServer) {
  var regionServers = serversByRegion[previousServer.region] || [];
  var token = previousServer.code !== undefined ? String(previousServer.code) : String(previousServer.index);
  for (var i = 0; i < regionServers.length; i++) {
    var candidate = regionServers[i];
    var candidateToken = candidate.code !== undefined ? String(candidate.code) : String(candidate.index);
    if (candidateToken === token) {
      return candidate;
    }
  }
  return regionServers[0];
}
function findServerByToken(serverList, token) {
  if (!Array.isArray(serverList) || serverList.length === 0) return undefined;
  var desired = token !== undefined ? String(token) : undefined;
  if (desired === undefined || desired === "") {
    return serverList[0];
  }
  for (var i = 0; i < serverList.length; i++) {
    var candidate = serverList[i];
    var candidateToken = candidate.code !== undefined ? String(candidate.code) : String(candidate.index);
    if (candidateToken === desired) {
      return candidate;
    }
  }
  return serverList[0];
}
function stripRegionKey(region) {
  if (typeof region !== "string") return region;
  if (region.indexOf(REGION_PREFIX) === 0) {
    return region.slice(REGION_PREFIX.length);
  }
  return region;
}
module.exports = ServerManagerPolyfill;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (ais, AI, players, items, objectManager, config, UTILS, scoreCallback, server) {
  this.aiTypes = [{
    id: 0,
    src: "cow_1",
    killScore: 150,
    health: 500,
    weightM: 0.8,
    speed: 0.00095,
    turnSpeed: 0.001,
    scale: 72,
    drop: ["food", 50]
  }, {
    id: 1,
    src: "pig_1",
    killScore: 200,
    health: 800,
    weightM: 0.6,
    speed: 0.00085,
    turnSpeed: 0.001,
    scale: 72,
    drop: ["food", 80]
  }, {
    id: 2,
    name: "Bull",
    src: "bull_2",
    hostile: true,
    dmg: 20,
    killScore: 1000,
    health: 1800,
    weightM: 0.5,
    speed: 0.00094,
    turnSpeed: 0.00074,
    scale: 78,
    viewRange: 800,
    chargePlayer: true,
    drop: ["food", 100]
  }, {
    id: 3,
    name: "Bully",
    src: "bull_1",
    hostile: true,
    dmg: 20,
    killScore: 2000,
    health: 2800,
    weightM: 0.45,
    speed: 0.001,
    turnSpeed: 0.0008,
    scale: 90,
    viewRange: 900,
    chargePlayer: true,
    drop: ["food", 400]
  }, {
    id: 4,
    name: "Wolf",
    src: "wolf_1",
    hostile: true,
    dmg: 8,
    killScore: 500,
    health: 300,
    weightM: 0.45,
    speed: 0.001,
    turnSpeed: 0.002,
    scale: 84,
    viewRange: 800,
    chargePlayer: true,
    drop: ["food", 200]
  }, {
    id: 5,
    name: "Quack",
    src: "chicken_1",
    dmg: 8,
    killScore: 2000,
    noTrap: true,
    health: 300,
    weightM: 0.2,
    speed: 0.0018,
    turnSpeed: 0.006,
    scale: 70,
    drop: ["food", 100]
  }, {
    id: 6,
    name: "MOOSTAFA",
    nameScale: 50,
    src: "enemy",
    hostile: true,
    dontRun: true,
    fixedSpawn: true,
    spawnDelay: 60000,
    noTrap: true,
    colDmg: 100,
    dmg: 40,
    killScore: 8000,
    health: 18000,
    weightM: 0.4,
    speed: 0.0007,
    turnSpeed: 0.01,
    scale: 80,
    spriteMlt: 1.8,
    leapForce: 0.9,
    viewRange: 1000,
    hitRange: 210,
    hitDelay: 1000,
    chargePlayer: true,
    drop: ["food", 100]
  }, {
    id: 7,
    name: "Treasure",
    hostile: true,
    nameScale: 35,
    src: "crate_1",
    fixedSpawn: true,
    spawnDelay: 120000,
    colDmg: 200,
    killScore: 5000,
    health: 20000,
    weightM: 0.1,
    speed: 0.0,
    turnSpeed: 0.0,
    scale: 70,
    spriteMlt: 1.0
  }, {
    id: 8,
    name: "MOOFIE",
    src: "wolf_2",
    hostile: true,
    fixedSpawn: true,
    dontRun: true,
    hitScare: 4,
    spawnDelay: 30000,
    noTrap: true,
    nameScale: 35,
    dmg: 10,
    colDmg: 100,
    killScore: 3000,
    health: 7000,
    weightM: 0.45,
    speed: 0.0015,
    turnSpeed: 0.002,
    scale: 90,
    viewRange: 800,
    chargePlayer: true,
    drop: ["food", 1000]
  }];
  this.spawn = function (x, y, dir, index) {
    var tmpObj;
    for (var i = 0; i < ais.length; ++i) {
      if (!ais[i].active) {
        tmpObj = ais[i];
        break;
      }
    }
    if (!tmpObj) {
      tmpObj = new AI(ais.length, objectManager, players, items, UTILS, config, scoreCallback, server);
      ais.push(tmpObj);
    }
    tmpObj.init(x, y, dir, index, this.aiTypes[index]);
    return tmpObj;
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var PI2 = Math.PI * 2;
module.exports = function (sid, objectManager, players, items, UTILS, config, scoreCallback, server) {
  this.sid = sid;
  this.isAI = true;
  this.nameIndex = UTILS.randInt(0, config.cowNames.length - 1);
  this.init = function (x, y, dir, index, data) {
    this.x = x;
    this.y = y;
    this.startX = data.fixedSpawn ? x : null;
    this.startY = data.fixedSpawn ? y : null;
    this.xVel = 0;
    this.yVel = 0;
    this.zIndex = 0;
    this.dir = dir;
    this.dirPlus = 0;
    this.index = index;
    this.src = data.src;
    if (data.name) this.name = data.name;
    this.weightM = data.weightM;
    this.speed = data.speed;
    this.killScore = data.killScore;
    this.turnSpeed = data.turnSpeed;
    this.scale = data.scale;
    this.maxHealth = data.health;
    this.leapForce = data.leapForce;
    this.health = this.maxHealth;
    this.chargePlayer = data.chargePlayer;
    this.viewRange = data.viewRange;
    this.drop = data.drop;
    this.dmg = data.dmg;
    this.hostile = data.hostile;
    this.dontRun = data.dontRun;
    this.hitRange = data.hitRange;
    this.hitDelay = data.hitDelay;
    this.hitScare = data.hitScare;
    this.spriteMlt = data.spriteMlt;
    this.nameScale = data.nameScale;
    this.colDmg = data.colDmg;
    this.noTrap = data.noTrap;
    this.spawnDelay = data.spawnDelay;
    this.hitWait = 0;
    this.waitCount = 1000;
    this.moveCount = 0;
    this.targetDir = 0;
    this.active = true;
    this.alive = true;
    this.runFrom = null;
    this.chargeTarget = null;
    this.dmgOverTime = {};
  };
  var timerCount = 0;
  this.update = function (delta) {
    if (this.active) {
      if (this.spawnCounter) {
        this.spawnCounter -= delta;
        if (this.spawnCounter <= 0) {
          this.spawnCounter = 0;
          this.x = this.startX || UTILS.randInt(0, config.mapScale);
          this.y = this.startY || UTILS.randInt(0, config.mapScale);
        }
        return;
      }
      timerCount -= delta;
      if (timerCount <= 0) {
        if (this.dmgOverTime.dmg) {
          this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer);
          this.dmgOverTime.time -= 1;
          if (this.dmgOverTime.time <= 0) this.dmgOverTime.dmg = 0;
        }
        timerCount = 1000;
      }
      var charging = false;
      var slowMlt = 1;
      if (!this.zIndex && !this.lockMove && this.y >= config.mapScale / 2 - config.riverWidth / 2 && this.y <= config.mapScale / 2 + config.riverWidth / 2) {
        slowMlt = 0.33;
        this.xVel += config.waterCurrent * delta;
      }
      if (this.lockMove) {
        this.xVel = 0;
        this.yVel = 0;
      } else if (this.waitCount > 0) {
        this.waitCount -= delta;
        if (this.waitCount <= 0) {
          if (this.chargePlayer) {
            var tmpPlayer, bestDst, tmpDist;
            for (var i = 0; i < players.length; ++i) {
              if (players[i].alive && !(players[i].skin && players[i].skin.bullRepel)) {
                tmpDist = UTILS.getDistance(this.x, this.y, players[i].x, players[i].y);
                if (tmpDist <= this.viewRange && (!tmpPlayer || tmpDist < bestDst)) {
                  bestDst = tmpDist;
                  tmpPlayer = players[i];
                }
              }
            }
            if (tmpPlayer) {
              this.chargeTarget = tmpPlayer;
              this.moveCount = UTILS.randInt(8000, 12000);
            } else {
              this.moveCount = UTILS.randInt(1000, 2000);
              this.targetDir = UTILS.randFloat(-Math.PI, Math.PI);
            }
          } else {
            this.moveCount = UTILS.randInt(4000, 10000);
            this.targetDir = UTILS.randFloat(-Math.PI, Math.PI);
          }
        }
      } else if (this.moveCount > 0) {
        var tmpSpd = this.speed * slowMlt;
        if (this.runFrom && this.runFrom.active && !(this.runFrom.isPlayer && !this.runFrom.alive)) {
          this.targetDir = UTILS.getDirection(this.x, this.y, this.runFrom.x, this.runFrom.y);
          tmpSpd *= 1.42;
        } else if (this.chargeTarget && this.chargeTarget.alive) {
          this.targetDir = UTILS.getDirection(this.chargeTarget.x, this.chargeTarget.y, this.x, this.y);
          tmpSpd *= 1.75;
          charging = true;
        }
        if (this.hitWait) {
          tmpSpd *= 0.3;
        }
        if (this.dir != this.targetDir) {
          this.dir %= PI2;
          var netAngle = (this.dir - this.targetDir + PI2) % PI2;
          var amnt = Math.min(Math.abs(netAngle - PI2), netAngle, this.turnSpeed * delta);
          var sign = netAngle - Math.PI >= 0 ? 1 : -1;
          this.dir += sign * amnt + PI2;
        }
        this.dir %= PI2;
        this.xVel += tmpSpd * delta * Math.cos(this.dir);
        this.yVel += tmpSpd * delta * Math.sin(this.dir);
        this.moveCount -= delta;
        if (this.moveCount <= 0) {
          this.runFrom = null;
          this.chargeTarget = null;
          this.waitCount = this.hostile ? 1500 : UTILS.randInt(1500, 6000);
        }
      }
      this.zIndex = 0;
      this.lockMove = false;
      var tmpList;
      var tmpSpeed = UTILS.getDistance(0, 0, this.xVel * delta, this.yVel * delta);
      var depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)));
      var tMlt = 1 / depth;
      for (var i = 0; i < depth; ++i) {
        if (this.xVel) this.x += this.xVel * delta * tMlt;
        if (this.yVel) this.y += this.yVel * delta * tMlt;
        tmpList = objectManager.getGridArrays(this.x, this.y, this.scale);
        for (var x = 0; x < tmpList.length; ++x) {
          for (var y = 0; y < tmpList[x].length; ++y) {
            if (tmpList[x][y].active) objectManager.checkCollision(this, tmpList[x][y], tMlt);
          }
        }
      }
      var hitting = false;
      if (this.hitWait > 0) {
        this.hitWait -= delta;
        if (this.hitWait <= 0) {
          hitting = true;
          this.hitWait = 0;
          if (this.leapForce && !UTILS.randInt(0, 2)) {
            this.xVel += this.leapForce * Math.cos(this.dir);
            this.yVel += this.leapForce * Math.sin(this.dir);
          }
          var tmpList = objectManager.getGridArrays(this.x, this.y, this.hitRange);
          var tmpObj, tmpDst;
          for (var t = 0; t < tmpList.length; ++t) {
            for (var x = 0; x < tmpList[t].length; ++x) {
              tmpObj = tmpList[t][x];
              if (tmpObj.health) {
                tmpDst = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y);
                if (tmpDst < tmpObj.scale + this.hitRange) {
                  if (tmpObj.changeHealth(-this.dmg * 5)) objectManager.disableObj(tmpObj);
                  objectManager.hitObj(tmpObj, UTILS.getDirection(this.x, this.y, tmpObj.x, tmpObj.y));
                }
              }
            }
          }
          for (var x = 0; x < players.length; ++x) {
            if (players[x].canSee(this)) {
              server.send(players[x].id, "aa", this.sid);
            }
          }
        }
      }
      if (charging || hitting) {
        var tmpObj, tmpDst, tmpDir;
        for (var i = 0; i < players.length; ++i) {
          tmpObj = players[i];
          if (tmpObj && tmpObj.alive) {
            tmpDst = UTILS.getDistance(this.x, this.y, tmpObj.x, tmpObj.y);
            if (this.hitRange) {
              if (!this.hitWait && tmpDst <= this.hitRange + tmpObj.scale) {
                if (hitting) {
                  tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y);
                  tmpObj.changeHealth(-this.dmg);
                  tmpObj.xVel += 0.6 * Math.cos(tmpDir);
                  tmpObj.yVel += 0.6 * Math.sin(tmpDir);
                  this.runFrom = null;
                  this.chargeTarget = null;
                  this.waitCount = 3000;
                  this.hitWait = !UTILS.randInt(0, 2) ? 600 : 0;
                } else this.hitWait = this.hitDelay;
              }
            } else if (tmpDst <= this.scale + tmpObj.scale) {
              tmpDir = UTILS.getDirection(tmpObj.x, tmpObj.y, this.x, this.y);
              tmpObj.changeHealth(-this.dmg);
              tmpObj.xVel += 0.55 * Math.cos(tmpDir);
              tmpObj.yVel += 0.55 * Math.sin(tmpDir);
            }
          }
        }
      }
      if (this.xVel) this.xVel *= Math.pow(config.playerDecel, delta);
      if (this.yVel) this.yVel *= Math.pow(config.playerDecel, delta);
      var tmpScale = this.scale;
      if (this.x - tmpScale < 0) {
        this.x = tmpScale;
        this.xVel = 0;
      } else if (this.x + tmpScale > config.mapScale) {
        this.x = config.mapScale - tmpScale;
        this.xVel = 0;
      }
      if (this.y - tmpScale < 0) {
        this.y = tmpScale;
        this.yVel = 0;
      } else if (this.y + tmpScale > config.mapScale) {
        this.y = config.mapScale - tmpScale;
        this.yVel = 0;
      }
    }
  };
  this.canSee = function (other) {
    if (!other) return false;
    if (other.skin && other.skin.invisTimer && other.noMovTimer >= other.skin.invisTimer) return false;
    var dx = Math.abs(other.x - this.x) - other.scale;
    var dy = Math.abs(other.y - this.y) - other.scale;
    return dx <= config.maxScreenWidth / 2 * 1.3 && dy <= config.maxScreenHeight / 2 * 1.3;
  };
  var tmpRatio = 0;
  var animIndex = 0;
  this.animate = function (delta) {
    if (this.animTime > 0) {
      this.animTime -= delta;
      if (this.animTime <= 0) {
        this.animTime = 0;
        this.dirPlus = 0;
        tmpRatio = 0;
        animIndex = 0;
      } else {
        if (animIndex == 0) {
          tmpRatio += delta / (this.animSpeed * config.hitReturnRatio);
          this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.min(1, tmpRatio));
          if (tmpRatio >= 1) {
            tmpRatio = 1;
            animIndex = 1;
          }
        } else {
          tmpRatio -= delta / (this.animSpeed * (1 - config.hitReturnRatio));
          this.dirPlus = UTILS.lerp(0, this.targetAngle, Math.max(0, tmpRatio));
        }
      }
    }
  };
  this.startAnim = function () {
    this.animTime = this.animSpeed = 600;
    this.targetAngle = Math.PI * 0.8;
    tmpRatio = 0;
    animIndex = 0;
  };
  this.changeHealth = function (val, doer, runFrom) {
    if (this.active) {
      this.health += val;
      if (runFrom) {
        if (this.hitScare && !UTILS.randInt(0, this.hitScare)) {
          this.runFrom = runFrom;
          this.waitCount = 0;
          this.moveCount = 2000;
        } else if (this.hostile && this.chargePlayer && runFrom.isPlayer) {
          this.chargeTarget = runFrom;
          this.waitCount = 0;
          this.moveCount = 8000;
        } else if (!this.dontRun) {
          this.runFrom = runFrom;
          this.waitCount = 0;
          this.moveCount = 2000;
        }
      }
      if (val < 0 && this.hitRange && UTILS.randInt(0, 1)) this.hitWait = 500;
      if (doer && doer.canSee(this) && val < 0) {
        server.send(doer.id, "t", Math.round(this.x), Math.round(this.y), Math.round(-val), 1);
      }
      if (this.health <= 0) {
        if (this.spawnDelay) {
          this.spawnCounter = this.spawnDelay;
          this.x = -1000000;
          this.y = -1000000;
        } else {
          this.x = this.startX || UTILS.randInt(0, config.mapScale);
          this.y = this.startY || UTILS.randInt(0, config.mapScale);
        }
        this.health = this.maxHealth;
        this.runFrom = null;
        if (doer) {
          scoreCallback(doer, this.killScore);
          if (this.drop) {
            for (var i = 0; i < this.drop.length;) {
              doer.addResource(config.resourceTypes.indexOf(this.drop[i]), this.drop[i + 1]);
              i += 2;
            }
          }
        }
      }
    }
  };
};

/***/ })
/******/ ]);