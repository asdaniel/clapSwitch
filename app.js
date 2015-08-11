// Takes a triggering value for ambient sound,
// toggles relay 1 when that trigger is hit.

var tessel = require('tessel');
var relay = require('relay-mono').use(tessel.port['A']);
var ambient = require('ambient-attx4').use(tessel.port['B']);
var led1 = tessel.led[0].output(0);
var led2 = tessel.led[1].output(0);


// Sound level (0-1) needed to trigger. You may need to adjust this.
var triggerVal = 0.18;
var first_clap = 0;

// When the module is connected
ambient.on('ready', function () {
  // Set the sound trigger
  ambient.setSoundTrigger(triggerVal);

  // When the sound trigger is reached
  ambient.on('sound-trigger', function triggerHit() {
    // Toggle the switch

    if (first_clap > 0){
        console.log("toggle relay");
        relay.toggle(1);
        led1.toggle();
        led2.toggle();

        // reset the counter
        first_clap = 0;
    }
    else {
        first_clap++;
        console.log("first clap");
        // reset the counter after 1 second
        setTimeout(function () { first_clap = 0; },1000);
    }

  });
});
