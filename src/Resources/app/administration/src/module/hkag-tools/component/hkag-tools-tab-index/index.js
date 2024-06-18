import template from './template.twig';
import './style.scss';

const { Component } = Shopware;

Component.register('hkag-tools-tab-index', {
    inject: ['hkagToolsService'],
    template,

    data() {
        return {
            isLoading: true,
            health: null,
            performanceStatus: null,
        }
    },

    created() {
        this.createdComponent();
    },

    computed: {
        columns() {
            return [
                {
                    property: 'name',
                    label: 'hkag-tools.name',
                    rawData: true
                },
                {
                    property: 'current',
                    label: 'hkag-tools.current',
                    rawData: true
                },
                {
                    property: 'recommended',
                    label: 'hkag-tools.recommended',
                    rawData: true
                }
            ];
        },
    },

    methods: {
        async refresh() {
            this.isLoading = true;
            await this.createdComponent();
        },

        async createdComponent() {
            this.health = await this.hkagToolsService.healthStatus();
            this.performanceStatus = await this.hkagToolsService.performanceStatus();
            this.isLoading = false;
        },
    }
})
