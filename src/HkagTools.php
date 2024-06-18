<?php

declare(strict_types=1);

namespace Hkag\Tools;

use Hkag\Tools\DependencyInjection\CacheCompilerPass;
use Hkag\Tools\DependencyInjection\DisableElasticsearchCompilerPass;
use Hkag\Tools\DependencyInjection\HkagToolsExtension;
use Hkag\Tools\DependencyInjection\SymfonyConfigCompilerPass;
use Shopware\Core\Framework\Plugin;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class HkagTools extends Plugin
{
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);
        $container->addCompilerPass(new CacheCompilerPass());
        $container->addCompilerPass(new SymfonyConfigCompilerPass());
        $container->addCompilerPass(new DisableElasticsearchCompilerPass());
    }

    protected function createContainerExtension(): HkagToolsExtension
    {
        return new HkagToolsExtension();
    }
}
