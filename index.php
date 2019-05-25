<?php
    include_once('php/config.php');
?>

<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>Hungry Lion Catch 22</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link rel="stylesheet" type="text/css" href="css/component.css" />
    <link rel="stylesheet" type="text/css" href="css/demo.css" />
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
    <div class="container">
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
                                <input id="username" name="username" type="text" placeholder="Enter username" />
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
        <div class="win" style="display: none;">
            
        </div>
        <audio id="win_audio">
            <source src="/audio/win.mp3" type="audio/mpeg">
        </audio>
    </div>

    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js'></script>
    <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <script src="js/modernizr.custom.js"></script>
    <script src="js/classie.js"></script>
	<script src="js/stepsForm.js"></script>
    <script src="js/index.js"></script>
</body>
</html>
