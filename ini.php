<?php
AutoLoader::register_assets("stylesheets/wildfire",__DIR__."/resources/public/stylesheets/wildfire/", "/*.css");
AutoLoader::register_assets("javascripts/wildfire",__DIR__."/resources/public/javascripts/wildfire/", "/*.js");
AutoLoader::register_assets("javascripts/wildfire-plugins",__DIR__."/resources/public/javascripts/wildfire-plugins/", "/*.js");
AutoLoader::register_assets("images/wildfire",__DIR__."/resources/public/images/wildfire/");
AutoLoader::register_assets("fonts/wildfire",__DIR__."/resources/public/fonts/wildfire/","/*");
AutoLoader::register_assets("tinymce",__DIR__."/resources/public/tinymce/");
CMSApplication::register_asset("wildfire", "js", "wildfire");
CMSApplication::register_asset("wildfire", "css", "wildfire");

AutoLoader::register_view_path("plugin", __DIR__."/view/");

AutoLoader::add_plugin_setup_script(__DIR__."/setup.php");
?>