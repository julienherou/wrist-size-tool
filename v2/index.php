<?php
/**
 * @copyright Copyright (c) DeviceAtlas Ltd 2021. All Rights Reserved.
 * @author dotMobi
 */

error_reporting(E_ALL);       // for testing to help seeing problems
ini_set('display_errors', 1); // for testing to help seeing problems
$startTime = microtime(true); // timer to see how long it takes to get device data


/* (1) Edit the DeviceAtlasCloud "Client.php" file and set your licence key: */
//     const LICENCE_KEY = 'YOUR-DA-LICENCE-KEY';


/* (2) Include DeviceAtlasCloud: */
require_once dirname(__FILE__).'/../Api/Client.php';


/* (3) Get data: */
$errors = null;

// it is highly recommended to use the API in a try/catch block
try {
    // get device properties for the current request
    $properties = DeviceAtlasCloudClient::getDeviceData();

    // if errors happend within the cloud call/API
    if (isset($properties[DeviceAtlasCloudClient::KEY_ERROR])) {
        $errors = trim($properties[DeviceAtlasCloudClient::KEY_ERROR]);
    }

} catch (Exception $ex) {
    // all errors must be taken care ok
    $errors = $ex->getMessage();
}

// time spent for getting device data
$timeSpent = round((microtime(true) - $startTime) * 1000);

// use the device data...
// in this example the data will be printed on the page:


// DEVICE ATLAS
$propertiesKey = DeviceAtlasCloudClient::KEY_PROPERTIES;
$uaComment = '';
if (isset($properties[$propertiesKey]) && $properties[$propertiesKey]) {

    $ua = isset($properties[DeviceAtlasCloudClient::KEY_USERAGENT])?
        $properties[DeviceAtlasCloudClient::KEY_USERAGENT]: 'None';

    $source = isset($properties[DeviceAtlasCloudClient::KEY_SOURCE])?
        $properties[DeviceAtlasCloudClient::KEY_SOURCE]: 'None';


    $properties = $properties[$propertiesKey];
    // var_dump($properties);
    $diagonal_screen_size = '';
    $display_ppi = '';

    if (isset($properties['diagonalScreenSize'])) {
        $diagonal_screen_size = $properties['diagonalScreenSize'];
        // var_dump($diagonal_screen_size);
    }
    if (isset($properties['displayPpi'])) {
        $display_ppi = $properties['displayPpi'];
        // var_dump($display_ppi);
    }
    if (isset($properties['displayHeight'])) {
        $test = $properties['displayHeight'];
        // var_dump($test);
    }

} // Fin du if

?>



<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="author" content="Julien Herou">
    <title>Tissot</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <div id='dpi-div'></div>
    <!-- Variables Device Atlas -->
    <input type="hidden" id="diagonal-inch" name="diagonal-inch"  value= <?php echo $diagonal_screen_size ?> />
    <input type="hidden" id="display-ppi" name="display-ppi"  value= <?php echo $display_ppi ?> />

    <!-- DESKTOP -->
    <div class="desktop">
        <div class="inside-slide">
            <div class="close">
                <img src="img/close-white.png" alt="Close">
            </div>
            <div class="logo-top">
                <img src="img/logo.png" alt="Logo Tissot">
            </div>
            <div class="main-elt">
                <p>Pour utiliser l'outil de mesure<br>
                    récharger cette page sur Mobile
                </p>
                <div class="contain-cta">
                    <a href="#"><div class="cta link-website">Retourner sur le site</div></a>
                </div>
            </div>
        </div>
    </div>

    <div class="container">

        <!-- SLIDE 1 -->
        <div class="slide slide1 active">
            <div class="inside-slide">
                <div class="close">
                    <img src="img/close-black.png" alt="Close">
                </div>
                <div class="logo-top">
                    <!-- <img src="img/logo.png" alt="Logo Tissot"> -->
                    <img src="img/tissot-logo-b.svg" alt="Logo Tissot">
                </div>
                <div class="main-elt">

                    <p class="slide1-title">Put your smartphone in contact<br>
                        with the skin of your wrist
                    </p>
                    <div class="picto-meas">
                        <img class="wrist-measure slide1-picto1" src="img/picto/picto-white-slide1-1.png" alt="Picture of wrist measure">
                        <img class="wrist-measure slide1-picto2" src="img/picto/picto-white-slide1-2.png" alt="Picture of wrist measure">
                    </div>
                </div>
                <div class="contain-bot">
                    <div class="contain-btn">
                        <div class="btn-nav next"><span>Start</span><img src="img/arrow-right-w.png" alt="Flèche"></div>
                    </div>
                </div>
            </div>
        </div>


        <!-- SLIDE 2 - 1ere mesure -->
        <div class="slide slide2">
            <div class="inside-slide">
                <div class="close">
                    <img src="img/close-white.png" alt="Close">
                </div>
                <!-- Zone de mesure 1 -->
                <div class="measure measure1">
                    <div class="contain-top">
                        <span class="line"></span>
                    </div>

                    <div class="contain-motion">
                        <p class="instruction">
                            Place it before your wrist bone<br>
                            Adjust the virtual strip on the width in the<br>
                            continuity of the arm
                        </p>
                        <div class="picto-meas">
                            <img class="wrist-measure intro3-picto1" src="img/picto/picto-white-slide2-1.png" alt="Picture of wrist measure">
                            <img class="wrist-measure intro3-picto3" src="img/picto/picto-white-slide2-4.png" alt="Picture of wrist measure">
                            <img class="wrist-measure intro3-picto4" src="img/picto/picto-white-slide2-5.png" alt="Picture of wrist measure">
                            <img class="wrist-measure intro3-picto2" src="img/picto/picto-white-slide2-2.png" alt="Picture of wrist measure">



                        </div>


                    </div>

                    <div class="contain-line line1">
                        <img class="arrow" src="img/arrow-top.svg" alt="Fleche du haut">
                        <span class="line-dash"></span>
                        <img class="arrow" src="img/arrow-bot.svg" alt="Fleche du bas">
                    </div>

                    <!-- Affichage de la mesure -->
                    <div class="contain-info info1">
                        <div class="contain-size">
                            <div class="size">
                                <p><span class="number number1"></span><span class="symb-unit1"></span></p>
                            </div>
                        </div>
                        <div class="contain-unit">
                            <div class="unit unit-in">IN</div>
                            <div class="unit unit-cm select">CM</div>
                        </div>
                    </div>

                </div>
                <div class="contain-bot">
                    <div class="contain-btn double">
                        <div class="btn-nav back"><img src="img/arrow-left-w.png" alt="Flèche"><span>Previous</span></div>
                        <div class="btn-nav next"><span>Confirm</span><img src="img/arrow-right-b.png" alt="Flèche"></div>
                    </div>
                </div>
    
            </div>
        </div>


        <!-- SLIDE 3 -->
        <div class="slide slide3">
            <div class="inside-slide">
                <div class="close">
                    <img src="img/close-white.png" alt="Close">
                </div>
                <div class="main-elt">
                    <p class="slide3-title">Turn your wrist<br>
                        and take the measurement</p>
                    <div class="picto-meas">
                        <img class="wrist-rotate slide3-picto1" src="img/wrist-rotate-1.png" alt="Picture of wrist rotate 1">
                        <img class="wrist-rotate slide3-picto3" src="img/wrist-rotate-3.png" alt="Picture of wrist rotate 3">
                        <img class="wrist-rotate slide3-picto2" src="img/wrist-rotate-2.png" alt="Picture of wrist rotate 2">
                    </div>
                </div>
                <div class="contain-bot">
                    <div class="contain-btn double">
                        <div class="btn-nav back"><img src="img/arrow-left-w.png" alt="Flèche"><span>Previous</span></div>
                        <div class="btn-nav next"><span>Confirm</span><img src="img/arrow-right-b.png" alt="Flèche"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SLIDE 4 - 2eme mesure -->
        <div class="slide slide4">
            <div class="inside-slide">
                <div class="close">
                    <img src="img/close-white.png" alt="Close">
                </div>
                <!-- Zone de mesure 2 -->
                <div class="measure measure2">
                    <div class="contain-top">
                        <span class="line"></span>
                    </div>
                    <div class="contain-motion">
                        <img class="arrow arrow-meas" src="img/arrow-top.svg" alt="Fleche du haut">
                        <div class="contain-arrow">
                            <div class="line-vertical"></div>
                        </div>
                        <img class="arrow arrow-meas" src="img/arrow-bot.svg" alt="Fleche du bas">
                    </div>
                    <div class="contain-line line2">
                        <img class="arrow" src="img/arrow-top.svg" alt="Fleche du haut">
                        <span class="line-dash"></span>
                        <img class="arrow" src="img/arrow-bot.svg" alt="Fleche du bas">
                    </div>
                    <div class="contain-info info2">
                        <div class="contain-size">
                            <div class="size">
                                <p><span class="number number2"></span><span class="symb-unit2"></span></p>
                            </div>
                        </div>
                        <div class="contain-unit">
                            <div class="unit unit-in">IN</div>
                            <div class="unit unit-cm select">CM</div>
                        </div>
                    </div>
                </div>

                <div class="contain-bot">
                    <div class="contain-btn double">
                        <div class="btn-nav back"><img src="img/arrow-left-w.png" alt="Flèche"><span>Previous</span></div>
                        <div class="btn-nav next"><span>Confirm</span><img src="img/arrow-right-b.png" alt="Flèche"></div>
                    </div>
                </div>

            </div>
        </div>

        <!-- SLIDE 5 -->
        <div class="slide slide5">
            <div class="inside-slide">
                <div class="close">
                    <img src="img/close-white.png" alt="Close">
                </div>
                <div class="logo-top"><img src="img/logo.png" alt="Logo Tissot"></div>
                <div class="main-elt">
                    <p class="slide5-title">Your size is:<br>
                        <span class="result"></span><span class="symb-unit3"></span></p>
                    <div class="contain-unit contain-unit2">
                        <div class="unit unit-in">IN</div>
                        <div class="unit unit-cm select">CM</div>
                    </div>
                    <div class="contain-cta">
                        <a href="#"><div class="cta link-website">Return to the site</div></a>
                        <a href="#"><div class="cta link-again back">Measure again<br>your wrist</div></a>
                    </div>
                </div>
            </div>
        </div>





    </div> <!-- End of Container -->

    <!-- Device Atlas -->
    <script type="text/javascript" src="https://cs-cdn.deviceatlas.com/dacs.js"></script>
    <!-- JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
    <script src="script.js"></script>
</body>
</html>