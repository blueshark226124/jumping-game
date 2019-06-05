<?php
    include_once('php/config.php');
?>

<!DOCTYPE html>
<html lang="en" >

<head>
    <meta charset="UTF-8">
    <title>Birthday Bucket Bash</title>
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" type="text/css" href="css/component.css" />
    <link rel="stylesheet" type="text/css" href="css/demo.css" />
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
    <div class="screen">
        <div class="zoneName">
            Get ready!
        </div>
        <div class="zone">
            player
            <span class="number">1</span>
        </div>

        <div class="blueBox">    
        </div>
        <div class="yellowBox">
            <div class="title">
                JUMP to stay alive!
            </div>
        </div>
        <div class="redBox">
            <ul class="rectBox">
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
                <li class="rect"></li>
            </ul>  
        </div>
        <button id="play_btn" class="btn btn-danger">Play</button>
    </div>

    <div class="container" style="display: none;">
        <div class="score">0</div>
        <div class="hero"></div>
        <div class="enemy blue"></div>
        <div class="item item1 coin"></div>
        <div class="item item2 ballon"></div>
        <div class="item item3 coin"></div>
        <div class="item item4 ballon"></div>
        <div class="lose">
            <p></p>
            <section>
                <form id="theForm" class="simform" autocomplete="off">
                    <div class="simform-inner">
                        <ol class="questions">
                            <li>
                                <input id="username" name="username" type="text" placeholder="Enter your name & surname" />
                            </li>
                            <li>
                                <input id="phone_number" name="phone_number" type="text" placeholder="Enter cell nr to CLAIM YOUR PRIZE" />
                            </li>
                        </ol><!-- /questions -->
                        <button class="submit" type="submit">Send</button>
                        <div class="controls">
                            <button class="next"></button>
                            <div class="progress"></div>
                            <span class="number" style="display: none; ">
                                <span class="number-current"></span>
                                <span class="number-total"></span>
                            </span>
                            <span class="error-message"></span>
                        </div><!-- / controls -->
                    </div><!-- /simform-inner -->
                    <span class="final-message"></span>
                </form><!-- /simform -->	
            </section>
        </div>
        <div id="new_game"></div>
        <div class="birthbucket"></div>
        <audio id="win_audio">
            <source src="audio/win_audio.mp3" type="audio/mpeg">
        </audio>
        <audio id="die_audio">
            <source src="audio/die_audio.mp3" type="audio/mpeg">
        </audio>
    </div>

    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js'></script>
    <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
    <script src="js/modernizr.custom.js"></script>
    <script src="js/classie.js"></script>
	<script src="js/stepsForm.js"></script>
    <script src="js/index.js"></script>
</body>
</html>
