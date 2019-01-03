var RollingSpider = require("rolling-spider");
var temporal = require("temporal");

var ACTIVE = true;
var STEPS = 5;
var d = new RollingSpider({uuid:"d03acc8de621"}); //�e�X���������܂��傤�B

d.connect(function () {

  d.setup(function () {
    console.log('Configured for Mambo! ', d.name);
    d.flatTrim();
    d.startPing();
    d.flatTrim();
    setTimeout(function () {
      console.log(d.name + ' => SESSION START');
      ACTIVE = true;

      temporal.queue(
        [
          {
            delay: 500,
            task: function() {
              d.takeOff();
              console.log("order take off.");
            }
          },
          {
            delay: 3500,
            task: function() {
              var param = {tilt:0, forward:50, turn:0, up:0};
              d.drive(param, 20);
              console.log("forward")
            }
          },
          {
            delay: 3500, // takeOff���s��3500msec�o�߂��Ă�����s
            task: function() {
              var param = {tilt:0, forward:0, turn:-90, up:0};
              d.drive(param, 18); 
              console.log("left turn.")
            }
          },
          {
            delay: 3500, // trun -90�x���s�� 3500msec��ɑO�i���s (50cm���x�i�݂܂�)
            task: function() {
              var param = {tilt:0, forward:50, turn:0, up:0};
              // ����20������������Ƌ������Z���Ȃ�܂��B�傫������ƒ����Ȃ�܂��B
              // �傫������ꍇ�͎���task��delay(����task�ł͂Ȃ��j�𒷂��ݒ肵�Ă��������B
              d.drive(param, 20); 
              console.log("forward")
            }
          },
          {
            delay: 3500,
            task: function() {
              var param = {tilt:0, forward:0, turn:-90, up:0};
              d.drive(param, 18);
              console.log("left turn")
            }
          },
          {
            delay: 3500,
            task: function() {
              var param = {tilt:0, forward:50, turn:0, up:0};
              d.drive(param, 20);
              console.log("forward")
            }
          },
          {
            delay: 3500,
            task: function() {
              var param = {tilt:0, forward:0, turn:-90, up:0};
              d.drive(param, 18);
              console.log("forward")
            }
          },
          {
            delay: 3500,
            task: function() {
              var param = {tilt:0, forward:50, turn:0, up:0};
              d.drive(param, 20);
              console.log("forward")
            }
          },
          {
            delay: 3000,
            task: function() {
              d.land();
              console.log("order landing.");
            }
          },
          {
            delay: 500,
            task: function() {
              d.disconnect();
              console.log('finish.');
              temporal.clear();
              process.exit(0);
              console.log('exit.');
            }
          }
        ]
        );

    }, 1000);

  });
});
