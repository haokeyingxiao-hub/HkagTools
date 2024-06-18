Shopware.Service('privileges')
    .addPrivilegeMappingEntry({
        category: 'additional_permissions',
        parent: null,
        key: 'hkag_tools',
        roles: {
            hkag_tools: {
                privileges: [
                    'hkag_tools:read',
                ],
                dependencies: [],
            },
        },
    });
