// Fichier qui gère les inputs effectués via le clavier.

function keyDown(keyCode){
    
    touchCount += 1;
    if (alerting == 1) {
        //disalert();
        if (figer == 1){
            disalert();
            figer = 0;
            heros[0].aura = "";
            heros[1].aura = "";
        }
        return;
    }
    //Crossed.keysPress(event.keyCode);
    if (keys[keyCode] != 1 && cinematicos != 11){
        if (keyCode == " ") {
            editHand = editObject[out];
            drawInterface = AEditInterface;
            editnumber = 1;
            editM = 0;
            if (edition == 0)edition = 1;
        }
    }
    keys[keyCode] = 1;
}

function keyUp(keyCode){
    //touchCount += 1;
    keys[keyCode] = 0;
    if (onSea == 6){
        toucheHelp(keyCode);
        return;
    }
    if (alerting == 1 || cinematicos == 11) {
        //disalert();
        return;
    }
    if (keyCode == heros[0].touche[5] && onSea == 0) changeArme(0);
    else if (keyCode == heros[1].touche[5] && onSea == 0) changeArme(1);
    else if ((keyCode == "i" && heros[0].touche[8] == undefined) || keyCode == heros[0].touche[8]) {
        if (onSea == 0) goInvent();
        else if (onSea == 4) endInvent();
    }
    else if ((keyCode == "a" && heros[0].touche[7] == undefined) || keyCode == heros[0].touche[7]){
        if (edition == 1){
            helpPencil(editHand[editnumber]);
        }
        else if (onSea == 0){
            onSea = 6;
        }
        else if (onSea == 6){
            onSea = 0;
        }
    }
    if (cinematicos == 6){
        imgCinema[8] += 1;
    }
}
