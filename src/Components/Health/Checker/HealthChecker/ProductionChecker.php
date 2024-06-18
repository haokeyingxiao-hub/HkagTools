<?php

declare(strict_types=1);

namespace Hkag\Tools\Components\Health\Checker\HealthChecker;

use Hkag\Tools\Components\Health\Checker\CheckerInterface;
use Hkag\Tools\Components\Health\HealthCollection;
use Hkag\Tools\Components\Health\SettingsResult;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class ProductionChecker implements HealthCheckerInterface, CheckerInterface
{
    public function __construct(
        #[Autowire('%kernel.environment%')]
        private readonly string $environment,
    ) {}

    public function collect(HealthCollection $collection): void
    {
        if ($this->environment !== 'prod') {
            $collection->add(SettingsResult::error('app.env', 'Shop mode', $this->environment, 'prod'));

            return;
        }

        $collection->add(SettingsResult::ok('app.env', 'Shop mode', $this->environment, 'prod'));
    }
}
