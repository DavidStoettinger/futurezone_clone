<?php
/*Just to bring it to run. codequality may not be the best. just to make it work*/
 $jsonsPaths = array(
   1 => 'data/mainArticle.json',
   2 => 'data/aside.json',
   3 => 'data/recent.json'
 );

$suche = $_REQUEST["suche"];
//printf("\n".$suche." ");

// Title => 5
$foundElements = array();

foreach ($jsonsPaths as $field => $value){
  $str = file_get_contents($value);
  //made with https://regex101.com/
  //\b(?=\w)a[\wÄÖÜäöü]+\b(?<=\w)
  preg_match_all('#\b(?=\w)'.$suche.'[\wÄÖÜäöü]+\b(?<=\w)#i',$str,$match);
  //print_r($match);
  foreach ($match as $key => $text) {
    foreach ($text as $textkey => $textvalue) {
      //print_r($textvalue);
      $pos = true;
      foreach ($foundElements as $found => $cnt) {
        if (strtolower($found) == strtolower($textvalue) && $pos) {
          $pos = false;
          $cnt++;
          //IDK why but would not increment cnt otherwise
          $foundElements[$found] = $cnt;
        }

      }
      if ($pos) {
        $tmpArray = array($textvalue => '1');
        $foundElements = array_merge($foundElements, $tmpArray);
      }
    }
  }
}
arsort($foundElements,1);
echo json_encode(array_slice($foundElements,0,10));
