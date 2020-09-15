import { Octokit } from "@octokit/core";
import Twit from 'twit';
import Instagram from 'instagram-web-api';

/**
    Get config object
 */
const config = require('../config.json');

/**
    Github api client
 */
const octokit = new Octokit({ auth: config['access-token']['github'] });

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

export {octokit, twit, ig};