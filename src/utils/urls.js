import * as config from '../config';

export function DDURL(cid) {
  return `${config.DYNAMICDELTA_BASE}/v1/cdn/project/${config.DYNAMICDELTA_APP_ID}/component/${cid}`;
}

export function DDBLOGPOST(postID) {
  return `${config.DYNAMICDELTA_BASE}/v1/cdn/project/${config.DYNAMICDELTA_APP_ID}/blog/post/${postID}`;
}

export function DDSPOTLIGHTPOST(postID) {
  return `${config.DYNAMICDELTA_BASE}/v1/cdn/project/${config.DYNAMICDELTA_SPOTLIGHT_BLOG_ID}/blog/post/${postID}`;
}

export function DDCDN(path) {
  return `${config.STATIC}/${path}`;
}
