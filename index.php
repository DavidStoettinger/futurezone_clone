<!doctype html>
<html class="no-js" lang="de">

<head>
  <meta charset="utf-8">
  <title>futurezone</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta property="og:title" content="">
  <meta property="og:type" content="">
  <meta property="og:url" content="">
  <meta property="og:image" content="">

  <link rel="manifest" href="site.webmanifest">
  <link rel="apple-touch-icon" href="icon.png">
  <!-- Place favicon.ico in the root directory -->

  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">

  <meta name="theme-color" content="#fafafa">
</head>

<body>

<!-- Add your site or application content here -->

<header id="header">
  <div class="headerDiv1">
    <div class="headerImgRightDiv">
      <img class="headerImgRight" src="img/contact_page-24px.svg" alt="">
      <p class="headerDiv1P"><b>Anmelden</b></p>
    </div>

    <img class="headerImgCenter" src="img/Logo_futurezone.jpg" alt="img/Logo_futurezone.jpg">
    <!-- probably not going to download it -->


    <img class="headerImgLeft1 burgerMenuButton" src="img/reorder-24px.svg" alt="">
    <div class="headerImgLeft2Div searchBtnClickable">
      <img class="headerImgLeft2" src="img/search-24px.svg" alt="">
      <p class="headerDiv1P"><b>Suche</b></p>
    </div>
  </div>

  <div class="headerDiv2">
    <div class="headerDiv2Menu">
      <div class="BurgerImgDiv">
        <img class="BurgerImg burgerMenuButton" src="img/clear-24px.svg" alt="">
      </div>
      <nav class="BurgerKatPrioDiv">
        <div class="BurgerKatSearch searchBtnClickable">
          <img class="BurgerKatSearch" src="img/search-24px.svg" alt="">
          <p class="BurgerKatSearch">Suche</p>
        </div>
        <a class="BurgerKatPrioA">Netzpolitik</a>
        <a class="BurgerKatPrioA">B2B</a>
        <a class="BurgerKatPrioA">Produkte</a>
        <a class="BurgerKatPrioA">Digital Life</a>
        <a class="BurgerKatPrioA">Science</a>
        <a class="BurgerKatPrioA">Meinung</a>
        <a class="BurgerKatPrioA">Games</a>
        <a class="BurgerKatPrioA">Apps</a>
        <a class="BurgerKatPrioA">Start-Up</a>
        <a class="BurgerKatPrioA">Community</a>
        <a class="BurgerMore BurgerKatPrioA">
          <p>Mehr</p>
        </a>
      </nav>
    </div>
  </div>
  <div class="headerSearch" id="headerSearch">
    <button id="headerSearchBtn">Suche</button>
    <div class="headerSearchDiv">
      <input type="text" id="headerSearchText" placeholder="Zu suchenden Text Eingeben" autocomplete="off">
    </div>
  </div>
</header>
<!-- not inside header because header needs fixed size for nice slide -->
<div class="mainSearch" id="mainSearch">
  <template id="searchArticleTemplate">
    <article class="searchArticle" id="searchArticleTemplateID">
      <p class="searchArticle" id="searchArticleTemplateP">{{Description}}</p>
    </article>
  </template>
</div>

<div class="mainFlex">
  <aside class="mainSide">
    <section class="mainSideNewSection">
      <div class="FeatureHeader">
        <input type="hidden" class="FeatureHeaderHidden" id="FeatureHeaderHClick" value="FeatureHeaderH1">
        <h3 class="FeatureHeaderH FeatureHeaderH1" id="FeatureHeaderH1">Feature</h3>
        <h3 class="FeatureHeaderH" id="FeatureHeaderH2">Meistgelesen</h3>
        <h3 class="FeatureHeaderH" id="FeatureHeaderH3">Neu</h3>
      </div>
      <div class="FeatureArticleGroup1" id="FeatureArticleGroup">
        <template id="FeatureArticleTemplate">
          <article class="FeatureArticle searchable">
            <p class="FeatureArticleCat CategoryP" id="FeatureArticleCategory">{{Category}}</p>
            <h3 class="FeatureArticleH" id="FeatureArticleHeader">{{Header}}</h3>
          </article>
        </template>
      </div>
    </section>

    <article class="mainSectionArticleBig searchable">
      <!-- https://futurezone.at/myfuzo/futurezone-award-2020-das-sind-die-nominierten/401062806 -->
      <img class="mainArticleBigImg" src="img/46-168010593.jpg" alt=""><!-- ist das offizielle bild zu dem artikel -->
      <p class="mainSectionPCat  CategoryP">MYFUZO</p>
      <h2 class="mainArticleBigH2">futurezone award 2020: Das sind die Nominierten</h2>
      <p class="mainArticleBigPDescription">Die futurezone kürt auch in diesem Jahr die besten Projekte und Ideen des
        Jahres. Jetzt stehen die Finalisten fest.</p>
    </article>
  </aside>

  <div class="mainColumn">
    <main>
      <?php
      //https://stackoverflow.com/questions/19758954/get-data-from-json-file-with-php
      $str = file_get_contents('data/mainArticle.json');
      $json = json_decode($str, true);
      //for simple order logic int with 1 = BigImg; %2=0 <div>; %2=1 </div>
      $cnt = 1;
      foreach ($json['main'] as $field => $value) {
        if ($cnt % 2 == 0)
          echo "<div class='mainDivArticleBig2'>";

        echo "<article class='mainArticleBig searchable'>
          <img class='mainArticleBigImg' src='" . $value['Image'] . "' alt=''>
          <p class='mainArticleBigPKategorie  CategoryP'>" . $value['Category'] . "</p>
          <h2 class='mainArticleBigH2'>" . $value['Title'] . "</h2>
          </article>";

        if ($cnt % 2 == 1 && $cnt != 1)
          echo "</div>";
        $cnt++;
      }
      ?>
    </main>

    <section class="sectionNews">
      <div class="sectionNewsHeaderDiv">
        <h4 class="sectionsNewsH4">Aktuelles:</h4>
        <img class="sectionNewsHImg" src="img/play_arrow-24px.svg" alt="">
      </div>
      <div class="sectionNewsMainDiv">
        <?php
        //https://stackoverflow.com/questions/19758954/get-data-from-json-file-with-php
        $str = file_get_contents('data/recent.json');
        $json = json_decode($str, true);
        foreach ($json['recent'] as $field => $value)
          echo "<article class='sectionNewsArticle searchable'>
            <p class='sectionNewsP  CategoryP'>" . $value['Category'] . "</p>
            <div class='sectionNewsArticleDiv'>
                <div>
                    <h3 class='sectionNewsH2'>" . $value['Title'] . "</h3>
                    <p class='sectionNewsPDescription'>" . $value['Description'] . "</p>
                </div>
                <img class='sectionNewsImg' src='" . $value['Image'] . "' alt=''>
            </div>
            </article>";

        ?>
      </div>
    </section>
  </div>
</div>


<script src="js/vendor/modernizr-3.11.2.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/main.js"></script>

<!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
<script>
  window.ga = function () {
    ga.q.push(arguments)
  };
  ga.q = [];
  ga.l = +new Date;
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('set', 'anonymizeIp', true);
  ga('set', 'transport', 'beacon');
  ga('send', 'pageview')
</script>
<script src="https://www.google-analytics.com/analytics.js" async></script>
</body>

</html>
