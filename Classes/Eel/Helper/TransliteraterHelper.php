<?php

namespace DL\OnePage\Eel\Helper;


use Behat\Transliterator\Transliterator;
use Neos\Eel\ProtectedContextAwareInterface;

class TransliteraterHelper implements ProtectedContextAwareInterface
{
    /**
     * @param $string
     * @return string
     */
    public function urlize($string)
    {
        return Transliterator::urlize($string);
    }

    /**
     * @param string $methodName
     * @return bool
     */
    public function allowsCallOfMethod($methodName)
    {
        return true;
    }
}
