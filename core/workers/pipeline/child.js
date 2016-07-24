/*

  Gekko is a Bitcoin trading bot for popular Bitcoin exchanges written 
  in node, it features multiple trading methods using technical analysis.

  If you are interested in how Gekko works, read more about Gekko's 
  architecture here:

  https://github.com/askmike/gekko/blob/stable/docs/internals/architecture.md

  Disclaimer:

  USE AT YOUR OWN RISK!

  The author of this project is NOT responsible for any damage or loss caused 
  by this software. There can be bugs and the bot may not perform as expected 
  or specified. Please consider testing it first with paper trading and/or 
  backtesting on historical data. Also look at the code to see what how 
  it is working.

*/

var ipc = require('relieve').IPCEE(process);

var config;
var mode;

ipc.on('start', (mode, config) => {

  var util = require(__dirname + '/../../util');

  // force correct gekko env
  util.setGekkoEnv('child-process');

  var dirs = util.dirs();

  // force correct gekko mode
  util.setGekkoMode(mode);

  // force disable debug
  config.debug = false;
  util.setConfig(config);

  var log = require(dirs.core + 'log');
  log.info('Gekko v' + util.getVersion(), 'started');

  var Spy = require('./spy');

  var pipeline = require(dirs.core + 'pipeline');
  pipeline({
    config: config,
    mode: mode,
    spies: [ new Spy ]
  });
});
