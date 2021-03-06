// Ce fichier contient toutes les fonctions de dessins. Ces fonctions servent à dessiner concretement le jeu durant les phases en vue de dessus qui sont quasiment les seules phases
// Il y a ici les fonctions drawRoom() draw() drawHeros() drawEnnemi() drawInterface()

let param = {antiClip:5,help:true};

function drawRoom(kk,ctxa,map,t){
    let gonnaHelp = param.help;
    for(var y = scrollCaseY;y < scrollCaseY + nCasesY;y++){
        for(var x = scrollCaseX; x < scrollCaseX + nCasesX ;x++){
            let cell = map.getCell(x,y); 
            let f = cell[1];
            let outline = cell[4];
            /*
            if (outline[2] == undefined){        // A n'activer qu'en cas de besoin
                map.updateOutlinesCase(x,y,0);  //  Cela sert à remettre d'aplomb des données qui seraient partielles
            }
            */
            gonnaHelp = gonnaHelp && (f == -1);
            Painter.cell( ctxa, x, y, f ,0 , outline);

            drawObj(x,y,f,cell[0],ctxa, t);

            
            
            if (ennemyRefresh <= 0){
                if (cell[2].length > 0){
                    cell[2].forEach(
                        function(e,i){
                            particles.push(composeParticle(e));
                        }
                    );
                    map.clearParticle(x,y);
                }
                
                if (cell[3].length > 0){
                    cell[3].forEach(
                        function (e,i){
                            findEnnemy(e[2],ennemis.length,e[0],e[1],e[3]);
                        }
                    );
                    //console.log(ennemis);
                    map.clearEnnemy(x,y);
                }

            }
        }

        if (kk == 1){    
            ennemis.forEach(
                function(a,m){
                    if (a.giveY() == y) drawEnnemi(m);
                }
            );
        }
        
        particles.forEach(
            function(kgb,iii){
                if (y == Math.ceil(kgb.y)){
                    kgb.draw(kgb,ctxa,t);
                    kgb.act(kgb,iii);
                }
            }
        );
    }

    if (gonnaHelp && cinematicos == 0 && onSea == 0) {alert("Si vous êtes perdu, n'hésitez pas à appuyer sur i puis à sélectionner sur une zone pour recentrer la caméra."); param.help = false; mouseDOWN = false;}

    //ctx.globalAlpha = 1;
    
    if (ennemyRefresh <= 0){
        ennemyRefresh = ennemyRefreshLim;
    }
    else ennemyRefresh -= 1;
    takeBackEvent(map);

    for(let y = scrollCaseY + nCasesY;y < scrollCaseY + nCasesY + param.antiClip;y++){
        for(var x = scrollCaseX; x < scrollCaseX + nCasesX ;x++){
            let altititi = map.getFloor(x,y,666);
            let coorsss = Painter.realCoor(x,y,altititi);
            if (coorsss[1] < W && coorsss[0] > 0){
                let cell = map.getCell(x,y); 
                let f = cell[1];
                let outline = cell[4];
                /*
                  if (outline[2] == undefined){        // A n'activer qu'en cas de besoin
                  map.updateOutlinesCase(x,y,0);  //  Cela sert à remettre d'aplomb des données qui seraient partielles
                  }
                */
                Painter.cell( ctxa, x, y, f ,0 , outline);
                
                drawObj(x,y,f,map.getObject(x,y,true),ctxa, t);
            }
        }
    }
    //);
}

function takeBackEvent(map){
    // Fonction qui range les ennemis dans les cases hors de vue.
    // Cette fonction s'occupe aussi des particules.

    var listeSup = [];
    /*
    ennemis.forEach(
        function(a,m){
            var YY = a.giveY();
            var XX = a.giveX();
            if (YY >= scrollCaseY + nCasesY || XX >= scrollCaseX + nCasesX || XX < scrollCaseX || YY < scrollCaseY) {
                listeSup.splice(0,0,m);
            }
        }
    );

    for(var i = 0;i < listeSup.length;i++){
        var ranger = ennemis[listeSup[i]].takeBack();
        map.addEnnemy(ranger);
        ennemis.splice(listeSup[i],1);
    }
    */

    var listeSup = [];
    particles.forEach(
        function(a,m){
            
            if (a.y >= scrollCaseY + nCasesY || a.x >= scrollCaseX + nCasesX || a.x < scrollCaseX || a.y < scrollCaseY) {
                if (a.unkillable){
                    a.act(a,m);
                }
                else listeSup.splice(0,0,m);
            }
        }
    );

    for(var i = 0;i < listeSup.length;i++){
        var ranger = deComposeParticle(particles[listeSup[i]]);
        map.addParticle(particles[listeSup[i]].x,particles[listeSup[i]].y,ranger);
        particles.splice(listeSup[i],1);
    }
}

function draw(t) {
    // Cette fonction coordonne le dessin lors des phases de jeu sur le sol Elle appelle backDraw() pour le fond drawRoom() pour le niveau et drawInterface() pour l'interface
    ctx.fillStyle = colors[0];
    ctx.fillRect(0,0,W,H);
    backDraw();
    
    drawRoom(1,ctx,Map,t);

    if (casePencil[1] != "ah"){
        ctx.globalAlpha = 0.2;
        let ZZZ = Map.getAlti(casePencil[1],casePencil[0]);
        Painter.cell( ctx, casePencil[1], casePencil[0], ZZZ ,1 , []);  // Celui ci sert pour dessiner le curseur lors de l'edition
        ctx.globalAlpha = 1;
    }
    //else if (edition == 0) Painter.scrollCenter(heros[0].x,heros[0].y,heros[0].z,W,H);

    frontDraw();
    drawInterface();
}


function drawHeros(n){
    // Cette fonction dessine le heros n à l'écran
    if (edition == 1) return;
    if (heros[n].stun > 0) {
        heros[n].stun -= 1;
        if (heros[n].stun > 10000){
            return;
        }
        else if (heros[n].stun == 10000){
            heros[n].g = -1;
            heros[n].z += 0.2;
            heros[n].stun = 0;
        }
    }
    if (heros[n].mortal > 0){
        heros[n].mortal -= 1;
        if (heros[n].mortal % 4 < 2)return;
    }
    animObject[n].bf(n);
    var N = 0;
    if (Math.abs(heros[n].vx + heros[n].vy)%50 >= 25 && heros[n].g == 0) N = 24;
    //if (heros[n].plane == 1){
    //Painter.img(ctx,heros[n].x + heros[n].vx/50, heros[n].y + heros[n].vy/50,niveau[Math.round(heros[n].y + heros[n].vy/50)][Math.round(heros[n].x + heros[n].vx/50)],imgElement.marque);
    //}
    Painter.imgFullControl( ctx, heros[n].x + heros[n].vx/50, heros[n].y + heros[n].vy/50, heros[n].z, heros[n].s, heros[n].r, imgHeros[heros[n].img + heros[n].sens + n*32] , 1);
    animObject[n].f(n);
    //if (heros[n].invent[heros[n].objet] != "blank" && heros[n].imgUp == 0) {
    //Painter.img(ctx,heros[n].x + heros[n].vx/50,heros[n].y + heros[n].vy/50,heros[n].z,imgArme[heros[n].invent[heros[n].objet] + heros[n].sens]);
    //}
    if (heros[n].aura != ""){
        Painter.imgScale(ctx,heros[n].x + heros[n].vx/50,heros[n].y - 1 + heros[n].vy/50,heros[n].z,heros[n].tAura/40,imgElement[heros[n].aura]);
    }
}

function drawEnnemi(n){
    // affiche l'ennemi n à l'écran et le fais agir (Ce qui est une mauvaise chose !!!)
    ennemis[n].act();
    //if (edition == 0)ennemis[n].doing();
    ennemis[n].display();
}

function drawInterface(){
    drawInterface = AInterface;
}
