<?php

declare(strict_types=1);

namespace Hkag\Tools\Components\Health\Checker\PerformanceChecker;

use Hkag\Tools\Components\CacheAdapter;
use Hkag\Tools\Components\CacheRegistry;
use Hkag\Tools\Components\Health\Checker\CheckerInterface;
use Hkag\Tools\Components\Health\HealthCollection;
use Hkag\Tools\Components\Health\SettingsResult;

class RedisTagAwareChecker implements PerformanceCheckerInterface, CheckerInterface
{
    public function __construct(
        private readonly CacheRegistry $cacheRegistry,
    ) {}

    public function collect(HealthCollection $collection): void
    {
        $httpCacheType = $this->cacheRegistry->get('cache.http')->getType();

        if (!\str_starts_with($httpCacheType, CacheAdapter::TYPE_REDIS)
            || \str_starts_with($httpCacheType, CacheAdapter::TYPE_REDIS_TAG_AWARE)) {
            return;
        }

        $collection->add(
            SettingsResult::warning(
                'redis-tag-aware',
                'Redis adapter should be TagAware',
                CacheAdapter::TYPE_REDIS,
                CacheAdapter::TYPE_REDIS_TAG_AWARE,
                'https://developer.shopware.com/docs/guides/hosting/performance/caches.html#example-replace-some-cache-with-redis',
            ),
        );
    }
}
