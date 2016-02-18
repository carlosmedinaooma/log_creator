const call_logger  = require('./modules/call_logger'),
	  caller_2600  = require('./modules/caller_2600'),
	  config= require('./config/config.js'),
 	  randomstring = require('randomstring');

var caller=config.caller[Math.floor(Math.random()*config.caller.length)],
	did='',
	ctn='',
	args = process.argv.slice(2);

call_date_start=args[0].replace(/\//g, "-");
call_date_end=args[1].replace(/\//g, "-");

console.log(call_date_start + ' ' + call_date_end);

call_type='default';

for (i = 0; i < config.calls_per_day; i++) {
	if (config.provision=="0"){
	     did='707'+ randomstring.generate({
	            length: 7,
	            charset: 'numeric'
	          });
	      ctn='888'+ randomstring.generate({
	            length: 7,
	            charset: 'numeric'
	          });
	}else{
		console.log("provision true");

	}

      console.log('Creating call log for: ' + did);
	caller_2600.do_log(caller, did,ctn,call_date_start,call_type);

}
