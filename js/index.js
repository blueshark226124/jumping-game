$(function() {
    var runGame, itemInterval;
    var dones = false;
    var gameTime = 0; // indicates how many time has passed
    var maxTime = 3000; // max time 5,000 miliseconds
    // enemyNumber = 0 -> blue monster
    // enemyNumber = 1 -> blue monster
    // enemyNumber = 2 -> monkey monster
    var enemyNumber = 0;

    var runEnemy = function() {
        var enemy = $(".enemy");
        var properties = {
            right: $(".container").width(),
            display: "block"
        };
        var options = {
            duration: 1800,
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
                    //console.log("WIN");
                } else if (laped === true && loc < 205) {
                    dones = false;
                    loseGame();
                    //console.log("LOSE");
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
        $(".enemy").hide();
        finishGame();
        // turn on the win audio
        setTimeout(function() {
            var score = parseInt($(".score").html());
            $(".lose p").html("Your Score is " + score);
            $("#win_audio").trigger("play");
            $(".lose").addClass("lost");
            $(".win").show();
        }, 1500);
    };

    // when hero loses the game
    var loseGame = function() {
        $(".enemy").stop();
        finishGame();
        var score = parseInt($(".score").html());
        $(".lose p").html("Your Score is " + score);
        $(".lose").addClass("lost");
    };

    var finishGame = function() {
        $(".hero").addClass("stopAnimate");
        $(".container").addClass("stopAnimate");
        clearInterval(runGame);
        clearInterval(itemInterval);
    };

    $(this).keydown(function(e) {
        if (e.which === 32 || e.which === 38) {
            jumpHero();
        }
    });

    // when user taps the screen on mobile
    $(this).on("tap", function() {
        jumpHero();
    });

    setTimeout(function() {
        runGame = setInterval(function() {
            if (gameTime >= maxTime) {
                winGame();
            }
            runEnemy();
            gameTime += 2000;
        }, 2000);
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
            var score = parseInt($(".score").html());
            var data = {
                username: username,
                score: score
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

                        var messageEl = theForm.querySelector(".final-message");
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
});
