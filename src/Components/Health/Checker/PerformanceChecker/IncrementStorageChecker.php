<?php

declare(strict_types=1);

namespace Hkag\Tools\Components\Health\Checker\PerformanceChecker;

use Hkag\Tools\Components\Health\Checker\CheckerInterface;
use Hkag\Tools\Components\Health\HealthCollection;
use Hkag\Tools\Components\Health\SettingsResult;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class IncrementStorageChecker implements PerformanceCheckerInterface, CheckerInterface
{
    public function __construct(
        #[Autowire('%shopware.increment.user_activity.type%')]
        private readonly string $userActivity,
        #[Autowire('%shopware.increment.message_queue.type%')]
        private readonly string $queueActivity,
    ) {}

    public function collect(HealthCollection $collection): void
    {
        $recommended = 'array or redis';

        if ($this->userActivity === 'mysql' || $this->queueActivity === 'mysql') {
            $collection->add(
                SettingsResult::warning(
                    'increment-storage',
                    'Increment storage',
                    'mysql',
                    $recommended,
                    'https://developer.haokeyingxiao.com/docs/guides/hosting/performance/performance-tweaks#increment-storage',
                ),
            );
        }
    }
}
