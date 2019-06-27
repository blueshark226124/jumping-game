$(function() {
    /* $(window).on("resize", function() {
        var height = $(window).height();
        var width = $(window).width();
        if (width > height) {
            //run landscape script
            // console.log("landscape");
        } else {
            //run portrait script
            // console.log("portrait");
            alert("Please rotate the screen to landscape");
        }
    }); */

    var screenWidth = screen.width;
    var mobile;
    if (screenWidth < 900) mobile = true;
    else mobile = false;

    var runGame, itemInterval;
    var dones = false;
    var maxTime = 20000; // max time miliseconds
    var enemyCount = 0; // indicates how many time has passed
    var enemyMaxCount = Math.round(maxTime / 2000); // enemy max count
    // enemyNumber = 0 -> monster 1
    // enemyNumber = 1 -> monster 2
    // enemyNumber = 2 -> monster 3
    var enemyNumber = 0;

    var gameAudio = new Audio("audio/game_audio.mp3");

    // when clicking the play button
    $("#play_btn").click(function() {
        var height = $(window).height();
        var width = $(window).width();
        if (width > height) {
            //run landscape script
            $("body").css("background-color", "#000");
            $(".screen").hide();
            $(".container").show();
            playGame();
            initFunc();
        } else {
            //run portrait script
            alert("Please rotate the screen to landscape");
            return;
        }
    });

    // when clicking the retry area
    $(".retry").click(function() {
        window.location.reload();
    });

    // when clicking the exit area
    $(".exit").click(function() {
        window.location.assign("https://www.hungrylion.co.za");
    });

    // when clicking the leaderboard area
    $(".scoreboard").click(function() {
        window.location.assign("http://www.scoreboard.hungrylion.co.za");
    });

    // when clicking the terms area
    $(".terms").click(function() {
        window.location.assign("https://www.hungrylion.co.za/legal");
    });

    var playGame = function() {
        // start the game audio
        gameAudio.play();

        $("#new_game").addClass("fadeOut");

        setTimeout(function() {
            var timerGame;
            if (mobile) timerGame = 2500;
            else timerGame = 2000;

            runGame = setInterval(function() {
                if (enemyCount >= enemyMaxCount) {
                    runBirthdayBucket();
                } else {
                    runEnemy();
                }
                enemyCount++;
            }, timerGame);
            itemInterval = setInterval(function() {
                runItem();
            }, 3000);
        }, 500);

        // process the form

        var theForm = document.getElementById("theForm");

        new stepsForm(theForm, {
            onSubmit: function(form) {
                /*
                    form.submit()
                    or
                    AJAX request (maybe show loading indicator while we don't have an answer..)
                    */

                var url = "php/ajax.php?action=create";
                var username = $("#username").val();
                var phone_number = $("#phone_number").val();
                var score = parseInt($(".score").html());
                var data = {
                    username: username,
                    phone_number: phone_number,
                    score: score,
                    date: getTodayDate(),
                    enemy_count: enemyCount
                };

                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    dataType: "json",
                    success: function(res) {
                        if (res.status) {
                            // let's just simulate something...
                            // hide form
                            classie.addClass(
                                theForm.querySelector(".simform-inner"),
                                "hide"
                            );

                            var messageEl = theForm.querySelector(
                                ".final-message"
                            );
                            messageEl.innerHTML = res.msg;
                            classie.addClass(messageEl, "show");
                            $("section").css({ background: "none" });
                        } else {
                            console.log(res.msg);
                        }
                    }
                });
            }
        });
    };

    var runEnemy = function() {
        var enemy = $(".enemy");
        var properties = {
            right: $(".container").width(),
            display: "block"
        };

        var duration;
        if (mobile) duration = 2000;
        else duration = 1800;

        var options = {
            duration: duration,
            done: function() {
                var w = $(this).width() * -1;
                $(this).css({
                    right: w
                });
            },
            progress: function() {
                var laped = overlaps($(".hero"), $(".enemy"));

                var heroLoc = document.getElementsByClassName("hero")[0]
                    .offsetTop;
                var enemyLoc = document.getElementsByClassName("enemy")[0]
                    .offsetTop;
                var loc = enemyLoc - heroLoc;

                if (loc > 205 && laped === false) {
                    dones = true;
                } else if (laped === true && loc < 205) {
                    dones = false;
                    loseGame();
                }
            },

            complete: function() {
                if (dones === true) {
                    enemyNumber++;
                    if (enemyNumber > 2) {
                        enemyNumber = 0;
                        $(".enemy")
                            .removeClass("monkey")
                            .addClass("blue");
                    } else if (enemyNumber == 1) {
                        $(".enemy")
                            .removeClass("monkey")
                            .addClass("blue");
                    } else {
                        $(".enemy")
                            .removeClass("blue")
                            .addClass("monkey");
                    }
                }
            }
        };

        enemy.animate(properties, options);
    };

    var runBirthdayBucket = function() {
        var birthbucket = $(".birthbucket");
        var grabItem = false;
        var properties = {
            right: $(".container").width(),
            display: "block"
        };
        var options = {
            duration: 3000,
            done: function() {
                var w = $(this).width() * -1;
                $(this).css({
                    right: w
                });
            },
            progress: function() {
                var laped = overlaps($(".hero"), $(".birthbucket"));

                if (grabItem === false && laped === true) {
                    grabItem = true;
                    winGame();
                }
            }
        };

        birthbucket.animate(properties, options);
    };

    var runItem = function() {
        var items = $(".item");

        $.each(items, function(key, item) {
            // get the item, grabItem is true
            var grabItem = false;
            var properties = {
                right: $(".container").width(),
                display: "block"
            };
            var options = {
                duration: 3000,
                easing: "linear",
                done: function() {
                    var w = -150;
                    $(item).css({
                        right: w
                    });
                },
                progress: function() {
                    var laped = overlaps($(".hero"), $(item));

                    if (grabItem === false && laped === true) {
                        grabItem = true;
                        // hide the item
                        $(item).hide();
                        var score = parseInt($(".score").html());
                        if ($(item).hasClass("coin"))
                            $(".score").html(score + 5);
                        else $(".score").html(score + 10);
                    }
                },
                complete: function() {
                    // initially display the item if it's hidden before
                    if ($(item).is(":hidden")) {
                        $(item).show();
                    }
                }
            };
            setTimeout(function() {
                $(item).animate(properties, options);
            }, key * 700);
        });
    };

    var overlaps = (function() {
        function getPositions(elem) {
            var pos, width, height;
            pos = $(elem).position();
            width = $(elem).width();
            height = $(elem).height();

            /* if (mobile && $(elem).hasClass("enemy")) {
                // mobile, control enemy position
                return [
                    [pos.left - 100, pos.left + width - 100],
                    [pos.top + 50, pos.top + height + 50]
                ];
            } */

            return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
        }

        function comparePositions(p1, p2) {
            var r1, r2;
            r1 = p1[0] < p2[0] ? p1 : p2;
            r2 = p1[0] < p2[0] ? p2 : p1;
            return r1[1] > r2[0] || r1[0] === r2[0];
        }
        return function(a, b) {
            var pos1 = getPositions(a),
                pos2 = getPositions(b);
            return (
                comparePositions(pos1[0], pos2[0]) &&
                comparePositions(pos1[1], pos2[1])
            );
        };
    })();

    //  check the hero is now on jumping or not , if on jumping, return true
    var isHeroJumping = function() {
        var hero_btm = $(".hero").css("bottom");
        hero_btm = parseFloat(hero_btm.replace("px", ""));
        if (hero_btm >= 68 && hero_btm <= 85) return false;
        else return true;
    };

    var jumpHero = function() {
        if (isHeroJumping()) return;

        if ($(".lose").hasClass("lost") === false) {
            $(".hero")
                .toggleClass("jump")
                .bind(
                    "webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend",
                    function() {
                        if ($(this).hasClass("jump")) {
                            $(this).toggleClass("jump");
                        }
                    }
                );
        }
    };

    // when hero wins the game
    var winGame = function() {
        $(".birthbucket").stop();
        finishGame();
        // turn on the win audio
        setTimeout(function() {
            var score = parseInt($(".score").html());
            $(".lose p").html("Your Score is " + score);
            $("#win_audio").trigger("play");
            $(".lose").addClass("lost");
            $(".retry").addClass("lost");
            $(".exit").addClass("lost");
            $(".scoreboard").addClass("lost");
            $(".terms").addClass("lost");
            $(".win").show();
        }, 2000);
    };

    // when hero loses the game
    var loseGame = function() {
        $(".enemy").stop();
        finishGame();
        $("#die_audio").trigger("play");
        var score = parseInt($(".score").html());
        $(".lose p").html("Your Score is " + score);
        $(".lose").addClass("lost");
        $(".retry").addClass("lost");
        $(".exit").addClass("lost");
        $(".scoreboard").addClass("lost");
        $(".terms").addClass("lost");
    };

    var finishGame = function() {
        $(".hero").addClass("stopAnimate");
        $(".container").addClass("stopAnimate");
        clearInterval(runGame);
        clearInterval(itemInterval);
        gameAudio.pause();
    };

    var initFunc = function() {
        // when user taps the screen on mobile
        $("body").on("tap", function() {
            jumpHero();
        });
    };

    var getTodayDate = function() {
        // get the today date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        return today;
    };

    $(this).keydown(function(e) {
        if (e.which === 32 || e.which === 38) {
            jumpHero();
        }
    });
});
