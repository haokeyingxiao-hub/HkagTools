<?php

declare(strict_types=1);

namespace Hkag\Tools\Command;

use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand('hkag:env:list')]
class EnvListCommand extends EnvGetCommand {}
