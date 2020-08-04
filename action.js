// Toutes les actions qui ont lieu quand le temps n'est pas arrêté. Bachibouzouk.

let delayedEvents = [];
let nextDelayedEvents = [];
let delaySec = 20;
let delayLastOne = 0


function growRhizome(x,y,button){
    let coor = Painter.case(Map,x,y);
    let cell = Map.getCell(coor[1],coor[0]);
    if (cell[1] <= -1) return;

    console.log(cell[0]);

    if (typeof(cell[0][0]) == "string"){
        if (cell[0][0].indexOf("rhizome") == 0 && cell[0][0] != "rhizome0"){
            Map.suppressObject(coor[1],coor[0],0);
            lvlCompletion[lvlCurrent] -= 1;
            return;
        }
    }
    if (taille(cell[0][0]) >= 1){
        return;
    }
    
    let cell2;
    for (let i = 0; i < 4; i ++){
        cell2 = Map.getCell(coor[1] + vecteurs[i][0],coor[0] + vecteurs[i][1]);
        if (typeof(cell2[0][0]) != "string") continue;
        if (cell2[0][0].indexOf("rhizome") == 0){
            if (Math.abs(cell2[1] - cell[1]) <= 1){
                if (cell[0][0] == "switch0") wireSignal(coor[1],coor[0],1);
                else if (cell[0][0] == "switch1") wireSignal(coor[1],coor[0],0);
                else {
                    Map.setObject(coor[1],coor[0],"rhizome" + (rnd(10) + 1),0);
                    lvlCompletion[lvlCurrent] += 1;
                }
                return;
            }
        }        
    }
}

function wireSignal(x,y,onOff){
    let cell = Map.getCell(x,y);
    if (cell[1] <= -1) return;
    
    if (typeof(cell[0][0]) == "string"){    // D'abord on éteint/allume la case.
        if (cell[0][0].indexOf("wire") == 0){
            if (cell[0][0] == "wire" + (1 - onOff)) Map.replaceObject(x,y,"wire" + onOff,0);
            else if (cell[0][0] == "wireGate" + (1 - onOff)) Map.replaceObject(x,y,"wireGate" + onOff,0);
            else return;
        }
        else if (cell[0][0] == "switch" + (1 - onOff)) Map.replaceObject(x,y,"switch" + onOff,0);        
        else return;
    }
    else return;

    let cell2;
    for (let i = 0; i < 4; i ++){
        cell2 = Map.getCell(x + vecteurs[i][0],y + vecteurs[i][1]);
        if (typeof(cell2[0][0]) == "string"){
            if (cell2[0][0].indexOf("wire") == 0) {
                if (cell2[0][0] == "wire" + (1-onOff) || cell2[0][0] == "wireGate" + (1-onOff)) nextDelayedEvents.push(["wireSignal",x + vecteurs[i][0],y + vecteurs[i][1],onOff]);
            }
        }
    }
}

function manageDelayedEvent(e){
    if (e[0] == "wireSignal"){
        wireSignal(e[1],e[2],e[3]);
    }
}

function action(t){
    //if (edition == 1) return;
    // Partie mouvement de la caméra yalalala lala. La.
    if ((mouse[0] < 25 && mouse[0] > 0 && parameters.mouseScrollPencil) || 1 == keys[heros[0].touche[0]]) {
        scrollEditSpeed[1] += scrollEditSpeed[2];
    }
    else if ((mouse[0] > H - 25 && parameters.mouseScrollPencil) || 1 == keys[heros[0].touche[2]]){
        scrollEditSpeed[1] -= scrollEditSpeed[2];
    }
    else if (scrollEditSpeed[1] != 0){
        if (scrollEditSpeed[1] > 0) scrollEditSpeed[1] -= scrollEditSpeed[2];
        if (scrollEditSpeed[1] < 0) scrollEditSpeed[1] += scrollEditSpeed[2];
        if (Math.abs(scrollEditSpeed[1]) < scrollEditSpeed[2]) scrollEditSpeed[1] = 0;
    }
    scrollEditSpeed[1] = Math.min(scrollEditSpeed[3],scrollEditSpeed[1]);
    scrollEditSpeed[1] = Math.max(-1 * scrollEditSpeed[3],scrollEditSpeed[1]);
        
    if ((mouse[1] < 25 && parameters.mouseScrollPencil) || 1 == keys[heros[0].touche[3]]) {
        scrollEditSpeed[0] += scrollEditSpeed[2];
    }
    else if ((mouse[1] > W - 25 && parameters.mouseScrollPencil) || 1 == keys[heros[0].touche[1]]){
        scrollEditSpeed[0] -= scrollEditSpeed[2];
    }
    else if (scrollEditSpeed[0] != 0){
        if (scrollEditSpeed[0] > 0) scrollEditSpeed[0] -= scrollEditSpeed[2];
        if (scrollEditSpeed[0] < 0) scrollEditSpeed[0] += scrollEditSpeed[2];
        if (Math.abs(scrollEditSpeed[0]) < scrollEditSpeed[2]) scrollEditSpeed[0] = 0;
    }
    scrollEditSpeed[0] = Math.min(scrollEditSpeed[3],scrollEditSpeed[0]);
    scrollEditSpeed[0] = Math.max(-1 * scrollEditSpeed[3],scrollEditSpeed[0]);
    
    Painter.scrollPlus(scrollEditSpeed[0],scrollEditSpeed[1],W,H);
    if (edition == 1) return;

    // Partie delayedEvents : EHE !      ["type",x,y,param1,param2, ...]
    if (t - delayLastOne > delaySec){
        if (delayedEvents.length >= 50) delayedEvents = [];
        delayLastOne = t;
        delayedEvents.forEach(manageDelayedEvent);
        delayedEvents = JSON.parse(JSON.stringify(nextDelayedEvents));
        nextDelayedEvents = [];
    }    
}

function fall(h,n){
    var truc = Map.getObject(h.x,h.y,true);
    if (truc != "avaleur1" && truc != "avaleur2"){
        if (out == 1 || out == 3){
            addParticles("rond",h.x,h.y,-1,0,0,30,0.3);
            //particles.push({n:0,x:h.x,y:h.y,s:0.3,type:"rond",lim:30,alti:-1,g:0});
            addParticles("eclabousse",h.x,h.y,-1,15,0,30,0);
            //particles.push({n:0,x:h.x,y:h.y,s:0,type:"eclabousse",lim:30,alti:-1,g:15});
        }
        else if (out == 2){
            addParticles("rondB",h.x,h.y,-1,0,0,30,0.3);
            //particles.push({n:0,x:h.x,y:h.y,s:0.3,type:"rondB",lim:30,alti:-1,g:0});
            addParticles("eclabousseB",h.x,h.y,-1,15,0,30,0);
            //particles.push({n:0,x:h.x,y:h.y,s:0,type:"eclabousseB",lim:30,alti:-1,g:15});
        }
        if (Map.getFloor(respawnPoint[0],respawnPoint[1],10) <= -1){
            var xxx = 0;
            
            // Bon la case de respawn n'est pas suffisament haute, on va donc la remonter pour que les personnages puissent y atterir correctement.
            Map.setAlti(respawnPoint[0],respawnPoint[1],0,Painter,true);            
             
        }
        heros[n].x = respawnPoint[0];
        heros[n].y = respawnPoint[1];
        heros[n].stun = 20;
        heros[n].mortal = 60;
    }
}

function move(d,n,gg){
    if (heros[n].stun > 0) return;
    if (heros[n].sens != d){
        heros[n].sens = d;
        heros[n].img = 0;
        chooseAnimObject(n);
        heros[n].delay = 6;
        if (n == 0){
            if (heros[0].prim == "mastersword" && keys[32] == 1){
                attack(0,1);
            }
        }
        if (heros[n].invent[heros[n].objet] == "mastersword"){
            if ((n == 0 && keys[16] == 1) || (n == 1 && keys[13] == 1))
                attack(n);
        }
        return;
    }
    if (heros[n].delay != 0){
        heros[n].delay -= 1;
        return;
    }
    heros[n].wear = 0;
    chooseAnimObject(n);
    // if (gg == 0 && heros[n].plane == 0 && heros[n].g == 0){

    let truc = Map.getObject(heros[n].x + vecteurs[d][1],heros[n].y + vecteurs[d][0],true);
    if (heros[n].sens == 0){
        if (truc[0] == "house0" || truc[0] == "house1" || (truc[0] == "spe4" && out == 1)){
            teleport = [heros[n].y+vecteurs[d][0],heros[n].x+vecteurs[d][1]];
            if (truc[1] == "void"){
                goToLevel(out,"void",0,0,0,0);
            }
            else {
                // Structure du lot : [objet, out, goto, x,y]
                console.log(truc);
                goToLevel(truc[1],truc[2],truc[3],truc[4],truc[3],truc[4]);
            }
        }
    }
    if (heros[n].z + 1 < Map.getFloor(heros[n].x+vecteurs[d][1],heros[n].y+vecteurs[d][0],heros[n].z)){
        /*
        if (truc[0] == "rocher"){
            var YY = heros[n].y+vecteurs[d][0];
            var XX = heros[n].x+vecteurs[d][1];
            if (XX + vecteurs[d][1] == -1 || YY + vecteurs[d][0] == -1 || XX + vecteurs[d][1] == niveau[YY].length || YY + vecteurs[d][0] == niveau.length) return;
            if (objNiveau[YY][XX].length == 1 ) objNiveau[YY][XX][0] = "";
            else objNiveau[YY][XX].splice(0,1);
            addParticles("object",XX+0.5,YY+0.5,niveau[YY][XX],0,vecteurs[heros[n].sens][1]*0.19,vecteurs[heros[n].sens][0]*0.19,"rocher",0,"normal");
            //particles.push({n:0,type:"rocher",x:XX,y:YY,g:0,alti:niveau[YY][XX],lim:-5,sens:heros[n].sens,endu:1});
            heros[n].stun = 10;
        }
         */
        return;
    }
    //}

    if (heros[n].g == 0){
        var floor = Map.getFloor(heros[n].x+vecteurs[d][1],heros[n].y+vecteurs[d][0],heros[n].z);
        if (heros[n].z - floor > 1 || floor <= -1){
            heros[n].anim = jumpAnim;
            heros[n].datAnim = d;
            //console.log("JUMP !!!");
        }
        else if (heros[n].z != floor){
            heros[n].anim = walkLedgeAnim;

            heros[n].datAnim = heros[n].z;
            heros[n].x +=  vecteurs[d][1];
            heros[n].y +=  vecteurs[d][0];
            heros[n].vx += -50 * vecteurs[d][1];
            heros[n].vy += -50 * vecteurs[d][0];
        }
        else{
            heros[n].anim = walkAnim;
            
            heros[n].x +=  vecteurs[d][1];
            heros[n].y +=  vecteurs[d][0];
            heros[n].vx += -50 * vecteurs[d][1];
            heros[n].vy += -50 * vecteurs[d][0];
        }
    }
    else {
        heros[n].anim = walkAnim;
        
        heros[n].x +=  vecteurs[d][1];
        heros[n].y +=  vecteurs[d][0];
        heros[n].vx += -50 * vecteurs[d][1];
        heros[n].vy += -50 * vecteurs[d][0];
    }
    // On avance d'un pas. Si il s'agit du joueur 1 qui avance, tous les pas, on place un nouveau spawnPoint sous ses pieds.
    if (n == 0) {
        nPas += 1;
        if (Map.getAlti(heros[0].x,heros[0].y) > -1){
            respawnPoint[0] = heros[0].x;
            respawnPoint[1] = heros[0].y;
        }
    }
    if (heros[n].etat == 1 && heros[n].g == 0) {heros[n].g = -0.20; heros[n].z += 0.01;}
}

function changeArme(n){
    
    if (heros[n].etat != 0){
        cinematicos = 4;
        heros[n].etat = 0;
        imgCinema[0] = n;
        imgCinema[1] = "coffre3";
        imgCinema[2] = "heros";
    }
    else{
        if (heros[n].timerF > 0) heros[n].timerF = 0;
        if (heros[n].invent[heros[n].objet] == "batonF") heros[n].invent[heros[n].objet] = "baton";
        heros[n].objet = (heros[n].objet+1)%heros[n].invent.length;
    }
    chooseAnimObject(n);
}

function findVoisin(n){
    var result = "void";
    if (out == 1){
        iles[goto].voisins.forEach(
            function(e){
                if (e[1] == n){
                    result = e[0];
                }
            }
        );
    }
    else{
        interieurs[goto].voisins.forEach(
            function(e){
                if (e[1] == n){
                    result = e[0];
                }
            }
        );
    }
    return result;
}
