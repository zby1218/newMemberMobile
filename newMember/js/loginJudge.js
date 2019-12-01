var page1 = document.getElementsByClassName('page1')[0],
    page2 = document.getElementsByClassName('page2')[0],
    page3 = document.getElementsByClassName('page3')[0],
    acc = document.getElementsByClassName('acc')[0],
    pas = document.getElementsByClassName('pas')[0],
    phone = document.getElementsByClassName('phone')[0],
    imgBox = document.getElementsByClassName('imgBox')[0],
    login = document.getElementsByClassName('login')[0],
    logoPage2 = document.getElementsByClassName('logo-page2')[0],
    loading = document.getElementsByClassName('loading')[0],
    timeChoose = document.getElementsByClassName('timeChoose')[0],
    time1 = document.getElementsByClassName('time1')[0],
    time2 = document.getElementsByClassName('time2')[0],
    name1 = document.getElementsByClassName('name1')[0],
    tips = document.getElementsByClassName('tips')[0],
    page3Wrong = document.getElementsByClassName('page3-wrong')[0],
    wrongWrap = document.getElementsByClassName('wrongWrap')[0],
    submit = document.getElementsByClassName('submit')[0];
    
    var wrongDiv = wrongWrap.getElementsByTagName('div');
    // for( i = 0;i < 5;i++){
    //     console.log(wrongDiv[i])
    //     wrongDiv[i].style.transition = '5s';
    //     wrongDiv[i].style.opacity = '0';
     
    // }
    var judge = true,
        judge1 = true,
        timejudge = -1,
        control1 = true,
        control2 = true,
        control3 = true,
        control4 = true,
        ajaxing  = false,
        index1 = 0,
        index2 = 0,
        str1 = '',
        str2 = '',
        str3 = '',
        str4 = '',
        str5 = '',
        str6 = '',
        str7 = '',
        time1 ,
        time2,
        timeInternet,
        internetCount = 0,
        internetJudge = true,
        //这是验证输入账号手机号是否合法的正则表达式
        reg1 = /[0-9]{8}/,
        reg2 = /[0-9]{11}/;
//利用正则表达式进行输入判断    
loading.style.className = 'loading';
//优先级T1 存在输入框未输入
submit.addEventListener('touchend' ,function(){
   
    //如果有输入框未输入
    
    if(acc.value == '' && control1 == true){
        acc.className = 'acc wrong change';
        acc.setAttribute('placeholder' , '请输入账号');
        judge = false;
        control1 = false;
        setTimeout(function(){
            acc.className = 'acc change';
            control1 = true;
        } , 500)
        
    }

    if(pas.value == '' && control2 == true){
        
        pas.className = 'pas wrong change';
        pas.setAttribute('placeholder' , '请输入密码');
        judge = false;
        control2 = false;
        setTimeout(function(){
            pas.className = 'pas change';
            control2 = true;
        } , 500)
        
    }

    if(phone.value == '' && control3 == true){
        phone.setAttribute('placeholder' , '请输入手机号码');
        phone.className = 'phone wrong change';
        judge = false;
        control3 = false;
        setTimeout(function(){
            phone.className = 'phone change';
            control3 = true;
        } , 500);
    }

   
    if(timejudge == -1 && control4 == true){
        time1.className = 'time1 wrongTime';
        time2.className = 'time2 wrongTime';
        judge = false;
        control4 = false;
        console.log(555);
        setTimeout(function(){
            time1.className = 'time1';
            time2.className = 'time2';
            control4 = true;
        } , 500);
    }
    //上面三个部分保证四个信息选择部分，只有都选了才能进行下一步
    //都选了 judge改变 进入判断形式是否正确阶段

    if(control1 && control2 && control3 && control4){
        judge = true;
    }

    //如果三个输入框都有输入，则判断对错
    if(judge == true){
        //这个是控制形式是否正确的，形式正确，才可以发送ajax请求
        judge1 = true;
        //首先控制样式，上移表示正在加载
        
        
        //判断是否是8位学号
        if(!reg1.test(acc.value)){
            acc.className = 'acc wrong change';
            acc.value = '';
            acc.setAttribute('placeholder' , '请输入八位学号');
            judge1 = false;
            control1 = false;
            setTimeout(function(){
                acc.className = 'acc change';
                control1 = true;
            } , 500)
        }

        //判断手机号码是否是11位
        if(!reg2.test(phone.value)){
            phone.className = 'phone wrong change';
            phone.value = '';
            phone.setAttribute('placeholder' , '请输入十一位号码');
            judge1 = false;
            control1 = false;
            setTimeout(function(){
                acc.className = 'phone change';
                control1 = true;
            } , 500)
        }
        //如果输入满足要求则发送请求
        if(judge1 == true){
            ajaxing = true;
            
            //输入符合标准 样式改变
            logoPage2.style.transform = 'rotate(360deg)';
            logoPage2.style.transition = '1s';

            login.style.transform = 'translateY(-2vh)';
            login.style.transition = '1s';
            if(ajaxing){
                loading.style.display = 'block';
                loading.style.opacity = '1';
                login.style.opacity = '0.3';
                
                
            }
            if(!navigator.onLine){
                toPage3();
                loading.style.display = 'none';
                login.style.opacity = '1';
                page3Wrong.style.display = 'block';
                    page3Show.style.display = 'none';
                    setTimeout(function(){
                        page3Wrong.style.transition = '1s';
                        page3Wrong.className = 'page3-wrong showToo';
                        //翻页后样式改变 显示网络错误
                        wrongWrap.style.transition = '5s';
                        wrongWrap.className = 'wrongWrap showToo';
                        setTimeout(function(){
                            for(i = 0;i < 3; i++){
                                wrongDiv[i].style.transition = '4s';
                                wrongDiv[i].style.transform = 'translateX(100vw)';
                                
                            }
                            wrongDiv[4].style.transition = '2s';
                            wrongDiv[4].style.transform = 'translateX(100vw)';
                            wrongDiv[3].style.transition = '1.5s';
                            wrongDiv[3].style.fontSize = '0.8rem'
                            wrongDiv[3].style.position = 'relative'
                            wrongDiv[3].style.top = '50%';
                            wrongDiv[3].style.left = '50%';
                            wrongDiv[3].style.transform = 'translate(-50% , -50%)'
                            
                        },3000);
                        
                    
                    return ;
                    },800)
                return;
            }
            //进行ajax请求
            //计数器 每一秒自增
            timeInternet = setInterval(function(){
                window.internetCount ++;
                

                if(window.internetCount > 5){
                    login.style.opacity = '1';
                    loading.style.display = 'none';
                    //大于5s认为超时，翻页提示网络错误，不进行请求
                    window.internetCount = 0;
                    clearTimeout(timeInternet);
                   
                    //确定为网络错误后改变样式，直接翻页
                    toPage3();
                    page3Wrong.style.display = 'block';
                    page3Show.style.display = 'none';
                    setTimeout(function(){
                        page3Wrong.style.transition = '1s';
                        page3Wrong.className = 'page3-wrong showToo';
                        //翻页后样式改变 显示网络错误
                        wrongWrap.style.transition = '5s';
                        wrongWrap.className = 'wrongWrap showToo';
                        setTimeout(function(){
                            for(i = 0;i < 3; i++){
                                wrongDiv[i].style.transition = '4s';
                                wrongDiv[i].style.transform = 'translateX(100vw)';
                                
                            }
                            wrongDiv[4].style.transition = '2s';
                            wrongDiv[4].style.transform = 'translateX(100vw)';
                            wrongDiv[3].style.transition = '1.5s';
                            wrongDiv[3].style.fontSize = '0.8rem'
                            
                        },3000);
                        
                    
                    return ;
                    },800)
                    
                }

            } , 1000)
            
            //进行请求前判断网路是否正常
            //发送ajax请求时计算请求的时间，如果超过6s，则提示网络错误
            ajax('https://www.konghouy.cn/job/enroll/test' , 'post' ,  'id=' + acc.value + '&password=' + pas.value + '&type=' + timejudge + '&phone=' + phone.value , 'json' , callback);   
           
        }
       
    }
})

function callback(data){
    //防止已经提示网络错误但ajax最后请求成功
    if(internetCount == 0){
        return ;
    }
    //只要进入回调函数就清空计数器
    internetCount = 0;
    clearInterval(timeInternet)
    ajaxing = false;
    if(!ajaxing){
        loading.style.display = 'none';
        login.style.opacity = '1';
        
    }

    // 密码错误进行提示
    if(data.msg == '身份验证错误'){
       
        pas.className = 'pas wrong';
        pas.value = '';
        pas.setAttribute('placeholder' , '密码错误');
        setTimeout(function(){
            pas.className = 'pas change';
            control2 = true;
        } , 500)
         
    }
   
       
        
    //如果报名成功 进行翻页 选择面试时间
    if(data.msg == '重复报名' ||data.msg == '报名成功'){
        
       
        //翻回第一页
        page1.style.transition = '1s';
        page1.style.transform = 'rotateY(135deg)';
        page1.style.transformOrigin = 'left';
        page1.style.zIndex = '1';
        page2.style.zIndex = '-1';
        page1.style.transform = '';
        tips.remove();
        str1 = '你好 ' + data.main.name + '同学';
        

        //生成第一个div
        div1 = document.createElement('div');
        div1.style.position = 'absolute';
        
        str2 = '你的面试时间为';
        div1.style.marginTop = '80%';
     
        page1Main.appendChild(div1);


        //生成第二个div
        div2 = document.createElement('div');
        div2.style.letterSpacing = '0.2vw';
        div2.style.marginTop = '90%'
        div2.style.position = 'absolute';
       
        if(data.main.type == 0){
            str3  = '2019年11月3日 下午15:00-17:00'
        }
        if(data.main.type == 1){
            str3 = '2019年11月3日 晚间17:30-21:30'
        }
        div2.innerHTML = str3;
        div2.style.opacity = '0';
        
        page1Main.appendChild(div2);
        //第一页样式改变

        //生成第三个div
        div3 = document.createElement('div');
        div3.style.position = 'absolute';
        div3.style.marginBottom = '10%';
        div3.style.letterSpacing = '0.5vw';
        div3.style.marginTop = '100%';
        div3.style.opacity = '0';
        str4 = '祝你好运';
        div3.innerHTML = str4;
        
        page1Main.appendChild(div3);

        time1 = setInterval('slowShow(name1 , str1 , index1 ,time1 ,1)', 200);
        time2 = setInterval('slowShow(div1 , str2 , index2 ,time2 ,2)', 50);
        
        setTimeout(function(){
            div2.style.opacity = '1';
            div2.style.transition = '0.7s';
        },1500);
        
        setTimeout(function(){
            div3.style.opacity = '1';
            div3.style.transition = '1s';
        },2000);
        
        str5 = '如需更改时间';
        div4 = document.createElement('div');
        div4.style.position = 'absolute';
        div4.style.opacity = '0';
        div4.style.marginTop = '110%'
        div4.innerHTML = str5;
        div4.style.fontSize = '0.3rem';
        page1Main.appendChild(div4);
        setTimeout(function(){
            div4.style.opacity = '1';
            div4.style.transition = '0.7s';
        },2500);

        str6 = '请在3G交流群中联系管理员';
        div5 = document.createElement('div');
        div5.style.position = 'absolute';
        div5.style.opacity = '0';
        div5.style.marginTop = '120%'
        div5.innerHTML = str6;
        div5.style.fontSize = '0.3rem';
        page1Main.appendChild(div5);
        setTimeout(function(){
            div5.style.opacity = '1';
            div5.style.transition = '0.7s';
        },2500);

        str7 = '群号 ： 682686941';
        div6 = document.createElement('div');
        div6.style.position = 'absolute';
        div6.style.opacity = '0';
        div6.style.marginTop = '130%'
        div6.innerHTML = str7;
        div6.style.fontSize = '0.3rem';
        page1Main.appendChild(div6);
        setTimeout(function(){
            div6.style.opacity = '1';
            div5.style.transition = '0.7s';
        },2500);

    }

}

function slowShow(div , str , index ,time ,count){
   
    
    
    div.innerHTML = str.substring(0, index++);
    if(count == 1){
        window.index1++;
    }
    if(count == 2){
        window.index2++;
    }
   
    if(index > str.length){
       
        clearInterval(time);
    }
        
}


time1.addEventListener('touchstart' , function(){
    time1.style.backgroundColor = 'blanchedalmond';
    time1.style.transition = '.7s';
    time2.style.backgroundColor = '';
    timejudge = 0;
})


time2.addEventListener('touchstart' , function(){
    time2.style.backgroundColor = 'blanchedalmond';
    time2.style.transition = '.7s'
    time1.style.backgroundColor = ''
    timejudge = 1;
})


