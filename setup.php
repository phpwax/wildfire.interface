<?
CMSBaseComponent::$default_format = "html";
if(!CMSApplication::$default_module_order) CMSApplication::$default_module_order = array(
  "home",
  "content",
  "media",
  "navigation",
  "redirect",
  "categories",
  "users"
);
WaxEvent::add("cms.format.set", function(){
  $obj = WaxEvent::data();
  if($obj->use_format == "ajax" || $obj->use_format == "json") $obj->use_layout = false;
  elseif($obj->use_format == "nochrome"){
    $obj->use_format = "html";
    $obj->use_layout = "nochrome";
  }elseif($obj->use_format == "nolayout"){
    $obj->use_format = "html";
    $obj->use_layout = "nolayout";
  }elseif($obj->use_format == "csv"){
    $name = str_replace("/", "-", $obj->controller). "-".date("Ymdh").".csv";
    header("Content-type: application/csv");
    header("Content-Disposition: attachment; filename=".$name);
    header("Pragma: no-cache");
    header("Expires: 0");
  }elseif($obj->use_format == "help"){
    header("Content-type: application/json");
  }elseif($obj->use_format == "zip"){
    $obj->use_view = $obj->use_layout = false;
  }else $obj->use_format = "html";
});

?>