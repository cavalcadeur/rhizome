// Fichier pour la selection de l'environnement à explorer. On a besoin de fonctions d'affichage, d'interaction, de changement de mode et de sauvegarde.

let lvlAvailable = [[6,"heart",100],[7,"temple",100]];
let lvlHighlight = 0;

let lvlCompletion = [0,0];
let lvlCurrent = 0;

function lvlSelecter(t){
    ctx.fillStyle = colors[0];
    ctx.fillRect(0,0,W,H);
    backDraw();
    
    let idealSize = Math.min(W / lvlAvailable.length,H * 0.85);
    let margin = [(W / lvlAvailable.length - idealSize) / 2, (H * 0.85 - idealSize) / 2];
    for (let i = 0; i < lvlAvailable.length; i ++){
        if (i == lvlHighlight)  ctx.drawImage(imgElement[lvlAvailable[i][1] + "-lvl"],-idealSize/40 + i * W/lvlAvailable.length + margin[0],-idealSize/40 + margin[1],idealSize*1.05,idealSize*1.05);
        else ctx.drawImage(imgElement[lvlAvailable[i][1] + "-lvl"],idealSize/40 + i * W/lvlAvailable.length + margin[0],idealSize/40 + margin[1],idealSize*0.95,idealSize*0.95);

        ctx.fillStyle = "rgb(250,250,250)";
        ctx.font = Math.round(H/10) + "px purisa";
        ctx.textAlign = "center";
        ctx.fillText(Math.round(100 * lvlCompletion[i] / lvlAvailable[i][2]) + "%", (i+0.5) * W/lvlAvailable.length , H * 0.92);
    }

    if (mouse[0] <= H * 0.85){
        lvlHighlight = Math.floor(lvlAvailable.length * mouse[1] / W);
    }
    else lvlHighlight = -1;
}

function goLvlSelector(){
    onSea = 1;
}
