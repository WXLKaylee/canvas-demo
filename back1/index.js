
var colorMap = [ 'orange', 'green', 'pink', 'blur', 'red', 'aqua', 'coral' ];
//获取窗口宽高
var w = window.innerWidth;
var h = window.innerHeight;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//设置画布宽高与窗口宽高一样
canvas.width = w;
canvas.height = h;
//随机数函数
function fnRandom(min,max){
  return parseInt((max-min)*Math.random()+min+1)
}
function Round(){
  // 随机半径
  this.r = fnRandom(10,25);
  this.diam = this.r * 2;
  // 圆形的随机圆心位置
  var x = fnRandom(this.r, canvas.width - this.r);
  // this.x = x < this.r ? this.r : x;
  this.x = x;
  var y = fnRandom(this.r, canvas.height-this.r);
  // this.y = y < this.r ? this.r : y
  this.y = y;
  // 移动速度
  var speed = Math.random();
  this.speedX = fnRandom(0,4) > 2 ? speed : -speed;
  this.speedY = fnRandom(0,4)>2 ? speed : -speed;
  //颜色
  this.color = colorMap[fnRandom(0,6)];
}

// 画园
Round.prototype.draw = function(){
  //绘制函数
  ctx.fillStyle = this.color;
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

// 移动圆形的位置
Round.prototype.move = function(){
  this.x += this.speedX;
  if(this.x > canvas.width - this.r){
    this.x = this.r
  } else if(this.x < this.r){
    this.x = canvas.width-this.r
  }

  this.y += this.speedY;
  if(this.y > canvas.height - this.r){
    this.y = this.r
  }else if(this.y < this.r){
    this.y = canvas.height - this.r
  }
}

//使用Round
var allRound = [];
// 初始化20个圆形对象,放到数组中
function initRound(){
  for(var i = 0; i < 20; i++){
    var obj = new Round();
    obj.draw();
    obj.move();
    allRound.push(obj);
  }
}

var dxdy = []
function roundMove(){
  // 清除绘画
  ctx.clearRect(0,0,canvas.width,canvas.height);
  //遍历所有的圆形对象,让对象自己重绘,移动
  for (var i = 0; i < allRound.length; i++) {
    var round = allRound[i];
    round.draw();
    round.move();
    dxdy[i] = {
      dx: round.x,
      dy: round.y
    };
    var dx = dxdy[i].dx;
    var dy =dxdy[i].dy;
    for (var j = 0; j < i; j++) {
      // 判断线条透明度（距离越近越清晰）
      var sx = dxdy[j].dx;
      var sy = dxdy[j].dy;
      l = Math.sqrt((dx-sx)*(dx-sx)+(dy-sy)*(dy-sy));
      var C = 1 / l * 4;
      var o = C > 0.03 ? 0.03 : C;
      ctx.strokeStyle = 'rgba(0,0,0,'+ o +')'
      ctx.beginPath()
      ctx.lineWidth = 2;
      ctx.moveTo(dxdy[i].dx, dxdy[i].dy)
      ctx.lineTo(dxdy[j].dx, dxdy[j].dy);
      ctx.closePath()
      ctx.stroke()
    }
  }
  window.requestAnimationFrame(roundMove)
}
initRound();
roundMove();
