<?php

declare(strict_types=1);

namespace Hkag\Tools\Components\Health\Checker\HealthChecker;

use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;

#[AutoconfigureTag('hkag_tools.health_checker')]
interface HealthCheckerInterface {}
