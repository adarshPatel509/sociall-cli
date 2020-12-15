import { Octokit } from "@octokit/core";
import Twit from 'twit';
import { Facebook } from 'fb';
import Reddit from "reddit"
import { IgApiClient } from 'instagram-private-api'
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
    consumer_key: config['twitter']['api-key'],
    consumer_secret: config['twitter']['api-secret-key'],
    access_token: config['twitter']['my-token']['access-token'],
    access_token_secret: config['twitter']['my-token']['access-token-secret'],
    timeout_ms: 60 * 1000,
    strictSSL: true,
});

/**
    Instagram api client
 */
const ig = new IgApiClient()
ig.state.generateDevice(config['instagram']['username']);


/**
    Facebook api client
 */
const fb = new Facebook({
    appId: config['facebook']['app-id'],
    appSecret: config['facebook']['app-secret'],
    accessToken: config['facebook']['access-token']
});

const reddit = new Reddit({
    username: config['reddit']['username'],
    password: config['reddit']['password'],
    appId: config['reddit']['appId'],
    appSecret: config['reddit']['appSecret'],
    userAgent: config['reddit']['userAgent']
})

export { octokit, twit, ig, fb, reddit };