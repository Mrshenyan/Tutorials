const {ccclass, property} = cc._decorator;

@ccclass
export default class game extends cc.Component {

    @property(cc.Prefab)
    starPre:cc.Prefab=null;
    @property(cc.Node)
    ground:cc.Node=null;
    @property(cc.Node)
    player:cc.Node=null;
    @property(cc.Label)
    Score:cc.Label=null;

    maxStarDuration:0;
    minStarDuration:0;
    groundY=0;
    Sc=0;
    onLoad () {
        this.groundY = this.ground.y + this.ground.height/2;
        this.spawnNewStar();
    }

    start () {

    }

    // update (dt) {}

    spawnNewStar(){
        let newStar = cc.instantiate(this.starPre);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent("Star").game = this;
    }

    getNewStarPosition(){
        let ranX = 0;
        let randY = this.groundY + Math.random() * this.player.getComponent("Player").JumpHeight + 50;
        let maxX = this.node.width/2;
        ranX = (Math.random() - 0.5)* 2 * maxX;
        console.log(randY);
        return cc.v2(ranX,randY);
    }

    gainScore(){
        this.Sc++;
        this.Score.string = "Score: "+this.Sc.toString();
    }
}
