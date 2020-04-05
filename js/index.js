function weather(data) {
    let dateDayname = document.getElementById("date-dayname"); // 拿到左侧当前是星期几
    let dateDay = document.getElementById("date-day"); // 拿到左侧当前的日期
    let location = document.getElementById("location"); // 拿到左侧当前的默认位置

    // 天气图标
    let weahterL = document.getElementById("weather-l"); // 拿到左侧的天气图标
    let weatherTemp = document.getElementById("weather-temp"); // 拿到左侧的温度
    let weatherDesc = document.getElementById("weather-desc"); // 拿到左侧的天气情况

    // 拿到返回的data.weather[0].date 里面的 0,3 是当前的星期几 date: "周四 04月02日"
    // data.date 是今天的日期
    // data.city 是默认提交过去的位置
    dateDayname.innerHTML = data.weather[0].date.slice(0, 3);
    dateDay.innerHTML = data.date;
    location.innerHTML = data.city;

    // 这个图标等下封装一个函数,来判断用什么图标
    // data.weather[0].temp.slice(0,3) 是当前地址今天的最高温度 temp: "21 ~ 7℃"
    // data.weather[0].weather 是当前的地址今天的天气情况
    weahterL.innerHTML = weatherIcon(1);
    weatherTemp.innerHTML = data.weather[0].temp.slice(0, 3) + "℃";
    weatherDesc.innerHTML = data.weather[0].weather;

    let pm = document.getElementById("pm"); // 拿到右侧的 PM 2.5
    let humidity = document.getElementById("humidity"); // 拿到右侧的温度
    let wind = document.getElementById("wind"); // 拿到右侧的风速

    // 当前地址今天的pm 2.5
    // 湿度没有返回值
    pm.innerHTML = data.pm25;
    humidity.innerHTML = "暂无";
    wind.innerHTML = data.weather[0].wind;

    let day1 = document.getElementById("day1"); // 拿到当前的周期
    let span1 = day1.getElementsByTagName("span"); // 拿到第一个当前的周期下面的所有span

    let day2 = document.getElementById("day2");
    let span2 = day2.getElementsByTagName("span");

    let day3 = document.getElementById("day3");
    let span3 = day3.getElementsByTagName("span");

    let day4 = document.getElementById("day4");
    let span4 = day4.getElementsByTagName("span");

    span1[0].innerHTML = weatherIcon(1);
    span1[1].innerHTML = data.weather[0].date.slice(0, 3);
    span1[2].innerHTML = data.weather[0].temp;

    span2[0].innerHTML = weatherIcon(2);
    span2[1].innerHTML = data.weather[1].date.slice(0, 3);
    span2[2].innerHTML = data.weather[1].temp;

    span3[0].innerHTML = weatherIcon(3);
    span3[1].innerHTML = data.weather[2].date.slice(0, 3);
    span3[2].innerHTML = data.weather[2].temp;

    span4[0].innerHTML = weatherIcon(4);
    span4[1].innerHTML = data.weather[3].date.slice(0, 3);
    span4[2].innerHTML = data.weather[3].temp;

    // 封装一个判断天气,选择图标的函数
    function weatherIcon(t) {
        // search 如果没有找到任何匹配的子串，则返回 -1。
        if (data.weather[t - 1].icon1.search("yin") != -1) {
            return "&#xe624;";
        }

        if (data.weather[t - 1].icon1.search("duoyun") != -1) {
            return "&#xe618;";
        }

        if (data.weather[t - 1].icon1.search("qing") != -1) {
            return "&#xe61f;";
        }

        if (data.weather[t - 1].icon1.search("xiaoyu") != -1) {
            return "&#xe622;";
        }

        if (data.weather[t - 1].icon1.search("zhongyu") != -1) {
            return "&#xe685;";
        }

        if (data.weather[t - 1].icon1.search("dayu") != -1 || data.weather[0].icon1.search("baoyu") != -1) {
            return "&#xe644;";
        }

        if (data.weather[t - 1].icon1.search("zhenyu") != -1) {
            return "&#xe642;";
        }
    }
}

window.onload = function () {
    // alert("aaa")
    
    let scriptList = document.getElementsByTagName("script");
    let btn = document.getElementById("location-button");
    let city = document.getElementById("city");

    // 默认查询长沙天气
    let script = document.createElement("script");
    script.src = `https://api.asilu.com/weather/?city=${"长沙"}&callback=weather`;
    document.body.appendChild(script);

    btn.onclick = function () {
        if (scriptList[2]) {
            document.body.removeChild(scriptList[2])
            console.log(scriptList);
        }

        // 加个简单判断,输入内容是否为空
        if (city.value) {
            let script = document.createElement("script");
            script.src = `https://api.asilu.com/weather/?city=${city.value}&callback=weather`;

            // 插入到页面中去
            document.body.appendChild(script);
        } else {
            alert("请输入城市名称!");
        }
    }
}
