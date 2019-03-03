const {ccclass, property} = cc._decorator;

@ccclass
export default class Star extends cc.Component {

    @property
    pickRaidus: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        if(this,this.getPlayerDistance()<this.pickRaidus){
            this.onPicked();
            return;
        }
    }

    getPlayerDistance(){
        let playerPos = this.getComponent("Star").game.player.getPosition();
        let distance = this.node.position.sub(playerPos).mag();
        return distance;
    }

    onPicked(){
        this.getComponent("Star").game.spawnNewStar();
        this.getComponent("Star").game.gainScore();
        this.node.destroy();
    }
}
