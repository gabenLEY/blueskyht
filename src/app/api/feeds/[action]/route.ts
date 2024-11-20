// src/app/api/feeds/[action]/route.ts
"use server"
import { NextResponse } from 'next/server';
import { loadTimeline, likeFeeds, loadPopularFeeds, getProfileMyProfile, editProfile, getNotifications } from '~/lib/apicall'; // Your backend function to load feeds

type ActionType = 'time-line' | 'like' | 'update' | 'load-popular' | 'get-my-profile' | 'edit-profile' | 'get-notification';

// Export the GET method
export async function GET(request: Request,
  context: { params: { action: ActionType } }) {
  // Await params before using them
  const { params } = context; // Wait to resolve params
  const { action } = await params;

  switch (action) {
    case 'time-line':
      return await loadTimelineandler();
    case 'load-popular':
      return await loadPopularFeedsHandler();
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

//
export async function POST(request: Request,
  context: { params: { action: ActionType } }) {
    const { params } = context; // Wait to resolve params
    const { action } = await params;

  switch (action) {
    case 'like':
      return await likeFeedsHandler(request);
    case 'get-my-profile':
      return await getProfileMyProfileHandler(request);
    case 'edit-profile':
      return await editProfileHandler(request);
    case 'get-notification':
      return await getNotificationsHandler(request);
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

// Handler for 'load' action
async function loadTimelineandler() {
  try {
    const feeds = await loadTimeline(); // Assuming loadFeeds fetches the feed data
    return NextResponse.json(feeds);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to load feeds' }, { status: 500 });
  }
}

async function loadPopularFeedsHandler() {
  try {
    const feeds = await loadPopularFeeds(); // Assuming loadFeeds fetches the feed data
    return NextResponse.json(feeds);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to load feeds' }, { status: 500 });
  }
}

async function likeFeedsHandler(request : Request){
  try {
    const body = await request.json();
    const { uri, cid} = body;
    const likes = await likeFeeds(uri, cid);
    return NextResponse.json(likes);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to like feeds' }, { status: 500 });
  }
}

async function getProfileMyProfileHandler(request : Request){
  try {
    const body = await request.json();
    const { handle} = body;
    const likes = await getProfileMyProfile(handle);
    return NextResponse.json(likes);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to get profile' }, { status: 500 });
  }
}

async function editProfileHandler(request : Request){
  try {
    const body = await request.json();
    const { displayName, description} = body;
    const likes = await editProfile(displayName, description);
    return NextResponse.json(likes);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to edit profile' }, { status: 500 });
  }
}

async function getNotificationsHandler(request : Request){
  try {
    const body = await request.json();
    const { cursor } = body;
    const notification = await getNotifications(cursor);
    return NextResponse.json(notification);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to notify' }, { status: 500 });
  }
}