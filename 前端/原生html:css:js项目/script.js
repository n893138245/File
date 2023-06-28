// 调用jQuery库，必须一开始写入这个函数
$(document).ready(function () {
// $(function () { // 方式二
    // 导航模块
    var nav_searchImg = document.querySelector('.nav_searchImg');
    nav_searchImg.onclick = function () {
        console.log("点击了搜索图片");
        prompt("请输入搜索内容");
    }

    $(".nav_list").hover(function () {
       console.log("test1");
    });
    $(".nav_list_ul").hover(function () {
        console.log("test2");
    });

    // var nav_languageBtn = document.querySelector('.nav_languageBtn');
    // nav_languageBtn.onclick = function () {
    //     console.log("点击了切换语言按钮");
    // }
    $(".nav_languageBtn_button").click(function () {
        if (this.textContent === "EN") {
            let value = confirm("请问您是否选择\"CN语言\"");
            if (value === true) {
                this.textContent = "CN";
            } else {
                this.textContent = "EN";
            }
        } else if (this.textContent === "CN") {
            let value  = confirm("请问您是否选择\"EN语言\"");
            if (value === true) {
                this.textContent = "EN";
            } else {
                this.textContent = "CN";
            }
        } else {
            this.textContent = confirm("error");
        }
    });

    // banner图模块
    let banner_bg = $('.banner_bg img').attr('src');
    var banner_selectImg_1 = document.querySelector('.banner_selectImg_1');
    banner_selectImg_1.onclick = function () {
        $('.banner_bg img').attr('src', "resource/image/banner1.jpg");
        $(this).css("background", "gray");
        $(banner_selectImg_2).css("background", "white");
        $(banner_selectImg_3).css("background", "white");
        $(banner_selectImg_4).css("background", "white");
    }
    var banner_selectImg_2 = document.querySelector('.banner_selectImg_2');
    banner_selectImg_2.onclick = function () {
        $('.banner_bg img').attr('src', "resource/image/banner2.jpg");
        $(this).css("background", "gray");
        $(banner_selectImg_1).css("background", "white");
        $(banner_selectImg_3).css("background", "white");
        $(banner_selectImg_4).css("background", "white");
    }
    var banner_selectImg_3 = document.querySelector('.banner_selectImg_3');
    banner_selectImg_3.onclick = function () {
        $('.banner_bg img').attr('src', "resource/image/banner3.jpg");
        $(this).css("background", "gray");
        $(banner_selectImg_1).css("background", "white");
        $(banner_selectImg_2).css("background", "white");
        $(banner_selectImg_4).css("background", "white");
    }
    var banner_selectImg_4 = document.querySelector('.banner_selectImg_4');
    banner_selectImg_4.onclick = function () {
        $('.banner_bg img').attr('src', "resource/image/banner4.jpg");
        $(this).css("background", "gray");
        $(banner_selectImg_1).css("background", "white");
        $(banner_selectImg_2).css("background", "white");
        $(banner_selectImg_3).css("background", "white");
    }

    var banner_prevBtn = document.querySelector('.banner_prevBtn');
    banner_prevBtn.onclick = function () {
        console.log("点击了banner_prevBtn:"+banner_bg);
        let test = $('.banner_selectImg_1').attr("width")
        console.log(test);
        console.log($(banner_selectImg_1).css("background", "white"));
        console.log($(banner_selectImg_2).css("background", "white"));
        console.log($(banner_selectImg_3).css("background", "white"));
        console.log($(banner_selectImg_4).css("background", "white"));
    }
    var banner_nextBtn = document.querySelector('.banner_nextBtn');
    banner_nextBtn.onclick = function () {
        console.log("点击了banner_nextBtn:"+banner_bg);
    }
    /*
    function bannerSelect(e) {
        for (let i=0; i<4; i++) {
            let banner_selectImg_i = document.querySelector('.banner_selectImg_'+'i');
            if (banner_selectImg_i !== e) {
                $(banner_selectImg_i).css("background", "white");
            } else {
                $(e).css("background", "black");
            }
        }
    }
    */

    // 中间内容1：公司案例
    // 一个按钮绑定多个事件，多个按钮绑定一个事件。多个按钮绑定多个事件。
    $(".middle_case_smartShowBtn, .middle_case_LEDlightingBtn, .middle_case_smartTrafficBtn, .middle_case_smartSystemBtn").on({
        mouseenter: function () {
            $(this).css("border", "1px solid #1C6AC3");
            $(this).css("color", "#1C6AC3");
        },
        mouseleave: function () {
            $(this).css("border", "1px solid darkgray");
            $(this).css("color", "gray");
        },
        click: function (e) {
            let content = e.target.outerText; // 告诉我竟然不稳定 😓：e.target.textContent。
            if (content === "智能显示") {
                middle_case_changeContent("resource/image/1646672744238256242.jpg","徐州苏宁广场-模条屏","35000m模条屏点亮城市夜空。三思创新性地大规模使用了LED亮化模条、楼顶光束灯等LED科技产品及系统解决方案，既满足了异形定制的个性需求，又形成了独特的灯光与显示相融合的视觉效果，为徐州再添一道靓丽风景线。 ");
            } else if (content === "LED照明") {
                console.log("LED照明");
                $('.middle_case_rightImg img').attr('src', "resource/image/1663620888547552208.jpg");
                $(".middle_case_title").text("上海市莘城中学");
                $(".middle_case_content").text("三思LED健康教室灯具，专业的光学设计和反射式发光技术，有效提高了灯具反射效率和出光均匀度，光线舒适，见光不见源，亮度充足，整体照明效果良好，绿色安全。 ");
                // scuccess
                // let titleA = document.querySelector(".middle_case_title");
                // titleA.textContent = "test";
                // console.log(titleA.textContent);
            } else if (content === "智能交通") {
                middle_case_changeContent("resource/image/1639416664233817235.jpg","京雄高速河北段","上海三思在LED智能交通类产品上的创新技术及应用实践上，比传统道路的设备更有诸多亮点，融合了交通指引、媒体显示、应急显示、数据呈现、信息反馈等功能，真正成为智慧高速系统中最直观的显示终端，为打造“五个全国先行样板路”承担极其重要的角色，助力京雄高速构建智慧交通和平安道路体系。 ");
            } else if (content === "智慧系统") {
                middle_case_changeContent("resource/image/1663620157101099842.jpg","上海浦江工业园区智慧路灯","海三思智慧路灯杆系统在智慧园区建设中扮演重要角色，它为园区赋予更多智慧的的功能，协助园区应用物联网技术进行感知、监测、分析、控制、整合园区各个关键环节的资源，为园区企业创造一个绿色、和谐的发展环境，提供高效、便捷、个性化的发展空间。 ");
            } else {
                console.log("error:不知道点的什么");
            }
        }
    });
    // 中间-案例-改变内容：图片、标题、内容。
    function middle_case_changeContent(img, title, content) {
        $(".middle_case_rightImg img").attr("src", img);
        $(".middle_case_title").text(title);
        $(".middle_case_content").text(content);
    }
    /*中间内容2：行业解决方案*/
    // let middle_solutions_array = [""];
    $(".middle_solutions_left_prevBtn").click(function () {
        middle_solutions_changeContent("resource/image/1663260020429133739.jpg", "道路照明解决方案", "35000m模条屏点亮城市夜空。三思创新性地大规模使用了LED亮化模条、楼顶光束灯等LED科技产品及系统解决方案，既满足了异形定制的个性需求，又形成了独特的灯光与显示相融合的视觉效果，为徐州再添一道靓丽风景线。 ");
    });
    $(".middle_solutions_right_nextBtn").click(function () {
        middle_solutions_changeContent("resource/image/1659918341636511465.jpg", "三思智慧交通解决方案", "2021年5月29日，备受瞩目的京雄高速河北段正式通车——这是国内率先打造的“五个全国先行的样板路”，在众多领域实现技术突破和应用创新。京雄高速河北段全长约75公里，主线起自保定涿州市京冀界与京雄高速北京段顺接，建成通车后，北京和雄安新区实现1小时通达。");
    });
    // 中间-案例-改变内容：图片、标题、内容。
    function middle_solutions_changeContent(img, title, content) {
        $(".middle_solutions_left_img img").attr("src", img);
        $(".middle_solutions_right_title").text(title);
        $(".middle_solutions_right_content").text(content);
    }
    /*中间内容3：品质*/
    // $(".middle_quality_left_smartShowImg").on({
    //     mouseenter: function () {
    //        console.log("enter");
    //     },
    //     mouseleave: function () {
    //         console.log("leave");
    //     }
    // });

    // $(".middle_quality_left_smartShowImg").hover(function () {
    //     console.log("hover");
    //     $(".middle_quality_left_smartShowImg").animate({
    //         height: +10
    //     })
    // });

    /*中间内容4：新闻中心*/
    $(".middle_news_top_companyDynamic, .middle_news_top_industryInformation, .middle_news_top_marketingActivity, .middle_news_top_commonProblem").on({
        mouseenter: function (e) {
            let content = e.target.outerText;
            if (content === "公司动态") {
                return;
            }
            $(this).css("background","#003C87FF");
            $(this).css("color","white");
        },
        mouseleave: function (e) {
            let content = e.target.outerText;
            if (content === "公司动态") {
                return;
            }
            $(this).css("background","white");
            $(this).css("color","gray");
        },
        click: function (e) {
            let content = e.target.outerText;
            if (content === "公司动态") {
                console.log("公司动态");
            } else if (content === "行业资讯") {
                console.log("行业资讯");
                middle_news_changeContent(e, "resource/image/1677604099704435772.jpg", "title1", "content1", "time1", "title2", "content2", "time2", "title3", "content3", "time3")
            } else if (content === "市场活动") {
                console.log("市场活动");
            } else if (content === "常见问题") {
                console.log("常见问题");
            } else {
                console.log("error");
            }
        }
    });
    function middle_news_changeContent(e, img, title1, content1, time1, title2, content2, time2, title3, content3, time3) {
        let content = e.target.outerText;
        if (content === "公司动态") {
            $(".middle_news_top_companyDynamic").css("background","#003C87FF");
            $(".middle_news_top_companyDynamic").css("color","white");
            $(".middle_news_top_industryInformation").css("background","white");
            $(".middle_news_top_industryInformation").css("color","gray");
            $(".middle_news_top_marketingActivity").css("background","white");
            $(".middle_news_top_marketingActivity").css("color","gray");
            $(".middle_news_top_commonProblem").css("background","white");
            $(".middle_news_top_commonProblem").css("color","gray");
        } else if (content === "行业资讯") {
            $(".middle_news_top_industryInformation").textContent = "test1";
            $(".middle_news_top_industryInformation").text( "test2");

            // $(".middle_news_top_industryInformation").css("background","#003C87FF");
            // $(".middle_news_top_industryInformation").css("color","white");
            $(".middle_news_top_companyDynamic").css("background","white");
            $(".middle_news_top_companyDynamic").css("color","gray");
            $(".middle_news_top_marketingActivity").css("background","white");
            $(".middle_news_top_marketingActivity").css("color","gray");
            $(".middle_news_top_commonProblem").css("background","white");
            $(".middle_news_top_commonProblem").css("color","gray");
        } else if (content === "市场活动") {
        } else if (content === "常见问题") {
        } else {
            console.log("error");
        }
        
        $(".middle_news_left_image img").attr("src", img);

        $(".middle_news_right_content1 li:nth-child(1)").text(title1);
        $(".middle_news_right_content1 li:nth-child(2)").text(content1);
        $(".middle_news_right_content1 li:nth-child(3)").text(time1);

        $(".middle_news_right_content2 li:nth-child(1)").text(title2);
        $(".middle_news_right_content2 li:nth-child(2)").text(content2);
        $(".middle_news_right_content2 li:nth-child(3)").text(time2);

        $(".middle_news_right_content3 li:nth-child(1)").text(title3);
        $(".middle_news_right_content3 li:nth-child(2)").text(content3);
        $(".middle_news_right_content3 li:nth-child(3)").text(time3);
    }

    $(".middle_news_right_content1").on({
        mouseenter: function () {
            $(this).css("background","#003C87FF");
            $(".middle_news_right_content1 li").css("color","white");
        },
        mouseleave: function () {
            $(this).css("background","white");
            $(".middle_news_right_content1 li:nth-child(1)").css("color","black");
            $(".middle_news_right_content1 li:nth-child(2)").css("color","gray");
            $(".middle_news_right_content1 li:nth-child(3)").css("color","gray");
        }
    });
    $(".middle_news_right_content2").on({
        mouseenter: function () {
            $(this).css("background","#003C87FF");
            $(".middle_news_right_content2 li").css("color","white");
        },
        mouseleave: function () {
            $(this).css("background","white");
            $(".middle_news_right_content2 li:nth-child(1)").css("color","black");
            $(".middle_news_right_content2 li:nth-child(2)").css("color","gray");
            $(".middle_news_right_content2 li:nth-child(3)").css("color","gray");
        }
    });
    $(".middle_news_right_content3").on({
        mouseenter: function () {
            $(this).css("background","#003C87FF");
            $(".middle_news_right_content3 li").css("color","white");
        },
        mouseleave: function () {
            $(this).css("background","white");
            $(".middle_news_right_content3 li:nth-child(1)").css("color","black");
            $(".middle_news_right_content3 li:nth-child(2)").css("color","gray");
            $(".middle_news_right_content3 li:nth-child(3)").css("color","gray");
        }
    });

    /*底部*/
    
});