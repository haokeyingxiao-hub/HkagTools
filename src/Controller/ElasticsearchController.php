<?php

declare(strict_types=1);

namespace Hkag\Tools\Controller;

use Hkag\Tools\Components\Elasticsearch\ElasticsearchManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/api/_action/hkag-tools/elasticsearch', defaults: ['_routeScope' => ['api'], '_acl' => ['hkag_tools:read']])]
class ElasticsearchController extends AbstractController
{
    public function __construct(private readonly ElasticsearchManager $manager) {}

    #[Route(path: '/status', name: 'api.hkag.tools.elasticsearch.status', methods: ['GET'])]
    public function status(): Response
    {
        if (!$this->manager->isEnabled()) {
            return new Response('', Response::HTTP_PRECONDITION_FAILED);
        }

        return new JsonResponse($this->manager->info());
    }

    #[Route(path: '/indices', name: 'api.hkag.tools.elasticsearch.indices', methods: ['GET'])]
    public function indices(): Response
    {
        if (!$this->manager->isEnabled()) {
            return new Response('', Response::HTTP_PRECONDITION_FAILED);
        }

        return new JsonResponse($this->manager->indices());
    }

    #[Route(path: '/index/{indexName}', name: 'api.hkag.tools.elasticsearch.delete_index', methods: ['DELETE'])]
    public function deleteIndex(string $indexName): Response
    {
        if (!$this->manager->isEnabled()) {
            return new Response('', Response::HTTP_PRECONDITION_FAILED);
        }

        return new JsonResponse($this->manager->deleteIndex($indexName));
    }

    #[Route(path: '/console/{path}', name: 'api.hkag.tools.elasticsearch.proxy', requirements: ['path' => '.*'])]
    public function console(Request $request, string $path): Response
    {
        if (!$this->manager->isEnabled()) {
            return new Response('', Response::HTTP_PRECONDITION_FAILED);
        }

        $data = $this->manager->proxy($request->getMethod(), '/' . $path, $request->query->all(), $request->request->all());

        return new JsonResponse($data);
    }

    #[Route(path: '/flush_all', name: 'api.hkag.tools.elasticsearch.flush', methods: ['POST'])]
    public function flushAll(): Response
    {
        $this->manager->flushAll();

        return new Response('', Response::HTTP_NO_CONTENT);
    }

    #[Route(path: '/reindex', name: 'api.hkag.tools.elasticsearch.reindex', methods: ['POST'])]
    public function reindex(): Response
    {
        $this->manager->reindex();

        return new Response('', Response::HTTP_NO_CONTENT);
    }

    #[Route(path: '/switch_alias', name: 'api.hkag.tools.elasticsearch.switch_alias', methods: ['POST'])]
    public function switchAlias(): Response
    {
        $this->manager->switchAlias();

        return new Response('', Response::HTTP_NO_CONTENT);
    }

    #[Route(path: '/cleanup', name: 'api.hkag.tools.elasticsearch.cleanup', methods: ['POST'])]
    public function deleteUnusedIndices(): Response
    {
        $this->manager->deleteUnusedIndices();

        return new Response('', Response::HTTP_NO_CONTENT);
    }

    #[Route(path: '/reset', name: 'api.hkag.tools.elasticsearch.reset', methods: ['POST'])]
    public function reset(): Response
    {
        $this->manager->reset();

        return new Response('', Response::HTTP_NO_CONTENT);
    }
}
