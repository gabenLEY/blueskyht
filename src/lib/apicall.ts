import { type Agent} from '@atproto/api';
import { FeedResponse } from '~/types/feed';
import { serverAgent } from './cors/agent/clientAgent';


export const loadPopularFeeds = async (agent?: Agent, query? : string) : Promise<any> => {
  try {
    if (!agent) agent = await serverAgent();
    const response = await agent.app.bsky.unspecced.getPopularFeedGenerators({
      query
    });
    return response.data;
  } catch (error) {
    console.error('Error loading feeds:', error);
    throw new Error('Failed to load feeds');
  }
}

// Load feeds after ensuring session
export const loadTimeline = async (agent?: Agent) : Promise<any> => {
  try {
    if (!agent) agent = await serverAgent();
    const response = await agent.getTimeline({ limit: 100 });
    return response.data;
  } catch (error) {
    console.error('Error loading feeds:', error);
    throw new Error('Failed to load feeds');
  }
};

// Like feeds
export const likeFeeds = async (uri_feed: string, cid_feed: string, agent?: Agent): Promise<string | null> => {
  try {
    if (!agent) agent = await serverAgent();
    const { uri } = await agent.like(uri_feed, cid_feed);
    console.log('Like successful, URI:', uri);
    return uri;
  } catch (error) {
    console.error('Error liking feed:', error);
    return null; // Return null to indicate the like operation failed
  }
};

// Unlike feeds
export const unLikeFeeds = async (agent : Agent, uri_feed: string): Promise<string | null> => {
  try {
    await agent.deleteLike(uri_feed);
    console.log('Unliked feed successfully');
    return 'Disliked successfully';
  } catch (error) {
    console.error('Error unliking feed:', error);
    return null;
  }
};

// Repost feeds
export const repostFeeds = async (agent : Agent, uri_feed: string, cid_feed: string): Promise<string | null> => {
  try {
    const { uri } = await agent.repost(uri_feed, cid_feed);
    console.log('Repost successful, URI:', uri);
    return uri;
  } catch (error) {
    console.error('Error reposting feed:', error);
    return null;
  }
};

// Unrepost feeds
export const unRepostFeeds = async (agent : Agent, uri_feed: string): Promise<string | null> => {
  try {
    await agent.deleteRepost(uri_feed);
    console.log('Unreposted feed successfully');
    return 'Unreposted successfully';
  } catch (error) {
    console.error('Error unreposting feed:', error);
    return null;
  }
};

// See profile
export const seeProfile = async (agent : Agent, actorId: string): Promise<any | null> => {
  try {
    const { data } = await agent.getProfile({ actor: actorId });
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};


export const getProfileMyProfile = async (handle: string | undefined, agent?: Agent) => {
  if (!handle) return;
  if (!agent) agent = await serverAgent();
  const profile = await agent.getProfile({ actor: handle });

  if (!profile.success) throw new Error("Could not get profile");
  return profile.data;
};

// Edit profile
export const editProfile = async (
  displayName: string,
  description: string,
  agent?: Agent, 
): Promise<boolean> => {
  try {
    if (!agent) agent = await serverAgent();
    await agent.upsertProfile(existingProfile => {
      const existing = existingProfile ?? {};
      existing.displayName = displayName;
      existing.description = description;
      return existing;
    });

    console.log('Profile updated successfully.');
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
};

// Follow user
export const follow = async (agent : Agent, did_feed: string): Promise<string | null> => {
  try {
    const { uri } = await agent.follow(did_feed);
    console.log('Follow successful, URI:', uri);
    return uri;
  } catch (error) {
    console.error('Error following feed:', error);
    return null;
  }
};

// Unfollow user
export const unFollow = async (agent : Agent, did_feed: string): Promise<string | null> => {
  try {
    await agent.deleteFollow(did_feed);
    console.log('Unfollowed feed successfully');
    return 'Unfollowed successfully';
  } catch (error) {
    console.error('Error unfollowing feed:', error);
    return null;
  }
};

// Create post
export const createPost = async (agent : Agent, text: string): Promise<string | null> => {
  try {
    await agent.post({
      text,
      createdAt: new Date().toISOString(),
    });
    console.log('Post created successfully');
    return 'Post created successfully';
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
};

export const getNotifications = async ( cursor?: string, agent?: Agent,) => {
  try {
  if (!agent) agent = await serverAgent();
  const notifications = await agent.listNotifications({
    //cursor: cursor,
    limit: 22,
  });
  if (!notifications.success) throw new Error("Could not get notifications");
  return notifications.data;
  } catch (error) {
    console.error('Error following feed:', error);
    return null;
  }
};
