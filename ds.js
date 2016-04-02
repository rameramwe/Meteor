var test = 'hello world' ;
var f=function (arg1){
  console.log(arg1);
};

var obj={
  a:'hello',b:'world'
};
var Klass = function() {
  return{};
};
var instance = new Klass();



//max
var f=function (m){
 var b=- Infinity ;

for (var i = 0; i < 4; i++) {
   if (m[i]>b)b=m[i];

}


return b;

};
console.log(f( [3, 1, 2,8]));
