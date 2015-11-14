// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = {};

angular.module('ionicApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('connect', {
    url: '/',
    templateUrl: 'templates/connect.html',
    controller: 'ConnectCtrl'
  })
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  });

  $urlRouterProvider.otherwise("/");

})

.controller('ConnectCtrl', function($scope, $state, $ionicPopup, $ionicSlideBoxDelegate) {
 
   // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.tryAgain = function() {
    location.reload();
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  $scope.showError = function(msg) {
    $ionicPopup.alert({
      title: 'Error occured!',
      template: msg
    });
  };

  app.onError = function (msg) {
    $ionicPopup.alert({
      title: 'Error occured!',
      template: msg
    });
  };

  document.addEventListener('deviceready', function() {
    // step 1. connect to bus
    connect()
    // step 2. register bus objects
    .then(function(bus) {
        console.log('connected to ajrouter');
        app.bus = bus;
        return registerObjects();
    })
    // step 3. lamp discovery (+ join)
    .then(function(){
      console.log('registerObjects completed');
      $scope.next();
       return discoverLamp();
    })
    // step 4. lamp has been found
    .then(function(){
      return lsfLampState.initialize();
    })
    // at the chain end
    .done(function() {
      // success
      $scope.next();
    }, function(err) {
      // failure
      $scope.showError(err);
    });

    }, false);
})

.controller('MainCtrl', function($scope, $state, $ionicPopup) {
  console.log('MainCtrl');

  var brightnessBar = document.getElementById('brightnessBar');
  brightnessBar.value = lsfLampState.getPercentageRange(lsfLampState.brightness);

  brightnessBar.addEventListener('change', function ()
  {
      if (app.lightbulbSession && !lsfLampState.busy)
      {
          lsfLampState.setBrightness(this.value);
      }
  }, false);

  var applyPulseEffectButton = document.getElementById('applyPulseEffectButton');
  applyPulseEffectButton.addEventListener('click', function ()
  {
      if (app.lightbulbSession && lsfLampState.onOff && !lsfLampState.busy)
      {
          var period = 1000;
          var duration = 500;
          var numPulses = 5;

          //app.updateControls(false);

          // setTimeout(function ()
          // {
          //     app.resetValues(lsfLampState.getOEMRange(100), 100);
          //     app.updateControls(true);
          // }, period * numPulses);

          lsfLampState.applyPulseEffect(
                                          lsfLampState.getOEMRange(100), lsfLampState.getOEMRange(100), lsfLampState.getOEMRange(100), lsfLampState.getOEMRange(100),
                                          lsfLampState.getOEMRange(1), lsfLampState.getOEMRange(1), lsfLampState.getOEMRange(1), lsfLampState.getOEMRange(1),
                                          period, duration, numPulses
                                       );
      }
  }, false);

  var onOffSwitch = document.getElementById("onOffSwitch");
  onOffSwitch.checked = lsfLampState.onOff;

  onOffSwitch.addEventListener('change', function ()
  {
      if (app.lightbulbSession && !lsfLampState.busy)
      {
          if (!this.checked)
          {
              //app.resetValues(0, 0);
              //app.updateControls(false);
              lsfLampState.powerOff();
          }
          else
          {
              //app.updateControls(true);
              lsfLampState.powerOn();
          }
      }
  }, false);

  $scope.toIntro = function(){
    $state.go('intro');
  };

  app.onError = function (msg) {
    $ionicPopup.alert({
      title: 'Error occured!',
      template: msg
    });
  };

});

function connect() {

  var d = Q.defer();

  if (typeof AllJoyn === 'undefined') {
    d.reject('AllJoyn module is not available');
  } else {
    AllJoyn.connect(function(bus) {
      d.resolve(bus);
    }, function(err){
      d.reject(err);
    });
  }
  return d.promise;
}

function registerObjects () {

  var proxyObjects =
  [
      {
          path: '/org/allseen/LSF/Lamp',
          interfaces:
          [
              [
                  'org.freedesktop.DBus.Properties',
                  '?Get <s <s >v',
                  '?Set <s <s <v',
                  '?GetAll <s >a{sv}',
                  ''
              ],

              [
                  'org.allseen.LSF.LampService',
                  '?ClearLampFault LampFaultCode<u LampResponseCode>u LampFaultCode>u',
                  '@Version >u',
                  '@LampServiceVersion >u',
                  ''
              ],

              [
                  'org.allseen.LSF.LampParameters',
                  '@Version >u',
                  '@Energy_Usage_Milliwatts >u',
                  '@Brightness_Lumens >u',
                  ''
              ],

              [
                  'org.allseen.LSF.LampDetails',
                  '@Version >u',
                  '@Make >u',
                  '@Model >u',
                  '@Type >u',
                  '@LampType >u',
                  '@LampBaseType >u',
                  '@LampBeamAngle >u',
                  '@Dimmable >b',
                  '@Color >b',
                  '@VariableColorTemp >b',
                  '@HasEffects >b',
                  '@MinVoltage >u',
                  '@MaxVoltage >u',
                  '@Wattage >u',
                  '@IncandescentEquivalent >u',
                  '@MaxLumens >u',
                  '@MinTemperature >u',
                  '@MaxTemperature >u',
                  '@ColorRenderingIndex >u',
                  '@LampID >s',
                  ''
              ],

              [
                  'org.allseen.LSF.LampState',
                  '?TransitionLampState Timestamp<t NewState<a{sv} TransitionPeriod<u LampResponseCode>u',
                  '?ApplyPulseEffect FromState<a{sv} ToState<a{sv} period<u duration<u numPulses<u timestamp<t LampResponseCode>u',
                  '!LampStateChanged LampID>s',
                  '@Version >u',
                  '@OnOff =b',
                  '@Hue =u',
                  '@Saturation =u',
                  '@ColorTemp =u',
                  '@Brightness =u',
                  ''
              ],

              null
          ]
      },

      null
  ];

  var d = Q.defer();
  AllJoyn.registerObjects(function(res) {
      d.resolve(res);
  }, function(err){
    d.reject(err);
  }, null, proxyObjects);

  return d.promise;
}

function discoverLamp() {
  var d = Q.defer();
  app.bus.addInterfacesListener(['org.allseen.LSF.LampState'], function(lightbulbInfo) {
      console.log('light bulb has been found, attemp to join');
      app.lightbulbInfo = lightbulbInfo;

      var service =
      {
          name: lightbulbInfo.message.sender,
          port: lightbulbInfo.port
      };

      app.bus.joinSession(function(lightbulbSession) {
        console.log('joined session');
        app.lightbulbSession = lightbulbSession;
        d.resolve();
      }, function(err) {
        d.reject(err);
      }, service);
  });
  return d.promise;
}


var lsfLampState =
{
    onOff: false,
    hue: 0,
    saturation: 0,
    colorTemp: 0,
    brightness: 0,
    busy: false,

    initialize: function()
    {
        var d = Q.defer();

        var initializeMsg = [2, 0, 0, 2]; // Proxy object list, object index, interface index, method index

        var args =
        [
            'org.allseen.LSF.LampState'
        ];

        /**
        /* ReturnArgs' structure: a{sv}
        /*      {sv}[0] => Version
        /*      {sv}[1] => Hue
        /*      {sv}[2] => Saturation
        /*      {sv}[3] => ColorTemp
        /*      {sv}[4] => Brightness
        /*      {sv}[5] => On/Off
        */
        var onInitialized = function (getPropertiesMessage)
        {
            var returnArgs = getPropertiesMessage.arguments[0]; // Get the 1st argument (array of props)
            lsfLampState.hue = returnArgs[1][2];
            lsfLampState.saturation = returnArgs[2][2];
            lsfLampState.colorTemp = returnArgs[3][2];
            lsfLampState.brightness = returnArgs[4][2];
            lsfLampState.onOff = returnArgs[5][2];
            // document.getElementById("hueBar").value = lsfLampState.getPercentageRange(lsfLampState.hue);
            // document.getElementById("saturationBar").value = lsfLampState.getPercentageRange(lsfLampState.saturation);
            // document.getElementById("colorTempBar").value = lsfLampState.getPercentageRange(lsfLampState.colorTemp);
            // document.getElementById("brightnessBar").value = lsfLampState.getPercentageRange(lsfLampState.brightness);
            // app.updateControls(lsfLampState.onOff);
        };
        console.log('initializing lsfLampState...');
        app.lightbulbSession.callMethod(function(res) {
          console.log('lsfLampState initialized');
          onInitialized(res);
          d.resolve();
        }, function (err) {
          d.reject(err);
        }, null, null, initializeMsg, 's', args, 'a{sv}');

        return d.promise;
    },

    transitionState: function (bOnOff, uHue, uSaturation, uColorTemp, uBrightness, uTransitionPeriod)
    {
        var transitionLampStateMsg = [2, 0, 4, 0]; // Proxy object list, object index, interface index, method index

        var args =
        [
            0,
            [
                ['OnOff', 'b', bOnOff],
                ['Hue', 'u', uHue],
                ['Saturation', 'u', uSaturation],
                ['ColorTemp', 'u', uColorTemp],
                ['Brightness', 'u', uBrightness]
            ],
            uTransitionPeriod
        ];

        var onLampStateChanged = function (lampStateChangedMessage)
        {
            var uResponse = lampStateChangedMessage.arguments[0];

            if (uResponse == 0) // successful
            {
                lsfLampState.onOff = bOnOff;
                lsfLampState.hue = uHue;
                lsfLampState.saturation = uSaturation;
                lsfLampState.colorTemp = uColorTemp;
                lsfLampState.brightness = uBrightness;
                lsfLampState.busy = false;
            }
        }

        lsfLampState.busy = true;
        app.lightbulbSession.callMethod(onLampStateChanged, function(err) {
          app.onError('Command failed: ' + err);
        }, null, null, transitionLampStateMsg, 'ta{sv}u', args, 'u');
    },

    applyPulseEffect: function (uFromHue, uFromSaturation, uFromColorTemp, uFromBrightness, uToHue, uToSaturation, uToColorTemp, uToBrightness, uPeriod, uDuration, uNumPulses)
    {
        var applyPulseEffectMsg = [2, 0, 4, 1]; // Proxy object list, object index, interface index, method index

        var args =
        [
            [
                ['OnOff', 'b', true],
                ['Hue', 'u', uFromHue],
                ['Saturation', 'u', uFromSaturation],
                ['ColorTemp', 'u', uFromColorTemp],
                ['Brightness', 'u', uFromBrightness]
            ],
            [
                ['OnOff', 'b', true],
                ['Hue', 'u', uToHue],
                ['Saturation', 'u', uToSaturation],
                ['ColorTemp', 'u', uToColorTemp],
                ['Brightness', 'u', uToBrightness]
            ],
            uPeriod,
            uDuration,
            uNumPulses,
            0
        ];

        var onPulseEffectInvoked = function (pulseEffectMessage)
        {
            var uResponse = pulseEffectMessage.arguments[0];

            if (uResponse == 0) // successful
            {
                lsfLampState.onOff = true;
                lsfLampState.hue = uToHue;
                lsfLampState.saturation = uToSaturation;
                lsfLampState.colorTemp = uToColorTemp;
                lsfLampState.brightness = uToBrightness;
                lsfLampState.busy = false;
            }
        }

        lsfLampState.busy = true;
        app.lightbulbSession.callMethod(onPulseEffectInvoked, app.onError('ApplyPulseEffect'), null, null, applyPulseEffectMsg, 'a{sv}a{sv}uuut', args, 'u');
    },

    powerOn: function ()
    {
        lsfLampState.transitionState(true, lsfLampState.hue, lsfLampState.saturation, lsfLampState.colorTemp, lsfLampState.brightness, 0);
    },

    powerOff: function ()
    {
        lsfLampState.transitionState(false, lsfLampState.hue, lsfLampState.saturation, lsfLampState.colorTemp, lsfLampState.brightness, 0);
    },

    setHue: function (hue)
    {
        var uHue = this.getOEMRange(hue);
        lsfLampState.transitionState(true, uHue, lsfLampState.saturation, lsfLampState.colorTemp, lsfLampState.brightness, 0);
    },

    setSaturation: function (saturation)
    {
        var uSaturation = this.getOEMRange(saturation);
        lsfLampState.transitionState(true, lsfLampState.hue, uSaturation, lsfLampState.colorTemp, lsfLampState.brightness, 0);
    },

    setColorTemp: function (colorTemp)
    {
        var uColorTemp = this.getOEMRange(colorTemp);
        lsfLampState.transitionState(true, lsfLampState.hue, lsfLampState.saturation, uColorTemp, lsfLampState.brightness, 0);
    },

    setBrightness: function (brightness)
    {
        var uBrightness = this.getOEMRange(brightness);
        lsfLampState.transitionState(true, lsfLampState.hue, lsfLampState.saturation, lsfLampState.colorTemp, uBrightness, 0);
    },

    getOEMRange: function (value)
    {
        return value * parseInt((0xFFFFFFFF - 1) / 100);
    },

    getPercentageRange: function (value)
    {
        return value / ((0xFFFFFFFF - 1) / 100);
    }
};

window.lsfLampState = lsfLampState;