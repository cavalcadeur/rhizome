function action(t){
    if (edition == 1) return;
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
