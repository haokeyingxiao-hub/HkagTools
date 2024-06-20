<?php

declare(strict_types=1);

namespace Hkag\Tools\Components\Health\Checker\PerformanceChecker;

use Hkag\Tools\Components\Elasticsearch\ElasticsearchManager;
use Hkag\Tools\Components\Health\Checker\CheckerInterface;
use Hkag\Tools\Components\Health\HealthCollection;
use Hkag\Tools\Components\Health\SettingsResult;

class EsChecker implements PerformanceCheckerInterface, CheckerInterface
{
    protected bool $esEnabled = false;

    public function __construct(ElasticsearchManager $elasticsearchManager)
    {
        $this->esEnabled = $elasticsearchManager->isEnabled();
    }

    public function collect(HealthCollection $collection): void
    {
        if (!$this->esEnabled) {
            $collection->add(
                SettingsResult::info(
                    'elasticsearch',
                    'Elasticsearch',
                    'disabled',
                    'enabled',
                    'https://developer.haokeyingxiao.com/docs/guides/hosting/infrastructure/elasticsearch/elasticsearch-setup',
                ),
            );
        }
    }
}
