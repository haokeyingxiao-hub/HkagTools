/*global Shopware*/

import './style.scss';
import template from './template.html.twig';

const { Component, Mixin } = Shopware;

Component.register('hkag-tools-tab-state-machines', {
    template,

    inject: ['hkagToolsService'],

    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            selectedStateMachine: null,
            image: null,
            isLoading: true,
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.isLoading = false;
        },

        async onStateMachineChange(stateMachineChangeId) {
            if (!stateMachineChangeId) {
                return;
            }

            const response = await this.hkagToolsService.stateMachines(stateMachineChangeId);

            const elem = document.getElementById('state_machine');
            if ("svg" in response) {
                this.image = response.svg;
                elem.src = this.image;
                elem.style.opacity = '1';
                elem.style.width = '100%';
                elem.style.height = 'auto';
            } else {
                elem.style.opacity = '0';
            }
        }
    }
});
