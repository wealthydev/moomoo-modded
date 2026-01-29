var mathFloor = Math.floor;
var mathABS = Math.abs;
var mathCOS = Math.cos;
var mathSIN = Math.sin;
var mathPOW = Math.pow;
var mathSQRT = Math.sqrt;

class QuadTreeNode {
    constructor(x, y, width, height, level, maxLevel) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.level = level;
        this.maxLevel = maxLevel;
        this.objects = [];
        this.nodes = null;
        this.MAX_OBJECTS = 8;
    }

    clear() {
        this.objects.length = 0;
        if (this.nodes) {
            for (var i = 0; i < 4; ++i) {
                this.nodes[i].clear();
            }
            this.nodes = null;
        }
    }

    split() {
        var subWidth = this.width >> 1; 

        var subHeight = this.height >> 1;
        var x = this.x;
        var y = this.y;
        var nextLevel = this.level + 1;

        this.nodes = [
            new QuadTreeNode(x + subWidth, y, subWidth, subHeight, nextLevel, this.maxLevel), 

            new QuadTreeNode(x, y, subWidth, subHeight, nextLevel, this.maxLevel), 

            new QuadTreeNode(x, y + subHeight, subWidth, subHeight, nextLevel, this.maxLevel), 

            new QuadTreeNode(x + subWidth, y + subHeight, subWidth, subHeight, nextLevel, this.maxLevel) 

        ];
    }

    getIndex(obj) {
        var index = -1;
        var verticalMidpoint = this.x + (this.width >> 1);
        var horizontalMidpoint = this.y + (this.height >> 1);

        var topQuadrant = (obj.y - obj.scale < horizontalMidpoint);
        var bottomQuadrant = (obj.y + obj.scale > horizontalMidpoint);
        var leftQuadrant = (obj.x - obj.scale < verticalMidpoint);
        var rightQuadrant = (obj.x + obj.scale > verticalMidpoint);

        if (!topQuadrant && !bottomQuadrant) return -1;
        if (!leftQuadrant && !rightQuadrant) return -1;

        if (topQuadrant && !bottomQuadrant) {
            if (leftQuadrant && !rightQuadrant) index = 1; 

            else if (rightQuadrant && !leftQuadrant) index = 0; 

        } else if (bottomQuadrant && !topQuadrant) {
            if (leftQuadrant && !rightQuadrant) index = 2; 

            else if (rightQuadrant && !leftQuadrant) index = 3; 

        }

        return index;
    }

    insert(obj) {
        if (this.nodes) {
            var index = this.getIndex(obj);
            if (index !== -1) {
                this.nodes[index].insert(obj);
                return;
            }
        }

        this.objects.push(obj);

        if (this.objects.length > this.MAX_OBJECTS && this.level < this.maxLevel) {
            if (!this.nodes) {
                this.split();
            }

            var i = this.objects.length;
            while (i--) {
                var index = this.getIndex(this.objects[i]);
                if (index !== -1) {
                    this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                }
            }
        }
    }

    retrieve(returnObjects, obj) {
        if (this.nodes) {
            var index = this.getIndex(obj);
            if (index !== -1) {
                this.nodes[index].retrieve(returnObjects, obj);
            } else {

                for (var i = 0; i < 4; ++i) {
                    this.nodes[i].retrieve(returnObjects, obj);
                }
            }
        }

        for (var i = 0; i < this.objects.length; ++i) {
            returnObjects.push(this.objects[i]);
        }

        return returnObjects;
    }

    retrieveInBounds(returnObjects, x, y, width, height) {
        if (this.nodes) {
            var verticalMidpoint = this.x + (this.width >> 1);
            var horizontalMidpoint = this.y + (this.height >> 1);

            var top = y < horizontalMidpoint;
            var bottom = y + height > horizontalMidpoint;
            var left = x < verticalMidpoint;
            var right = x + width > verticalMidpoint;

            if (top) {
                if (right) this.nodes[0].retrieveInBounds(returnObjects, x, y, width, height);
                if (left) this.nodes[1].retrieveInBounds(returnObjects, x, y, width, height);
            }
            if (bottom) {
                if (left) this.nodes[2].retrieveInBounds(returnObjects, x, y, width, height);
                if (right) this.nodes[3].retrieveInBounds(returnObjects, x, y, width, height);
            }
        }

        for (var i = 0; i < this.objects.length; ++i) {
            returnObjects.push(this.objects[i]);
        }

        return returnObjects;
    }
}

export class ObjectManager {
    constructor(GameObject, gameObjects, UTILS, config, players, server) {
        this.objects = gameObjects;
        this.grids = {};
        this.updateObjects = [];

        this.quadTree = new QuadTreeNode(0, 0, config.mapScale, config.mapScale, 0, 5);
        this.retrieveBuffer = [];

        this.collisionPairs = new Set();

        var cactusDamage = typeof config.cactusDamage === "number" ? config.cactusDamage : 20;
        var desertStart = typeof config.mapScale === "number" && typeof config.snowBiomeTop === "number" ? 
            config.mapScale - config.snowBiomeTop : null;

        var hashCoords = function(x, y) {
            return ((x & 0xFFFF) << 16) | (y & 0xFFFF);
        };

        var tmpX;
        var tmpY;
        var tmpS = config.mapScale / config.colGrid;

        this.setObjectGrids = function(obj) {

            this.quadTree.insert(obj);

            var objX = Math.min(config.mapScale, Math.max(0, obj.x));
            var objY = Math.min(config.mapScale, Math.max(0, obj.y));

            var startX = mathFloor((objX - obj.scale) / tmpS);
            var endX = mathFloor((objX + obj.scale) / tmpS);
            var startY = mathFloor((objY - obj.scale) / tmpS);
            var endY = mathFloor((objY + obj.scale) / tmpS);

            startX = Math.max(0, Math.min(config.colGrid - 1, startX));
            endX = Math.max(0, Math.min(config.colGrid - 1, endX));
            startY = Math.max(0, Math.min(config.colGrid - 1, startY));
            endY = Math.max(0, Math.min(config.colGrid - 1, endY));

            for (var x = startX; x <= endX; ++x) {
                for (var y = startY; y <= endY; ++y) {
                    var gridKey = x + "_" + y;
                    if (!this.grids[gridKey]) {
                        this.grids[gridKey] = [];
                    }
                    this.grids[gridKey].push(obj);
                    obj.gridLocations.push(gridKey);
                }
            }
        };

        this.removeObjGrid = function(obj) {
            var tmpIndx;
            for (var i = 0; i < obj.gridLocations.length; ++i) {
                if (this.grids[obj.gridLocations[i]]) {
                    tmpIndx = this.grids[obj.gridLocations[i]].indexOf(obj);
                    if (tmpIndx >= 0) {
                        this.grids[obj.gridLocations[i]].splice(tmpIndx, 1);
                    }
                }
            }
        };

        this.rebuildQuadTree = function() {
            this.quadTree.clear();
            for (var i = 0; i < gameObjects.length; ++i) {
                if (gameObjects[i].active) {
                    this.quadTree.insert(gameObjects[i]);
                }
            }
        };

        this.disableObj = function(obj) {
            obj.active = false;

            if (obj.owner && obj.pps) {
                obj.owner.pps -= obj.pps;
            }

            this.removeObjGrid(obj);

            var tmpIndx = this.updateObjects.indexOf(obj);
            if (tmpIndx >= 0) {
                this.updateObjects.splice(tmpIndx, 1);
            }
        };

        this.hitObj = function(tmpObj, tmpDir) {
            for (var p = 0; p < players.length; ++p) {
                if (players[p].active) {
                    if (tmpObj.sentTo[players[p].id]) {
                        if (!tmpObj.active) {
                            server.send(players[p].id, "12", tmpObj.sid);
                        } else if (players[p].canSee(tmpObj)) {
                            server.send(players[p].id, "8", UTILS.fixTo(tmpDir, 1), tmpObj.sid);
                        }
                    }
                    if (!tmpObj.active && tmpObj.owner == players[p]) {
                        players[p].changeItemCount(tmpObj.group.id, -1);
                    }
                }
            }
        };

        this.getNearbyObjects = function(x, y, scale) {
            this.retrieveBuffer.length = 0;
            var queryObj = { x: x, y: y, scale: scale };
            return this.quadTree.retrieve(this.retrieveBuffer, queryObj);
        };

        this.getObjectsInArea = function(x, y, width, height) {
            this.retrieveBuffer.length = 0;
            return this.quadTree.retrieveInBounds(this.retrieveBuffer, x, y, width, height);
        };

        var tmpArray = [];
        var tmpGrid;

        this.getGridArrays = function(xPos, yPos, s) {
            tmpX = mathFloor(xPos / tmpS);
            tmpY = mathFloor(yPos / tmpS);
            tmpArray.length = 0;

            try {
                var gridKey = tmpX + "_" + tmpY;
                if (this.grids[gridKey]) {
                    tmpArray.push(this.grids[gridKey]);
                }

                var checkRight = (xPos + s >= (tmpX + 1) * tmpS) ? 1 : 0;
                var checkLeft = (tmpX && xPos - s <= tmpX * tmpS) ? 1 : 0;
                var checkBottom = (yPos + s >= (tmpY + 1) * tmpS) ? 1 : 0;
                var checkTop = (tmpY && yPos - s <= tmpY * tmpS) ? 1 : 0;

                if (checkRight) {
                    tmpGrid = this.grids[(tmpX + 1) + "_" + tmpY];
                    if (tmpGrid) tmpArray.push(tmpGrid);

                    if (checkTop) {
                        tmpGrid = this.grids[(tmpX + 1) + "_" + (tmpY - 1)];
                        if (tmpGrid) tmpArray.push(tmpGrid);
                    }

                    if (checkBottom) {
                        tmpGrid = this.grids[(tmpX + 1) + "_" + (tmpY + 1)];
                        if (tmpGrid) tmpArray.push(tmpGrid);
                    }
                }

                if (checkLeft) {
                    tmpGrid = this.grids[(tmpX - 1) + "_" + tmpY];
                    if (tmpGrid) tmpArray.push(tmpGrid);

                    if (checkTop) {
                        tmpGrid = this.grids[(tmpX - 1) + "_" + (tmpY - 1)];
                        if (tmpGrid) tmpArray.push(tmpGrid);
                    }

                    if (checkBottom) {
                        tmpGrid = this.grids[(tmpX - 1) + "_" + (tmpY + 1)];
                        if (tmpGrid) tmpArray.push(tmpGrid);
                    }
                }

                if (checkBottom) {
                    tmpGrid = this.grids[tmpX + "_" + (tmpY + 1)];
                    if (tmpGrid) tmpArray.push(tmpGrid);
                }

                if (checkTop) {
                    tmpGrid = this.grids[tmpX + "_" + (tmpY - 1)];
                    if (tmpGrid) tmpArray.push(tmpGrid);
                }
            } catch (e) {}

            return tmpArray;
        };

        var tmpObj;
        this.add = function(sid, x, y, dir, s, type, data, setSID, owner) {
            if (!data && type === 1 && desertStart !== null && y >= desertStart) {
                data = {
                    name: "cactus",
                    dmg: cactusDamage
                };
            }

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

            if (setSID) {
                tmpObj.sid = sid;
            }

            tmpObj.init(x, y, dir, s, type, data, owner);

            if (server) {
                this.setObjectGrids(tmpObj);
                if (tmpObj.doUpdate) {
                    this.updateObjects.push(tmpObj);
                }
            }
        };

        this.disableBySid = function(sid) {
            for (var i = 0; i < gameObjects.length; ++i) {
                if (gameObjects[i].sid == sid) {
                    this.disableObj(gameObjects[i]);
                    break;
                }
            }
        };

        this.removeAllItems = function(sid, server) {
            for (var i = 0; i < gameObjects.length; ++i) {
                if (gameObjects[i].active && gameObjects[i].owner && gameObjects[i].owner.sid == sid) {
                    this.disableObj(gameObjects[i]);
                }
            }
            if (server) {
                server.broadcast("13", sid);
            }
        };

        this.fetchSpawnObj = function(sid) {
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

        this.checkItemLocation = function(x, y, s, sM, indx, ignoreWater, placer) {

            var nearbyObjects = this.getNearbyObjects(x, y, s * 2);

            for (var i = 0; i < nearbyObjects.length; ++i) {
                var obj = nearbyObjects[i];
                if (!obj.active) continue;

                var blockS = obj.blocker ? obj.blocker : obj.getScale(sM, obj.isItem);
                var dx = x - obj.x;
                var dy = y - obj.y;
                var distSq = dx * dx + dy * dy;
                var minDistSq = (s + blockS) * (s + blockS);

                if (distSq < minDistSq) return false;
            }

            if (!ignoreWater && indx != 18 && 
                y >= config.mapScale / 2 - config.riverWidth / 2 && 
                y <= config.mapScale / 2 + config.riverWidth / 2) {
                return false;
            }

            return true;
        };

        this.addProjectile = function(x, y, dir, range, indx) {
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

        this.checkCollision = function(player, other, delta) {
            delta = delta || 1;

            var dx = player.x - other.x;
            var dy = player.y - other.y;
            var tmpLen = player.scale + other.scale;

            if ((mathABS(dx) | 0) > tmpLen && (mathABS(dy) | 0) > tmpLen) return false;

            tmpLen = player.scale + (other.getScale ? other.getScale() : other.scale);

            var distSq = dx * dx + dy * dy;
            var tmpLenSq = tmpLen * tmpLen;

            if (distSq > tmpLenSq) return false;

            var tmpInt = mathSQRT(distSq) - tmpLen;

            if (tmpInt <= 0) {
                if (!other.ignoreCollision) {
                    var tmpDir = UTILS.getDirection(player.x, player.y, other.x, other.y);

                    if (other.isPlayer) {
                        tmpInt = tmpInt * -0.5;
                        var cosDir = mathCOS(tmpDir);
                        var sinDir = mathSIN(tmpDir);
                        player.x += tmpInt * cosDir;
                        player.y += tmpInt * sinDir;
                        other.x -= tmpInt * cosDir;
                        other.y -= tmpInt * sinDir;
                    } else {
                        var cosDir = mathCOS(tmpDir);
                        var sinDir = mathSIN(tmpDir);
                        player.x = other.x + tmpLen * cosDir;
                        player.y = other.y + tmpLen * sinDir;
                        player.xVel *= 0.75;
                        player.yVel *= 0.75;
                    }

                    if (other.dmg && other.owner != player && 
                        !(other.owner && other.owner.team && other.owner.team == player.team)) {
                        player.changeHealth(-other.dmg, other.owner, other);
                        var tmpSpd = 1.5 * (other.weightM || 1);
                        var cosDir = mathCOS(tmpDir);
                        var sinDir = mathSIN(tmpDir);
                        player.xVel += tmpSpd * cosDir;
                        player.yVel += tmpSpd * sinDir;

                        if (other.pDmg && !(player.skin && player.skin.poisonRes)) {
                            player.dmgOverTime.dmg = other.pDmg;
                            player.dmgOverTime.time = 5;
                            player.dmgOverTime.doer = other.owner;
                        }

                        if (player.colDmg && other.health) {
                            if (other.changeHealth(-player.colDmg)) {
                                this.disableObj(other);
                            }
                            this.hitObj(other, UTILS.getDirection(player.x, player.y, other.x, other.y));
                        }
                    }
                } else if (other.trap && !player.noTrap && other.owner != player && 
                          !(other.owner && other.owner.team && other.owner.team == player.team)) {
                    player.lockMove = true;
                    other.hideFromEnemy = false;
                } else if (other.boostSpeed) {
                    var weightM = other.weightM || 1;
                    player.xVel += delta * other.boostSpeed * weightM * mathCOS(other.dir);
                    player.yVel += delta * other.boostSpeed * weightM * mathSIN(other.dir);
                } else if (other.healCol) {
                    player.healCol = other.healCol;
                } else if (other.teleport) {
                    player.x = UTILS.randInt(0, config.mapScale);
                    player.y = UTILS.randInt(0, config.mapScale);
                }

                if (other.zIndex > player.zIndex) {
                    player.zIndex = other.zIndex;
                }

                return true;
            }

            return false;
        };
    }
}