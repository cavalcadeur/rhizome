// Fichier qui initialise les variables. Il contient la fonction init(), drawObject() et la fonction taille().

function init(){
    Painter.init(70,55,30,10,3);
    
    colorSet = [[[97,97,97],[65,65,65],[140,140,140,-30,-30,-30],[0,0,0]],
                [[90,70,50],[80,64,46],[20,70,10,2,5,1],[72,98,178]],
                [[37,37,97],"rgb(115,65,65)",[138,138,179,10,10,15],[2,4,28]],
                [[80,80,130],"rgb(40,40,85)",[140,140,200,-30,-30,-20],[0,0,50]],
                [[170,170,170],"rgb(150,150,150)",[210,210,210,-20,-20,-20],[0,0,15]],
                [[97,97,97],"rgb(65,65,65)",[140,140,140,-30,-30,-30],[28,134,182]],
                [[5,28,5],[4,20,4],[5,50,13,0,10,2],[5,13,0]],
                [[45,63,64],[27,38,38],[38,45,80,-3,-5,-8],[12,6,28]],
                [[0,25,30],"rgb(0,20,25)",[4,35,45,0,7,7],[0,5,10]]];
    
    quests = {"chef":0,"jehan":0,"garcon":0,"boussole":0,"boussoleF":0,"dev":0,"sky":0,"pencil":0,armes:{"pencil":1}};
    
    imgHeros = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
    
    imgArbre = ["heart2-lvl","temple-lvl","arbrePierre","bambou","eraseMonsters","pont5","passerelle0","passerelle1","passerelle2","passerelle3","barriere0","barriere1","barriere2","palmiton","herbe0","herbe1","herbe2","rhizome0","rhizome1","rhizome2","rhizome3","rhizome4","rhizome5","rhizome6","rhizome7","rhizome8","rhizome9","rhizome10","bush0","house0","house1","house2","palmier","sword1","sword2","sword3","gear","special","lambda0","fastTravel","loot","outDoor","inDoor","monsters","fireTemple","sky","sky1","sky2","sky3","expand","rocher","shell","coffre0","coffre1","spe","save","delete","fill","pole","tele","eraseAll","GPS","switch0","switch1","wireGate0","wireGate1","wire0","wire1","porteTemple0","porteTemple1","porteTemple2","porteTemple1-2","itemBubble","itemFly","wireWall0","wireWall1","wireBalloon0","wireBalloon1","wireBalloon2"];
    
    nSpeImg = 10;
    
    editObject = [[["bokoblin",2],["chuchu",17]],
                  [["gardeneer",4],["gotelem",10]],
                  [["bokoblin",2],["chuchu",17]],
                  [["bokoblin",2],["chuchu",17]],
                  [["bokoblin",2],["chuchu",17]],
                  [["bokoblin",2],["chuchu",17]],
                  [["herbiA",0],["carniA",1]],
                  [["herbiA",0],["carniA",1]],
                  [["bokoblin",2],["chuchu",17]]];
    
    editArray = {"gear":["tele","eraseAll","eraseMonsters","GPS","itemBubble","itemFly"],"switch1":["switch0","switch1","wireGate0","wireGate1","wire0","wire1","wireWall0","wireWall1","wireBalloon0","wireBalloon1"],"herbe0":["herbe0","herbe1","herbe2","palmier","rhizome0","arbrePierre","bambou"],"outDoor":["porteTemple0","porteTemple1","porteTemple2","porteTemple1-2","pont3","pont4","pont5","passerelle0","passerelle1","passerelle2","passerelle3","barriere0","barriere1","barriere2","house0","house1","house2","lambda0","pole"],"inDoor":[],"monsters":["bokoblin","chuchu","moblin","feu","scie","ballon"],"fireTemple":[],"sky":["sky","sky1","sky2","sky3","delete","expand","fill"],"special":["tele","mark","coffre2","fastTravel"],"spe":["spe0","spe1","spe2","spe3","spe4","spe5","spe6","spe7","spe8","spe9"]};
    
    boatPosition = [200,100];

    chargImage.coeur = ["coeurVide","coeur1","coeur05"];
    chargImage.debris = ["flyDown0","flyDown1","pafBubble","pot3","pot4","palmier0","palmier1","palmier2","palmier3","palmier4","herbe0","herbe1","herbe2","herbe3","herbe4","gardeneer0","gardeneer1","gardeneer2","gardeneer3","gardeneer4","fumeeM","fumeeF","feu0","feu1","feu2","feu3","flamme0","flamme1","hook","chaineA","excla","hitB","rond","eclabousse","rondB","eclabousseB","sword0","sword1","sword2","sword3","pale0","bla","fumeeP","swordWallHit","souffle0","souffle1","souffle2","souffle3"];
    chargImage.interface = ["blank","sword","pencil"];
    chargImage.rubis = ["rubisVert","rubisBleu","rubisRouge","rubisBlanc","fragment","coeur","bourgeon"];
    chargImage.PNJ = ["petitFan","pancarte"];
    chargImage.truc = ["mastersword0","mastersword1","mastersword2","mastersword3","boomerang0","boomerang1","boomerang2","boomerang3","pencil0","pencil1","pencil2","pencil3","pot0","pot1","pot2","pot3","baton0","baton1","baton2","baton3","batonF0","batonF1","batonF2","batonF3"];

    Map.taille = taille;
}

function drawObj(x,y,z,obj,ctxa,t){
    if (obj[0] == "coffre3") objetMort = 1;
    if (obj[0] == "porteTemple0" || obj[0] == "porteTemple1" || obj[0] == "porteTemple2" || obj[0] == "porteTemple1-2" || obj[0] == "pont4" || obj[0] == "pont5" || obj[0] == "rhizome0" || obj[0] == "rhizome1" || obj[0] == "rhizome2" || obj[0] == "rhizome3" || obj[0] == "rhizome4" || obj[0] == "rhizome5" || obj[0] == "rhizome6" || obj[0] == "rhizome7" || obj[0] == "rhizome8" || obj[0] == "rhizome9" || obj[0] == "rhizome10" || obj[0] == "herbe2" || obj[0] == "herbe1" || obj[0] == "herbe0" || obj[0] == "rocher" || obj[0] == "shell" || obj[0] == "switch1" || obj[0] == "switch0" || obj[0] == "wire0" || obj[0] == "wire1" || obj[0] == "wireGate0" || obj[0] == "wireGate1" || obj[0] == "wireWall0" || obj[0] == "wireWall1" || obj[0] == "wireBalloon0" || obj[0] == "wireBalloon1" || obj[0] == "wireBalloon2") Painter.img( ctxa, x+0.1, y + 0.5, z, imgElement[obj[0]] );
    //else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
    else if (obj[0] == "PNJ") Painter.img( ctxa, x,y,z,imgPersoN[obj[1]]);
    else if (obj[0] == "passerelle0" || obj[0] == "passerelle1" || obj[0] == "passerelle2" || obj[0] == "passerelle3") Painter.img( ctxa, x,y + 0.5,z + obj[1],imgElement[obj[0]]);
    else if (obj[0] == "house1") Painter.img( ctxa, x-0.1,y + 0.5,z,imgElement[obj[0]]);
    else if (obj[0] == "house2") Painter.img( ctxa, x+0.1,y + 0.5,z,imgElement[obj[0]]);
    else if (obj[0] == "itemBubble" && t != undefined) Painter.img( ctxa, x, y, z + Math.sin(t/500)/3, imgElement[obj[0]]);
    else Painter.img( ctxa, x, y, z, imgElement[obj[0]] );
}

function taille(caseT){
    var tailles = {"palmier":9.2,"porteTemple0":6,"porteTemple1-2":6,"porteTemple2":6,"wireGate1":1.5,"wireWall0":1.5,"wireWall1":1.5,"wireBalloon2":1.5,"bambou":8,"arbrePierre":4,"pont0":1,"pont1":1,"pont2":1,"pont3":1,"pont4":1,"pont5":1,"barriere0":2.4,"barriere1":2.4,"barriere2":2.4,"palmiton":2,"rocher":0.3,"wallI":12,"house0":4.2,"PNJ":2.5,"pole":3.9,"coffre0":1.5,"coffre1":1.2,"spe0":[0,2.5,3,0,0,0,3,0,2.5][out],"spe1":[0,3.8,0.8,3,12,15,6,0,2.2][out],"spe2":[0,0,0,0,0,0,1.01,0,2.3][out],"spe3":[0,10.5,0,0,0,0,1.01,0,2.3][out],"spe4":[0,9.5,0,0,0,0,1.01][out],"spe5":[0,10,0,0,0,0,0][out],"spe6":[0,4,0,0,0,0,0][out],"spe7":[0,0,0,0,0,0,0][out],"spe8":[0.5,0,0,0,0,0,0][out],"spe9":[0,0,0,0,0,0,0][out]};
    if (tailles[caseT] == undefined) return 0;
    else return tailles[caseT];
}

