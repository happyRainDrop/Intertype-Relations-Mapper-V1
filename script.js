var boxIndex = 0;
var boxArray = [document.getElementById("i0")];
var lineIndex = 0;
var lineArray = [];
var titleArray = [];
var selectedBoxesIds = [];

/////////////////////////////////////////////////////////////////////////////
/////////   U S E R   I N T E R F A C E  /  A P P E A R A N C E   ///////////
/////////////////////////////////////////////////////////////////////////////

////////   1. BOX MANIPUTLATION

// Initial box
var input = document.getElementById("i0");
input.style.left = "20px";
input.style.top = "350px";
input.addEventListener("keyup", submit);
input.addEventListener("keyup", deleteBox);
input.addEventListener("keyup", selectBox);

// Create new box
// attaches to body
function newBox(event) {
  boxIndex+=1;
  var box = document.createElement("INPUT");
  box.id = "i"+boxIndex;
  box.style.left = "20px";
  box.style.top = "350px";
  box.type = "text";
  box.placeholder = "MBTI type";
  box.draggable = "true";
  box.borderWidth = "thin";
  document.body.appendChild(box);
  box2 = document.getElementById("i"+boxIndex);
  boxArray.push(box2);
  box2.addEventListener("keyup", submit);
  box2.addEventListener("dragend", moveBox);
  box2.addEventListener("keyup", deleteBox);
  box2.addEventListener("keyup", selectBox);
  box2.addEventListener("dblclick", newBox);
}

/* Move a box on the screen to a different position
   Triggered when box is released from being dragged */
function moveBox(event) {
  var x = event.clientX-50-5;
  var y = event.clientY-25-5; 
  var box = document.getElementById(event.target.id);
  box.style.left = x+"px";
  box.style.top = y+"px";
  moveLines(event.target.id, x, y);
}

/* Delete a box on a screen and in the array
   Also deletes all attached lines
   Triggered when box is clicked and esc is released */
function deleteBox(event) {
  var myBoxId = event.target.id;
  if (event.keyCode === 27) { // Number 27 is the "esc" key on the keyboard
    var startLinesOfDeleteBox = getStartLines(myBoxId);
    var endLinesOfDeleteBox = getEndLines(myBoxId);
    // remove attached lines
    for (var j = 0; j<startLinesOfDeleteBox.length; j++) 
      removeLine(startLinesOfDeleteBox[j].getAttribute("id"));
    for (var k = 0; k<endLinesOfDeleteBox.length; k++) 
      removeLine(endLinesOfDeleteBox[k].getAttribute("id"));
    // removes the HTML element
    document.getElementById(myBoxId).remove(); 
    var boxArrayIndex = myBoxId.substring(1);
    // Shift all the boxes that came after the removed box left, renameids accordingly
    for (var i = parseInt(boxArrayIndex); i<boxArray.length-1; i++) {
      boxArray[i] = boxArray[i+1];;
      var oldId = "i"+(i+1);
      var newId = "i"+i;
      // Change the name of startBoxId and endBoxId for lines attached to the shifted boxes
      var startLines = getStartLines(oldId);
      var endLines = getendLines(oldId);
      for (var j = 0; j<startLines.length; j++)
        startLines[j].setAttribute("startBoxId", newId);
      for (var k = 0; k<endLines.length; k++)
        endLines[k].setAttribute("endBoxId", newId);  
      // change box id    
      document.getElementById(oldId).id=newId;
    }
    boxArray.pop(); // get rid of last, now empty, array slot
    boxIndex--;
  }
}

/* Set the type (and color) for a box
   Triggered when box is clicked and enter is released */
function submit(event) {
  if (event.keyCode === 13) { // Number 13 is the "Enter" key on the keyboard
    var input = document.getElementById(event.target.id);
    var q = getQuadra(input.value);
    if (q===1) input.style.backgroundColor = "LightCyan";
    else if (q===2) input.style.backgroundColor = "LightGreen";
    else if (q===3) input.style.backgroundColor = "LemonChiffon";
    else if (q===4) input.style.backgroundColor = "LightPink";
    else input.style.backgroundColor = "White";
    changeLineColors(event.target.id);
  }
}

////////   2. LINE MANIPUTLATION

/* Select a box to attach a line to
   Triggered when box is clicked and ctrl is released */
function selectBox(event) {
  typeBox = document.getElementById(event.target.id);
  if (event.keyCode === 17 && getQuadra(typeBox.value)!=0) { // Number 17 is the "ctrl" key
    document.getElementById(event.target.id).style.borderWidth = "thick";
    selectedBoxesIds.push(event.target.id);
    if (selectedBoxesIds.length===2) {
      createLine(selectedBoxesIds[0], selectedBoxesIds[1]);
      selectedBoxesIds = []; 
    }
  }
}

// Draws a line representing the relation between the two selected types and creates corresponding tooltip
function createLine(id1, id2) {
  var box1 = document.getElementById(id1);
  var box2 = document.getElementById(id2);
  // determine the intertype relation the line represents
  var type1 = new Type(box1.value, isMBTIForm(box1.value));
  var type2 = new Type(box2.value, isMBTIForm(box2.value));
  var calc1 = new Calculator(type1);
  var relationCode = calc1.getRelation(type2);
  // create a line from (x1, y1) to (x2, y2)
  var x1 = parseInt(box1.style.left)+50;
  var y1 = parseInt(box1.style.top)+25;
  var x2 = parseInt(box2.style.left)+50;
  var y2 = parseInt(box2.style.top)+25;
  var svgElem = document.getElementById("svg1");
  var line = document.createElementNS("http://www.w3.org/2000/svg","line");
  line.setAttributeNS(null, "id", "l"+lineIndex);
  line.setAttributeNS(null, "startBoxId", id1);
  line.setAttributeNS(null, "endBoxId", id2);
  line.setAttributeNS(null, "x1", x1);
  line.setAttributeNS(null, "y1", y1);
  line.setAttributeNS(null, "x2", x2);
  line.setAttributeNS(null, "y2", y2);
  line.setAttributeNS(null, "stroke", setLineColor(relationCode));
  line.setAttributeNS(null, "stroke-width", 10);
  if (lineArray.length===0) svgElem.appendChild(line);
  else svgElem.insertBefore(line, lineArray[lineArray.length-1]);
  // add event listener (for deletion)
  line.addEventListener("click", deleteLine);
  // add tooltip
  var title = document.createElementNS("http://www.w3.org/2000/svg","title");
  title.id = "t"+lineIndex;
  title.textContent = calc1.whichRelationIsThis(relationCode);
  line.appendChild(title);
  lineIndex+=1;
  // adjust lineArray and titleArray
  lineArray.push(line);
  titleArray.push(title);
  // reset borders
  box1.style.borderWidth = "thin";
  box2.style.borderWidth = "thin";
}

/* Redirects to removeLine
   Triggered when line clicked on */
function deleteLine(event) {
  var lineId = event.target.id;
  removeLine(lineId);
}

/* Allows lines to be deleted even without user clicking
   Also deletes corresponding title
   Shifts line array accordingly */
function removeLine(lineId) {
  var removeIndex = 0;
  var lineString = "";
  for (var i = 0; i<lineArray.length; i++) {
    lineString+=lineArray[i].id+" ";
    if (lineArray[i].getAttribute("id")===lineId) removeIndex = i;
  }
  // shift the rest of the lines, change ids accordingly
  document.getElementById(lineId).remove();
  for (var i = removeIndex; i<lineArray.length-1; i++) {
    lineArray[i] = lineArray[i+1];
    titleArray[i] = titleArray[i+1];
    lineArray[i].setAttribute("id", "l"+i);
    titleArray[i].setAttribute("id", "t"+i);
  }
  lineArray.pop();
  titleArray.pop();
  lineIndex--;
}

// Moves the ends of lines attached to moving boxes
function moveLines(boxId, newX, newY) {
  for (var i = 0; i<lineArray.length; i++) {
    var line = lineArray[i];
    var xNew = parseInt(newX)+50;
    var yNew = parseInt(newY)+25;
    if (line.getAttribute("startBoxId")===boxId) {
      line.setAttribute("x1", xNew);
      line.setAttribute("y1", yNew);
    } else if (line.getAttribute("endBoxId")===boxId) {
      line.setAttribute("x2", xNew);
      line.setAttribute("y2", yNew);
    }
  }
}

// Changes line colors when box text changed 
// If text changed to an invalid type, deletes all lines attached to that box
function changeLineColors(boxId) {
  var box1 = document.getElementById(boxId);
  if (getQuadra(box1.value)!==0) {
    var type1 = new Type(box1.value, isMBTIForm(box1.value));
    var calc1 = new Calculator(type1);
    for (var i = 0; i<lineArray.length; i++) {
      var line = lineArray[i];
      if (line.getAttribute("startBoxId")===boxId) {
        var box2 = document.getElementById(line.getAttribute("endBoxId"));
        var type2 = new Type(box2.value, isMBTIForm(box2.value));
        var newRelationCode = calc1.getRelation(type2);
        var newColor = setLineColor(newRelationCode);
        var newTooltip = calc1.whichRelationIsThis(newRelationCode);
        document.getElementById("t"+i).innerHTML = newTooltip;
        line.setAttribute("stroke", newColor);
      } else if (line.getAttribute("endBoxId")===boxId) {
        var box2 = document.getElementById(line.getAttribute("startBoxId"));
        var type2 = new Type(box2.value, isMBTIForm(box2.value));
        var newRelationCode = calc1.getRelation(type2);
        var newColor = setLineColor(newRelationCode);
        document.getElementById("t"+i).innerHTML = calc1.whichRelationIsThis(newRelationCode);
        line.setAttribute("stroke", newColor);
      }
    }
  } else {
    var startLines = getStartLines(myBoxId);
    var endLines = getEndLines(myBoxId);
    // remove attached lines
    for (var j = 0; j<startLines.length; j++) 
      removeLine(startLines[j].getAttribute("id"));
    for (var k = 0; k<endLines.length; k++) 
      removeLine(endLines[k].getAttribute("id"));
  }
}

// Returns an array of all lines starting on a certain box
function getStartLines(boxId) {
  var arr = [];
  for (var i = 0; i<lineArray.length; i++)
    if (lineArray[i].getAttribute("startBoxId")===boxId)
      arr.push(lineArray[i]);
  return arr;
}

// Returns an array of all lines ending on a certain box
function getEndLines(boxId) {
  var arr = [];
  for (var i = 0; i<lineArray.length; i++)
    if (lineArray[i].getAttribute("endBoxId")===boxId)
      arr.push(lineArray[i]);
  return arr;
}

////////   3. MBTI info for UI (not needed by Type or Calculator classes)

/* QUADRA KEY
  Alpha (Ne-Si, Ti-Fe): 1 BLUE
  Beta (Ni-Se, Ti-Fe): 2  GREEN
  Gamma (Ne-Si, Te-Fi): 3  YELLOW
  Delta (Ni-Se, Te-Fi): 4  RED
*/
function getQuadra(type) {
  var quadra = 0;
  if (type==="INTP" || type==="LII" ||
      type==="ENTP" || type==="ILE" ||
      type==="ISFJ" || type==="SEI" ||
      type==="ESFJ" || type==="ESE") quadra = 1;
  else if (type==="ISTP" || type==="LSI" ||
      type==="ESTP" || type==="SLE" ||
      type==="INFJ" || type==="IEI" ||
      type==="ENFJ" || type==="EIE") quadra = 2;
  else if (type==="ISTJ" || type==="SLI" ||
      type==="ESTJ" || type==="LSE" ||
      type==="INFP" || type==="EII" ||
      type==="ENFP" || type==="IEE") quadra = 3;
  else if (type==="INTJ" || type==="ILI" ||
      type==="ENTJ" || type==="LIE" ||
      type==="ISFP" || type==="ESI" ||
      type==="ESFP" || type==="SEE") quadra = 4;
  return quadra;
}

// returns true is type is in MBTI form, false if Socionics
function isMBTIForm(type) {
  if (type.length===4) return true;
  else return false;
}

// Greener = better relation, redder = worse
function setLineColor(i) {
  switch(i) {
      case 1:
        return "hsl(120, 100%, 30%)";
        
      case 2:
        return "hsl(130, 100%, 40%)";
        
      case 3:
        return "hsl(156, 100%, 52%)";
        
      case 4:
        return "hsl(172, 100%, 52%)";
        
      case 5:
        return "hsl(178, 100%, 42%)";
        
      case 6:
        return "hsl(190, 100%, 42%)";
        
      case 7: 
        return "hsl(200, 100%, 42%)";
        
      case 8:
        return "hsl(214, 100%, 42%)";
        
      case 9:
        return "hsl(234, 100%, 36%)";
        
      case 10:
        return "hsl(266, 100%, 45%)";
        
      case 11: 
        return "hsl(275, 100%, 50%)";
        
      case 12:
        return "hsl(284, 100%, 53%)";
        
      case 13:
        return "hsl(295, 100%, 53%)";
        
      case 14:
        return "hsl(313, 100%, 53%)";
        
      case 15:
        return "hsl(335, 100%, 53%)";
        
      default:
        return "hsl(355, 100%, 53%)";
        
    }
}
