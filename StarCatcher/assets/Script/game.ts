
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
    @property(cc.AudioClip)
    gainAudio:cc.AudioClip=null;

    @property
    maxStarDuration:number = 0;
    @property
    minStarDuration:number = 0;
    @property(cc.Node)
    rankNode=null;
    @property(cc.Prefab)
    rankRaw:cc.Prefab=null;
    groundY=0;
    Sc=0;
    timer=0;
    starDuration=0;

    onLoad () {
        this.timer=0;
        this.starDuration=0;
        this.groundY = this.ground.y + this.ground.height/2;
        this.spawnNewStar();
    }

    start () {

    }

    update (dt) {
        if(this.timer>this.starDuration){
            this.gameOver();
            return;
        }
        this.timer +=dt;
    }

    spawnNewStar(){
        let newStar = cc.instantiate(this.starPre);
        this.starDuration = this.minStarDuration + Math.random()*(this.maxStarDuration-this.minStarDuration);
        this.timer=0;
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
        this.Score.string = "Score: ";
        this.Score.string += this.Sc.toString();
        cc.audioEngine.play(this.gainAudio,false,1);
    }

    gameOver(){
        this.player.stopAllActions();
        cc.director.loadScene("mainScene");
    }

    toRank(){
        this.rankNode.active = true;
        let content = this.rankNode.getChildByName("RankScrollView").getChildByName("view").getChildByName("content");
        for(let i=0;i<10;i++){
            let rankRaw = cc.instantiate(this.rankRaw);
            content.height += rankRaw.height+1;
            this.rankNode.getChildByName("RankScrollView").
                getChildByName("view").getChildByName("content").addChild(rankRaw);
        }
    }
}
