# Log Generator

### Description
This app provides log in the same format as call server project

### Tech

-  How to set up:
In config.js file you could set up

An array of callers:
config.caller=['3371234567'];

How many calls will be generated for each date:
config.calls_per_day="100";

If will use a random did,ctn ("0") or use mapper file to get did,ctn ("1")
config.provision="0";


-  How to run it:
Now the deployment is pointed to 10.66.12.193 server it will restart the app
node generator.js start_date end_date 
In the next format
node generator.js mm/dd/yyyy mm/dd/yyyy

The first date must be greater than second date
For example
```sh
$ node generator.js 12/16/2016 12/20/2016
```
