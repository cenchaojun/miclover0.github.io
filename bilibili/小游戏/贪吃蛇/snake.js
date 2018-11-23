var area = document.querySelector(".area");
var wrap = document.querySelector(".wrap");
var direction = "right";  // 蛇运动的方向
var food;  // 表示food
init();
drawArea();
initSnake();
var temp = document.querySelectorAll(".wrap div");
var snakeBody = [temp[2], temp[1], temp[0]];  // 为了更好使用数组的一些方法
putFood();
move();

/*初始化的的一些工作: 注册事件*/
function init(){
    document.onkeydown = function (e){
        switch (e.keyCode){
            case 37:
                if (direction == "right") return;
                direction = "left";
                break;
            case 38:
                if (direction == "down") return;
                direction = "up"
                break;
            case 39:
                if (direction == "left") return;
                direction = "right"
                break;
            case 40:
                if (direction == "up") return;
                direction = "down"
                break;
        }
    }
}

/*绘制蛇移动的方格区域*/
function drawArea(){
    for (var i = 0; i < 400; i++){
        var li = document.createElement("li");
        area.appendChild(li);
    }
}

/*初始化蛇的位置*/
function initSnake(){
    console.log("aaaa");
    for (var i = 0; i < 3; i++){
        var div = document.createElement("div");
        wrap.appendChild(div);
    }
}

/*让蛇运动*/
function move(){
    setTimeout(function step(){
        var headTop = snakeBody[0].offsetTop;  //蛇头的left值\
        var headLeft = snakeBody[0].offsetLeft;
        snakeBody.unshift(snakeBody.pop());
        if (direction == "left"){
            snakeBody[0].style.left = headLeft - 30 + "px";
            snakeBody[0].style.top = headTop + "px";
        }else if (direction == "right"){
            snakeBody[0].style.left = headLeft + 30 + "px";
            snakeBody[0].style.top = headTop + "px";

        }else if (direction == "up"){
            snakeBody[0].style.top = headTop - 30 + "px";
            snakeBody[0].style.left = headLeft + "px";
        }else{
            snakeBody[0].style.top = headTop + 30 + "px";
            snakeBody[0].style.left = headLeft + "px";
        }
        /*吃食物食物*/
        eatFood();
        /*蛇每走完一步,都判断一次射是否死亡了*/
        if (judgeFail()){
            alert("游戏结束!!!")
            return;
        }
        setTimeout(step, 3000 / snakeBody.length);
    }, 1000);
}

/*判断蛇是否撞墙死了*/
function judgeFail(){
    var headLeft = snakeBody[0].offsetLeft;
    var headTop = snakeBody[0].offsetTop;
    /*headleft < 0 || headleft > 570  || top <0 || top > 570*/
    return headLeft < 0 || headLeft > 570 || headTop < 0 || headTop > 570;
}

/*投放食物*/
function putFood(){
    food = document.createElement("div");
    food.style.background = "green";

    var position = getFoodPosition();  // 食物的坐标
    food.style.left = position[0] + "px";
    food.style.top = position[1] + "px";
    wrap.appendChild(food);
}

/*计算出来食物的坐标 [left, top]*/
function getFoodPosition(){
    while (true){
        var flag = true;  // 表示合法
        var left = randomInt(0, 19) * 30;
        var top = randomInt(0, 19) * 30;
        for (var i = 0; i < snakeBody.length; i++){
            if (left == snakeBody[i].offsetLeft && top == snakeBody[i].offsetTop){
                flag = false;
                break;
            }
        }
        if (flag){
            return [left, top]
        }
    }
}

/*吃食物*/
function eatFood(){
    if (!food) return;
    console.log("food....");

    var headLeft = snakeBody[0].offsetLeft;
    var headTop = snakeBody[0].offsetTop;
    var foodLeft = food.offsetLeft;
    var foodTop = food.offsetTop;
    // 表示蛇头已经运行到了食物的位置
    if (headLeft == foodLeft && headTop == foodTop){
        console.log("abc");
        food.style.backgroundColor = "pink";
        snakeBody.push(food);
        // 吃完之后, 理解投放新的食物
        putFood();
    }

}

/**
 作者:李振超      2017年10月16 16:24:35
 返回随机的 [from, to] 之间的整数(包括from，也包括to)
 */
function randomInt(from, to){
    return parseInt(Math.random() * (to - from + 1) + from);
}
