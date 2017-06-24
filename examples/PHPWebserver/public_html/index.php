<style>
body {
  margin:0;
  background-color: #fcfcfc;
}
h1 {
  padding-left: 10px;
  font-size: 1.5em;
  font-weight: normal;
  background-color:#9999cc;
  line-height: 2em;
  border-bottom: 1px inset black;
  margin: 0;
}
div {
  padding-left: 10px;
  margin-top: 1em;
}
</style>
<?php
$dir = substr(dirname($_SERVER['PHP_SELF']),strlen($_SERVER['DOCUMENT_ROOT']));
echo "<h1>Index of ".$dir.":</h1>";
echo "<div>";
$g = glob("*");
usort($g,function($a,$b) {
    if(is_dir($a) == is_dir($b))
        return strnatcasecmp($a,$b);
    else
        return is_dir($a) ? -1 : 1;
});
echo implode("<br>",array_map(function($a) {
  if ($a == 'index.php') return '';
  return '<a href="'.$a.'">'.$a.'</a>';
},$g));
echo "</div>";
