import e from "express";

import path from "node:path";

import fs from "node:fs";

import uWS from "uWebSockets.js";

import { decode, encode } from "msgpack-lite";

import { Game } from "./moomoo/server.js";

import { Player } from "./moomoo/modules/player.js";

import { items } from "./moomoo/modules/items.js";

import { UTILS } from "./moomoo/libs/utils.js";

import { hats, accessories } from "./moomoo/modules/store.js";

import { filter_chat } from "./moomoo/libs/filterchat.js";

import { config } from "./moomoo/config.js";

import { ConnectionLimit } from "./moomoo/libs/limit.js";

import { fileURLToPath } from "node:url";



const colimit = new ConnectionLimit(4);



const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



const CLIENT_DIST_DIR = path.resolve(__dirname, "../../dist/client");

const INDEX = path.join(CLIENT_DIST_DIR, "index.html");

const PORT = 8080;

const HOST = "localhost";



if (!fs.existsSync(INDEX)) {

    console.warn("[server] Client build not found. Run `npm run build --workspace client` first.");

}



const game = new Game;



game.onmessage = (ws, message, isFake) => {

    const player = ws.player;

    if (!player) return;



    try {
        let type, data;

        if (!isFake) {
            const msg = Buffer.from(message);
            [type, data] = JSON.parse(msg.toString('utf8'));
        } else {
            type = message[0];
            data = message[1]
        }

        const t = type?.toString();



        switch (t) {

            case "sp": {

                if (player.alive) {

                    break;

                }



                player.setUserData(data[0]);

                player.spawn(data[0]?.moofoll);

                player.send("1", player.sid);

                setTimeout(() => {

                    for (let age = 0; age < 9; age += 1) player.earnXP(1e8)

                    let set = [5, 18, 32, 24, 10, 34];

                    set.forEach(id => {
                        game.onmessage(player.socket, ["6", [id]], true);
                    });

                }, 111);



                break;

            }

            case "33": {

                if (!player.alive) {

                    break;

                }



                if (!(data[0] === undefined || data[0] === null) && !UTILS.isNumber(data[0])) break;



                player.moveDir = data[0];

                break;

            }

            case "c": {

                if (!player.alive) {

                    break;

                }



                player.mouseState = data[0];

                if (data[0] && player.buildIndex === -1) {

                    player.hits++;

                }



                if (UTILS.isNumber(data[1])) {

                    player.dir = data[1];

                }



                if (player.buildIndex >= 0) {

                    const item = items.list[player.buildIndex];

                    if (data[0]) {

                        player.packet_spam++;



                        if (player.packet_spam >= 10000) {

                            if (player.socket) {

                                player.socket.close();

                                player.socket = null;

                            }

                        }



                        player.buildItem(item);

                    }

                    player.mouseState = 0;

                    player.hits = 0;

                }

                break;

            }

            case "7": {

                if (!player.alive) {

                    break;

                }

                if (data[0]) {

                    player.autoGather = !player.autoGather;

                }

                break;

            }

            case "2": {

                if (!player.alive) {

                    break;

                }



                if (!UTILS.isNumber(data[0])) break;



                player.dir = data[0];

                break;

            }

            case "5": {

                if (!player.alive) {

                    break;

                }



                if (!UTILS.isNumber(data[0])) {

                    break;

                }



                if (data[1]) {

                    const wpn = items.weapons[data[0]];



                    if (!wpn) {

                        break;

                    }



                    if (player.weapons[wpn.type] !== data[0]) {

                        break;

                    }



                    player.buildIndex = -1;

                    player.weaponIndex = data[0];

                    break;

                }



                const item = items.list[data[0]];



                if (!item) {

                    break;

                }



                if (player.buildIndex === data[0]) {

                    player.buildIndex = -1;

                    player.mouseState = 0;

                    break;

                }



                player.buildIndex = data[0];

                player.mouseState = 0;

                break;

            }

            case "13c": {

                if (!player.alive) {

                    break;

                }



                const [type, id, index] = data;



                if (index) {

                    let tail = accessories.find(acc => acc.id == id);



                    if (tail) {

                        if (type) {

                            if (!player.tails[id] && player.points >= tail.price) {

                                player.tails[id] = 1;

                                ws.emit("us", 0, id, 1);

                            }

                        } else {

                            if (player.tails[id]) {

                                player.tail = tail;

                                player.tailIndex = player.tail.id;

                                ws.emit("us", 1, id, 1);

                            }

                        }

                    } else {

                        if (id == 0) {

                            player.tail = {};

                            player.tailIndex = 0;

                            ws.emit("us", 1, 0, 1);

                        }

                    }

                } else {

                    let hat = hats.find(hat => hat.id == id);



                    if (hat) {

                        if (type) {

                            if (!player.skins[id] && player.points >= hat.price) {

                                player.skins[id] = 1;

                                ws.emit("us", 0, id, 0);

                            }

                        } else {

                            if (player.skins[id]) {

                                player.skin = hat;

                                player.skinIndex = player.skin.id;

                                ws.emit("us", 1, id, 0);

                            }

                        }

                    } else {

                        if (id == 0) {

                            player.skin = {};

                            player.skinIndex = 0;

                            ws.emit("us", 1, 0, 0);

                        }

                    }

                }



                break;

            }

            case "6": {

                if (!player.alive) {

                    break;

                }



                if (player.upgradePoints <= 0) break;



                const item = Number.parseInt(data[0]);



                const upgr_items = items.list.filter(x => x.age === player.upgrAge);

                const upgr_weapons = items.weapons.filter(x => x.age === player.upgrAge);



                const update = (() => {

                    if (item < items.weapons.length) {

                        const wpn = upgr_weapons.find(x => x.id === item);



                        if (!wpn) return false;



                        player.weapons[wpn.type] = wpn.id;

                        player.weaponXP[wpn.type] = 0;



                        const type = player.weaponIndex < 9 ? 0 : 1;



                        if (wpn.type === type) {

                            player.weaponIndex = wpn.id;

                        }



                        return true;

                    }



                    const i2 = item - items.weapons.length;



                    if (!upgr_items.some(x => x.id === i2)) return false;



                    player.addItem(i2);



                    return true;

                })();



                if (!update) break;



                player.upgrAge++;

                player.upgradePoints--;



                player.send("17", player.items, 0);

                player.send("17", player.weapons, 1);



                if (player.age >= 0) {

                    player.send("16", player.upgradePoints, player.upgrAge);

                } else {

                    player.send("16", 0, 0);

                }



                break;

            }

            case "tick": {
                game.tick();
            }

            case "ch": {

                if (!player.alive) {

                    break;

                }



                if (player.chat_cooldown > 0) {

                    break;

                }



                if (typeof data[0] !== "string") {

                    break;

                }



                const chat = filter_chat(data[0]);



                if (chat.length === 0) {

                    break;

                }



                game.server.broadcast("ch", player.sid, chat);

                player.chat_cooldown = 300;



                break;

            }

            case "pp": {

                ws.emit("pp");

                break;

            }

            case "8": {

                if (!player.alive) break;



                if (player.team) break;



                if (player.clan_cooldown > 0) break;



                if (typeof data[0] !== "string") break;



                if (data[0].length < 1 || data[0].length > 7) break;



                const _created = game.clan_manager.create(data[0], player);



                break;

            }

            case "9": {

                if (!player.alive) break;



                if (!player.team) break;



                if (player.clan_cooldown > 0) break;



                player.clan_cooldown = 200;



                if (player.is_owner) {

                    game.clan_manager.remove(player.team);

                    break;

                }



                game.clan_manager.kick(player.team, player.sid);

                break;

            }

            case "10": {

                if (!player.alive) break;



                if (player.team) break;



                if (player.clan_cooldown > 0) break;



                player.clan_cooldown = 200;



                game.clan_manager.add_notify(data[0], player.sid);

                break;

            }

            case "11": {

                if (!player.alive) break;



                if (!player.team) break;



                if (player.clan_cooldown > 0) break;



                player.clan_cooldown = 200;



                game.clan_manager.confirm_join(player.team, data[0], data[1]);

                player.notify.delete(data[0]);

                break;

            }

            case "12": {

                if (!player.alive) break;



                if (!player.team) break;



                if (!player.is_owner) break;



                if (player.clan_cooldown > 0) break;



                player.clan_cooldown = 200;



                game.clan_manager.kick(player.team, data[0]);

                break;

            }

            case "14": {

                if (!player.alive) break;



                if (player.ping_cooldown > 0) break;



                player.ping_cooldown = config.mapPingTime;



                game.server.broadcast("p", player.x, player.y);



                break;

            }

            case "rmd": {

                if (!player.alive) break;



                player.resetMoveDir();



                break;

            }

            default:

                break;

        }

    } catch (e) {

        console.error(e);

    }

}



const getMimeType = (filePath) => {

    const ext = path.extname(filePath).toLowerCase();

    const mimeTypes = {

        '.html': 'text/html',

        '.js': 'application/javascript',

        '.mjs': 'application/javascript',

        '.css': 'text/css',

        '.json': 'application/json',

        '.png': 'image/png',

        '.jpg': 'image/jpeg',

        '.jpeg': 'image/jpeg',

        '.gif': 'image/gif',

        '.svg': 'image/svg+xml',

        '.ico': 'image/x-icon',

        '.wasm': 'application/wasm'

    };

    return mimeTypes[ext] || 'application/octet-stream';

};



const app = uWS.App();



app.get("/", (res, req) => {

    res.writeHeader("Content-Type", "text/html");

    res.end(fs.readFileSync(INDEX));

});



app.get("/ping", (res, req) => {

    res.writeHeader("Content-Type", "text/plain");

    res.end("Ok");

});



app.get("/*", (res, req) => {

    const url = req.getUrl();

    const filePath = path.join(CLIENT_DIST_DIR, url);



    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {

        const mimeType = getMimeType(filePath);

        res.writeHeader("Content-Type", mimeType);

        res.end(fs.readFileSync(filePath));

    } else {

        res.writeStatus("404 Not Found");

        res.end("Not Found");

    }

});



app.ws("/*", {

    maxPayloadLength: 16 * 1024,

    idleTimeout: 60,



    open: (ws) => {

        if (game.players.length > config.maxPlayersHard) {

            ws.close();

            return;

        }



        const addr = ws.getRemoteAddressAsText();



        if (colimit.check(addr)) {

            ws.close();

            return;

        }



        colimit.up(addr);



        const player = game.addPlayer(ws);

        ws.player = player;



        const emit = async (type, ...data) => {

            if (!player.socket) return;

            ws.send(JSON.stringify([type, data]));

        };



        ws.emit = emit;

    },



    message: game.onmessage,



    close: (ws, code, message) => {

        const player = ws.player;

        if (!player) return;



        //const addr = ws.getRemoteAddressAsText();

        //colimit.down(addr);



        if (player.team) {

            if (player.is_owner) {

                game.clan_manager.remove(player.team);

            } else {

                game.clan_manager.kick(player.team, player.sid);

            }

        }



        game.removePlayer(player.id);

    }

});



app.listen(HOST, PORT, (token) => {

    if (token) {

        console.log(`Server listening at http://${HOST}:${PORT}`);

    } else {

        console.error("Failed to start server");

    }

});



setInterval(game.tick, 1e3 / 9);
let bots = [];

for (let i = 0; i < 80; i++) {
    let socket = { send: function () { }, close: function () { }, emit: function () { } }

    socket.auto = (data) => { game.onmessage(socket, data, true); };

    const bot = game.addPlayer(socket);
    bot.isBot = true;

    socket.player = bot;


    bots.push(bot);

    game.onmessage(bot.socket, ["sp", [{ "name": `Bot[${i}]`, "moofoll": null, "skin": Math.floor(Math.random() * 10) }]], true);
}

setInterval(() => {
    for (let bot of bots) {
        const correct_spike = (item, aim = getAttackDir(), trap = null) => {
                if (!item) return null

                const rng = 35 + item.scale + (item.placeOffset || 0);
                const arcs = [];

                game.game_objects.forEach(b => {
                    if (!b.active || b.sid >= 1e15) return;

                    const size = b.id === 15 ? 50 : (b.blocker || b.getScale(0.6, false));
                    const lim = item.scale + size;
                    const dist = UTILS.getDistance(bot.x, bot.y, b.x, b.y);

                    if (dist < rng + lim && dist > Math.abs(rng - lim)) {
                        const spread = Math.acos(Math.min(1, Math.max(-1, (rng ** 2 + dist ** 2 - lim ** 2) / (2 * rng * dist))));
                        const mid = Math.atan2(b.y - bot.y, b.x - bot.x);

                        arcs.push({ mid, min: mid - spread, max: mid + spread, span: spread, building: b });
                    }
                });

                const bad = (ang) => arcs.some(a => Math.abs(UTILS.getAngleDist(ang, a.mid)) < a.span);

                let list = [aim];
                arcs.forEach(a => list.push(a.min - 0.01, a.max + 0.01));

                list = list.filter(a => !bad(a));

                const isSpike = [6, 7, 8, 9].includes(item.id);

                if (isSpike && trap) {
                    list = list.filter(angle => {
                        const sX = bot.x + rng * Math.cos(angle);
                        const sY = bot.y + rng * Math.sin(angle);

                        const distToTrap = UTILS.getDistance(sX, sY, trap.x, trap.y);
                        const trapSize = 50;
                        const idealTrapDist = item.scale + trapSize;

                        const isTouchingTrap = Math.abs(distToTrap - idealTrapDist) < 20;

                        if (!isTouchingTrap) return false;

                        for (let b of game.game_objects) {
                            if (!b.active || b.sid >= 1e15) continue;
                            if (b.sid === trap.sid) continue;

                            if ([6, 7, 8, 9].includes(b.id)) {
                                const distToSpike = UTILS.getDistance(sX, sY, b.x, b.y);
                                const spikeSize = b.blocker || b.getScale(0.6, false);
                                const idealSpikeDist = item.scale + spikeSize;

                                if (Math.abs(distToSpike - idealSpikeDist) < 20) {
                                    return false;
                                }
                            }
                        }
                        return true;
                    });
                }

                list.sort((a, b) => {
                    if (isSpike && trap) {
                        const getScore = (angle) => {
                            const sX = bot.x + rng * Math.cos(angle);
                            const sY = bot.y + rng * Math.sin(angle);

                            const distToTrap = UTILS.getDistance(sX, sY, trap.x, trap.y);

                            const trapSize = 50;
                            const spikeSize = item.scale;
                            const idealDist = trapSize + spikeSize;

                            if (Math.abs(distToTrap - idealDist) > 20) return -1000000;

                            let score = 0;
                            score -= Math.abs(distToTrap - idealDist) * 1000;

                            if (target) {
                                const trapToEnemy = Math.atan2(target.y - trap.y, target.x - trap.x);
                                const trapToSpike = Math.atan2(sY - trap.y, sX - trap.x);
                                const angleDiff = Math.abs(UTILS.getAngleDist(trapToEnemy, trapToSpike));

                                if (angleDiff < Math.PI / 4) score += 500;
                            }

                            return score;
                        };

                        return getScore(b) - getScore(a);
                    }

                    return Math.abs(UTILS.getAngleDist(aim, a)) - Math.abs(UTILS.getAngleDist(aim, b));
                });

                return {
                    isPerfect: !bad(aim),
                    correction: list[0] !== undefined ? list[0] : aim,
                    rawAngle: aim,
                    pDist: rng,
                    item,
                    arcs
                };
            };

        function build(id, angle = 0, repeat = 1, skip) {
                    let group = items.list[id]?.group.id;
                    if(group === undefined) return;

                    let passed;
                    let is_food = passed = id <= 2;
                    if(!is_food) {
                        let item = items.list[id];
                        let canBuild = passed = skip || bot.tryBuild(item, angle);
                    }

                    if(passed) {
                        while(repeat > 0) {
                            repeat -= 1;

                            game.onmessage(bot.socket, ["5", [id, null]], true);
                            game.onmessage(bot.socket, ["c", [1, angle]], true);
                game.onmessage(bot.socket, ["c", [0, angle]], true);
                        }
                    };
                }  
                function move(angle) {
                    game.onmessage(bot.socket, ["33", [angle]], true);
                } 
        function consume() {
            let amount = (100 - bot.health) / (bot.items[0] === 0 ? 20 : 40)
            for (let i = 0; i < amount; i += 1) {
                game.onmessage(bot.socket, ["5", [bot.items[0], null]], true);
                game.onmessage(bot.socket, ["c", [1, null]], true);
                game.onmessage(bot.socket, ["c", [0, null]], true);
            }
        }

        if (bot.health < 100 && Date.now() - bot.hitTime >= 0) consume();
  /*      let targets = game.players.filter(p => p.alive && !p.isBot && p.sid !== bot.sid && (!bot.team || p.team !== bot.team)).sort((obj, obj2) => {
                    const dist = [UTILS.getDistance(bot.x2, bot.y2, obj.x2, obj.y2), UTILS.getDistance(bot.x2, bot.y2, obj2.x2, obj2.y2)];
                    return (dist[0] - dist[1]);
                }),
            target = targets.length ? targets[0] : null;

        if (!target) return

        for (let target of targets) {
            let dist = UTILS.getDistance(target.x, target.y, bot.x, bot.y),
            angle = UTILS.getDirection(target.x, target.y, bot.x, bot.y);
            if (dist <= 245 && target.items[4] === 15) { /* auto trap 
                const willTrap = (angle) => {
                    let trap = { x: bot.x + Math.cos(angle) * 85, y: bot.y + Math.sin(angle) * 85 };

                    return UTILS.getDistance(target.x, target.y, trap.x, trap.y) <= 50;
                }

                let item = items.list[bot.items[4]];

                for (let dir = 0; dir < Math.PI; dir += Math.PI / 20) {
                    let canBuild = [bot.tryBuild(item, angle + dir), bot.tryBuild(item, angle - dir)];

                    if (canBuild[0] && willTrap(angle + dir)) {
                       // build(bot.items[4], angle + dir, 1, true);

                        dir += 5;
                    } else if (canBuild[1] && willTrap(angle - dir)) {
                       // build(bot.items[4], angle - dir, 1, true);

                        dir += 5;
                    }
                }
            }

            let traps = game.game_objects.filter(c =>c.active && c.isItem && c.id === 15 && (c.owner.sid === bot.sid || bot.team && c.owner.team === bot.team) && UTILS.getDistance(c.x, c.y, target.x, target.y) <= 50);

                for (let trap of traps) { /* auto spike 
                    let item = items.list[bot.items[2]];

                    let posDist = 35 + item.scale + (item.placeOffset || 0);
                    let distToTrap = UTILS.getDistance(trap.x, trap.y, bot.x, bot.y);

                    let inDistance = (distToTrap - 50 - posDist) < 0;

                    let spike = game.game_objects.find(c =>c.active && c.isItem && (c.owner.sid === bot.sid || bot.team && c.owner.team === bot.team) && [6, 7, 8, 9].includes(c.id) &&UTILS.getDistance(c.x, c.y, trap.x, trap.y) <= 50 + c.getScale() + 35);

                    if (!spike && inDistance) {
                        const angleToTrap = UTILS.getDirection(trap.x, trap.y, bot.x, bot.y);
                        const placement = correct_spike(item, angleToTrap, trap);

                       // if (placement && placement.correction !== undefined) build(bot.items[2], placement.correction, 1, true);
                    }
                }
        }

        const getAngle = (n, t) => {
                if(!n || !t) return null
                return Math.atan2((t.y2 || t.y) - (n.y2 || n.y), (t.x2 || t.x) - (n.x2 || n.x));
            }
            const getDistance = (n,r,t,u) => {return Math.sqrt((t-=n)*t+(u-=r)*u)};
        let inPush = false,
                pushPos,
                pushAngle,
                pushOffset,
                Pushing;

                let document = {}
            document.back = 35;
            document.pushAmount = 7;
            document.pushSpot = 20;

            const auto_push = () => {
                const whenStop = () => {
                    if(Pushing) move(null, true);

                    Pushing = false;
                };

                let wasInPush = inPush;

                inPush = false;

                if(!target) return whenStop();
                let Length;
                const trap = (() => {
                    let temp = 0;
                    Length = game.game_objects.length;

                    for(let index2 = 0; index2 < Length; index2 += 1) {
                        const build = game.game_objects[index2];
                        const isTrap = build.active && build.isItem && getDistance(build.x, build.y, target.x,target.y) <= 50 && build.id === 15 && (build.owner.sid === bot.sid || (bot.team && build.owner.team === bot.team))

                        if(isTrap) temp = build;
                    }

                    return temp;
                })();

                if(!trap) return whenStop();

                const spikes = (() => {
                    Length = game.game_objects.length;
                    let temp = [];


                    for(let index = 0; index < Length; index += 1) {
                        const build = game.game_objects[index];
                        const isSpike = build.active && getDistance(build.x, build.y, trap.x, trap.y) <= trap.getScale() + build.getScale() + 70 && build.dmg&& (build.owner.sid < 0 || (build.owner.sid === bot.sid || (bot.team && build.owner.team === bot.team)));

                        if(isSpike) temp.push(build);
                    }

                    Length = temp.length;

                    if(!Length) return false;

                    if(Length > 1) {
                        temp = temp.sort((obj, obj2) => {
                            const distance = [
                                getDistance(trap.x, trap.y, obj.x, obj.y),
                                getDistance(trap.x, trap.y, obj2.x, obj2.y)
                            ];

                            return (distance[0] - distance[1]);
                        });
                    }

                    return temp;
                })();

                if(!spikes.length) return whenStop();

                inPush = true;

                let spike = (() => {
                    if(spikes.length > 1) {
                        const dist = getDistance(spikes[0].x, spikes[0].y, spikes[1].x, spikes[1].y) / 2;
                        const minDist = 35 * 1.5 + spikes[0].getScale() * 2;

                        if(dist * 2 > minDist) return spikes[0];

                        const angle = getAngle(spikes[0], spikes[1]);

                        return {
                            x: spikes[0].x + Math.cos(angle) * dist,
                            y: spikes[0].y + Math.sin(angle) * dist,
                            double: true
                        }
                    } else return spikes[0];
                })();

                const enemyDist = getDistance(spike.x, spike.y, target.x, target.y);

                let angle = getAngle(spike, target);
                let distance = enemyDist + 80;

                pushPos = {
                    x: spike.x + (distance * Math.cos(angle)),
                    y: spike.y + (distance * Math.sin(angle))
                }

                angle = getAngle(bot, pushPos);

                const trapAngle = getAngle(bot, trap);
                const spikeAngle = getAngle(bot, spike);

                const pushSide = trapAngle > spikeAngle ? "right" : "left";

                pushOffset = Math.abs(getAngle(bot, spike) - getAngle(bot, trap));
                pushAngle = getAngle(bot, target);

                const offsetSize = Math.min(0, (enemyDist - (spike.double ? 40 : spike.getScale()) - 35) / 50);
                const offset = pushOffset * (document.pushAmount * offsetSize);

                switch(pushSide) {
                    case "right":
                        pushAngle -= offset;
                        break;

                    case "left":
                        pushAngle += offset;
                        break;
                }

                const distToPush = UTILS.getDistance(pushPos.x, pushPos.y, bot.x, bot.y);

                inPush = distToPush < document.pushSpot;

                if(!wasInPush && inPush) console.log("pushing!")

                const Angles = [angle, pushAngle];

                angle = Angles[Number(inPush)];

                    move(angle);
                    Pushing = true;
            }*/
            //auto_push()
    }
}, 50)