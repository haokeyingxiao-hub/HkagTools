<?php

declare(strict_types=1);

namespace Hkag\Tools\Components\Health\Checker\PerformanceChecker;

use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;

#[AutoconfigureTag('hkag_tools.performance_checker')]
interface PerformanceCheckerInterface {}
