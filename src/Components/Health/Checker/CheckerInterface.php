<?php

declare(strict_types=1);

namespace Hkag\Tools\Components\Health\Checker;

use Hkag\Tools\Components\Health\HealthCollection;

interface CheckerInterface
{
    public function collect(HealthCollection $collection): void;
}
