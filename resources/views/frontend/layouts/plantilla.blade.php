<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Municipalidad</title>
    <!-- Google Icon Font -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- CSS -->
    <link rel="stylesheet" href="{{asset('frontend/css/font-awesome.min.css')}}">
    <link rel="stylesheet" href="{{asset('frontend/css/materialize.min.css')}}">
    <link rel="stylesheet" href="{{asset('frontend/css/ihover.min.css')}}">
    <link rel="stylesheet" href="{{asset('frontend/css/madoka-style.css')}}">

    </script>
    <script type="text/javascript">
        window.onload = function () {
            var preloader = document.getElementById('preloader');
            preloader.style.display = 'none';
        }
    </script>
</head>

<body>
    <!-- Cover -->
    <div class="row main-cover">
        <div class="col s12">
          <img class="width-100" src="{{asset('public/img/_img21.png')}}" alt="">
        </div>
      </div>
    <!-- Navbar -->
    <nav class="white navbar">
        <div class="nav-wrapper">
            <a href="index.php" class="brand-logo hide-on-large-only pt-serif">Municipalidad</a>
            <a href="index.php" class="brand-logo brand-logo-alternative hide-on-med-and-down pt-serif">Municipalidad</a>
            <a href="#" data-activates="mobile-demo" class="button-collapse">
                <i class="material-icons">menu</i>
            </a>
            <ul class="right hide-on-med-and-down">
                <li>
                    <a class="first-ul waves-effect waves-light" href="frontend/inicio">
                        <i class="material-icons left">home</i>Inicio</a>
                </li>
                <li>
                    <a class="first-ul waves-effect waves-light" href="frontend/municipalidad">Municipalidad</a>
                </li>
                <li>
                    <a class="first-ul waves-effect waves-light" href="frontend/ciudad">Ciudad</a>
                </li>
                <li>
                    <a class="first-ul waves-effect waves-light" href="frontend/servicio">Servicios</a>
                </li>
                <li>
                    <a class="first-ul waves-effect waves-light" href="frontend/tupa">TUPA</a>
                </li>
                <li>
                    <a class="first-ul waves-effect waves-light" href="frontend/accesibilidad">Accesibilidad</a>
                </li>
                <li>
                    <a class="first-ul waves-effect waves-light" href="frontend/prevencion">Muni Prevenida</a>
                </li>
                <li>
                    <a class="first-ul waves-effect waves-light" href="frontend/external.php">Transparencia</a>
                </li>
            </ul>
        </div>
    </nav>
    <!-- Dropdown Mobile -->
    <ul class="side-nav" id="mobile-demo">
        <li class="active">
            <a class="first-ul waves-effect waves-light" href="frontend/inicio">
                <i class="material-icons left">home</i>Inicio</a>
        </li>
        <li>
            <a class="first-ul waves-effect waves-light" href="frontend/municipalidad">
                La Municipalidad</a>
        </li>
        <li>
            <a class="first-ul waves-effect waves-light" href="frontend/ciudad">
                La Ciudad</a>
        </li>
        <li>
            <a class="first-ul waves-effect waves-light" href="frontend/servicio">
                Los Servicios</a>
        </li>
        <li>
            <a class="first-ul waves-effect waves-light" href="efrontend/tupa">
                Tupa</a>
        </li>
        <li>
            <a class="first-ul waves-effect waves-light" href="frontend/accesibilidad">
                Accesiblidad</a>
        </li>
        <li>
            <a class="first-ul waves-effect waves-light" href="frontend/prevencion">
                Muni Prevenida</a>
        </li>
        <li>
            <a class="first-ul waves-effect waves-light" href="frontend/external.php">
                Transparencia</a>
        </li>
    </ul>
    <!-- Bar -->
    <div class="hide-on-small-only bar">
        <ul>
            <li class="grey darken-3 z-depth-3">
                <a href="">
                    <i class="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                </a>
            </li>
            <li class="grey darken-3 z-depth-3">
                <a href="">
                    <i class="fa fa-university fa-2x" aria-hidden="true"></i>
                </a>
            </li>
            <li class="grey darken-3 z-depth-3">
                <a href="">
                    <i class="fa fa-file fa-2x" aria-hidden="true"></i>
                </a>
            </li>
            <li class="grey darken-3 z-depth-3">
                <a href="">
                    <i class="fa fa-bar-chart fa-2x" aria-hidden="true"></i>
                </a>
            </li>
        </ul>
    </div>
    <!-- Preloader -->
    <!--<div id="preloader">
      <img src="/img/_img22.gif" alt="">
    </div>-->
    @yield('content')

    <!-- Floating Button -->
    <a class="btn-floating btn-large red waves-effect waves-light floating-button scale-transition scale-out">
        <i class="material-icons">expand_less</i>
    </a>
    <!-- Busqueda -->
    <div class="container white-text search-bar width-100 sub-shadow">
        <div class="row">
            <div class="col s8 offset-s2">
                <form>
                    <h4 class="pt-serif">Search</h4>
                    <div class="input-field">
                        <input id="search" type="search" required>
                        <label class="label-icon" for="search">
                            <i class="material-icons">search</i>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Footer -->
    <footer class="page-footer grey-text text-darken-2">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">
                    <h5>Our Ubication</h5>
                    <div class="divider"></div>
                    <br>
                    <iframe class="width-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63390.46161269078!2d-79.88406014242344!3d-6.781555095086378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x904cef232963dfff%3A0xa703e3454a7814bb!2sChiclayo!5e0!3m2!1ses!2spe!4v1515583945241"
                        style="border:0" allowfullscreen></iframe>
                </div>
                <div class="col l4 offset-l2 s12">
                    <h5>Social Links</h5>
                    <div class="divider"></div>
                    <br>
                    <div class="social-links">
                        <ul>
                            <li class="blue darken-4 z-depth-5">
                                <a class="" href="">
                                    <i class="fa fa-facebook fa-2x" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="light-blue z-depth-5">
                                <a class="" href="">
                                    <i class="fa fa-twitter fa-2x" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="red z-depth-5">
                                <a class="" href="">
                                    <i class="fa fa-youtube fa-2x" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="grey darken-3 z-depth-5">
                                <a class="" href="">
                                    <i class="fa fa-flickr fa-2x" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                <span class="grey-text text-darken-3">© 2018 Copyright Municipalidad</span>
                <a class="grey-text text-darken-3 right" href="#!">Genius Web</a>
            </div>
        </div>
    </footer>
    <!-- JavaScript -->
    <script src="{{asset('frontend/js/jquery-3.2.1.min.js')}}"></script>
    <script src="{{asset('frontend/js/materialize.min.js')}}"></script>
    <script src="{{asset('frontend/js/madoka-animations.js')}}"></script>
</body>

</html>