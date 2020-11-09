var CarniA = function(){
    var x = 0;
    var y = 0;
    var z = 0;
    var r = 0;
    var g = 0;
    var img = 1;
    var mort = 0;
    var scale = 1;
    var fx;
    var fy;
    var fm;
    var n = 0;
    var sens = 2;
    var high = 1;
    var eyeSight = 4;
    var champsVision = [];
    var objectif = [0,0,0];
    var degat = 0.5;
    var pv = 100;
    var flyMode = 1;
    var shrink = 0;

    function walking(){
        
    }

    function looking(){
        
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

        },
        display: function(){
            Painter.imgEnnemy( ctx, x, y+0.3, z, scale, r, imgMonstre[img] );
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
            return [fx,fy,"carniA",mort];
        },
        isThere(XX,YY,ZZ){
            return false;
        },
        damage(degat,sensD){
            
        }
    };
}
