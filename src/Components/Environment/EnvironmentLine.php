<?php

declare(strict_types=1);

namespace Hkag\Tools\Components\Environment;

interface EnvironmentLine
{
    public function getLine(): string;

    public static function parse(string $line): self;
}
