window.onload = function(){
    this.page1Main.className = 'page1-main showToo';
    
}

// body.addEventListener('touchend' , function(){
//     body,width = document.clientWidth;
//     body.height = document.clientHeight;
// })

var html = document.getElementsByTagName('html')[0],
    body = document.getElementsByTagName('body')[0],
    wrap = document.getElementsByClassName('wrap')[0],
    page1 = document.getElementsByClassName('page1')[0],
    imgBox = document.getElementsByClassName('imgBox')[0],
    page1Main = document.getElementsByClassName('page1-main')[0],
    logo = document.getElementsByClassName('logo')[0],
    name = document.getElementsByClassName('name')[0],
    page2 = document.getElementsByClassName('page2')[0],
    page3 = document.getElementsByClassName('page3')[0],
    login = document.getElementsByClassName('login')[0],
    acc =  document.getElementsByClassName('acc')[0],
    pas = document.getElementsByClassName('pas')[0],
    phone = document.getElementsByClassName('phone')[0],
    page3Show = document.getElementsByClassName('page3-show')[0],
    page3Wrong = document.getElementsByClassName('page3-wrong')[0],
    knowMore = document.getElementsByClassName('knowMore')[0],
    submit = document.getElementsByClassName('submit')[0];

    var judgePage = true;
    // 绑定事件，点击第一页进行翻页   不让页面回滚？
    body.style.width = html.clientWidth + 'px';
    body.style.height = html.clientHeight + 'px'
    html.style.fontSize = document.body.clientWidth / 10 + 'px';
    
    page3Show.style.display = 'none';
    page3Wrong.style.display = 'none';
console.log(document.body.clientWidth)
var bookToNext = function(){
   
    wrap.style.transform = 'scale(1.2)';
    page1.style.transition = '0.7s';
    page1.style.transform = 'rotateY(-135deg)';
    page1.style.transformOrigin = 'left';
    page2.style.zIndex = '0';
    judgePage = false;
    if(judgePage == false){
        page1.removeEventListener('touchend' , bookToNext)
       
    }
}



page1.addEventListener('touchend', bookToNext , false);



//submit按钮样式设置
submit.addEventListener('touchstart' , function(){
   
    submit.style.width = '22vw';
    
})

submit.addEventListener('touchend' , function(){
   
    submit.style.width = '20vw';
})

//设置点击上移事件，防止移动端弹出的键盘进行了遮挡
acc.addEventListener('touchstart',function(){
    // acc.setAttribute('placeholder' , '');
    login.style.transform = 'translateY(-5vh)';
    login.style.transition = '1s';
    
})

pas.addEventListener('touchstart',function(){
    // pas.setAttribute('placeholder' , '');
    login.style.transform = 'translateY(-5vh)';
    login.style.transition = '1s';
    
})

phone.addEventListener('touchstart',function(){
    // phone.setAttribute('placeholder' , '');
    login.style.transform = 'translateY(-5vh)';
    login.style.transition = '1s';
    
})

var secret = document.getElementsByClassName('secret')[0];

//点击隐私政策进行翻页
secret.addEventListener('touchend' , toPage3);


//定义html页面字体，当前宽度除10后与rem进行关联
html.style.fontSize = document.body.clientWidth / 10 + 'px';

//获得第三页返回按钮(两个按钮)
var returnPage2 = document.getElementsByClassName('returnPage2')[0];

returnPage2.addEventListener('touchend' , return2);

var returnPage2Too = document.getElementsByClassName('returnPage2Too')[0];
returnPage2Too.addEventListener('touchend' , return2);

function return2(){

    //样式的改变
    returnPage2.style.transition = '0.7s';
    returnPage2.style.opacity = '0';

    returnPage2Too.style.transition = '0.7s';
    returnPage2Too.style.opacity = '0';

    setTimeout(function(){
        returnPage2.style.opacity = '1';
        returnPage2Too.style.opacity = '1';

    } , 1000);

    
    page2.style.transition = '1.2s';
    page2.style.transform = 'rotateY(135deg)';
    page2.style.transformOrigin = 'left';
    page2.style.zIndex = '1';
    page3.style.zIndex = '-1';
    page2.style.transform = '';
    
    setTimeout(function(){
        console.log(1222);
        page3Wrong.style.transition = '1s';
        page3Wrong.className = 'page3-wrong unshowToo';
        page3Show.style.transition = '1s';
        page3Show.className = 'page3-show unshowToo';
        
    } , 400)

    setTimeout(function(){
         page3Wrong.style.display = 'none';
         page3Show.style.display = 'none';
    } , 400)
    
}


//第二页翻页函数
function toPage3(){
    page2.style.transition = '1s';
    page2.style.transform = 'rotateY(-135deg)';
    page2.style.transformOrigin = 'left';
    page3.style.zIndex = '0';

    page3Wrong.style.display = 'none';
    page3Show.style.display = 'block';
    
    setTimeout(function(){
        page3Show.style.transition = '2s';
        page3Show.className = 'page3-show showToo';
    } , 600)
    
}    

knowMore.addEventListener('touchend',function(){

})