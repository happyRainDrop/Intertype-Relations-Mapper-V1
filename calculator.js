/////////////////////////////////////////////////////////////////////////////
////////////////////   T Y P E   C A L C U L A T O R   //////////////////////
/////////////////////////////////////////////////////////////////////////////

class Calculator {

  constructor(t) { this.type = t; }

  // returns an int representing the relation type has with parameter t
  getRelation(t) {

    var r = 0;
    var a = [0, 0];
    var b = [0, 0];
    a = this.type.getSerialNumbers();
    b = t.getSerialNumbers();
    var a1 = a[0];
    var a2 = a[1];
    var b1 = b[0];
    var b2 = b[1];

    //pretend we are comparing to ISTP
    if (a1%10===b1%10) { //_i both are introverted
      if (Math.floor(a1/100)===Math.floor(b1/100)) { //both are judging. Ti or Fi
        if (Math.floor(a1/10)%10===Math.floor(b1/10)%10) { // both are thinking Ti
          if (Math.floor(a2/10)%10===Math.floor(b2/10)%10) r = 2; // both are sensing TiSe
          else r = 5; //TiNe
        } else { // Fi
          if (Math.floor(a2/10)%10===Math.floor(b2/10)%10) r = 6; //FiSe
          else r = 9; //FiNe
        }
      } else { //Ni or Si
        if (Math.floor(a2/10)%10===Math.floor(b1/10)%10) { //Si
          if (Math.floor(a1/10)%10===Math.floor(b2/10)%10) r = 14; //thinking, SiTe
          else r = 11; //SiFe
        } else { //Ni
          if (Math.floor(a1/10)%10===Math.floor(b2/10)%10) r = 10; //thinking, NiTe
          else r = 3; //NiFe
        }
      }
    } else { //_e one is extraverted
      if (Math.floor(a1/100)===Math.floor(b1/100)) { //both are judging. Te or Fe
        if (Math.floor(a1/10)%10===Math.floor(b1/10)%10) { // both are thinking Te
          if (Math.floor(a2/10)%10===Math.floor(b2/10)%10) r = 15; // both are sensing TeSi
          else r = 8; //TeNi
        } else { // Fe
          if (Math.floor(a2/10)%10===Math.floor(b2/10)%10) r = 7; //FeSi
          else r = 1; //FeNi
        }
      } else { //Ne or Se
        if (Math.floor(a2/10)%10===Math.floor(b1/10)%10) { //Se
          if (Math.floor(a1/10)%10===Math.floor(b2/10)%10) r = 4; //thinking, SeTi
          else r = 12; //SeFi
        } else { //Ni
          if (Math.floor(a1/10)%10===Math.floor(b2/10)%10) r = 13; //thinking, NeTi
          else r = 16; //NeFi
        }
      }
    }
    return r;
  }

  // returns string telling what relation the int i corresponds to
  whichRelationIsThis(i) {
    switch(i) {
      case 1:
        return "Dual (Soulmate). \nRank: 1";
        
      case 2:
        return "Identical (Same type). \nRank: 2";
        
      case 3:
        return "Activity (Chill friends). \nRank: 3";
        
      case 4:
        return "Mirror (The introverted/extrovered versions of each other). \nRank: 4";
        
      case 5:
        return "Kindred (Share 1st function). \nRank: 5";
        
      case 6:
        return "Look-a-like (Share 2nd function). \nRank: 6";
        
      case 7: 
        return "Semi-dual (Same as soulmate but with different second function). \nRank: 7";
        
      case 8:
        return "Illusionary (Same as soulmate but with different first function). \nRank: 8";
        
      case 9:
        return "Super-ego (Each type seems most detrimental to society to the other). \nRank: 9";
        
      case 10:
        return "Benefit: "+this.type.toTypeCode()+" is Benifactee. \nRank: 10";
        
      case 11: 
        return "Benefit: "+this.type.toTypeCode()+" is Benefactor. \nRank: 11";
        
      case 12:
        return "Supervision: "+this.type.toTypeCode()+" is Supervisor. \nRank: 12";
        
      case 13:
        return "Supervision: "+this.type.toTypeCode()+" is Supervisee. \nRank: 13";
        
      case 14:
        return "Quasi-identical (Rival). \nRank: 14";
        
      case 15:
        return "Contrary (Ultimate Rival). \nRank: 15";
        
      default:
        return "Conflict. \nRank: 16";
        
    }
  }

}
