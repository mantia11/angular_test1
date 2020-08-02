import { Injectable } from '@angular/core';

export const pubSubApi = {
  MAP_REFRESH: 'MAP_REFRESH',
  LIST_UPDATE: 'LIST_UPDATE'
};

@Injectable({
  providedIn: 'root'
})
export class PubSubService {
  private subscriptions: { [key: string]: any } = {};

  get API(): { [key: string]: string } {
    return pubSubApi;
  }

  publish(channel: string, channelFunctionArguments: any | Array<any> = [], isAsync: boolean = true) {
    const channelFunctionsBySubscriberName = this.subscriptions[channel];
    const channelFunctionArgumentsArray = Array.isArray(channelFunctionArguments)
      ? channelFunctionArguments : [channelFunctionArguments];

    if (channelFunctionsBySubscriberName) {
      if (isAsync) {
        setTimeout(() => {
          this.executeFns(channelFunctionsBySubscriberName, channelFunctionArgumentsArray);
        }, 0);
      } else {
        this.executeFns(channelFunctionsBySubscriberName, channelFunctionArgumentsArray);
      }
    }
  }

  subscribe(subscriberName: string, channel: any, channelFunction: Function) {
    const channels = Array.isArray(channel) ? channel : [channel];

    channels.forEach((channelName: string) => {
      if (!this.subscriptions[channelName]) {
        this.subscriptions[channelName] = {};
      }

      this.subscriptions[channelName][subscriberName] = channelFunction;
    });
  }

  unsubscribe(subscriberName: string) {
    let subscribersCount = 0;

    for (const channelFunctionsBySubscriberName in this.subscriptions) {
      if (Object.prototype.hasOwnProperty.call(this.subscriptions, channelFunctionsBySubscriberName)) {
        if (this.subscriptions[channelFunctionsBySubscriberName][subscriberName]) {
          subscribersCount++;
          delete this.subscriptions[channelFunctionsBySubscriberName][subscriberName];
        }
      }
    }

    if (!subscribersCount) {
      console.warn(`Subscriptions for: "${subscriberName}" doesn't exist`);
    }
  }

  private executeFns(fns: { [key: string]: Function }, args: Array<any>) {
    for (const fn in fns) {
      if (Object.prototype.hasOwnProperty.call(fns, fn)) {
        fns[fn](...args);
      }
    }
  }
}
