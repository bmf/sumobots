// =======================
// Sumobot Jr demo program
// =======================

var five = require("johnny-five");
var keypress = require('keypress');
var Player = require('player');
var horn = new Player('./dixie.mp3');
var backup = new Player('./beep.mp3');

keypress(process.stdin);

var board = new five.Board();

board.on("ready", function() {

  console.log("Welcome to Sumobot Jr!")
  console.log("Control the bot with the arrow keys, and SPACE to stop.")

  var left_wheel = new five.Servo({
    pin: 10,
    type: 'continuous'
  }).stop();
  var right_wheel = new five.Servo({
    pin: 9,
    type: 'continuous'
  }).stop();


  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', function(ch, key) {

    if (!key) return;


    if (key.name == 'q') {

      console.log('Quitting');
      process.exit();

    } else if (key.name == 'w') {
      backup.stop();
      console.log('Forward');
      left_wheel.ccw();
      right_wheel.cw();

    } else if (key.name == 's') {

      console.log('Backward');
      backup.stop();
      left_wheel.cw();
      right_wheel.ccw();
      backup.play(function(err, player) {
        console.log('Beep End!');
      });

    } else if (key.name == 'd') {
      backup.stop();
      console.log('Left');
      left_wheel.ccw();
      right_wheel.ccw();



    } else if (key.name == 'a') {
      backup.stop();
      console.log('Right');
      left_wheel.cw();
      right_wheel.cw();

    } else if (key.name == 'space') {

      console.log('Stopping');
      horn.stop();
      backup.stop();
      left_wheel.stop();
      right_wheel.stop();

    } else if (key.name == 'h') {
      console.log('\nHorn');
      horn.play(function(err, player) {
        if (err) {
          console.log('Horn End!');
          horn.stop();
        }
      });

    }


  });


});
