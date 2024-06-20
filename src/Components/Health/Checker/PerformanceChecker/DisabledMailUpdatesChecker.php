<?php

declare(strict_types=1);

namespace Hkag\Tools\Components\Health\Checker\PerformanceChecker;

use Hkag\Tools\Components\Health\Checker\CheckerInterface;
use Hkag\Tools\Components\Health\HealthCollection;
use Hkag\Tools\Components\Health\SettingsResult;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class DisabledMailUpdatesChecker implements PerformanceCheckerInterface, CheckerInterface
{
    public function __construct(private readonly ParameterBagInterface $params) {}

    public function collect(HealthCollection $collection): void
    {
        if (!$this->params->has('shopware.mail.update_mail_variables_on_send')) {
            return;
        }

        $setting = $this->params->get('shopware.mail.update_mail_variables_on_send');

        if (!$setting) {
            return;
        }

        $result = SettingsResult::warning('mail_variables', 'MailVariables updates', 'enabled', 'disabled');

        $result->url = 'https://developer.haokeyingxiao.com/docs/guides/hosting/performance/performance-tweaks#prevent-mail-data-updates';
        $collection->add($result);
    }
}
