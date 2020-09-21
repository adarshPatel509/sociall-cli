import { Octokit } from "@octokit/core";
import Twit from 'twit';
import Instagram from 'instagram-web-api';
import { Facebook, FacebookApiException } from 'fb';

/**
    Get config object
 */
const config = require('../config.json');

/**
    Github api client
 */
const octokit = new Octokit({ auth: config['github']['access-token'] });

/**
    Twitter api client
 */
const twit = new Twit({
    consumer_key:         config['twitter']['api-key'],
    consumer_secret:      config['twitter']['api-secret-key'],
    access_token:         config['twitter']['my-token']['access-token'],
    access_token_secret:  config['twitter']['my-token']['access-token-secret'],
    timeout_ms:           60*1000,
    strictSSL:            true,  
});

/**
    Instagram api client
 */
const ig = new Instagram({
    username: config['instagram']['username'],
    password: config['instagram']['password']
});

/**
    Facebook api client
 */
const fb = new Facebook({
    appId: config['facebook']['app-id'],
    appSecret: config['facebook']['app-secret'],
    accessToken: config['facebook']['access-token']
});

export {octokit, twit, ig, fb};