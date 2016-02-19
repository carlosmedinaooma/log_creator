const call_logger  = require('./modules/call_logger'),
	  caller_2600  = require('./modules/caller_2600'),
	  mapper  = require('./modules/mapper'),
	  config= require('./config/config.js'),
 	  randomstring = require('randomstring');

 	  const fs = require('fs'),
      _ = require('underscore-node'),
      reader = require('line-reader'),
      Promise  = require('promise');

   var mapper_list= [];
   var did_ctn=[];

var caller=config.caller[Math.floor(Math.random()*config.caller.length)],
	did='',
	ctn='',
	month=0,
	args = process.argv.slice(2);

call_date_start=args[0].replace(/\//g, "-");
call_date_end=args[1].replace(/\//g, "-");

//console.log(call_date_start + ' ' + call_date_end);

call_type='default';

call_start= new Date(call_date_start);
call_end= new Date(call_date_end);

mapper.load_mapper().then(function(response) {
    console.log("Mapper Load Success!" );
	mapper_list =response;
	  	while (call_end >= call_start) {
	  	month=call_start.getMonth() +1;
		console.log('Generating call log for date:' + ('00'+month).slice(-2)  + '-'+('00'+call_start.getDate()).slice(-2) + '-' + call_start.getFullYear() );
		call_formatted= ('00'+month).slice(-2) + '-'+('00'+call_start.getDate()).slice(-2)+ '-' + call_start.getFullYear();
			for (i = 0; i < config.logs_per_day; i++) {
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
					did_ctn= mapper_list[Math.floor(Math.random()*mapper_list.length)].split(",");
					did=did_ctn[0].trim();
					ctn=did_ctn[1].trim();					
				}
				console.log('Using DID:' + did + ' and CTN:' + ctn );
				caller_2600.do_log(caller, did,ctn,call_formatted,call_type);
			}//for
			call_start=new Date(call_start.getFullYear(),call_start.getMonth(),call_start.getDate()+1);
		} // While

}, function(error) {
    console.error("Mapper Load Failed!", error);
});





