let HerbiA = function(){
    let x = 0;
    let y = 0;
    let z = 0;
    let r = 0;
    let g = 0;
    let img = 0;
    let mort = 0;
    let scale = 1;
    let fx;
    let fy;
    let fm;
    let n = 0;
    let sens = 2;
    let high = 1;
    let eyeSight = 4;
    let champsVision = [];
    let objectif = [0,0,0];
    let degat = 0.5;
    let pv = 100;
    let flyMode = 1;
    let shrink = 0;
    let nFrameWalk = 60;
    let rushSpeed = 3;

    function walking(){
        img = 0;
        n += 1;
        x += vecteurs[sens][1] / nFrameWalk;
        y += vecteurs[sens][0] / nFrameWalk;
        
        if (n == nFrameWalk){
            n = 0;
            let bite = Map.getCell(Math.floor(x),Math.floor(y));
            if (bite[0][0].indexOf("rhizome") == 0) {this.doing = rampaging;}
            else this.doing = looking;
        }
    }

    function looking(){
        sens = rnd(4);
        let zz = Map.getFloor(Math.floor(x) + vecteurs[sens][1],Math.floor(y) + vecteurs[sens][0],z);
        if (zz <= z + 0.4 && zz > -1){
            this.doing = walking;
            n = 0;
        }
    }

    function rampaging(){
        n += 1;
        if (n <= 12) img = 1;
        else if (n <= 19) img = 2;
        else if (n == 20) {
            let zz = Map.getCell(Math.floor(x),Math.floor(y))[0][0];
            if (zz.indexOf("rhizome") == 0 && zz != "rhizome0") {
                Map.suppressObject(Math.floor(x),Math.floor(y),0);
                addParticles("cutGrass",x-0.5,y-0.5,z-0.1,-0.2,0,80,"gardeneer");
            }
        }
        else{
            img = 0;
            let pizzaz = rnd(4);
            for (let jj = 0; jj < 4; jj ++){
                sens = (jj + pizzaz) % 4;
                let zz = Map.getCell(Math.floor(x) + vecteurs[sens][1],Math.floor(y) + vecteurs[sens][0]);
                if (zz[0][0].indexOf("rhizome") == 0 && zz[1] <= z + 0.4 && zz[1] > -1){
                    this.doing = rushing;
                    n = 0;
                    return;
                }
            }
            this.doing = looking;
            
        }
    }

    function rushing(){
        img = 1;
        n += rushSpeed;
        x += rushSpeed*vecteurs[sens][1] / nFrameWalk;
        y += rushSpeed*vecteurs[sens][0] / nFrameWalk;
        
        if (n == nFrameWalk){
            n = 0;
            let bite = Map.getCell(Math.floor(x),Math.floor(y));
            if (bite[0][0].indexOf("rhizome") == 0) this.doing = rampaging;
            else this.doing = looking;
        }
    }
    
    function charging(){
        
    }

    function damageFly(){
        
    }

    function going(){
        
    }

    function react(){
        
    }

    function accessible(){
        
    }

    function nada(){

    }
    function nadaR(){
        return false;
    }
    function meurs(){
        alert("Je suis MORT !");
        this.act = nada;
        this.display = nada;
        this.doing = nada;
        this.isThere = nadaR;
    }

    return {
        create: function(xx,yy,mm){
            if (mm == 0){
                this.act = nada;
                this.display = nada;
                this.doing = nada;
                this.isThere = nadaR;
                return;
            }
            else {
                x = xx;
                y = yy;
                fx = xx;
                fy = yy;
                fm = mm;
                z = 0;
                this.doing = looking;
                mort = mm;
            }
        },
        act: function(){
            if (z > Map.getFloor(Math.floor(x),Math.floor(y),z)){
                g -= 0.1;
                z += g/2;
            }
            else{
                g = 0;
                z = Map.getFloor(Math.floor(x),Math.floor(y),z);
            }
        },
        display: function(){
            Painter.imgEnnemy( ctx, x, y, z, scale, r, imgMonstre[img] );
        },
        doing: function(){

        },
        giveY(){
            return Math.floor(y);
        },
        giveX(){
            return Math.floor(x);
        },
        takeBack(){
            if (fm == 2) mort = 2;
            return [fx,fy,"herbiA",mort];
        },
        isThere(XX,YY,ZZ){
            return false;
        },
        damage(degat,sensD){
            
        }
    };
}
