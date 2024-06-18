<?php

declare(strict_types=1);

namespace Hkag\Tools\Components\StateMachines;

use Shopware\Core\System\StateMachine\StateMachineEntity;

interface ExportInterface
{
    public function export(StateMachineEntity $stateMachine, string $title = ''): string;
}
