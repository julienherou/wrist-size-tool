<?php
/**
 * DeviceAtlas Cloud Example
 *
 * This sample code fetches data from the DeviceAtlas Cloud service.
 *
 * NOTE: if cookie caching is turned on then the getDeviceData() method must
 * be called before any output to the browser.
 *
 * NOTE: when deviceatlas-X.X.min.js is included on a page, DeviceAtlas Client
 * Side Component device data and puts it into a cookie, when using
 * DeviceAtlas Cloud service the cookie data will be used to create the final
 * result.
 *
 * @copyright Copyright (c) DeviceAtlas Ltd 2021. All Rights Reserved.
 * @author dotMobi
 */

error_reporting(E_ALL);       // for testing to help seeing problems
ini_set('display_errors', 1); // for testing to help seeing problems
$startTime = microtime(true); // timer to see how long it takes to get device data



/* (1) Edit the DeviceAtlasCloud "Client.php" file and set your licence key: */
//     const LICENCE_KEY = 'YOUR-DA-LICENCE-KEY';



/* (2) Include DeviceAtlasCloud: */
require_once dirname(__FILE__).'/Api/Client.php';



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



// TEST DEVICE ATLAS
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

    <div class="container">

        <!-- INTRO 0 -->
        <div class="slide intro intro0 active">
            <div class="inside-slide">
                <div class="logo-top">
                    <img src="img/logo.png" alt="Logo Tissot">
                </div>
                <div class="main-elt">
                    <p>Choisissez<br>
                        votre <span class="red">langue</span></p>
                    <div class="contain-country">
                        <div class="country select">
                            <img class="country-flag" src="img/001-france.svg" alt="Flag of country">
                            <span class="country-text">Français</span>
                        </div>
                        <div class="country">
                            <img class="country-flag" src="img/002-united-kingdom.svg" alt="Flag of country">
                            <span class="country-text">English</span>
                        </div>
                        <div class="country">
                            <img class="country-flag" src="img/003-germany.svg" alt="Flag of country">
                            <span class="country-text">Deutsch</span>
                        </div>
                        <div class="country">
                            <img class="country-flag" src="img/004-italy.svg" alt="Flag of country">
                            <span class="country-text">Italiano</span>
                        </div>
                        <div class="country">
                            <img class="country-flag" src="img/005-spain.svg" alt="Flag of country">
                            <span class="country-text">Español</span>
                        </div>
                        <div class="country">
                            <img class="country-flag" src="img/006-netherlands.svg" alt="Flag of country">
                            <span class="country-text">Nederlands</span>
                        </div>
                        <div class="country">
                            <img class="country-flag" src="img/007-poland.svg" alt="Flag of country">
                            <span class="country-text">Polonis</span>
                        </div>
                        <div class="country">
                            <img class="country-flag" src="img/008-austria.svg" alt="Flag of country">
                            <span class="country-text">Österreichisch</span>
                        </div>
                        <div class="country">
                            <img class="country-flag" src="img/009-russia.svg" alt="Flag of country">
                            <span class="country-text">Pусский</span>
                        </div>
                        <div class="country">
                            <img class="country-flag" src="img/010-japan.svg" alt="Flag of country">
                            <span class="country-text">日本</span>
                        </div>
                        <div class="country">
                            <img class="country-flag" src="img/011-switzerland.svg" alt="Flag of country">
                            <span class="country-text">Suisse</span>
                        </div>

                        
                    </div>
                </div>
                <div class="contain-bot">
                    <div class="contain-btn">
                        <div class="btn-nav next">Commencer</div>
                    </div>
                </div>
            </div>
        </div>


        <!-- INTRO 1 -->
        <div class="slide intro intro1">
            <div class="inside-slide">
                <div class="logo-top">
                    <img src="img/logo.png" alt="Logo Tissot">
                </div>
                <div class="main-elt">
                    <p>Veuillez suivre<br>
                        les <span class="red">indications suivantes</span><br>
                        pour une mesure exacte<br>
                        de votre poignet
                    </p>
                    <div class="contain-btn">
                        <div class="btn-nav next">Commencer</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- INTRO 2 -->
        <div class="slide intro intro2">
            <div class="inside-slide">
                <div class="logo-top">
                    <img src="img/logo.png" alt="Logo Tissot">
                </div>
                <div class="main-elt">
                    <div class="contain-picto-mini">
                        <div class="picto-meas-mini hidden">
                            <span>1</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-1.png" alt="Picture of wrist measure">
                        </div>
                        <div class="picto-meas-mini hidden">
                            <span>2</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-2.png" alt="Picture of wrist measure">
                        </div>
                        <div class="picto-meas-mini hidden">
                            <span>3</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-3.png" alt="Picture of wrist measure">
                        </div>
                    </div>
                    <p class="intro2-title"><span class="red">1 - </span>Bien poser son smartphone<br>
                        au contact de la peau de votre poignet
                    </p>
                    <div class="picto-meas">

                        <img class="wrist-measure intro2-picto1" src="img/picto/picto-wrist-1.png" alt="Picture of wrist measure">
                        <img class="wrist-measure intro2-picto2" src="img/picto/picto-wrist-2.png" alt="Picture of wrist measure">

                    </div>
                </div>
                <div class="contain-bot">
                    <div class="contain-btn">
                        <div class="btn-nav back"><img src="img/arrow-left.png" alt="Flèche"><span>Précédent</span></div>
                        <div class="btn-nav next"><span>Suivant</span><img src="img/arrow-right.png" alt="Flèche"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- INTRO 3 -->
        <div class="slide intro intro3">
            <div class="inside-slide">
                <div class="logo-top">
                    <img src="img/logo.png" alt="Logo Tissot">
                </div>
                <div class="main-elt">
                    <div class="contain-picto-mini">
                        <div class="picto-meas-mini picto-mini1">
                            <span>1</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-1.png" alt="Picture of wrist measure">
                        </div>
                        <div class="picto-meas-mini hidden">
                            <span>2</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-2.png" alt="Picture of wrist measure">
                        </div>
                        <div class="picto-meas-mini hidden">
                            <span>3</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-3.png" alt="Picture of wrist measure">
                        </div>
                    </div>
                    <p class="intro3-title"><span class="red">2 - </span>Se positionner<br>
                        après l'os du poignet
                    </p>
                    <div class="picto-meas">
                        <img class="wrist-measure intro3-picto1" src="img/picto/picto-wrist-3.png" alt="Picture of wrist measure">
                        <img class="wrist-measure intro3-picto3" src="img/picto/picto-wrist-5.png" alt="Picture of wrist measure">
                        <img class="wrist-measure intro3-picto4" src="img/picto/picto-wrist-6.png" alt="Picture of wrist measure">
                        <img class="wrist-measure intro3-picto2" src="img/picto/picto-wrist-4.png" alt="Picture of wrist measure">
                    </div>
                </div>
                <div class="contain-bot">
                    <div class="contain-btn">
                        <div class="btn-nav back"><img src="img/arrow-left.png" alt="Flèche"><span>Précédent</span></div>
                        <div class="btn-nav next"><span>Suivant</span><img src="img/arrow-right.png" alt="Flèche"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- INTRO 4 -->
        <div class="slide intro intro4">
            <div class="inside-slide">
                <div class="logo-top">
                    <img src="img/logo.png" alt="Logo Tissot">
                </div>
                <div class="main-elt">
                    <div class="contain-picto-mini">
                        <div class="picto-meas-mini">
                            <span>1</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-1.png" alt="Picture of wrist measure">
                        </div>
                        <div class="picto-meas-mini picto-mini2">
                            <span>2</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-2.png" alt="Picture of wrist measure">
                        </div>
                        <div class="picto-meas-mini hidden">
                            <span>3</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-3.png" alt="Picture of wrist measure">
                        </div>
                    </div>
                    <p class="intro4-title"><span class="red">3 - </span>Ajuster la réglette virtuelle<br>
                        sur la largeur dans la continuité du bras
                    </p>
                    <div class="picto-meas">
                        <img class="wrist-measure intro4-picto1" src="img/picto/picto-wrist-7.png" alt="Picture of wrist measure">
                        <img class="wrist-measure intro4-picto2" src="img/picto/picto-wrist-8.png" alt="Picture of wrist measure">
                        <img class="wrist-measure intro4-picto3" src="img/picto/picto-wrist-9.png" alt="Picture of wrist measure">
                        <img class="wrist-measure intro4-picto4" src="img/picto/picto-wrist-10.png" alt="Picture of wrist measure">
                    </div>
                </div>
                <div class="contain-bot">
                    <div class="contain-btn">
                        <div class="btn-nav back"><img src="img/arrow-left.png" alt="Flèche"><span>Précédent</span></div>
                        <div class="btn-nav next"><span>Suivant</span><img src="img/arrow-right.png" alt="Flèche"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- INTRO 5 -->
        <div class="slide intro intro5">
            <div class="inside-slide">
                <div class="logo-top">
                    <img src="img/logo.png" alt="Logo Tissot">
                </div>
                <div class="main-elt">
                    <div class="contain-picto-mini">
                        <div class="picto-meas-mini">
                            <span>1</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-1.png" alt="Picture of wrist measure">
                        </div>
                        <div class="picto-meas-mini">
                            <span>2</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-2.png" alt="Picture of wrist measure">
                        </div>
                        <div class="picto-meas-mini picto-mini3">
                            <span>3</span>
                            <img class="wrist-measure-mini" src="img/wrist-meas-mini-3.png" alt="Picture of wrist measure">
                        </div>
                    </div>
                    <div class="contain-btn">
                        <div class="btn-nav next">Prendre la mesure<br>
                            de mon poignet
                        </div>
                        <div class="btn-nav back"><img src="img/refresh.png" alt="Refresh"><span>Revoir les instructions</span></div>
                    </div>
                </div>
            </div>
        </div>


        <!-- SLIDE 1 -->
        <div class="slide slide1">
            <div class="inside-slide">
                <div class="logo-top">
                    <img src="img/logo.png" alt="Logo Tissot">
                </div>
                <div class="main-elt">
                    <p>Choisissez<br>
                        votre <span class="red">unité de mesure</span><br>
                    </p>
                    <div class="contain-unit">
                        <div class="unit unit-in">IN</div>
                        <div class="unit unit-cm select">CM</div>
                        <div class="unit unit-mm">MM</div>
                    </div>
                </div>
                <div class="contain-bot">
                    <div class="contain-btn">
                        <div class="btn-nav back">Retour</div>
                        <div class="btn-nav next">Confirmer</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SLIDE 2 - 1ere mesure -->
        <div class="slide slide2">
            <div class="inside-slide">

                <!-- Zone de mesure 1 -->
                <div class="measure measure1">
                    <div class="contain-top">
                        <span class="line"></span>
                    </div>
                    <div class="contain-measure">
                        <img class="arrow arrow-meas" src="img/arrow-top.svg" alt="Fleche du haut">
                        <div class="contain-size">
                            <div class="line-vertical"></div>
                            <div class="size">
                                <p><span class="number number1"></span><span class="symb-unit1"></span></p>
                            </div>
                        </div>
                        <img class="arrow arrow-meas" src="img/arrow-bot.svg" alt="Fleche du bas">
                    </div>
                    <div class="contain-line line1">
                        <img class="arrow" src="img/arrow-top.svg" alt="Fleche du haut">
                        <span class="line-dash"></span>
                        <img class="arrow" src="img/arrow-bot.svg" alt="Fleche du bas">
                    </div>
                </div>

                <div class="contain-bot">
                    <p>Ajuster la réglette virtuelle<br>
                        sur la largeur dans la continuité du bras</p>
                    <div class="contain-btn">
                        <div class="btn-nav back">Retour</div>
                        <img src="img/logo-bot.png" alt="Logo Tissot">
                        <div class="btn-nav next">Confirmer</div>
                    </div>
                </div>
    
            </div>
        </div>

        <!-- SLIDE 3 -->
        <div class="slide slide3">
            <div class="inside-slide">
                <div class="main-elt">
                    <p class="slide3-title">Tournez votre poignet et prenez la mesure<br>
                        comme sur l'étape précédente</p>
                    <div class="picto-meas">
                        <img class="wrist-rotate slide3-picto1" src="img/wrist-rotate-1.png" alt="Picture of wrist rotate 1">
                        <img class="wrist-rotate slide3-picto3" src="img/wrist-rotate-3.png" alt="Picture of wrist rotate 3">
                        <img class="wrist-rotate slide3-picto2" src="img/wrist-rotate-2.png" alt="Picture of wrist rotate 2">
                    </div>
                </div>
                <div class="contain-bot">
                    <div class="contain-btn">
                        <div class="btn-nav back">Retour</div>
                        <img src="img/logo-bot.png" alt="Logo Tissot">
                        <div class="btn-nav next">Confirmer</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SLIDE 4 -->
        <div class="slide slide4">
            <div class="inside-slide">

                <!-- Zone de mesure 2 -->
                <div class="measure measure2">
                    <div class="contain-top">
                        <span class="line"></span>
                    </div>
                    <div class="contain-measure">
                        <img class="arrow arrow-meas" src="img/arrow-top.svg" alt="Fleche du haut">
                        <div class="contain-size">
                            <div class="line-vertical"></div>
                            <div class="size">
                                <p><span class="number number2"></span><span class="symb-unit2"></span></p>
                            </div>
                        </div>
                        <img class="arrow arrow-meas" src="img/arrow-bot.svg" alt="Fleche du bas">
                    </div>
                    <div class="contain-line line2">
                        <img class="arrow" src="img/arrow-top.svg" alt="Fleche du haut">
                        <span class="line-dash"></span>
                        <img class="arrow" src="img/arrow-bot.svg" alt="Fleche du bas">
                    </div>
                </div>
                <div class="contain-bot">
                    <p>Ajuster la réglette virtuelle<br>
                        sur la largeur dans la continuité du bras</p>
                    <div class="contain-btn">
                        <div class="btn-nav back">Retour</div>
                        <img src="img/logo-bot.png" alt="Logo Tissot">
                        <div class="btn-nav next">Confirmer</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SLIDE 5 -->
        <div class="slide slide5">
            <div class="inside-slide">
                <div class="logo-top"><img src="img/logo.png" alt="Logo Tissot"></div>
                <div class="main-elt">
                    <p class="slide5-title">Votre taille est :<br>
                        <span class="result"></span><span class="symb-unit3"></span></p>
                    <div class="contain-unit contain-unit2">
                        <div class="unit unit-in">IN</div>
                        <div class="unit unit-cm select">CM</div>
                        <div class="unit unit-mm">MM</div>
                    </div>
                    <div class="contain-cta">
                        <a href="#"><div class="cta link-website">Retourner sur le site</div></a>
                        <a href="#"><div class="cta close">Fermer l'outil</div></a>
                    </div>
                </div>
                <div class="contain-bot">
                    <div class="contain-btn">
                        <div class="btn-nav next">Retour</div>
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