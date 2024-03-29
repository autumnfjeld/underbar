/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n == null) return array[0];
    if (n < 1) return [];
    return array.slice(0,n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n == null) return array[array.length-1];
    if (n < 1) return [];
    return array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (collection == null) return;
    if (Array.isArray(collection)) {
      for ( var i = 0; i < collection.length ; i++) {
        iterator.call(this, collection[i], i, collection);
      }
    }
    else {
      for (var prop in collection)
        iterator.call(this, collection[prop], prop, collection) 
    };
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  // TIP: Here's an example of a function that needs to iterate, which we've
  // implemented for you. Instead of using a standard `for` loop, though,
  // it uses the iteration helper `each`, which you will need to write.

  _.indexOf = function(array, target){
    var result = false;
    _.each(array,
      function(value,index){
        if (value == target && result == false){ 
          result = index; 
        }
      }
    );
    if (result == false) return -1;
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var result = [];
    if (collection == null) return result;
    _.each(collection, 
      function(value, index, list){
        if (iterator.call(this, value, index, list)) result.push(value);
      }
    );
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  // TIP: see if you can re-use _.select()=_.filter() here, without simply
  // copying code in and modifying it
  _.reject = function(collection, iterator) {
    return _.filter(collection, 
      function(value, index, list){              //want this function to return a true if this iterator is false
        return !iterator.call(this, value, index, list);  
      }
   );
  };

  // Produce a duplicate-free version of the array.
  // Should I be using help predefined functions?
  _.uniq = function(array) {
    var result = [];
    var duplicate = false;
    for ( var i = 0; i < array.length; i++ ) {
      duplicate = false;
      for ( var j = 0; j < result.length; j++ ) {
        if (array[i] == result[j]) duplicate = true; 
      }
      if (!duplicate) result.push(array[i]);
    }
    return result;
  };

  // Return the results of applying an iterator to each element.
  // map() is a useful primitive iteration function that works a lot
  // like each(), but in addition to running the operation on all
  // the members, it also maintains an array of results.
  _.map = function(array, iterator) {
    var result = [];
    _.each(array,function(value, index, array) {
        result.push(iterator.call(this,value, index, array));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Items in list may be a new 'context', as method is part of an object
  _.invoke = function(list, methodName, args) {
    var isFunc = typeof(methodName) == 'function';
    return _.map(list,function(value, index, array){
      return (isFunc ? methodName.apply(value,args) : value[methodName](args));
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    //console.log('IN reduce. collection:',collection,collection[0].length);
    if (collection == null) return;
    var previousValue = initialValue;
    if (previousValue == null) previousValue = 0;   // Aut: This is wrong. WHat should generic starting value be?
    _.each(collection,function(value, index, list) {
      previousValue = iterator.call(this,previousValue,value);
      }
    );
    return previousValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  // TIP: Many iteration problems can be most easily expressed in
  // terms of reduce(). Here's a freebie to demonstrate!
  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  // TIP: Try re-using reduce() here.
  // by using reduce the whole list is tested - wouldn't it be better to exit on finding a false?
    _.every = function(collection, iterator) { 
      var count = 0;
      if (collection === null) 
        throw new TypeError('_.every called on null or undefined');
      if (iterator == null) return true;                  // Aut: this could be handled better
      return _.reduce(collection,function(check, value) {
         if (!iterator.call(this, value)) return false;              // if !false, return false, each keeps looping, & check = false in next iteration
        return check;     // returning the 'previous value'
        count ++;
    }, true);
   };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  // TIP: There's a very clever way to re-use every() here.  
  // Aut: if the iterator is true then trigger the 'return false' switch in _.every
  _.some = function(collection, iterator) {
    if (collection == null) return false;
    if (iterator == null) 
      iterator = function(value) { return value};
    return !_.every(collection,function(value) {
      return !iterator.call(this, value); 
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
 _.extend = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    var newObj = obj;
    _.each(args.slice(1),function(obj, index, list){
      for (var key in obj)
        newObj[key] = obj[key];
    });
    return newObj;
  };


  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    //obj and first item of arguments don't match!!! weird!!!  
    //'twenty' and 'word' show up in first element when displaying arguments - WHY??
    //console.log('**START** obj', obj,' arguments:',arguments);
    //console.log('** arguments[0]', arguments[0], 'arguments[1]', arguments[1]);
    var args = Array.prototype.slice.call(arguments);
    var newObj = obj;
    var isin = null;
    _.each(args.slice(1),function(obj, index, list){
      for (var key in obj) {
        //console.log('working with object;', obj);
        isin = key in newObj;
        //console.log(isin);
        //if (isin) console.log('already in ','key:',key, 'and obj[key]:',obj[key]);
        if (!isin) {
          //console.log('NOT already in ','key:',key, 'and obj[key]:',obj[key]);
          newObj[key] = obj[key];
        }
        //console.log('our newObj is',newObj,'check word in newObj',newObj['word']);
      }
    });
    //console.log("DONE",newObj)
    return newObj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  // Array.prototype.slice.apply(arguments) converts arguments into an ARRAY.
  _.memoize = function(func) {
    var track = {};

    return function() {
      var arg = Array.prototype.slice.call(arguments);
      var key = arg.toString();
      if (!track[key]){
        track[key] = func.apply(this,arg);
      }
      return track[key];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments,2);

    return setTimeout(function(){
      func.apply(this,args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  // Remember how arrays are properly cloned!!! slice creates a shallow clone
  // slice creates a close for numbers and strings
  _.shuffle = function(array) {
    var shuffled = array.slice();
    var cnt = shuffled.length, temp, rand;

    while(cnt) {
      rand = Math.floor(Math.random() * cnt); 
      cnt--;
      temp = shuffled[cnt];
      shuffled[cnt] = shuffled[rand];
      shuffled[rand] = temp;
    } 
    return shuffled;
  };

  // -----  OR ---------

  /*_.shuffle = function(array) {
    console.log('array', array);
    var rand;
    var shuffled = [];

    _.each(array, function(value, index) {
      rand = Math.floor(Math.random() * index); 

      shuffled[index] = shuffled[rand];
      shuffled[rand] = value;
      console.log('index:',index,'shuffled[index]',shuffled[index],'rand:',rand,'shuffled[rand]',shuffled[rand]);
    }); 
    console.log('SHUFF', shuffled);
    return shuffled;
    //return {sort: function() {}};
  };  */



  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  var lookupIterator = function(iterator) {
    if (iterator == null) return iterator;  // see underscore lookupIterator
    if (typeof(iterator) === 'function') return iterator;
    return function(obj) {
      return obj[iterator];
    };
  };

  _.sortBy = function(collection, iterator) {
    //console.log('collection',collection,'iterator',iterator);
    var sorted = [];
    var hold = [];
    
    iterator = lookupIterator(iterator);

    hold = _.map(collection,function(item, index, list) {
        return {
          'item' : item,
          'index' : index,
          'criteria' : iterator.call(this, item, index, list) };
    });

    sorted = _.pluck(hold.sort(function(a,b) {
      var aTest = a.criteria;
      var bTest = b.criteria
      //console.log('CHECK a.criteria',a.criteria);
      // void 0 always returns undefined, this handles our undefined problem!
      if (aTest !== bTest) {
        if (aTest > bTest || aTest === void 0) return 1;  
        if (aTest < bTest || bTest === void 0) return -1;
      }
      return a.index - b.index;
    }), 'item');

    return sorted;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments);
    var subzip = [];
    var zipped = [];

    var len = _.reduce(args,function(prev,curr) {
      return Math.max(prev,curr.length); 
    }, 0);

    for (var i = 0; i < len; i++) {
      subzip = [];
      for (var j = 0; j < args.length; j++) {
        subzip.push(args[j][i]);
      }
      zipped.push(subzip);
    }
    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    if (!Array.isArray(nestedArray)) return null;
    var flattened = [];
    var item = null;

    function getElements(item) {
      if (Array.isArray(item)) {
        _.each(item,getElements);
      }
      else {   
        flattened.push(item);
      }
    }

    getElements(nestedArray);
    return flattened;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    
    var array0 = args.shift();
    var result = [];

    _.each(array0, function(item){
      var isin = true;
      _.each(args,function(array) {
        if (!_.contains(array,item)) {
          isin = false;
        }
      });
      if (isin) result.push(item);
    });
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  // Ahhhh, need to pass each array to _.intersection, not an array of arrays
  _.difference = function(array) {
    if (!Array.isArray(array)) return "Not an array";
    var args = Array.prototype.slice.call(arguments);
    
    var array0 = args.shift();
    var result = _.filter(array0, function(item) {
      var notin = true;
      _.each(args, function(array){
        if (_.contains(array,item)) notin = false;
      });
      return notin;

    });
    return result;
  }; 
  


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
