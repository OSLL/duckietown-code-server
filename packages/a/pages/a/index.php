<?php

use \system\classes\Core;
use \system\classes\Configuration;

$hostname = Core::getSetting('hostname', 'a');

if(strlen($hostname) < 2){
  $hostname = Core::getBrowserHostname();
}
$port = Core::getSetting('port', 'a');
$url = sprintf('http://%s:%s/', $hostname, $port);

?>

<style type="text/css">
    #page_container{
      min-width: 100%;
    }

    ._ctheme_content {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-top: 1px solid black;
        border-left: 1px solid black;
    }

    #duckietown-code-server_iframe {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
    }
</style>

<iframe
  id="duckietown-code-server_iframe"
  src="<?php echo $url ?>"
  frameborder="0"
  scrolling="yes"
></iframe>
