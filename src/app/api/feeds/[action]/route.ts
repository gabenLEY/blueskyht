"use server";
import { NextResponse } from 'next/server';
import { loadTimeline, getLikes, rePost, createPost,  like, unLike, loadPopularFeeds, getProfileMyProfile, editProfile, getNotifications } from '~/lib/apicall'; // Your backend function to load feeds

type ActionType = 'time-line' | 'repost' | 'create-post' | 'like' | 'un-like' | 'update' | 'load-popular' | 'get-my-profile' | 'edit-profile' | 'get-notification' | 'get-likes';

// Export the GET method
export async function GET(request: Request, { params }: { params: Promise<{ action: ActionType }> }) {
  const { action } = await params; // Directly destructure the action from params

  switch (action) {
    case 'time-line':
      return await loadTimelineHandler();
    case 'load-popular':
      return await loadPopularFeedsHandler();
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

// Export the POST method
export async function POST(request: Request, { params }: { params: Promise<{ action: ActionType }> }) {
  const { action } = await params; 

  switch (action) {
    case 'like':
      return await likeFeedsHandler(request);
    case 'un-like':
      return await unlikeHandler(request);
    case 'get-my-profile':
      return await getProfileMyProfileHandler(request);
    case 'edit-profile':
      return await editProfileHandler(request);
    case 'get-notification':
      return await getNotificationsHandler(request);
    case 'get-likes':
      return await getLikeHandler(request);
    case 'repost':
      return await repostHandler(request);
    case 'create-post':
      return await createPostHandler(request);
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

// Handler for 'time-line' action
async function loadTimelineHandler() {
  try {
    const feeds = await loadTimeline(); // Assuming loadFeeds fetches the feed data
    return NextResponse.json(feeds);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load feeds' }, { status: 500 });
  }
}

// Handler for 'load-popular' action
async function loadPopularFeedsHandler() {
  try {
    const feeds = await loadPopularFeeds(); // Assuming loadFeeds fetches the feed data
    return NextResponse.json(feeds);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load popular feeds' }, { status: 500 });
  }
}

// Handler for 'like' action
async function likeFeedsHandler(request: Request) {
  try {
    const body = await request.json();
    const { uri, cid } = body;
    const likes = await like(uri, cid);
    return NextResponse.json(likes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to like feeds' }, { status: 500 });
  }
}

async function unlikeHandler(request: Request) {
  try {
    const body = await request.json();
    const { uri} = body;
    const unlike = await unLike(uri);
    return NextResponse.json(unlike);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to like feeds' }, { status: 500 });
  }
}

// Handler for 'get-my-profile' action
async function getProfileMyProfileHandler(request: Request) {
  try {
    const body = await request.json();
    const { handle } = body;
    const profile = await getProfileMyProfile(handle);
    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get profile' }, { status: 500 });
  }
}

// Handler for 'edit-profile' action
async function editProfileHandler(request: Request) {
  try {
    const body = await request.json();
    const { displayName, description } = body;
    const updatedProfile = await editProfile(displayName, description);
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to edit profile' }, { status: 500 });
  }
}

// Handler for 'get-notification' action
async function getNotificationsHandler(request: Request) {
  try {
    const body = await request.json();
    const { cursor } = body;
    const notifications = await getNotifications(cursor);
    return NextResponse.json(notifications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get notifications' }, { status: 500 });
  }
}


async function getLikeHandler(request: Request) {
  try {
    const body = await request.json();
    const { uri, cid } = body;
    const notifications = await getLikes(uri, cid);
    return NextResponse.json(notifications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get notifications' }, { status: 500 });
  }
}

async function repostHandler(request: Request) {
  try {
    const body = await request.json();
    const { uri, cid } = body;
    const notifications = await rePost(uri, cid);
    return NextResponse.json(notifications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get notifications' }, { status: 500 });
  }
}

async function createPostHandler(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;
    const result = await createPost(text);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to get notifications' }, { status: 500 });
  }
}
