var findOdd = function (a) {
 var count = 0;
 var arr = a.sort();
 var currentNumber = arr[0];
 //console.log(arr);
  for (var i = 0; i < arr.length; i++){
    if ( i == arr.length - 1){
      // if len = 9 then i=8 & len - 1 = 8
      //return a[8] last element of array if we had looped through everything and the element we want is the last index
      return a[i];
    }
    console.log(currentNumber);
    //why does currentNumber change as we loop?
    //currentNumber is set to a static arr[0] so why is it looping with the behavior expected of arr[i]?
    if (arr[i] == currentNumber){
    //arr[i] is the same as iteration of loop as currentNumber
    //increase counter
      count++;
    }
    else {
      //if false run this if conditional => this is different than setting up as }else if{} why? i thought }else if{} was shorthand
      if (count % 2 == 1) {
      // if the count is odd %2 !==0 or %2 == 1 will do the same check?
      // return the previous element why though? if the count is odd during the currentNumber check, shouldnt it just be arr[1] and not the previous element?
      return arr[i-1];
      }
      // through hoisting  these 2 are pushed to the top of the scope? false because inside else block
      // now currentNumber is just another variable that will loop through the elements? false more complicated than that
      // we set count = 1 here because if we loop through 1 iteration of 'i' then the count is at least 1 but the wont this reset the counter from lets say 2 or 3 to back to 1?
      // nevermind the variable assignments are carefully located inside the else block which only activate when arr[i] !== currentNumber
      // now i see that currentNumber is set to the first element of the argument array so the before the loop and after the loop runs once it will be consquently be set to arr[i]
    currentNumber = arr[i];
    count = 1;
    }
  }
};
