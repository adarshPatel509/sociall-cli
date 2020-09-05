import { Octokit } from "@octokit/core";
import Twit from 'twit';

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

export {octokit, twit};