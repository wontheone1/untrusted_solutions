/**
 * 01 cell block A : Make a gap on the wall
 */


for (y = 6; y <= map.getHeight() - 10; y++) {
    map.placeObject(5, y, 'block');
    map.placeObject(map.getWidth() - 5, y, 'block');
}

for (x = 5; x <= map.getWidth() - 5; x++) {
    map.placeObject(x, 3, 'block');
    map.placeObject(x, map.getHeight() - 10, 'block');
}

/**
 * 02 the long way out : Comment out the creation of the wall (four clever characters)
 */

function startLevel(map) {
    map.placePlayer(7, 5);

    var maze = new ROT.Map.DividedMaze(map.getWidth(), map.getHeight());
    /*
     maze.create( function (x, y, mapValue) {

     // don't write maze over player
     if (map.getPlayer().atLocation(x,y)) {
     return 0;
     }

     else if (mapValue === 1) { //0 is empty space 1 is wall
     map.placeObject(x,y, 'block');
     }
     else {
     map.placeObject(x,y,'empty');
     }
     });

     map.placeObject(map.getWidth()-4, map.getHeight()-4, 'block');
     map.placeObject(map.getWidth()-6, map.getHeight()-4, 'block');
     map.placeObject(map.getWidth()-5, map.getHeight()-5, 'block');
     map.placeObject(map.getWidth()-5, map.getHeight()-3, 'block');
     */
    map.placeObject(map.getWidth() - 5, map.getHeight() - 4, 'exit');
}

/**
 * 03 validation Engaged: The validateLevel function is checking number of exit(1) and walls,
 *                        so we do not remove the walls, we just move the walls.
 *                        <p>E.g., in the for loop starting with 10 until map.getHeight() - 3,
 *                        we add 3 to the both(resulting in 13, and map.getHeight())
 */

for (y = 13; y <= map.getHeight(); y++) {
    map.placeObject(5, y, 'block');
    map.placeObject(map.getWidth() - 5, y, 'block');
}

for (x = 5; x <= map.getWidth() - 5; x++) {
    map.placeObject(x, 10, 'block');
    map.placeObject(x, map.getHeight() - 3, 'block');
}

/**
 * 04 multiplicity: 'Multiplicity' means abundance, myriad, a lot.
 *                  <p>The name implies we can make use of multiple exits.
 */

map.placeObject(map.getWidth() - 5, 15, 'exit');

/**
 * 05 mineSweeper: This level reminds me of the mine sweeper game I made in C language.
 *                 As a school project in the first year, I made mine sweeper in pure C language,
 *                 with out any graphics, just ASCII chars, no external libraries or anything.
 *                 But it had features of choosing difficulty, placing flag function and everything.
 *                 Anyway, the level description says
 *                 <p>"If only there was some way you could track the positions of the mines...".
 *                 <p>And in the startLevel function, we can see that level is all Red because of
 *                 'map.setSquareColor(x, y, '#f00');'. It seems after '#', they use 3 digit RGB scheme.
 *                 And we see that the part we are allowed to change is the part where the mines in the level
 *                 is generated. So after the line 'map.placeObject(x, y, 'mine');', you can set the color to
 *                 any color that is distinguishable from red(#f00).
 */

for (var i = 0; i < 75; i++) {
    var x = getRandomInt(0, map.getWidth() - 1);
    var y = getRandomInt(0, map.getHeight() - 1);
    if ((x != 2 || y != map.getHeight() - 1)
        && (x != map.getWidth() - 5 || y != 5)) {
        // don't place mine over exit or player!
        map.placeObject(x, y, 'mine');
        map.setSquareColor(x, y, '#00f');
    }
}

/**
 * 06 drone101: This drone has same movement speed with player and starting in front of the exit so the player cannot
 *              reach the exit without encountering the drone. But when I check the drone's AI or behavior pattern,
 *              you can see it is so dumb. It has basically the following behavior.
 *              <p>if player is above drone and the difference in Y axis is greater than difference in x axis,
 *              it will move up, otherwise if player is below the drone and the difference in y axis(upDist, which is negative) is
 *              lower than the difference in x axis(leftDist), it will move down and so on and so forth.
 *              <p>But it doesn't have any check before it moves, so it doesn't check if it can move up and
 *              will try to move up and up even though it has a wall above, therefore it cannot move.
 *              <p>So if we make some kind of walls that the drone can be trapped under, and make drone try to
 *              move up even though it can't, then we can get past the drone easily. With my solution if
 *              you just keep moving right, upDist will become greater than left Dist so
 *              the drone will only try to move up. And you can use a whole between newly made wall and
 *              the wall existed before to get to the exit.
 */

// below is the AI(behavior) of the drone
function startLevel(map) {
    if (upDist == 0 && leftDist == 0) {
        return;
    }
    if (upDist > 0 && upDist >= leftDist) {
        direction = 'up';
    } else if (upDist < 0 && upDist < leftDist) {
        direction = 'down';
    } else if (leftDist > 0 && leftDist >= upDist) {
        direction = 'left';
    } else {
        direction = 'right';
    }
}

// Solution (the walls that block) drone from moving up so that the player can go to exit while it is trapped
for (var i = 0; i < 32; i++) {
    map.placeObject(map.getWidth() - 35 + i, 11, 'block');
}

/**
 * 07 colors: You can see that you have to get past three different color of locks to reach the exit.
 *            And if player's color is different from the color of the lock(player.getColor() != object.color;),
 *            the player can't get past the lock. So you must be able to change the color of the player.
 *            With newly acquired item, phone, you can use a callback function.
 *            <p>First, you have to set the callback function with 'player.setPhoneCallback(callback)' as
 *            specified in the API Reference(^1). The callback should be something that can set player's color
 *            to different than his/her current color.
 *            <p>After that, we can get past the locks, by using phone(Q or Ctrl-6) to change his/her color to the
 *            same color as the lock that is currently blocking the way.
 */

var player = map.getPlayer();

player.setColor('#f00');

function callback() {
    if (player.getColor() == '#f00') {
        player.setColor('#ff0');
    } else if (player.getColor() == '#0f0') {
        player.setColor('#f00');
    } else if (player.getColor() == '#ff0') {
        player.setColor('#0f0');
    }
}

player.setPhoneCallback(callback);

/**
 * 08 into The Woods: The only editable part is we can set the function to call in the setPhoneCallback().
 *                    By calling function 'generateForest', we can randomly generate the forest again.
 *                    So you can move toward the exit and every time you stuck at some tree you can
 *                    use phone call to make forest again and move a little bit more toward the exit.
 *                    Little by little, you can eventually reach the exit.
 */

map.getPlayer().setPhoneCallback(functionList["generateForest"]);

/**
 * 09 fording The River: We can use the codes that were used to make the first 'raft' in the map.
 *                       But because the level validates that there be only one raft
 *                       'map.validateExactlyXManyObjects(1, 'raft');'
 *                       we cannot make object 'raft', so we have to define 'raft1' that is essentially same to 'raft',
 *                       then we declare callback function to place newly defined raft on the map,
 *                       and we use it as the phoneCallback function.
 *                       <p>Since we cannot place 'raft1' on top of player, first we move player 2 tiles up and then place
 *                       the 'raft1' on the player's original starting spot. then 'raft1' moves upward so to get on the 'raft1'
 *                       move player one tile and move back one tile. If you missed it don't worry because you can use
 *                       phone to make more rafts.
 *                       <p>After getting on the raft, keep moving up until you cross the river,
 *                       and just head to the exit.
 */

raftDirection = 'up';
map.defineObject('raft1', {
    'type': 'dynamic',
    'symbol': '▓',
    'color': '#420',
    'transport': true, // (prevents player from drowning in water)
    'behavior': function (me) {
        me.move(raftDirection);
    }
});
var callback = function () {
    map.placeObject(map.getWidth() - 1, map.getHeight() - 1, 'raft1');
};
player.setPhoneCallback(callback);

/**
 * 10 Ambush: There are three kinds of drones and all of their behaviors are editable.
 *            So the solution here is obvious, make drone behave in a way that makes a way for player to get to the exit.
 *            <p>In the map, we can see there is one column of attackDrone, and two rows of reinforcementDrone,
 *            and lastly one column of defenseDrone.
 *            <p>To sort them out nicely to make way for player, we can just move the middle drones up so that they stack
 *            to the upper walls, and for front drones, you move or move left when they can't move up
 *            so that they move left in line just below the upper walls. Lastly the green drones which are in behind,
 *            they can move up or move right when they can't move up(same way as the front drones), so that they
 *            move right in line just below the upper walls.
 *            <p>This way the drones will make a nice way for the player so we can easily reach the exit.
 */

map.defineObject('attackDrone', {
    'type': 'dynamic',
    'symbol': 'd',
    'color': 'red',
    'onCollision': function (player) {
        player.killedBy('an attack drone');
    },
    'behavior': function (me) {
        if (me.canMove('up'))
            me.move('up');
        else
            me.move('left');
    }
});

map.defineObject('reinforcementDrone', {
    'type': 'dynamic',
    'symbol': 'd',
    'color': 'yellow',
    'onCollision': function (player) {
        player.killedBy('a reinforcement drone');
    },
    'behavior': function (me) {
        me.move('up');
    }
});

map.defineObject('defenseDrone', {
    'type': 'dynamic',
    'symbol': 'd',
    'color': 'green',
    'onCollision': function (player) {
        player.killedBy('a defense drone');
    },
    'behavior': function (me) {
        if (me.canMove('up'))
            me.move('up');
        else
            me.move('right');
    }
});

/**
 * 11 robot: This time we have to program robot to deliver red key to us.
 *           Program robot to move right when it can, and move down when it can't, it will deliver the key to player
 *           and we can walk to the exit.
 * https://gist.github.com/anonymous/331999fcbc8640484bc9
 */

map.defineObject('robot', {
    'type': 'dynamic',
    'symbol': 'R',
    'color': 'gray',
    'onCollision': function (player, me) {
        me.giveItemTo(player, 'redKey');
    },
    'behavior': function (me) {
        // Available commands: me.move(direction)
        //                 and me.canMove(direction)
        if (me.canMove('right'))
            me.move('right');
        else
            me.move('down');

    }
});

/**
 * 12 Robot Nav: To make the robot to get out of the room and deliver green key to us,
 *               first we need to make it move to the bottom, and then make it move to the right
 *               until it reaches half way to the right most, at the half way move it up while it can move up and right.
 *               When it reached upper most part and cannot go ahead, we move it to right most,
 *               finally when the right part is blocked and can't move to right any more,
 *               we move the robot to down.
 * https://gist.github.com/anonymous/bcc9171351e269d80057
 */

map.defineObject('robot', {
    'type': 'dynamic',
    'symbol': 'R',
    'color': 'gray',
    'onCollision': function (player, me) {
        me.giveItemTo(player, 'greenKey');
    },
    'behavior': function (me) {
        // until the robot moved half way to the right,
        // move down if it can, or move right if it can't
        if (me.getX() < map.getWidth() / 2) {
            if (me.canMove('down')) {
                me.move('down');
            } else {
                me.move('right');
            }
        }
        // from the half way to the right,
        // move up when the right side is not blocked
        // (meaning not yet, reached to the right most walls),
        // move right if it can't move up but can move right,
        // move down if it can't (move up && right) and (move right)
        else {
            if (me.canMove('up') && me.canMove('right')) {
                me.move('up');
            } else if (me.canMove('right')) {
                me.move('right');
            } else {
                me.move('down');
            }
        }
    }
});

/**
 * 13 Robot Maze: The robot is in a much more complicated maze and it is randomly generated. One solution would be
 * to make robot move symmetrically to the player, so for example when the player move up, the robot move down and vice versa.
 * When the player move left, the robot move right and vice versa. This way of indirectly controlling robot
 * work by checking the player position and make robot move symmetrically.
 * <p>The other solution would be making a path finding algorithm, I coded a path finding algorithm for tile based game before,
 * but for this one, something simpler would be enough.
 * For this, we will define 'dir' property on me to remember which direction the robot is moving.
 * So when 'dir' is undefined(when game starts, it didn't moved at all), or it is 'u' for up,
 * we can move it to left, up, right, or down(whichever possible in the order.)
 * The rest is dealt in the same way, if 'dir' was 'l', it can move down, left, up, right.
 * So the 'dir' property is checked in the order of 'u', 'l', 'd', 'r'(Counter-clockwise),
 * the moving direction given the 'dir' value starts from 90 degree counter-clockwise, but in the clockwise order.
 * https://gist.github.com/anonymous/5b5ee60d4621d3907ada
 */
// if the player has the 'blue key' make the robot move down(so that it doesn't continuously move around)
if (map.getPlayer().hasItem('blueKey'))
    me.move('down');

else if ((me.dir === undefined || me.dir === 'u')) {
    if (me.canMove('left')) {
        me.dir = 'l';
        me.move('left');
    }
    else if (me.canMove('up')) {
        me.dir = 'u';
        me.move('up');
    }
    else if (me.canMove('right')) {
        me.dir = 'r';
        me.move('right');
    }
    else {
        me.dir = 'd';
        me.move('down');
    }
}
else if ((me.dir === undefined || me.dir === 'l')) {
    if (me.canMove('down')) {
        me.dir = 'd';
        me.move('down');
    }
    else if (me.canMove('left')) {
        me.dir = 'l';
        me.move('left');
    }
    else if (me.canMove('up')) {
        me.dir = 'u';
        me.move('up');
    }
    else if (me.canMove('right')) {
        me.dir = 'r';
        me.move('right');
    }
}
else if ((me.dir === undefined || me.dir === 'd')) {
    if (me.canMove('right')) {
        me.dir = 'r';
        me.move('right');
    }
    else if (me.canMove('down')) {
        me.dir = 'd';
        me.move('down');
    }
    else if (me.canMove('left')) {
        me.dir = 'l';
        me.move('left');
    }
    else if (me.canMove('up')) {
        me.dir = 'u';
        me.move('up');
    }
}
else if ((me.dir === undefined || me.dir === 'r')) {
    if (me.canMove('up')) {
        me.dir = 'u';
        me.move('up');
    }
    else if (me.canMove('right')) {
        me.dir = 'r';
        me.move('right');
    }
    else if (me.canMove('down')) {
        me.dir = 'd';
        me.move('down');
    }
    else if (me.canMove('left')) {
        me.dir = 'l';
        me.move('left');
    }
}

/**
 * 14 Crisps Contest: We start with, red, green, blue key. Whenever the player pass a door, the door will remove the key of same color.
 *                    We need at least two yellow keys to get the algorithms and come out again to go to the exit.
 *                    <p>The only editable part is the string argument of removeItem function in function impassable of 'greenLock' object.
 *                    We change the string to 'theAlgorithm', then we will lose nothing when we pass greenLock(of course,
 *                    before acquiring greenLock). Then we just need to check the corners, two rooms at the same time,
 *                    not wasting any keys. As soon as you have 2 yellow keys, you can grab 'theAlgorithm' and escape.
 * https://gist.github.com/anonymous/44925d2361ef269a6fb1
 */

player.removeItem('theAlgorithm');

/**
 * 15 Exceptional Crossing: In this level we can edit inside 'onCollision' function.
 *                          <p>I found out anything that causes throwing of exception is solution here, but
 *                          we can also redefine the 'onCollision' function to something that does nothing.
 * https://gist.github.com/anonymous/fc0b77b26903a88648cf
 */

map.defineObject('water', {
    'symbol': '░',
    'color': '#44f',
    'onCollision': function (player) {
        player.killedBy();}, 'onCollision':function(){map.getWidth();
    }
});

/**
 * 16 Lasers: The level description is teasing you that you can't see the real color of the lasers.
 *            Which, of course, makes us want to set the color of lasers to their real color.
 *            line 49, 'ctx.strokeStyle = 'white';' shows how the stroke was set to white color.
 *            We just set it to represent real color. The color is the 5th parameter of the 'createLaser' function.
 *            After making the colors of the lasers visible, we can make callback function of changing player's
 *            color just like what we did in level 7.
 * https://gist.github.com/9d462669ae1bfc8501b3
 */

function startLevel(map) {
    map.placePlayer(0, 0);
    map.placeObject(map.getWidth()-1, map.getHeight()-1, 'exit');
    var player = map.getPlayer();

    for (var i = 0; i < 25; i++) {
        var colors = ['red', 'yellow', 'teal'];

        var startX = getRandomInt(0, 600);
        var startY = getRandomInt(0, 500);
        var angle = getRandomInt(0, 360);
        var length = getRandomInt(200, 300);
        var color = colors[i % 3];
        createLaser(startX, startY, angle, length, color);
    }

    function createLaser(centerX, centerY, angleInDegrees, length, color) {
        var angleInRadians = angleInDegrees * Math.PI / 180;

        var x1 = centerX - Math.cos(angleInRadians) * length / 2;
        var y1 = centerY + Math.sin(angleInRadians) * length / 2;
        var x2 = centerX + Math.cos(angleInRadians) * length / 2;
        var y2 = centerY - Math.sin(angleInRadians) * length / 2;

        // map.createLine() creates a line with an effect when
        // the player moves over it, but doesn't display it
        map.createLine([x1, y1], [x2, y2], function (player) {
            if (player.getColor() != color) {
                player.killedBy('a ' + color + ' laser');
            }
        });

        // using canvas to draw the line
        var ctx = map.getCanvasContext();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

    }

    function callback() {

        'red', 'yellow', 'teal'
        if (player.getColor() == 'red') {
            player.setColor('yellow');
        } else if (player.getColor() == 'yellow') {
            player.setColor('teal');
        } else if (player.getColor() ==  'teal') {
            player.setColor('red');
        } else {
            player.setColor('red');
        }
    }
    player.setPhoneCallback(callback);
}

/**
 * 17 Pointers: This level has lots of traps and teleporters. And the teleporters randomly connects to
 * another teleporter or trap. The comments at editable area gives hint that we could use 'map.getCanvasCoords()...'
 * So I used the function to draw lines from a teleporter to another teleporter.
 * But the drawing was not so clear enough to see what is connected to what, so I put more safety by
 * setting teleporters target to null when the target is type of 'trap'.
 * With some repetition I was able to go to exit but not always because, in this random generation of the map,
 * some times there was no way to exit at all.
 * <p> So I made second solution that all teleporters to connects player to near by empty cell of exit.
 * https://gist.github.com/anonymous/ede703e7f6a1e5534c99 (first solution)
 * https://gist.github.com/anonymous/837d074ed83635c1b099 (second solution
 */

// first solution
for (i = 0; i < teleportersAndTraps.length; i+=2) {
    var t1 = teleportersAndTraps[i];
    var t2 = teleportersAndTraps[i+1];

    // Point each teleporter to either another teleporter
    // or a trap
    if (t1.getType() == 'teleporter') {
        t1.setTarget(t2);
    }
    if (t2.getType() == 'teleporter') {
        t2.setTarget(t1);
    }

    // TODO find a way to remove the API docs
    // wouldn't want the 'good doctor' to find
    // out about map.getCanvasCoords()...
    var t1Coords = map.getCanvasCoords(t1);
    var t2Coords = map.getCanvasCoords(t2);

    canvas.lineWidth = 1;

    if (t2.getType() == 'teleporter' && t1.getType() != 'trap' )
    {
        canvas.beginPath();
        canvas.strokeStyle = 'green';
        canvas.moveTo(t2Coords.x, t2Coords.y);
        canvas.lineTo(t1Coords.x, t1Coords.y);
        canvas.stroke();
    }

    if (t1.getType() == 'teleporter' && t2.getType() != 'trap' )
    {
        canvas.beginPath();
        canvas.strokeStyle = 'yellow';
        canvas.moveTo(t1Coords.x, t1Coords.y);
        canvas.lineTo(t2Coords.x, t2Coords.y);
        canvas.stroke();
    }

    if (t2.getType() == 'teleporter' && t1.getType() == 'trap' )
    {
        t2.setTarget(null);
    }

    if (t1.getType() == 'teleporter' && t2.getType() == 'trap' )
    {
        t1.setTarget(null);
    }
}

// second solution
for (i = 0; i < teleportersAndTraps.length; i+=2) {
    var t1 = teleportersAndTraps[i];
    var t2 = teleportersAndTraps[i+1];

    // Point each teleporter to either another teleporter
    // or a trap
    if (t1.getType() == 'teleporter') {
        t1.setTarget(t2);
    }
    if (t2.getType() == 'teleporter') {
        t2.setTarget(t1);
    }

    // TODO find a way to remove the API docs
    // wouldn't want the 'good doctor' to find
    // out about map.getCanvasCoords()...
    var exit = t1.findNearest('exit');
    var cells = map.getAdjacentEmptyCells(exit.x, exit.y);
    var cell = {
        x: cells[0][0][0],
        y: cells[0][0][1]
    };

    map.placeObject(cell.x, cell.y, 'teleporter');
    console.log(cell);

    var teleportersAndTrapsOriginal = map.getDynamicObjects();

    var len = teleportersAndTrapsOriginal.length;
    var target = teleportersAndTrapsOriginal[len-1];

    for (i = 0; i < teleportersAndTrapsOriginal.length-1; i++) {
        var t = teleportersAndTrapsOriginal[i];
        if (t.getType() == 'teleporter') {
            t.setTarget(target);
        }
    }
    break;
}

/**
 * 18 Super Dr Eval Bros: Here we can edit inside jump. But the 'gravity()' function before make us fall and die,
 *                        We don't have to do anything in jump but we replace 'gravity' function with the function
 *                        that does nothing.
 * https://gist.github.com/anonymous/0b2a74f138223c58a783
 */
function jump() {
}

function gravity() {
}

/**
 * 19 Document Object Madness: Code is not editable here and
 * honestly I cleared this level by randomly pressing arrow keys.
 */

/**
 * 20 Boss fight: The boss is getting aggressive. We can make use of boss' bullet like object.
 *                With the callback function of the phone we spawn myriad  bullets towards the boss.
 *                Since there is validation of how many 'block' is allowed in the level(max 59 blocks).
 *                we can only put one block in the level and cross the map in two tries.
 * https://gist.github.com/anonymous/e2408c1256ab1a5ec43c
 */

map.defineObject('bullet_swarms', {
    'type': 'dynamic',
    'symbol': '.',
    'color': 'red',
    'interval': 100,
    'projectile': true,
    'behavior': function (me) {
        me.move('up');
    }
});

map.placeObject(31, map.getHeight() - 3,'block');

map.getPlayer().setPhoneCallback(function() {
    for (var x = 0; x < map.getWidth(); x++) {
        for (var y = 10; y < 18; y++) {
            map.placeObject(x,  y, 'bullet_swarms');
        }
    }
});

/**
 * 21 Ebd of the Line: The exit is not getting us to the next level, we can deduce its
 *                     because of this line[39] 'map.finalLevel = true;'
 *                     The level it self is not editable but we can edit some of the scripts in the menu.
 *                     Some scripts are red, some are black? and the black scripts are editable.
 *                     In the objects.js, we can see exit object definition.
 *                     We can delete 'if (!game.map.finalLevel) { and }' part
 * https://gist.github.com/anonymous/2c7405fef3e046c8305f
 */

'exit' : {
    'symbol' : String.fromCharCode(0x2395), // ⎕
        'color': '#0ff',
        'onCollision': function (player) {
        if (!game.map.finalLevel) {
            game._moveToNextLevel();
        }
    }
}