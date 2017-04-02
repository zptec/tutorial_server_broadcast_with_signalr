/*!
 * ASP.NET SignalR JavaScript Library v2.2.1
 * http://signalr.net/
 *
 * Copyright (c) .NET Foundation. All rights reserved.
 * Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies['stockTicker'] = this.createHubProxy('stockTicker'); 
        proxies['stockTicker'].client = { };
        proxies['stockTicker'].server = {
            closeMarket: function () {
            /// <summary>Calls the CloseMarket method on the server-side stockTicker hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['stockTicker'].invoke.apply(proxies['stockTicker'], $.merge(["CloseMarket"], $.makeArray(arguments)));
             },

            getAllStocks: function () {
            /// <summary>Calls the GetAllStocks method on the server-side stockTicker hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['stockTicker'].invoke.apply(proxies['stockTicker'], $.merge(["GetAllStocks"], $.makeArray(arguments)));
             },

            getMarketState: function () {
            /// <summary>Calls the GetMarketState method on the server-side stockTicker hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['stockTicker'].invoke.apply(proxies['stockTicker'], $.merge(["GetMarketState"], $.makeArray(arguments)));
             },

            openMarket: function () {
            /// <summary>Calls the OpenMarket method on the server-side stockTicker hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['stockTicker'].invoke.apply(proxies['stockTicker'], $.merge(["OpenMarket"], $.makeArray(arguments)));
             },

            reset: function () {
            /// <summary>Calls the Reset method on the server-side stockTicker hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['stockTicker'].invoke.apply(proxies['stockTicker'], $.merge(["Reset"], $.makeArray(arguments)));
             }
        };

        proxies['stockTickerMini'] = this.createHubProxy('stockTickerMini'); 
        proxies['stockTickerMini'].client = { };
        proxies['stockTickerMini'].server = {
            closeMarket: function () {
            /// <summary>Calls the CloseMarket method on the server-side stockTickerMini hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['stockTickerMini'].invoke.apply(proxies['stockTickerMini'], $.merge(["CloseMarket"], $.makeArray(arguments)));
             },

            getAllStocks: function () {
            /// <summary>Calls the GetAllStocks method on the server-side stockTickerMini hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['stockTickerMini'].invoke.apply(proxies['stockTickerMini'], $.merge(["GetAllStocks"], $.makeArray(arguments)));
             },

            getMarketState: function () {
            /// <summary>Calls the GetMarketState method on the server-side stockTickerMini hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['stockTickerMini'].invoke.apply(proxies['stockTickerMini'], $.merge(["GetMarketState"], $.makeArray(arguments)));
             },

            openMarket: function () {
            /// <summary>Calls the OpenMarket method on the server-side stockTickerMini hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['stockTickerMini'].invoke.apply(proxies['stockTickerMini'], $.merge(["OpenMarket"], $.makeArray(arguments)));
             },

            reset: function () {
            /// <summary>Calls the Reset method on the server-side stockTickerMini hub.&#10;Returns a jQuery.Deferred() promise.</summary>
                return proxies['stockTickerMini'].invoke.apply(proxies['stockTickerMini'], $.merge(["Reset"], $.makeArray(arguments)));
             }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));