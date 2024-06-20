<?php

declare(strict_types=1);

namespace Hkag\Tools\Components\Health\Checker\PerformanceChecker;

use Hkag\Tools\Components\Health\Checker\CheckerInterface;
use Hkag\Tools\Components\Health\HealthCollection;
use Hkag\Tools\Components\Health\SettingsResult;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class MailOverQueueChecker implements PerformanceCheckerInterface, CheckerInterface
{
    public function __construct(
        #[Autowire('%hkag_tools.mail_over_queue%')]
        protected bool $mailerIsOverQueue,
    ) {}

    public function collect(HealthCollection $collection): void
    {
        if (!$this->mailerIsOverQueue) {
            $collection->add(
                SettingsResult::warning(
                    'mail',
                    'Sending mails over queue',
                    'disabled',
                    'enabled',
                    'https://developer.haokeyingxiao.com/docs/guides/hosting/infrastructure/message-queue#sending-mails-over-the-message-queue',
                ),
            );
        }
    }
}
