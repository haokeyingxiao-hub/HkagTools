<?php

declare(strict_types=1);

namespace Hkag\Tools\DependencyInjection;

use Hkag\Tools\Components\Elasticsearch\DisabledElasticsearchManager;
use Hkag\Tools\Components\Elasticsearch\ElasticsearchManager;
use OpenSearch\Client;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class DisableElasticsearchCompilerPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container): void
    {
        if ($container->hasDefinition(Client::class)) {
            $container->setParameter('hkag_tools.elasticsearch.enabled', true);

            return;
        }

        $manager = $container->getDefinition(ElasticsearchManager::class);
        $manager->setClass(DisabledElasticsearchManager::class);
        $manager->setArguments([]);
        $container->setParameter('hkag_tools.elasticsearch.enabled', false);
    }
}
