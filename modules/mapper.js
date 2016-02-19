const fs = require('fs'),
      _ = require('underscore-node'),
      HashMap = require('hashmap').HashMap,
      reader = require('line-reader'),
      Promise  = require('promise');

    var mapper_list= [];

module.exports = {

 
 load_mapper: function() {
    return new Promise(function(resolve, reject) {
      try {
        //console.log('INSIDE load operators');
        reader.eachLine('/Users/carlosmedina/work/gitSource/log_creator/provision/mapper.txt' , function(line, last) {
          
            if ( !_.contains(mapper_list,line) ) mapper_list.push(line);
         // console.log('Mapper list' + mapper_list);
          if (last) {
            resolve(mapper_list)
          }
        });
      } catch (e) {
        reject(e)
      }
    });
  },
  init: function() {
    load_mapper();
  }

}
