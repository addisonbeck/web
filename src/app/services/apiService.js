﻿angular
    .module('bit.services')

    .factory('apiService', function ($resource, tokenService, appSettings, $httpParamSerializer) {
        var _service = {},
            _apiUri = appSettings.apiUri;

        _service.logins = $resource(_apiUri + '/sites/:id', {}, {
            get: { method: 'GET', params: { id: '@id' } },
            list: { method: 'GET', params: {} },
            post: { method: 'POST', params: {} },
            put: { method: 'POST', params: { id: '@id' } },
            del: { url: _apiUri + '/sites/:id/delete', method: 'POST', params: { id: '@id' } }
        });

        _service.folders = $resource(_apiUri + '/folders/:id', {}, {
            get: { method: 'GET', params: { id: '@id' } },
            list: { method: 'GET', params: {} },
            post: { method: 'POST', params: {} },
            put: { method: 'POST', params: { id: '@id' } },
            del: { url: _apiUri + '/folders/:id/delete', method: 'POST', params: { id: '@id' } }
        });

        _service.ciphers = $resource(_apiUri + '/ciphers/:id', {}, {
            get: { method: 'GET', params: { id: '@id' } },
            list: { method: 'GET', params: {} },
            'import': { url: _apiUri + '/ciphers/import', method: 'POST', params: {} },
            favorite: { url: _apiUri + '/ciphers/:id/favorite', method: 'POST', params: { id: '@id' } },
            del: { url: _apiUri + '/ciphers/:id/delete', method: 'POST', params: { id: '@id' } }
        });

        _service.subvaults = $resource(_apiUri + '/subvaults/:id', {}, {
            get: { method: 'GET', params: { id: '@id' } },
            list: { method: 'GET', params: {} },
            listOrganization: { url: _apiUri + '/subvaults/organization/:orgId', method: 'GET', params: { orgId: '@orgId' } },
            post: { method: 'POST', params: {} },
            put: { method: 'POST', params: { id: '@id' } },
            del: { url: _apiUri + '/subvaults/:id/delete', method: 'POST', params: { id: '@id' } }
        });

        _service.organizations = $resource(_apiUri + '/organizations/:id', {}, {
            get: { method: 'GET', params: { id: '@id' } },
            getExtended: { url: _apiUri + '/organizations/:id/extended', method: 'GET', params: { id: '@id' } },
            list: { method: 'GET', params: {} },
            post: { method: 'POST', params: {} },
            put: { method: 'POST', params: { id: '@id' } },
            del: { url: _apiUri + '/organizations/:id/delete', method: 'POST', params: { id: '@id' } }
        });

        _service.organizationUsers = $resource(_apiUri + '/organizations/:orgId/users/:id', {}, {
            get: { method: 'GET', params: { id: '@id', orgId: '@orgId' } },
            list: { method: 'GET', params: { orgId: '@orgId' } },
            invite: { url: _apiUri + '/organizations/:orgId/users/invite', method: 'POST', params: { orgId: '@orgId' } },
            accept: { url: _apiUri + '/organizations/:orgId/users/:id/accept', method: 'POST', params: { id: '@id', orgId: '@orgId' } },
            confirm: { url: _apiUri + '/organizations/:orgId/users/:id/confirm', method: 'POST', params: { id: '@id', orgId: '@orgId' } },
            del: { url: _apiUri + '/organizations/:orgId/users/:id/delete', method: 'POST', params: { id: '@id', orgId: '@orgId' } }
        });

        _service.accounts = $resource(_apiUri + '/accounts', {}, {
            register: { url: _apiUri + '/accounts/register', method: 'POST', params: {} },
            emailToken: { url: _apiUri + '/accounts/email-token', method: 'POST', params: {} },
            email: { url: _apiUri + '/accounts/email', method: 'POST', params: {} },
            putPassword: { url: _apiUri + '/accounts/password', method: 'POST', params: {} },
            getProfile: { url: _apiUri + '/accounts/profile', method: 'GET', params: {} },
            putProfile: { url: _apiUri + '/accounts/profile', method: 'POST', params: {} },
            getDomains: { url: _apiUri + '/accounts/domains', method: 'GET', params: {} },
            putDomains: { url: _apiUri + '/accounts/domains', method: 'POST', params: {} },
            getTwoFactor: { url: _apiUri + '/accounts/two-factor', method: 'GET', params: {} },
            putTwoFactor: { url: _apiUri + '/accounts/two-factor', method: 'POST', params: {} },
            postTwoFactorRecover: { url: _apiUri + '/accounts/two-factor-recover', method: 'POST', params: {} },
            postPasswordHint: { url: _apiUri + '/accounts/password-hint', method: 'POST', params: {} },
            putSecurityStamp: { url: _apiUri + '/accounts/security-stamp', method: 'POST', params: {} },
            'import': { url: _apiUri + '/accounts/import', method: 'POST', params: {} },
            postDelete: { url: _apiUri + '/accounts/delete', method: 'POST', params: {} }
        });

        _service.settings = $resource(_apiUri + '/settings', {}, {
            getDomains: { url: _apiUri + '/settings/domains', method: 'GET', params: {} },
            putDomains: { url: _apiUri + '/settings/domains', method: 'POST', params: {} },
        });

        _service.users = $resource(_apiUri + '/users/:id', {}, {
            getPublicKey: { url: _apiUri + '/users/:id/public-key', method: 'GET', params: { id: '@id' } }
        });

        _service.identity = $resource(_apiUri + '/connect', {}, {
            token: {
                url: _apiUri + '/connect/token',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
                transformRequest: transformUrlEncoded,
                skipAuthorization: true,
                params: {}
            }
        });

        function transformUrlEncoded(data) {
            return $httpParamSerializer(data);
        }

        return _service;
    });