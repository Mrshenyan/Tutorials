const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Sprite)
    player:cc.Sprite=null
    @property(Number)
    JumpHeight:number=0;
    @property(Number)
    JumpDuration:number=0;
    @property(Number)
    maxMoveSpeed:number=0;
    @property(Number)
    accel:number=0;

    accLeft=false;
    accRight=false;
    xSpeed = 0;

    onLoad () {
        this.node.runAction(this.jump());
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }

    start () {

    }

    update (dt) {
        if(this.accLeft){
            this.xSpeed -= this.accel * dt;
        }
        if(this.accRight){
            this.xSpeed += this.accel * dt;
        }

        if(Math.abs(this.xSpeed)>this.maxMoveSpeed){
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed)
        }
        this.node.x += this.xSpeed * dt;
    }

    jump(){
        //上升
        let jumpUp = cc.moveBy(this.JumpDuration,cc.v2(0,this.JumpHeight)).easing(cc.easeCubicActionOut());
        //下降
        let jummpDown = cc.moveBy(this.JumpDuration,cc.v2(0,-this.JumpHeight)).easing(cc.easeCubicActionIn());
        //猪脚不断上跳下落~
        return cc.repeatForever(cc.sequence(jumpUp,jummpDown));

    }

    onKeyDown(event){
        let keycode = event.keyCode
        switch(keycode){
            case cc.KEY.a:{
                this.accLeft = true;
                break;
            }
            case cc.KEY.d:{
                this.accRight = true;
                break;
            }
        }
    }

    onKeyUp(event){
        let keycode = event.keyCode;
        switch(keycode){
            case cc.KEY.a:{
                this.accLeft = false;
                break;
            }
            case cc.KEY.d:{
                this.accRight = false;
                break;
            }
        }
    }
}
