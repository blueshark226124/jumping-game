/**
 *
 * Simple Endless Run
 */
$(function() {
    var runGame;
    var dones = false;

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

                // console.log(
                //   "enemy: " + enemyLoc + " hero: " + heroLoc + " loc: " + loc
                // );

                if (loc > 205 && laped === false) {
                    dones = true;
                    //console.log("WIN");
                } else if (laped === true && loc < 205) {
                    dones = false;
                    $(".enemy").stop();
                    var score = parseInt($(".score").html());
                    $(".hero").addClass("stopAnimate");
                    $(".container").addClass("stopAnimate");
                    $(".lose p").html("Your Score is " + score);
                    clearInterval(runGame);
                    $(".lose").addClass("lost");
                    //console.log("LOSE");
                }
            },

            complete: function() {
                if (dones === true) {
                    var score = parseInt($(".score").html());
                    $(".score").html(score + 1);
                }
            }
        };

        enemy.animate(properties, options);
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

    $(this).keydown(function(e) {
        if (e.which === 32 || e.which === 38) {
            if (isHeroJumping()) return;
            console.log("JUMP");

            if ($(".lose").hasClass("lost") === false) {
                $(".hero")
                    .toggleClass("jump")
                    .bind(
                        "webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend",
                        function(e) {
                            if ($(this).hasClass("jump")) {
                                console.log("DROP");
                                $(this).toggleClass("jump");
                            }
                        }
                    );
            }
        }
    });

    $(this).on("tap", function() {
        if (isHeroJumping()) return;

        if ($(".lose").hasClass("lost") === false) {
            $(".hero")
                .toggleClass("jump")
                .bind(
                    "webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend",
                    function(e) {
                        if ($(this).hasClass("jump")) {
                            console.log("DROP");
                            $(this).toggleClass("jump");
                        }
                    }
                );
        }
    });

    setTimeout(function() {
        runGame = setInterval(function() {
            runEnemy();
        }, 2000);
    }, 500);
});
