
import game from './game';
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
        let opacityRatio = 1-this.game.timer/this.game.starDuration;
        let minOpacity=50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
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
