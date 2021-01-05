/////////////////////////////////////////////////////////////////////////////
////////   T Y P E   C L A S S   ( O B J E C T   T E M P L A T E)   /////////
/////////////////////////////////////////////////////////////////////////////

class Type {

  constructor(_MBTI, isMBTI) {
    var a = getFunctionsFromType(_MBTI, isMBTI);
      this.dominantFunction = a[0];
      this.auxillaryFunction = a[1];
    this.mbti = isMBTI;
    var f = getNumbersFromType(_MBTI, isMBTI);
      this.firstFunction = f[0];
      this.secondFunction = f[1];
  }
  
  // Returns an int[2] with first two functions
  getSerialNumbers() {
    var a = [0, 0];
    a[0] = this.firstFunction;
    a[1] = this.secondFunction;
    return a;
  }

  // Return type as a string 
  toTypeCode() {
    return getTypeFromFunctions(this.dominantFunction, this.auxillaryFunction, this.mbti);
  }  

}

////////////////////////////////////////////////////////////////////////////

  // From type to first two functions
  // Returns a string[2]
  function getFunctionsFromType(_MBTI, isMBTI) {
    var stack = ["", ""];
    var firstFunction = "";
    var secondFunction = "";
    if (isMBTI) {
      if (_MBTI.substring(0,1)==="I") {
        if (_MBTI.substring(3)==="P") {
          firstFunction = _MBTI.substring(2,3)+"i";
         secondFunction = _MBTI.substring(1,2)+"e";
        } else {
          firstFunction = _MBTI.substring(1,2)+"i";
          secondFunction = _MBTI.substring(2,3)+"e";
        }
      } else {
        if (_MBTI.substring(3)==="J") {
          firstFunction = _MBTI.substring(2,3)+"e";
          secondFunction = _MBTI.substring(1,2)+"i";
        } else {
          firstFunction = _MBTI.substring(1,2)+"e";
          secondFunction = _MBTI.substring(2,3)+"i";
       }
      }
    } else {
      if (_MBTI.substring(0,1)==="E") firstFunction+="F";
      else if (_MBTI.substring(0,1)==="L") firstFunction+="T";
      else if (_MBTI.substring(0,1)==="I") firstFunction+="N";
      else firstFunction+=_MBTI.substring(0,1);

      if (_MBTI.substring(1,2)==="E") secondFunction+="F";
      else if (_MBTI.substring(1,2)==="L") secondFunction+="T";
      else if (_MBTI.substring(1,2)==="I") secondFunction+="N";
      else secondFunction+=_MBTI.substring(1,2);

      if (_MBTI.substring(2,3)==="I") {
        firstFunction+="i";
        secondFunction+="e";
      } else {
        firstFunction+="e";
        secondFunction+="i";
      }
    }
    stack[0] = firstFunction;
    stack[1] = secondFunction;
    return stack;
  } 

  // From first two functions (in string form) to type
  // returns type as a string
  function getTypeFromFunctions(first, second, isMBTI) {
    var type = "";
    if (isMBTI) {
      if (first.substring(1,2)==="i") {
        type+="I";

        if (first.substring(0,1)==="N" || second.substring(0,1)==="N") type+="N";
        else type+="S";

        if (first.substring(0,1)==="T" || second.substring(0,1)==="T") type+="T";
        else type+="F";

        if (first.substring(0,1)==="N" || first.substring(0,1)==="S") type+="J";
        else type+="P";

      } else {
        type+="E";

        if (first.substring(0,1)==="N" || second.substring(0,1)==="N") type+="N";
        else type+="S";

        if (first.substring(0,1)==="T" || second.substring(0,1)==="T") type+="T";
        else type+="F";

        if (first.substring(0,1)==="N" || first.substring(0,1)==="S") type+="P";
        else type+="J";
      }
    } else {
      if (first.substring(0,1)==="F") type+="E";
      else if (first.substring(0,1)==="T") type+="L";
      else if (first.substring(0,1)==="N") type+="I";
      else type+=(first.substring(0,1));

      if (second.substring(0,1)==="F") type+="E";
      else if (second.substring(0,1)==="T") type+="L";
      else if (second.substring(0,1)==="N") type+="I";
      else type+=(second.substring(0,1));

      if (first.substring(1,2)==="i") type+="I";
      else type+="E";
    }
    return type;
  }

////////////////////////////////////////////////////////////////////////////

  // From type to numbers
  // returns an int[2] 
  /* NUMBERS TO FUNCTION KEY
    111: Ti
    110: Te
    101: Fi
    100: Fe
    911: Ni
    910: Ne
    901: Si
    900: Se
  */
  function getNumbersFromType(_MBTI, isMBTI) {

    var stack = [0, 0];
    var f = getFunctionsFromType(_MBTI, isMBTI);
    var firstFunction = f[0];
    var secondFunction = f[1];
    var intfirstFunction, intsecondFunction;

    var first1 = 9;
    var second1 = 0;
    var third1 = 0;
    if (firstFunction.substring(0,1)==="T" || firstFunction.substring(0,1)==="F") first1 = 1;
    if (firstFunction.substring(0,1)==="T" || firstFunction.substring(0,1)==="N") second1 = 1; 
    if (firstFunction.substring(1,2)==="i") third1 = 1;
    intfirstFunction = first1*100+second1*10+third1;

    var first2 = 9;
    var second2 = 0;
    var third2 = 0;
    if (secondFunction.substring(0,1)==="T" || secondFunction.substring(0,1)==="F") first2 = 1;
    if (secondFunction.substring(0,1)==="T" || secondFunction.substring(0,1)==="N") second2 = 1; 
    if (secondFunction.substring(1,2)==="i") third2 = 1;
    intsecondFunction = first2*100+second2*10+third2;

    stack[0] = intfirstFunction;
    stack[1] = intsecondFunction;
    return stack;

  }

  // From numbers to type
  // returns type as a string
  function getTypeFromNumbers(first, second, isMBTI) {
    var first1 = "";
    var second1 = "";

    if (Math.floor(first/100)==1) {
      if ((Math.floor(first/10))%10==1) first1+="T";
      else first1+="F";
    } else {
      if ((Math.floor(first/10))%10==1) first1+="N";
      else first1+="S";
    }
    if (first%10==1) first1+="i";
    else first1+="e";

    if (Math.floor(second/100)==1) {
      if ((Math.floor(second/10))%10==1) second1+="T";
      else second1+="F";
    } else {
      if ((Math.floor(second/10))%10==1) second1+="N";
      else second1+="S";
    }
    if (second%10==1) second1+="i";
    else second1+="e";  

    return getTypeFromFunctions(first1, second1, isMBTI);
  }
 
