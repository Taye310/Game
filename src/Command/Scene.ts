class GameScene {
    private static scene: GameScene;
    static map: doMap;
    static chara: Character;
    constructor(type: string, main: Main) {
        //super();
        switch (type) {
            case "MainScene":
                GameScene.map = new doMap();
                main.addChild(GameScene.map);

                GameScene.chara = new Character(main);
                main.addChild(GameScene.chara);
                GameScene.chara.idle();

                GameScene.map.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent): void {
                    if (main.bagState == true) {
                        main.removeChild(main.panel);
                        main.bagState = false;
                    }

                    var startx: number = Math.floor((GameScene.chara._body.x + 50) / 100);
                    var starty: number = Math.floor(GameScene.chara._body.y / 100);
                    var endx: number = Math.floor(e.localX / 100);
                    var endy: number = Math.floor(e.localY / 100);
                    var path: TileNode[] = GameScene.map.astarPath(startx - 1, starty, endx, endy);
                    //console.log(endx);
                    if (path.length > 1) {
                        //chara.move(e.localX, e.localY, path);
                        main.list.cancel();
                        //egret.Tween.removeAllTweens();
                        main.list.addCommand(new WalkCommand(GameScene.chara, e.localX, e.localY, path));
                        main.list.execute();
                    }
                }, this);
                GameScene.map.touchEnabled = true;
                //main.stage.touchEnabled=true;
                /////////////////////////////////////////////////////////////////

                var taskList = new Array<Task>();
                taskList[0] = new Task("0", "对话任务", TaskStatus.ACCEPTABLE, "desc", "npc_0", "npc_1", new NPCTalkTaskCondition());
                taskList[1] = new Task("1", "杀十个白玉昆", TaskStatus.UNACCEPTABLE, "desc", "npc_0", "npc_1", new KillMonsterTaskCondition());
                var instance = TaskService.getInstance();//danli

                var taskPanel = new TaskPanel();
                main.addChild(taskPanel);

                for (var i = 0; i < taskList.length; i++) {
                    TaskService.getInstance().taskList[i] = instance.getTaskByCustomRole(function addTask() {
                        if (taskList[i].status == TaskStatus.UNACCEPTABLE || taskList[i].status == TaskStatus.SUBMITTED) {
                            taskList[i] == null;
                        }
                        console.log(TaskService.getInstance().taskList[1])
                        return taskList[i];
                    });
                }
                var NPC_0 = new NPC("npc_0", 20, 500, "npc_0_png", main);
                var NPC_1 = new NPC("npc_1", 500, 100, "npc_1_png", main);
                main.addChild(NPC_0);
                main.addChild(NPC_1);
                console.log(TaskService.getInstance().taskList[0]);
                // for(var task of taskList){
                //     console.log(task.name);
                // }

                var killButton = new egret.TextField;
                killButton.x = 300;
                killButton.y = 700;
                killButton.textColor = 0x000000;
                killButton.text = "MONSTER";
                main.addChild(killButton);
                killButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e: egret.TouchEvent): void {
                    if (main.bagState == true) {
                        main.removeChild(main.panel);
                        main.bagState = false;
                    }

                    var startx: number = Math.floor((GameScene.chara._body.x + 50) / 100);
                    var starty: number = Math.floor(GameScene.chara._body.y / 100);
                    var endx: number = Math.floor(e.stageX / 100);
                    var endy: number = Math.floor(e.stageY / 100);
                    var path: TileNode[] = GameScene.map.astarPath(startx - 1, starty, endx, endy);

                    if (path.length > 1) {
                        main.list.cancel();
                        main.list.addCommand(new WalkCommand(GameScene.chara, e.localX, e.localY, path));
                        console.log(path)
                    }
                    main.list.addCommand(new FightCommand(main));
                    main.list.execute();

                    // if (TaskService.getInstance().taskList[1].status == TaskStatus.DURING) {
                    //     TaskService.getInstance().taskList[1]._current++;
                    //     main.killCount.text = "Killed " + TaskService.getInstance().taskList[1]._current;
                    //     console.log(TaskService.getInstance().taskList[1]._current)
                    //     if (TaskService.getInstance().taskList[1]._current == 10) {
                    //         TaskService.getInstance().finish(TaskService.getInstance().taskList[1].id);
                    //     }
                    // }
                }, this);
                killButton.touchEnabled = true;
                break;
        }
    }
    public static replaceScene(scene: GameScene) {
        GameScene.scene = scene;
    }

    public static getCurrentScene(): GameScene {
        return GameScene.scene;
    }

}
